import { NextResponse } from 'next/server';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

const getManagementAPIToken = async () => {
    const response = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            client_id: process.env.AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
            grant_type: 'client_credentials',
        }),
    });

    const data = await response.json();
    return data.access_token;
};

export const GET = withApiAuthRequired(async (req) => {
    try {
        // Get the user's session
        const res = new NextResponse();
        const session = await getSession(req, res);

        if (!session || !session.user.sub) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userId = session.user.sub; // Auth0 user ID
        const accessToken = await getManagementAPIToken();

        // Fetch the current user's profile to check their role
        const userResponse = await fetch(
            `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (!userResponse.ok) {
            const error = await userResponse.json();
            throw new Error(error.message);
        }

        const userProfile = await userResponse.json();
        const userRole = userProfile.app_metadata?.role;

        if (userRole !== 'admin' && userRole !== 'webmaster') {
            return NextResponse.json({ error: 'Forbidden: Admin role required' }, { status: 403 });
        }

        // Fetch all users
        const response = await fetch(
            `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users?per_page=100`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                },
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const users = await response.json();
        console.log(accessToken);
        const result = users.map(user => ({
            name: user.name,
            user_id: user.user_id,
            picture: user.picture,
            position: user.user_metadata?.position,
            year: user.user_metadata?.year,
            division: user.app_metadata?.division,
            role: user.app_metadata?.role,
            approved: user.app_metadata?.approved ? "Approved" : "Waiting Approval",
            waiver: user.user_metadata?.waiver,
            preferred_style: user.user_metadata?.preferred_style,
            preferred_date: user.user_metadata?.preferred_date,
            assigned_date: user.user_metadata?.assigned_date,
            signup_done: user.user_metadata?.signup_done,
            signup_time: user.user_metadata?.signup_time
        }));


        return NextResponse.json(result);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: error.status || 500 });
    }
});
