export default function ContactForm(){
    return(
        <section id="join" className="p-8 bg-gradient-to-b from-maize to-darkblue flex flex-col md:flex-col items-center justify-center w-full h-full -z-50">
        <div className="flex justify-center px-2 w-full mx-2 md:mx-10">
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl lg:text-3xl text-darkblue font-bold uppercase mt-2 text-center p-8">Ready To Join The Fun?</h1>
            <p className="text-black mb-4 md:text-left text-sm">{"Whether you're a seasoned player or a complete beginner, we welcome you to be a part of our community. Check out our schedule for upcoming games and events, and don't hesitate to reach out if you have any questions. Let's kick off a new era of futsal and soccer at the University of Michigan together!"}</p>
            
            <form className="text-white">
              <div className="mb-4">
                <label className="block font-bold mb-2" htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="mb-4">
                <label className="block font-bold mb-2" htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="mb-4">
                <label className="block font-bold mb-2" htmlFor="email">Email</label>
                <input type="email" id="email" name="email" className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="mb-4 text-white">
                <label className="block text-white font-bold mb-2">Interests</label>
                <div className="flex flex-col">
                  <label><input type="checkbox" name="interests" value="learnMore" className="mr-2" />{"I'd like to know more about the club"}</label>
                  <label><input type="checkbox" name="interests" value="joinClub" className="mr-2" />{"I'm interested in joining"}</label>
                  <label><input type="checkbox" name="interests" value="sponsor" className="mr-2" />{"I'm interested in becoming a sponsor"}</label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-white font-bold mb-2" htmlFor="notes">Additional Notes</label>
                <textarea id="notes" name="notes" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Write your notes here..."></textarea>
              </div>
              <button type="submit" className="bg-maize text-darkblue px-4 py-2 rounded-md">Submit</button>
            </form>
          </div>
        </div>
      </section>
    );
}