'use client'

import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

// export default function About() {
//     const session = getSession();
//     const user = session?.user;
//     console.log(user);
//     return (
//         <main className="flex flex-col items-center justify-between min-h-screen mt-12">
//         <section id="admin-panel" className="bg-darkblue flex flex-col md:flex-row items-center justify-center w-full h-full -z-50">
//             {/* fetch all users from auth0 management api here */}
//         </section>
//         <div>
//             <h1>Profile</h1>
//             <pre>{JSON.stringify(user, null, 2)}</pre>
//             <a href="/api/auth/logout">Log out</a>
//             </div>
//         </main>
//     );
// }


  // app/portal/profile/ProfileClient.js


import { useEffect, useState } from 'react';

export default function ProfileClient() {
  const { user, error, isLoading } = useUser();
  const [userData, setUserData] = useState(null);
  const [metadataError, setMetadataError] = useState(null);

  useEffect(() => {
    if (user) {
        console.log(user.sub)
      fetch(`/api/user?userId=${user.sub}`)
        .then(response => response.json())
        .then(data => setUserData(data))
        .catch(err => setMetadataError(err));
    }
  }, [user]);

  if (isLoading) return <div>Loading...</div>;
  if (error || metadataError) return <div>Error loading user data.</div>;

  return (
    <div className='text-black text-3xl mt-20'>
      <h1>Profile Details</h1>
      {userData ? (
        <pre>{JSON.stringify(userData, null, 2)}</pre>
      ) : (
        <div>Loading user metadata...</div>
      )}
      <a href="/api/auth/logout">Log out</a>
    </div>
  );
}
