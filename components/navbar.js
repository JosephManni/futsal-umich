"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Announcement from "@/components/announcement";
import { CgProfile } from "react-icons/cg";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef(null);
    const { user } = useUser();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setIsProfileMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [profileMenuRef]);

    return(
        <nav className="bg-darkblue fixed w-full absolute z-500 top-0">
            <Announcement />
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <button 
                            type="button" 
                            onClick={toggleMobileMenu} 
                            className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" 
                            aria-controls="mobile-menu" 
                            aria-expanded={isMobileMenuOpen ? "true" : "false"}
                        >
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Open main menu</span>
                            {/* Icon when menu is closed. */}
                            <svg className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            {/* Icon when menu is open. */}
                            <svg className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    
                    <div className={`${isMobileMenuOpen ? 'hidden' : 'flex'} sm:flex-1 items-center justify-center sm:items-stretch sm:justify-start`}>
                        <div className="flex flex-shrink-0 items-center">
                        <a href="/" className="hidden sm:block">
                            <Image className="h-12 w-auto mx-auto" width={32} height={32} src="/logo.jpg" alt="Club Futsal at the University of Michigan"/>
                        </a>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <Link href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg font-medium" aria-current="page">Home</Link>
                                <Link href="/about" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg font-medium">About</Link>
                                <Link href="/leadership" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg font-medium">Leadership</Link>
                                <Link href="/forms/contact" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg font-medium">Contact</Link>
                                <Link href="/social" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg font-medium">Socials</Link>
                            </div>
                        </div>
                    </div>

                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5"></span>
                            <span className="sr-only">View notifications</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                            </svg>
                        </button>

                        {/* Profile dropdown */}
                        <div className="relative ml-3" onBlur={() => setIsProfileMenuOpen(false)} ref={profileMenuRef}>
                            <div>
                                <button 
                                    type="button" 
                                    onClick={toggleProfileMenu} 
                                    className="relative flex rounded-full bg-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" 
                                    id="user-menu-button" 
                                    aria-expanded={isProfileMenuOpen ? "true" : "false"} 
                                    aria-haspopup="true"
                                >
                                    <span className="absolute -inset-1.5"></span>
                                    <span className="sr-only">Open user menu</span>
                                    {user ? (
                                        <Image
                                            className="h-8 w-8 rounded-full" 
                                            width={32} height={32}
                                            src={user.picture} 
                                            alt="Profile Picture"
                                        />
                                    ) : (
                                        <CgProfile className="h-8 w-8 rounded-full bg-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"/>
                                    )}
                                </button>
                            </div>

                            {/* Dropdown menu */}
                            {isProfileMenuOpen && (
                                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                                    <a onClick={() => setIsProfileMenuOpen(false)} href="/players/portal" className="block px-4 py-2 text-lg text-gray-700" role="menuitem" tabIndex="-1">{user ? "My" : "Your"} Profile</a>
                                    {/* <Link href="/profile/settings" className="block px-4 py-2 text-lg text-gray-700" role="menuitem" tabIndex="-1">Settings</Link> */}
                                    <Link onClick={() => setIsProfileMenuOpen(false)} href={`/api/auth/${user ? "logout" : "login"}`} className="block px-4 py-2 text-lg text-gray-700" role="menuitem" tabIndex="-1">Sign {user ? "out" : "in"}</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden`} id="mobile-menu">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    <Link onClick={() => setIsMobileMenuOpen(false)} href="/" className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Home</Link>
                    <Link onClick={() => setIsMobileMenuOpen(false)} href="/about" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">About</Link>
                    <Link onClick={() => setIsMobileMenuOpen(false)} href="/leadership" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Leadership</Link>
                    <Link onClick={() => setIsMobileMenuOpen(false)} href="/forms/contact" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Contact</Link>
                    <Link onClick={() => setIsMobileMenuOpen(false)} href="/social" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Socials</Link>
                </div>
                <div className="flex justify-center">
                <Image className="h-8 w-auto" src="/logo.jpg" width={32} height={32} alt="Club Futsal at the University of Michigan"/>
                </div>
            </div>
        </nav>
    );
}
