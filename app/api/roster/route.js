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

        // Initialize variables for pagination
        let page = 0;
        const perPage = 100;
        let users = [];
        let morePages = true;

        while (morePages) {
            const response = await fetch(
                `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users?per_page=${perPage}&page=${page}`,
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

            const result = await response.json();
            users = users.concat(result);

            // Check if there are more pages
            morePages = result.length === perPage;
            page++;
        }

        // Process the users list
        const approvedUsers = users.filter(user => user.app_metadata?.approved);
        const processedUsers = approvedUsers.map(user => ({
            name: user.name,
            user_id: user.user_id,
            picture: user.picture,
            position: user.user_metadata?.position,
            year: user.user_metadata?.year,
            division: user.app_metadata?.division,
        }));

        return NextResponse.json(processedUsers);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: error.status || 500 });
    }
});

export const fetchCache = 'force-no-store';