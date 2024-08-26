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
const createRequestBody = (body) => {
    // Initialize the object
    const requestBody = {};

    // Only add user_metadata if it contains non-null values
    if (body.position || body.year || body.waiver !== undefined || body.preferred_style || body.preferred_date || body.signup_done !== undefined) {
        requestBody.user_metadata = {};
        if (body.position) requestBody.user_metadata.position = body.position;
        if (body.year) requestBody.user_metadata.year = body.year;
        if (body.waiver) requestBody.user_metadata.waiver = body.waiver;
        if (body.preferred_style) requestBody.user_metadata.preferred_style = body.preferred_style;
        if (body.preferred_date) requestBody.user_metadata.preferred_date = body.preferred_date;
        if (body.signup_done !== undefined) requestBody.user_metadata.signup_done = body.signup_done;
    }

    // Only add app_metadata if it contains non-null values
    if (body.division || body.role || body.approved !== undefined) {
        requestBody.app_metadata = {};
        if (body.division) requestBody.app_metadata.division = body.division;
        if (body.role) requestBody.app_metadata.role = body.role;
        if (body.approved !== undefined) requestBody.app_metadata.approved = body.approved;
    }
    return JSON.stringify(requestBody);
};


export const PATCH = withApiAuthRequired(async (req) => {
    try {
        // Get the user's session
        const res = new NextResponse();
        const session = await getSession(req, res);

        if (!session || !session.user.sub) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userId = session.user.sub; // Auth0 user ID (e.g., 'auth0|123456')
        const accessToken = await getManagementAPIToken();


        const id = req.nextUrl.searchParams.get('id');

        const body = await req.json(); // Fields to update

        if (!id) {
            return NextResponse.json({ error: 'Player ID is required' }, { status: 400 });
        }

        // Update the user in Auth0
        const requestBody = createRequestBody(body);

        const updateResponse = await fetch(
            `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${id}`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                },
                body: requestBody
            }
        );

        if (!updateResponse.ok) {
            const error = await updateResponse.json();
            throw new Error(error.message);
        }

        const updatedUser = await updateResponse.json();
        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: error.status || 500 });
    }
});
