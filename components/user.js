'use client';

import { useUser } from '@auth0/nextjs-auth0/client';

export function ProfileClient() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  
  if (!user) {
    return (
      <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
        <a href="/api/auth/login" className="block px-4 py-2 text-lg text-gray-700" role="menuitem" tabIndex="-1">Login</a>
      </div>
    );
  }

  return (
    <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
      <a href="/profile" className="block px-4 py-2 text-lg text-gray-700" role="menuitem" tabIndex="-1">Your Profile</a>
      <a href="/api/auth/logout" className="block px-4 py-2 text-lg text-gray-700" role="menuitem" tabIndex="-1">Sign out</a>
    </div>
  );
}

export function ProfilePic() {
  const { user, error, isLoading } = useUser();

  if (isLoading || error || !user || !user.picture) {
    return <img src="/avatar.jpeg" alt="Default profile" className="h-8 w-8 rounded-full" />;
  }

  return <img src={user.picture} alt="User profile" className="h-8 w-8 rounded-full" />;
}
