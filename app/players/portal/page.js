'use client'

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
    const [roster, setRoster] = useState([]);

    useEffect(() => {
        const fetchRoster = async () => {
            try {
                const response = await fetch('/api/roster', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache',
                    }
                });
                const data = await response.json();
                setRoster(data);
            } catch (error) {
                console.error('Failed to fetch roster:', error);
            }
        };

        fetchRoster();
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between mt-12">
            <section id="content" className="h-full w-full p-20">
                <section id="mission" className="p-8 bg-darkblue flex flex-col items-center justify-center w-full h-full">
                    <div className="w-full mt-8 mb-8">
                        <h1 className="text-xl md:text-2xl lg:text-3xl text-maize font-bold uppercase mb-2 mt-2 text-center sm:text-left">Roster</h1>
                    </div>
                    <table className="w-full bg-maize p-8 text-darkblue rounded-lg">
                        <thead className="font-bold text-xl text-left p-4">
                            <tr>
                                <th className="p-4">Player</th>
                                <th className="p-4">Position</th>
                                <th className="p-4">Year</th>
                                <th className="p-4">Division</th>
                            </tr>
                        </thead>
                        <tbody className="font-semibold text-md p-4">
                            {roster.map(player => (
                                <tr key={player.name} className="border-t border-darkblue">
                                    <td className="p-4 flex items-center">
                                        <Image
                                            src={player.picture}
                                            alt={player.name}
                                            width={30}
                                            height={30}
                                            className="rounded-full mr-4"
                                        />
                                        {player.name}
                                    </td>
                                    <td className="p-4">{player.position}</td>
                                    <td className="p-4">{player.year}</td>
                                    <td className="p-4">{player.division}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </section>
        </main>
    );
}
