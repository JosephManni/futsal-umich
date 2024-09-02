'use client'

import { useEffect, useState } from 'react';

export default function ContactForms() {
    const [contacts, setContacts] = useState([]);
    const [accessToken, setAccessToken] = useState(''); // Update this with your logic for getting the access token

    useEffect(() => {
        const fetchRoster = async () => {
            try {
                const response = await fetch('/api/admin/contact');
                const data = await response.json();
                
                // Check if the data body is a string, and parse it if necessary
                const contactsData = typeof data.body === 'string' ? JSON.parse(data.body) : data.body;
                
                setContacts(contactsData);
            } catch (error) {
                console.error('Failed to fetch roster:', error);
            }
        };

        fetchRoster();
    }, []);

    const handleTCOChange = async (email, newTCOValue) => {
        try {
            const response = await fetch(
                `https://q3f13mv0ag.execute-api.us-east-2.amazonaws.com/v1/contact`,
                {
                    method: 'PATCH',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache'
                    },
                    body: JSON.stringify({ email, TCO: newTCOValue })
                }
            );
            const result = await response.json();
            if (response.ok) {
                // Update the local state
                setContacts(contacts.map(contact =>
                    contact.email === email ? { ...contact, TCO: newTCOValue } : contact
                ));
                console.log('TCO updated successfully');
            } else {
                console.error('Failed to update TCO:', result);
            }
        } catch (error) {
            console.error('Error updating TCO:', error);
        }
    };
    

    return (
        <main className="flex min-h-screen flex-col items-center justify-between mt-12">
            <section id="content" className="h-full w-full p-20">
                <section id="contacts" className="p-8 bg-darkblue flex flex-col items-center justify-center w-full h-full">
                    <div className="w-full mt-8 mb-8">
                        <h1 className="text-xl md:text-2xl lg:text-3xl text-maize font-bold uppercase mb-2 mt-2 text-center sm:text-left">Contacts</h1>
                    </div>
                    <table className="w-full bg-white p-8 text-darkblue rounded-lg">
                        <thead className="font-bold text-xl text-left p-4">
                            <tr>
                                <th className="p-4">Email</th>
                                <th className="p-4">First Name</th>
                                <th className="p-4">Last Name</th>
                                <th className="p-4">Form</th>
                                <th className="p-4">Interest</th>
                                <th className="p-4">Notes</th>
                                <th className='p-4'>Date</th>
                                <th className='p-4'>TCO?</th>
                            </tr>
                        </thead>
                        <tbody className="font-semibold text-md p-4">
                            {contacts && contacts.map(contact => (
                                <tr key={contact.email} className="border-t border-darkblue">
                                    <td className="p-4">{contact.email}</td>
                                    <td className="p-4">{contact.firstName}</td>
                                    <td className="p-4">{contact.lastName}</td>
                                    <td className="p-4">{contact.type}</td>
                                    <td className="p-4">{contact.interest.join(', ')}</td>
                                    <td className="p-4 text-sm">{contact.notes}</td>
                                    <td className="p-4">{contact.time}</td>
                                    <td className="p-4">
                                        <select
                                            value={contact.TCO ? 'Yes' : 'No'}
                                            onChange={(e) => handleTCOChange(contact.email, e.target.value === 'Yes')}
                                        >
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
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
}
