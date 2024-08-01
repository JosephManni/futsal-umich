"use client";

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    interests: [],
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => {
        if (checked) {
          return { ...prevData, interests: [...prevData.interests, value] };
        } else {
          return { ...prevData, interests: prevData.interests.filter((interest) => interest !== value) };
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('https://q3f13mv0ag.execute-api.us-east-2.amazonaws.com/v1/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      alert('Form submitted successfully!');
    } else {
      alert('Error submitting form.');
    }
  };

  return (
    <section id="join" className="p-8 bg-gradient-to-b from-maize to-darkblue flex flex-col md:flex-col items-center justify-center w-full h-full -z-50">
      <div className="flex justify-center px-2 w-full mx-2 md:mx-10">
        <div className="flex flex-col">
          <h1 className="text-xl md:text-2xl lg:text-3xl text-darkblue font-bold uppercase mt-2 text-center p-8">Ready To Join The Fun?</h1>
          <p className="text-black mb-4 md:text-left text-sm">{"Whether you're a seasoned player or a complete beginner, we welcome you to be a part of our community. Check out our schedule for upcoming games and events, and don't hesitate to reach out if you have any questions. Let's kick off a new era of futsal and soccer at the University of Michigan together!"}</p>
          
          <form className="text-white" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-bold mb-2" htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" name="firstName" className="w-full p-2 border border-gray-300 rounded-md text-black" value={formData.firstName} onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label className="block font-bold mb-2" htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" name="lastName" className="w-full p-2 border border-gray-300 rounded-md text-black" value={formData.lastName} onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label className="block font-bold mb-2" htmlFor="email">Email</label>
              <input type="email" id="email" name="email" className="w-full p-2 border border-gray-300 rounded-md text-black" value={formData.email} onChange={handleChange} />
            </div>
            <div className="mb-4 text-white">
              <label className="block text-white font-bold mb-2">Interests</label>
              <div className="flex flex-col">
                <label>
                  <input type="checkbox" name="interests" value="learnMore" className="mr-2" checked={formData.interests.includes('learnMore')} onChange={handleChange} />
                  {"I'd like to know more about the club"}
                </label>
                <label>
                  <input type="checkbox" name="interests" value="joinClub" className="mr-2" checked={formData.interests.includes('joinClub')} onChange={handleChange} />
                  {"I'm interested in joining"}
                </label>
                <label>
                  <input type="checkbox" name="interests" value="sponsor" className="mr-2" checked={formData.interests.includes('sponsor')} onChange={handleChange} />
                  {"I'm interested in becoming a sponsor"}
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-white font-bold mb-2" htmlFor="notes">Additional Notes</label>
              <textarea id="notes" name="notes" className="w-full p-2 border border-gray-300 rounded-md text-black" placeholder="Write your notes here..." value={formData.notes} onChange={handleChange}></textarea>
            </div>
            <button type="submit" className="bg-maize text-darkblue px-4 py-2 rounded-md">Submit</button>
          </form>
        </div>
      </div>
    </section>
  );
}
