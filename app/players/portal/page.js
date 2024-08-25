'use client';

import { act, useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

// Tabs component to handle tab switching
const Tabs = ({ activeTab, setActiveTab }) => {
    return (
        <div className="flex flex-col w-full md:w-1/4 p-4 bg-gray-100 pt-20">
            <button
                className={`p-2 text-left ${activeTab === 'profile' ? 'bg-darkblue text-white' : 'text-darkblue'}`}
                onClick={() => setActiveTab('profile')}
            >
                My Profile
            </button>
            <button
                className={`p-2 text-left ${activeTab === 'waivers' ? 'bg-darkblue text-white' : 'text-darkblue'}`}
                onClick={() => setActiveTab('waivers')}
            >
                Waivers
            </button>
            <button
                className={`p-2 text-left ${activeTab === 'tryouts' ? 'bg-darkblue text-white' : 'text-darkblue'}`}
                onClick={() => setActiveTab('tryouts')}
            >
                Tryouts
            </button>
        </div>
    );
};

// Main Player Portal component
export default function PlayerPortal() {
    const [activeTab, setActiveTab] = useState('profile');
    const [userInfo, setUserInfo] = useState(null);
    const [signedName, setSignedName] = useState("");
    const { user } = useUser();

    useEffect(() => {
        // Fetch user information from the /api/user endpoint
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('/api/user');
                const data = await response.json();
                setUserInfo(data);
                // setWaiverSigned(data.waiver);
            } catch (error) {
                console.error('Failed to fetch user info:', error);
            }
        };

        fetchUserInfo();
    }, []);

    const handleUpdateUser = async (field, value) => {
        try {
            const response = await fetch(`/api/user/update?id=${user.sub}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ [field]: value }),
            });
    
            if (response.ok) {
                // Update the local userInfo state with the new value
                setUserInfo((prev) => ({ ...prev, [field]: value }));
            } else {
                console.error('Failed to update user:', await response.json());
            }
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };    

    const handleSignWaiver = () => {
        handleUpdateUser('waiver', true);
    };

    return (
        <main className="flex flex-col items-center justify-between">
            <section id="content" className="h-full w-full p-4 md:p-20 flex flex-col md:flex-row">
                <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="w-full md:w-3/4 p-4 md:p-8 bg-white flex flex-col items-center justify-center">
                    <h1 className="text-xl md:text-2xl lg:text-3xl text-darkblue font-bold uppercase mb-4 text-center">{activeTab}</h1>

                    {activeTab === 'profile' && userInfo && (
                        <div className="w-full">
                            {/* <h2 className="text-lg font-semibold mb-4 text-maize">My Information</h2> */}
                            <div className="mb-4">
                                <label className="block font-bold mb-2 text-darkblue">Name</label>
                                <input type="text" className="w-full p-2 border border-gray-300 rounded-md text-black" value={userInfo.name} disabled />
                            </div>
                            <div className="mb-4">
                                <label className="block font-bold mb-2 text-darkblue">Date of Birth</label>
                                <input type="text" className="w-full p-2 border border-gray-300 rounded-md text-black" value={userInfo.dob} disabled />
                            </div>
                            <div className="mb-4">
                                <label className="block font-bold mb-2 text-darkblue">UMID</label>
                                <input type="text" className="w-full p-2 border border-gray-300 rounded-md text-black" value={userInfo.umid} disabled />
                            </div>
                            <div className="mb-4">
                                <label className="block font-bold mb-2 text-darkblue">Position</label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded-md text-black"
                                    value={userInfo.position}
                                    onChange={(e) => handleUpdateUser('position', e.target.value)}
                                >
                                    <option value="GK">GK</option>
                                    <option value="D">D</option>
                                    <option value="P">P</option>
                                    <option value="W">W</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block font-bold mb-2 text-darkblue">Year</label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded-md text-black"
                                    value={userInfo.year}
                                    onChange={(e) => handleUpdateUser('year', e.target.value)}
                                >
                                    <option value="FR">FR</option>
                                    <option value="SO">SO</option>
                                    <option value="JR">JR</option>
                                    <option value="SR">SR</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block font-bold mb-2 text-darkblue">Division</label>
                                <input type="text" className="w-full p-2 border border-gray-300 rounded-md text-black" value={userInfo.division} disabled />
                            </div>
                            <div className="mb-4">
                                <label className="block font-bold mb-2 text-darkblue">Roster Status</label>
                                <input type="text" className="w-full p-2 border border-gray-300 rounded-md text-black" value={userInfo.approved ? 'Approved' : 'Pending'} disabled />
                            </div>
                        </div>
                    )}

                    {activeTab === 'waivers' && (
                        <div className="w-full">
                            {/* <h2 className="text-lg font-semibold mb-4">My Waivers</h2> */}
                            {userInfo.waiver ? (
                                <div className="flex flex-col items-center">
                                    <p className="mb-4 text-green-500">Your response has been recorded. Thank you!</p>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <p className="mb-4 text-red-500">You must sign the participation waiver before participating in club-related activities.</p>
                                    <p className='text-darkblue text-md'>{"I understand that my participation in the Program/Event is voluntary and that as a condition of my participation, I agree to comply with all Program/Event requirements including, but not limited to:"}</p>
                                    <ul className='text-darkblue text-md mt-2'>
                                        <li>{"(a) accurately completing all registration forms in a timely manner;"}</li>
                                        <li>{"(b) ensuring compliance with the Program/Event standards of conduct;"}</li>
                                        <li>{"(c) and immediately notifying the Program Administrator of any concerns related to the health, safety or security of myself, other participants, or Program/Event staff."}</li>
                                    </ul>
                                    <p className='text-darkblue text-md mt-2'>{"I understand that as part of my participation in the Program/Event that there are dangers, hazards and inherent risks to which I may be exposed, including the risk of serious physical injury, temporary or permanent disability, and death, as well as economic and property loss.  I further realize that participating in the Program/Event may involve risks and dangers, both known and unknown, and that I have chosen to take part in the Program/Event.  Therefore I have determined that it is reasonable to accept all risk of injury, loss of life or damage to property arising out of training, preparing, participating and traveling to or from the Program/Event and I do voluntarily accept and assume those risks."}</p>
                                    <p className='text-darkblue text-md mt-2'>{"I understand and acknowledge that this Program/Event is neither sponsored nor endorsed by the University of Michigan; as a result, the University of Michigan makes no assertions as to the oversight and safety of the Program/Event activities."}</p>
                                    <p className='text-darkblue text-md mt-2'>{"I release the Regents of the University of Michigan and University of Michigan Recreational Sports and all officers, directors, employees, volunteers and agents from any claims or liability arising from my participation in the Program/Event, provided that such claim is not due to the gross and sole negligence of the released parties.  I also agree to indemnify the Regents of the University of Michigan and University of Michigan Recreational Sports from any financial obligations or liabilities that I may cause while participating in the Program/Event."}</p>                                                                  
                                    <p className='text-darkblue text-md mt-2'>{"This Agreement is governed by and construed under the laws of the State of Michigan without regard for principles of choice of law.  Any claims, demands, or actions arising under this Agreement must be brought in the Michigan Court of Claims or a court with applicable subject matter jurisdiction sitting in the state of Michigan and I consent to the jurisdiction of a Michigan court with appropriate subject matter jurisdiction.  I agree that the terms and conditions of this Agreement are binding on my representatives, heirs and assigns."}</p>

                                    <label className="font-bold mt-10 mb-2 text-darkblue items-start">Sign your name ({user.name})</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded-md text-black"
                                        value={signedName}
                                        onChange={(e) => setSignedName(e.target.value)}
                                    />

                                    <button
                                        className={`bg-maize text-darkblue px-4 py-2 rounded-md mt-4 ${signedName !== user.name ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        onClick={handleSignWaiver}
                                        disabled={signedName !== user.name} // Disable the button if names do not match
                                    >
                                        I have read, understand, and agree to the terms of this waiver.
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'tryouts' && (
                        <div className="w-full">
                            <h2 className="text-sm font-semibold mb-4 text-darkblue">Session information will be available shortly.</h2>
                            <button className="bg-maize text-darkblue px-4 py-2 rounded-md cursor-not-allowed" disabled>Sign Up</button>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
