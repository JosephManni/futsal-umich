'use client'

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between mt-12">
            <section id="content" className="h-full w-full p-20">
                <section id="admin" className="p-8 bg-darkblue flex flex-col items-center justify-center w-full h-full">
                    <div className="w-full mt-8 mb-4">
                        <h1 className="text-xl md:text-2xl lg:text-3xl text-maize font-bold uppercase mb-2 mt-2 text-center">Admin</h1>
                    </div>
                </section>
                <div className='flex flex-col items-center font-semibold text-2xl mx-auto text-center'>
                    <Link href={"/admin/manage/roster"} className='mb-6'><h1>Manage Roster</h1></Link>
                    <Link href={"/admin/manage/tryouts"} className='mb-6'><h1>Manage Tryouts</h1></Link>
                    <Link href={"/admin/manage/forms"} className='mb-6'><h1>Contact Form Submissions</h1></Link>
                </div>
            </section>
        </main>
    );
}
