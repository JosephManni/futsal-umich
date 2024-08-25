import Link from "next/link";
import { CiFacebook, CiInstagram } from "react-icons/ci";
import { SiGroupme } from "react-icons/si";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-darkblue">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                <div className="mb-6 md:mb-0">
                    <a href="#" className="flex items-center">
                        <Image src="/logo.jpg" className="h-12 w-auto me-3" width={12} height={12} alt="Logo" />
                        <span className="self-center text-xs md:text-xl font-semibold whitespace-nowrap text-white pr-6">The Futsal Club at the University of Michigan</span>
                    </a>
                </div>
                <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-2">
                    <div>
                        <h2 className="mb-6 text-sm font-semibold uppercase text-white">Club</h2>
                        <ul className="text-gray-500 dark:text-gray-400 font-medium">
                            <li className="mb-2">
                                <Link href="/about" className="hover:underline">About</Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/leadership" className="hover:underline">Leadership</Link>
                            </li>
                            <li>
                                <Link href="/forms/contact" className="hover:underline">Contact</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="mb-6 text-sm font-semibold uppercase text-white">Players</h2>
                        <ul className="text-gray-500 dark:text-gray-400 font-medium">
                            <li className="mb-2">
                                <Link href="/players/roster" className="hover:underline">Roster</Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/players/portal" className="hover:underline">Portal</Link>
                            </li>
                            <li>
                                <Link href="/admin" className="hover:underline">Admin</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div className="sm:flex sm:items-center sm:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 The Futsal Club at the University of Michigan. All Rights Reserved.
                </span>
                <div className="flex mt-4 sm:justify-center sm:mt-0">
                    <a href="https://www.facebook.com/profile.php?id=61558429673788&mibextid=LQQJ4d" target="_blank" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                        <CiFacebook className="w-6 h-6" />
                        <span className="sr-only">Facebook page</span>
                    </a>
                    <a href="https://www.instagram.com/umichfutsal" target="_blank" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                        <CiInstagram className="w-6 h-6" />
                        <span className="sr-only">Instagram page</span>
                    </a>
                    <a href="https://groupme.com/join_group/93404417/Axw5hOPS" target="_blank" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                        <SiGroupme className="w-6 h-6" />
                        <span className="sr-only">Groupme</span>
                    </a>
                </div>
            </div>
            </div>
        </footer>
    );
}
