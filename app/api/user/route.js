// app/api/user/route.js
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
//public route
export const GET =  withApiAuthRequired(async (req) => {
    try {
        const res = new NextResponse();
        const session = await getSession(req, res);

        if (!session || !session.user.sub) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userId = session.user.sub; // Auth0 user ID (e.g., 'auth0|123456')

        const accessToken = await getManagementAPIToken();

        const response = await fetch(
            `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        const data = await response.json();
         
        return NextResponse.json({"name": data.name, "position" : data.user_metadata.position, "year": data.user_metadata.year, "division": data.app_metadata.division, "role": data.app_metadata.role, "approved": data.user_metadata.approved});        
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: error.response?.status || 500 });
    }
});