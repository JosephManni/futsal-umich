'use client'

import { useEffect, useState } from 'react';

export default function ContactForms() {
    const [contacts, setContacts] = useState([]);

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
                                    <td className="p-4">{contact.notes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </section>
        </main>
    );
}
