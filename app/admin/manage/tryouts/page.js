'use client'

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
    const [roster, setRoster] = useState([]);
    const [currentUserRole, setCurrentUserRole] = useState('');

    useEffect(() => {
        const fetchRoster = async () => {
            try {
                const response = await fetch('/api/admin/roster');
                const data = await response.json();
                const filteredRoster = data.filter(person => person.signup_done === true);
    
                // Sort the roster by signup_time (earliest first)
                const sortedRoster = filteredRoster.sort((a, b) => new Date(a.signup_time) - new Date(b.signup_time));
                setRoster(sortedRoster);
            } catch (error) {
                console.error('Failed to fetch roster:', error);
            }
        };
    
        const fetchUserRole = async () => {
            try {
                const response = await fetch('/api/user'); // assuming an endpoint to fetch the current user's data
                const data = await response.json();
                setCurrentUserRole(data.role || '');
            } catch (error) {
                console.error('Failed to fetch user role:', error);
            }
        };
    
        fetchRoster();
        fetchUserRole();
    }, []);
    

    const handleUpdatePlayer = async (userId, field, value) => {
        try {
            const body = field === 'approved' ? { [field]: value === 'Approved' } : { [field]: value };
            const response = await fetch(`/api/admin/roster/updatePlayer?id=${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                const updatedPlayer = await response.json();
                setRoster(prevRoster =>
                    prevRoster.map(player =>
                        player.user_id === userId ? { ...player, [field]: value } : player
                    )
                );
            } else {
                console.error('Failed to update player:', await response.json());
            }
        } catch (error) {
            console.error('Failed to update player:', error);
        }
    };

    // Calculate counts for each section
    const getCountByDate = (date) => {
        return roster.filter(player => player.assigned_date === date).length;
    };

    const waitingCount = getCountByDate('Waiting for assignment.');
    const mondayCount = getCountByDate('Monday, Sept. 2: 7-9pm @ Hubbard');
    const wednesdayCount = getCountByDate('Wednesday, Sept. 4: 7-9pm @ Mitchell');

    return (
        <main className="flex min-h-screen flex-col items-center justify-between mt-12">
            <section id="content" className="h-full w-full p-20">
                <section id="manage-roster" className="p-8 bg-darkblue flex flex-col items-center justify-center w-full h-full -z-50">
                    <div className="w-full mt-8 mb-8">
                        <h1 className="text-xl md:text-2xl lg:text-3xl text-maize font-bold uppercase mb-2 mt-2 text-center sm:text-left">Tryout Signups</h1>
                        <div className="text-right mb-4">
                            <p className='text-white text-lg'>Waiting for assignment: <span className='text-maize'>{waitingCount}</span></p>
                            <p className='text-white text-lg'>Monday, Sept. 2: 7-9pm @ Hubbard: <span className='text-maize'>{mondayCount}</span></p>
                            <p className='text-white text-lg'>Wednesday, Sept. 4: 7-9pm @ Mitchell: <span className='text-maize'>{wednesdayCount}</span></p>
                        </div>
                    </div>
                    <table className="w-full bg-white p-8 text-darkblue rounded-lg">
                        <thead className="font-bold text-xl text-left p-4">
                            <tr>
                                <th className="p-4">Player</th>
                                <th className="p-4">Position</th>
                                <th className="p-4">Year</th>
                                <th className="p-4">Preferred Style</th>
                                <th className="p-4">Preferred Tryout Date</th>
                                <th className="p-4">Signup Time</th>
                                <th className="p-4">Assigned Tryout Date</th>
                            </tr>
                        </thead>
                        <tbody className="font-semibold text-md p-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {roster.map(player => (
                                <tr key={player.user_id} className="border-t border-darkblue">
                                    <td className="p-4 flex items-center">
                                        <Image
                                            src={player.picture}
                                            alt={player.name}
                                            width={30}
                                            height={30}
                                            className="rounded-full mr-4"
                                        />
                                        {`${player.name}`}
                                    </td>
                                    <td className="p-4">
                                        <p>{player.position}</p>
                                    </td>
                                    <td className="p-4">
                                        <p>{player.year}</p>
                                    </td>
                                    <td className="p-4">
                                        <p>{player.preferred_style}</p>
                                    </td>
                                    <td className="p-4">
                                        <p>{player.preferred_date}</p>
                                    </td>
                                    <td className="p-4">
                                        <p>{player.signup_time}</p>
                                    </td>
                                    <td className="p-4">
                                        <select
                                            value={player.assigned_date}
                                            onChange={(e) => handleUpdatePlayer(player.user_id, 'assigned_date', e.target.value)}
                                        >
                                            <option value="Waiting for assignment.">Waiting for assignment.</option>
                                            <option value="Monday, Sept. 2: 7-9pm @ Hubbard">Monday, Sept. 2: 7-9pm @ Hubbard</option>
                                            <option value="Wednesday, Sept. 4: 7-9pm @ Mitchell">Wednesday, Sept. 4: 7-9pm @ Mitchell</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </section>
        </main>
        );

    // return (
    //     <main className="flex min-h-screen flex-col items-center justify-between mt-12">
    //         <section id="content" className="h-full w-full p-20">
    //             <section id="manage-roster" className="p-8 bg-darkblue flex flex-col items-center justify-center w-full h-full -z-50">
    //                 <div className="w-full mt-8 mb-8">
    //                     <h1 className="text-xl md:text-2xl lg:text-3xl text-maize font-bold uppercase mb-2 mt-2 text-center sm:text-left">Tryout Signups</h1>
    //                     <div className="text-right mb-4">
    //                         <p className='text-white text-lg'>Waiting for assignment: <span className='text-maize'>{waitingCount}</span></p>
    //                         <p className='text-white text-lg'>Monday, Sept. 2: 7-9pm @ Hubbard: <span className='text-maize'>{mondayCount}</span></p>
    //                         <p className='text-white text-lg'>Wednesday, Sept. 4: 7-9pm @ Mitchell: <span className='text-maize'>{wednesdayCount}</span></p>
    //                     </div>
    //                 </div>
    //                 <table className="w-full bg-white p-8 text-darkblue rounded-lg">
    //                     <thead className="font-bold text-xl text-left p-4">
    //                         <tr>
    //                             <th className="p-4">Player</th>
    //                             <th className="p-4">Position</th>
    //                             <th className="p-4">Year</th>
    //                             <th className="p-4">Preferred Style</th>
    //                             <th className="p-4">Preferred Tryout Date</th>
    //                             <th className="p-4">Signup Time</th>
    //                             <th className="p-4">Assigned Tryout Date</th>
    //                         </tr>
    //                     </thead>
    //                     <tbody className="font-semibold text-md p-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
    //                         {roster.map(player => (
    //                             <tr key={player.user_id} className="border-t border-darkblue">
    //                                 <td className="p-4 flex items-center">
    //                                     <Image
    //                                         src={player.picture}
    //                                         alt={player.name}
    //                                         width={30}
    //                                         height={30}
    //                                         className="rounded-full mr-4"
    //                                     />
    //                                     {`${player.name}`}
    //                                 </td>
    //                                 <td className="p-4">
    //                                     <select
    //                                         disabled
    //                                         value={player.position}
    //                                         onChange={(e) => handleUpdatePlayer(player.user_id, 'position', e.target.value)}
    //                                     >
    //                                         <option value="GK">GK</option>
    //                                         <option value="D">D</option>
    //                                         <option value="P">P</option>
    //                                         <option value="W">W</option>
    //                                     </select>
    //                                 </td>
    //                                 <td className="p-4">
    //                                     <select
    //                                         disabled
    //                                         value={player.year}
    //                                         onChange={(e) => handleUpdatePlayer(player.user_id, 'year', e.target.value)}
    //                                     >
    //                                         <option value="FR">FR</option>
    //                                         <option value="SO">SO</option>
    //                                         <option value="JR">JR</option>
    //                                         <option value="SR">SR</option>
    //                                     </select>
    //                                 </td>
    //                                 <td className="p-4">
    //                                     <select
    //                                         disabled
    //                                         value={player.preferred_style}
    //                                         onChange={(e) => handleUpdatePlayer(player.user_id, 'preferred_style', e.target.value)}
    //                                     >
    //                                         <option value="Recreation">Recreational</option>
    //                                         <option value="Competitive">Competitive</option>
    //                                     </select>
    //                                 </td>
    //                                 <td className="p-4">
    //                                     <select
    //                                         disabled
    //                                         value={player.preferred_date}
    //                                         onChange={(e) => handleUpdatePlayer(player.user_id, 'preferred_date', e.target.value)}
    //                                     >
    //                                         <option value="Monday, Sept. 2: 7-9pm @ Hubbard">Monday, Sept. 2: 7-9pm @ Hubbard</option>
    //                                         <option value="Wednesday, Sept. 4: 7-9pm @ Mitchell">Wednesday, Sept. 4: 7-9pm @ Mitchell</option>
    //                                     </select>
    //                                 </td>
    //                                 <td className="p-4">
    //                                     <p>{player.signup_time}</p>
    //                                 </td>

    //                                 <td className="p-4">
    //                                     <select
    //                                         value={player.assigned_date}
    //                                         onChange={(e) => handleUpdatePlayer(player.user_id, 'assigned_date', e.target.value)}
    //                                     >
    //                                         <option value="Waiting for assignment.">Waiting for assignment.</option>
    //                                         <option value="Monday, Sept. 2: 7-9pm @ Hubbard">Monday, Sept. 2: 7-9pm @ Hubbard</option>
    //                                         <option value="Wednesday, Sept. 4: 7-9pm @ Mitchell">Wednesday, Sept. 4: 7-9pm @ Mitchell</option>
    //                                     </select>
    //                                 </td>
    //                             </tr>
    //                         ))}
    //                     </tbody>
    //                 </table>
    //             </section>
    //         </section>
    //     </main>
    // );
}
