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
            scope: 'update:users'
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

        const userId = session.user.sub; // Auth0 user ID (e.g., 'auth0|123456')
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

        
        const getContactForms = await fetch(
            `https://q3f13mv0ag.execute-api.us-east-2.amazonaws.com/v1/contact`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                },
            }
        );

        if (!getContactForms.ok) {
            const error = await getContactForms.json();
            throw new Error(error.message);
        }

        const contacts = await getContactForms.json();
        return NextResponse.json(contacts);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: error.status || 500 });
    }
});
