'use client';

import Image from 'next/image';
import { CiFacebook, CiInstagram } from 'react-icons/ci';
import { SiGroupme } from 'react-icons/si';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <section id="content" className="h-full w-full max-w-5xl p-8 md:p-20">
        <div className="flex flex-col items-center text-center mt-12 space-y-6">
          <Link
            href="https://www.facebook.com/profile.php?id=61558429673788&mibextid=LQQJ4d"
            className="flex items-center space-x-3 p-4 w-full max-w-sm bg-white rounded-lg shadow-md hover:bg-blue-100 transition duration-300 ease-in-out"
          >
            <CiFacebook size={30} className="text-blue-500" />
            <h1 className="font-semibold text-xl text-darkblue">Facebook</h1>
          </Link>

          <Link
            href="https://www.instagram.com/umichfutsal"
            className="flex items-center space-x-3 p-4 w-full max-w-sm bg-white rounded-lg shadow-md hover:bg-pink-100 transition duration-300 ease-in-out"
          >
            <CiInstagram size={30} className="text-pink-500" />
            <h1 className="font-semibold text-xl text-darkblue">Instagram</h1>
          </Link>

          <Link
            href="https://groupme.com/join_group/93404417/Axw5hOPS"
            className="flex items-center space-x-3 p-4 w-full max-w-sm bg-white rounded-lg shadow-md hover:bg-blue-400 transition duration-300 ease-in-out"
          >
            <SiGroupme size={30} className="text-blue-800" />
            <h1 className="font-semibold text-xl text-darkblue">Groupme</h1>
          </Link>
        </div>
      </section>
    </main>
  );
}
