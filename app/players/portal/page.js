'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { SiCheckmarx } from 'react-icons/si';

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
    const [tempUMID, setTempUMID] = useState(''); // Temporary state for UMID input
    const [signedName, setSignedName] = useState("");
    const { user, error, isLoading } = useUser();

    useEffect(() => {
        // Fetch user information from the /api/user endpoint
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('/api/user');
                const data = await response.json();
                setUserInfo(data);
                setTempUMID(data.umid); // Initialize temporary state with fetched data
            } catch (error) {
                console.error('Failed to fetch user info:', error);
            }
        };

        fetchUserInfo();
    }, []);

    useEffect(() => {
        // Debounce UMID update
        const delayDebounceFn = setTimeout(() => {
            if (tempUMID !== userInfo?.umid) {
                handleUpdateUser('umid', tempUMID);
            }
        }, 300); // 300ms delay

        return () => clearTimeout(delayDebounceFn);
    }, [tempUMID, userInfo?.umid]);

    const handleUpdateUser = async (field, value) => {
        if(user){
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
        }
    };

    const handleSignWaiver = () => {
        handleUpdateUser('waiver', true);
    };

    const handleSignup = () => {
        const now = new Date();
        
        // Ensure userInfo has default values for preferred_style and preferred_date
        const updatedUserInfo = {
            ...userInfo,
            preferred_style: (!userInfo.preferred_style || userInfo.preferred_style === "None") ? "Competitive" : userInfo.preferred_style,
            preferred_date: userInfo.preferred_date || "Monday, Sept. 2: 7-9pm @ Hubbard",
        };

        handleUpdateUser('signup_done', true);
        handleUpdateUser('signup_time', now.toLocaleString());
        handleUpdateUser('preferred_style', updatedUserInfo.preferred_style);
        handleUpdateUser('preferred_date', updatedUserInfo.preferred_date);
    };

    if (isLoading) return <div className='text-maize'>Loading...</div>;
    if (error) return <div className='text-maize'>{error.message}</div>;
    
    return (
        <main className="flex flex-col items-center justify-between">
            <section id="content" className="h-full w-full p-4 md:p-20 flex flex-col md:flex-row">
                <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="w-full md:w-3/4 p-4 md:p-8 bg-white flex flex-col items-center justify-center">
                    <h1 className="text-xl md:text-2xl lg:text-3xl text-darkblue font-bold uppercase mb-4 text-center">{activeTab}</h1>

                    {activeTab === 'profile' && userInfo && (
                        <div className="w-full">
                            <div className="mb-4">
                                <label className="block font-bold mb-2 text-darkblue">Name</label>
                                <input type="text" className="w-full p-2 border border-gray-300 rounded-md text-black" value={userInfo.name} disabled />
                            </div>
                            <div className="mb-4">
                                <label className="block font-bold mb-2 text-darkblue">Date of Birth</label>
                                <input type="date" className="w-full p-2 border border-gray-300 rounded-md text-black" value={userInfo.dob} onChange={(e) => handleUpdateUser('dob', e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label className="block font-bold mb-2 text-darkblue">UMID</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-md text-black"
                                    value={tempUMID}
                                    onChange={(e) => setTempUMID(e.target.value)} // Update temporary state
                                />
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
                                    <option value="GR">GR</option>
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
                            {userInfo.waiver ? (
                                <div className="flex flex-col items-center">
                                    <p className="mb-4 text-green-500">Your response has been recorded. Thank you!</p>
                                    <SiCheckmarx className="text-6xl text-green-500" />
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
                        {!process.env.NEXT_PUBLIC_TRYOUTS_LIVE ? (
                        <>
                            <h2 className="text-sm font-semibold mb-4 text-darkblue">
                            Session information will be available shortly.
                            </h2>
                            <button className="bg-maize text-darkblue px-4 py-2 rounded-md cursor-not-allowed" disabled>
                            Sign Up
                            </button>
                        </>
                        ) : (
                        <>
                            <div className="flex flex-col items-left">
                                    {!userInfo.waiver && 
                                        <div className='flex flex-col items-center'>
                                            <p className="mb-4 text-red-500">You must sign the participation waiver before participating in club-related activities.</p>
                                        </div>
                                    }
                                    {userInfo.signup_done &&
                                        <div className="">
                                            <p className="mb-4 text-green-500 items-center flex flex-col">Your response has been recorded. Thank you!</p>
                                            <div className='flex flex-col items-center'>
                                            <SiCheckmarx className="text-6xl text-green-500 mb-8" />
                                            </div>
                                            <p className='text-darkblue text-md'>{"Tryouts will be held across 3 dates. The first two days are outdoors and the final cuts are indoors."}</p>
                                            <ul className='text-darkblue text-md mt-6'>
                                                <li className='font-bold'>Dates:</li>
                                                <li>{"*1st day (outdoor) Monday, September 2: 7-9 PM @HUBBARD"}</li>
                                                <li>{"*2nd day (outdoor) Wednesday, September 4: 7-9 PM @MITCHELL"}</li>
                                                <li>{"**Final Cuts (indoor) Friday, September 6: 5-7 PM @COLISEUM"}</li>
                                            </ul>
                                            <p className='text-darkblue text-md mt-6'>Tryouts are <span className='italic'>free</span> and everyone who registers will be given a chance to tryout</p>
                                            {/* <p className='text-darkblue text-md mt-2'>However, your preference <span className='italic font-semibold'>does not guarantee</span> you that time slot (first come first serve)</p> */}
                                            <p className='text-darkblue text-md mt-2'>{"If you have a time conflict, please let us know in additional comments & we will try to work it through"}</p>                                                                  
                                            <p className='text-darkblue text-md mt-2'>{"Arrive 10-15 minutes early to warmup & get organized"}</p>

                                         <div className="flex flex-col items-start mt-6">
                                                <h1 className="mb-4 text-darkblue font-semibold">Submission details</h1>
                                                <p className="text-darkblue text-md">
                                                    <span className="font-bold">Preferred Style: </span>
                                                    {userInfo.preferred_style}
                                                </p>
                                                <p className="text-darkblue text-md">
                                                    <span className="font-bold">Completed on: </span>
                                                    {userInfo.signup_time}
                                                </p>
                                                {/* <p className="text-darkblue text-md mt-2">
                                                    <span className="font-bold">Preferred Session: </span>
                                                    {userInfo.preferred_date}
                                                </p>
                                                <p className="text-darkblue text-md mt-2">
                                                    <span className="font-bold">Assigned Session: </span>
                                                    {userInfo.assigned_date}
                                                </p> */}
                                                </div>
                                        </div>
                                    }
                                    {userInfo.waiver && !userInfo.signup_done &&
                                    <div>
                                    <p className='text-darkblue text-md'>{"Tryouts will be held across 3 dates. The first two days are outdoors and the final cuts are indoors."}</p>
                                    
                                    <ul className='text-darkblue text-md mt-6'>
                                        <li className='font-bold'>Dates:</li>
                                        <li>{"*1st day (outdoor) Monday, September 2: 7-9 PM @HUBBARD"}</li>
                                        <li>{"*2nd day (outdoor) Wednesday, September 4: 7-9 PM @MITCHELL"}</li>
                                        <li>{"**Final Cuts (indoor) Friday, September 6: 5-7 PM @COLISEUM"}</li>
                                    </ul>
                                    <p className='text-darkblue text-md mt-6'>Tryouts are <span className='italic'>free</span> and everyone who registers will be given a chance to tryout</p>
                                    {/* <p className='text-darkblue text-md mt-2'>However, your preference <span className='italic font-semibold'>does not guarantee</span> you that time slot (first come first serve)</p> */}
                                    <p className='text-darkblue text-md mt-2'>{"If you have a time conflict, please let us know in additional comments & we will try to work it through"}</p>                                                                  
                                    <p className='text-darkblue text-md mt-2'>{"Arrive 10-15 minutes early to warmup & get organized"}</p>

                                    <div className="mb-4 mt-6">
                                        <label className="block font-bold mb-2 text-darkblue">Preferred Style</label>
                                        <select
                                            className="w-full p-2 border border-gray-300 rounded-md text-black"
                                            value={userInfo.preferred_style || "Competitive"}
                                            onChange={(e) => handleUpdateUser('preferred_style', e.target.value)}
                                        >
                                            <option value="Competitive">Competitive</option>
                                            <option value="Recreational">Recreational</option>
                                            <option value="No Preference">No Preference</option>
                                        </select>
                                    </div>
                                    {/* <div className="mb-4">
                                        <label className="block font-bold mb-2 text-darkblue">Preferred Session</label>
                                        <select
                                            className="w-full p-2 border border-gray-300 rounded-md text-black"
                                            value={userInfo.preferred_date || "Monday, Sept. 2: 7-9pm @ Hubbard"}
                                            onChange={(e) => handleUpdateUser('preferred_date', e.target.value)}
                                        >
                                            <option value="Monday, Sept. 2: 7-9pm @ Hubbard">Monday, Sept. 2: 7-9pm @ Hubbard</option>
                                            <option value="Wednesday, Sept. 4: 7-9pm @ Mitchell">Wednesday, Sept. 4: 7-9pm @ Mitchell</option>
                                        </select>
                                    </div> */}
                                    
                                    <button
                                        className={`bg-maize text-darkblue px-4 py-2 rounded-md mt-4`}
                                        onClick={handleSignup}
                                    >
                                        Sign Me Up!
                                    </button>
                                    </div>
                                    }
                                </div>
                        </>
                        )}
                    </div>
                    )}

                </div>
            </section>
        </main>
    );
}
