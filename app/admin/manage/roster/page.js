'use client'

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { SiCheckmarx } from 'react-icons/si';
import { FaRegCircleXmark } from "react-icons/fa6";

export default function Home() {
    const [roster, setRoster] = useState([]);
    const [currentUserRole, setCurrentUserRole] = useState('');
    const [summary, setSummary] = useState({
        totalActiveAccounts: 0,
        totalApprovedREC: 0,
        totalApprovedCOMP: 0,
        totalSignedUpForTryouts: 0,
    });

    // Fetch the roster and the current user's role
    useEffect(() => {
        const fetchRoster = async () => {
            try {
                const response = await fetch('/api/admin/roster');
                const data = await response.json();
                setRoster(data);

                // Update summary information
                updateSummary(data);
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

    // Function to update the summary information
    const updateSummary = (data) => {
        const totalActiveAccounts = data.length;
        const totalApprovedREC = data.filter(player => player.division === 'REC' && player.approved === 'Approved').length;
        const totalApprovedCOMP = data.filter(player => player.division === 'COMP' && player.approved === 'Approved').length;
        const totalSignedUpForTryouts = data.filter(player => player.signup_done).length;

        setSummary({
            totalActiveAccounts,
            totalApprovedREC,
            totalApprovedCOMP,
            totalSignedUpForTryouts,
        });
    };

    // Function to handle updates to the player
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
                updateSummary(prevRoster.map(player =>
                    player.user_id === userId ? { ...player, [field]: value } : player
                ));
            } else {
                console.error('Failed to update player:', await response.json());
            }
        } catch (error) {
            console.error('Failed to update player:', error);
        }
    };

    // Function to convert roster data to CSV
    const convertToCSV = (data) => {
        const header = ["Player Name", "Email", "Waiver", "Position", "Year", "Division", "Role", "Roster Status", "Signed Up for Tryouts"];
        const rows = data.map(player => [
            player.name,
            player.email,
            player.waiver ? 'Done' : 'Incomplete',
            player.position,
            player.year,
            player.division,
            player.role,
            player.approved,
            player.signup_done ? 'Yes' : 'No'
        ]);

        const csvContent = [header, ...rows].map(e => e.join(",")).join("\n");
        return csvContent;
    };

    // Function to handle exporting to CSV
    const handleExportToCSV = () => {
        const csv = convertToCSV(roster);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'roster.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between mt-12">
            <section id="content" className="h-full w-full p-20">
                <section id="manage-roster" className="p-8 bg-darkblue flex flex-col items-center justify-center w-full h-full -z-50">
                    <div className="w-full flex justify-between items-start">
                        <h1 className="text-xl md:text-2xl lg:text-3xl text-maize font-bold uppercase mb-2 mt-2 text-center sm:text-left">Roster</h1>
                        <div className="text-white text-lg font-semibold flex flex-col items-end">
                            <div className="mb-2">
                                <strong>Total Active Accounts:</strong> {summary.totalActiveAccounts}
                            </div>
                            <div className="mb-2">
                                <strong>Total Approved REC:</strong> {summary.totalApprovedREC}
                            </div>
                            <div className="mb-2">
                                <strong>Total Approved COMP:</strong> {summary.totalApprovedCOMP}
                            </div>
                            <div className="mb-2">
                                <strong>Total Signed Up for Tryouts:</strong> {summary.totalSignedUpForTryouts}
                            </div>
                            <button 
                                onClick={handleExportToCSV}
                                className="mt-4 px-4 py-2 bg-yellow-500 text-darkblue rounded hover:bg-yellow-600"
                            >
                                Export to CSV
                            </button>
                        </div>
                    </div>
                    <table className="w-full bg-white p-8 text-darkblue rounded-lg mt-8">
                        <thead className="font-bold text-xl text-left p-4">
                            <tr>
                                <th className="p-4">Player</th>
                                <th className="p-4">Waiver</th>
                                <th className="p-4">Position</th>
                                <th className="p-4">Year</th>
                                <th className="p-4">Division</th>
                                <th className="p-4">Role</th>
                                <th className="p-4">Roster Status</th>
                                <th className="p-4">Signed Up for Tryouts</th>
                            </tr>
                        </thead>
                        <tbody className="font-semibold text-md p-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {roster.map(player => (
                                <tr key={player.user_id} className="border-t border-darkblue">
                                    <td className="p-4 flex items-center">
                                        <Image
                                            src={player.picture ? player.picture : "/logo.jpg"}
                                            alt={player.name}
                                            width={30}
                                            height={30}
                                            className="rounded-full mr-4"
                                        />
                                        {`${player.name}`}
                                        <br/>
                                        {`${player.email}`}
                                    </td>
                                    <td className="p-4">
                                        {player.waiver ? <SiCheckmarx className='text-green-500 h-8 w-8'/> : <FaRegCircleXmark className='text-red-500 h-8 w-8'/>}
                                    </td>
                                    <td className="p-4">
                                        <select
                                            value={['GK', 'D', 'P', 'W'].includes(player.position) ? player.position : 'Incomplete'}
                                            onChange={(e) => handleUpdatePlayer(player.user_id, 'position', e.target.value)}
                                        >
                                            <option value="Incomplete">Incomplete</option>
                                            <option value="GK">GK</option>
                                            <option value="D">D</option>
                                            <option value="P">P</option>
                                            <option value="W">W</option>
                                        </select>
                                    </td>
                                    <td className="p-4">
                                        <select
                                            value={['FR', 'SO', 'JR', 'SR', 'GR'].includes(player.year) ? player.year : 'Incomplete'}
                                            onChange={(e) => handleUpdatePlayer(player.user_id, 'year', e.target.value)}
                                        >
                                            <option value="Incomplete">Incomplete</option>
                                            <option value="FR">FR</option>
                                            <option value="SO">SO</option>
                                            <option value="JR">JR</option>
                                            <option value="SR">SR</option>
                                            <option value="GR">GR</option>
                                        </select>
                                    </td>
                                    <td className="p-4">
                                        <select
                                            value={['REC', 'COMP', 'PENDING'].includes(player.division) ? player.division : 'Incomplete'}
                                            onChange={(e) => handleUpdatePlayer(player.user_id, 'division', e.target.value)}
                                        >
                                            <option value="Incomplete">Incomplete</option>
                                            <option value="REC">REC</option>
                                            <option value="COMP">COMP</option>
                                            <option value="PENDING">PENDING</option>
                                        </select>
                                    </td>
                                    <td className="p-4">
                                        {currentUserRole === 'webmaster' ? (
                                            <select
                                                value={['webmaster', 'admin', 'player'].includes(player.role) ? player.role : 'Incomplete'}
                                                onChange={(e) => handleUpdatePlayer(player.user_id, 'role', e.target.value)}
                                            >
                                                <option value="Incomplete">Incomplete</option>
                                                <option value="webmaster">Webmaster</option>
                                                <option value="admin">Admin</option>
                                                <option value="player">Player</option>
                                            </select>
                                        ) : (
                                            player.role
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <select
                                            value={['Approved', 'Waiting Approval'].includes(player.approved) ? player.approved : 'Incomplete'}
                                            onChange={(e) => handleUpdatePlayer(player.user_id, 'approved', e.target.value)}
                                        >
                                            <option value="Incomplete">Incomplete</option>
                                            <option value="Approved">Approved</option>
                                            <option value="Waiting Approval">Waiting Approval</option>
                                        </select>
                                    </td>
                                    <td className="p-4">
                                        {player.signup_done ? 'Yes' : 'No'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </section>
        </main>
    );
}
