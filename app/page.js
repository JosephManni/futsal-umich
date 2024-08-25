'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import ContactForm from "@/components/contact-form";
import Link from "next/link";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Set loaded to true after a delay to simulate loading
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
      <main className="flex min-h-screen flex-col items-center justify-between">
        <section id="home" className="relative w-full h-66 -z-50">
          <Image 
            src="/team-flick.jpg" 
            alt="Club Futsal at the University of Michigan" 
            width={1728} 
            height={972} 
            className="w-full h-66" 
          />
        </section>

        <section id="content" className="h-full w-full">
          
          <section id="mission" className="p-8 bg-darkblue flex flex-row md:flex-row items-center justify-center w-full h-full -z-50">
            <div className="flex justify-center md:justify-start w-full md:w-1/2 mx-4 md:mx-10">
              <div className="flex flex-col">
                <h1 className="text-xl md:text-2xl lg:text-3xl text-maize font-bold uppercase mb-2 mt-2 md:text-left">Our Mission</h1>
                <p className="text-white text-sm md:text-md lg:text-lg md:text-left mt-10">
                  Our mission is to provide a fun, safe, and inclusive environment where the University of Michigan students can share a passion for futsal and soccer while team building with fellow Wolverines.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
              <Image src="/logo.jpg" alt="Club Futsal at the University of Michigan" width={280} height={280} />
            </div>
          </section>

          <section id="activities" className="p-8 bg-gradient-to-b from-maize to-darkblue -z-50">
            <h2 className="text-xl md:text-2xl lg:text-3xl uppercase font-bold text-center text-darkblue mb-8">Club Activities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

            <div className="bg-darkblue shadow-md rounded-lg p-6">
              <Image src="/court.svg" alt="Activity 1" className="w-20 h-20 object-cover mb-4 mx-auto rounded-lg" width={20} height={20} style={{ filter: 'invert(100%)' }} />
              <h3 className="text-maize text-xl font-semibold mb-2">Scrimmages</h3>
              <p className="text-white mb-4">Join us for friendly scrimmages to improve your skills and connect with fellow club members.</p>
              {/* <a href="#" className="block text-center bg-maize text-darkblue px-4 py-2 rounded-lg">Learn More</a> */}
            </div>


            <div className="bg-darkblue shadow-md rounded-lg p-6">
              <Image src="/bracket.svg" alt="Activity 1" className="w-20 h-20 object-cover mb-4 mx-auto rounded-lg" width={20} height={20} style={{ filter: 'invert(100%)' }} />
              <h3 className="text-maize text-xl font-semibold mb-2">Tournaments</h3>
              <p className="text-white mb-4">Test your skills, teamwork, and sportsmanship in competitive tournaments around the midwest.</p>
              {/* <a href="#" className="block text-center bg-maize text-darkblue px-4 py-2 rounded-lg">Learn More</a> */}
            </div>

            <div className="bg-darkblue shadow-md rounded-lg p-6 pb-10">
              <Image src="/people.svg" alt="Activity 1" className="w-20 h-20 object-cover mb-4 mx-auto rounded-lg" width={20} height={20} style={{ filter: 'invert(100%)' }} />
              <h3 className="text-maize text-xl font-semibold mb-2">Social Events</h3>
              <p className="text-white mb-4">Connect with other club members and student organizations off the court through various social events.</p>
              {/* <a href="#" className="block text-center bg-maize text-darkblue px-4 py-2 rounded-lg">Learn More</a> */}
            </div>

            </div>
          </section>

          <section id="sections" className="p-8 bg-darkblue flex flex-row md:flex-row items-center justify-center w-full h-full -z-50">
            <div className="flex justify-center md:justify-start w-full mx-4 md:mx-10">
              <div className="flex flex-col">
              <h1 className="md:hidden text-xl md:text-2xl lg:text-3xl text-maize font-bold uppercase mb-2 mt-2 p-8 mx-auto">
              Special Teams. <br/> Special Plays. <br/> Special Players. ☝️
              </h1>
              <h1 className="hidden md:block text-xl md:text-2xl lg:text-3xl text-maize font-bold uppercase mb-2 mt-2 md:text-left p-8 mx-auto">
                Special Teams &nbsp;•&nbsp; Special Plays &nbsp;•&nbsp; Special Players
              </h1>



                <p className="text-white text-lg md:text-xl lg:text-2xl md:text-left bold">
                We offer both competitive and non-competitive sections to cater to a diverse range of interests and skill levels. 
                </p>

                <p className="text-white text-md md:text-lg lg:text-xl md:text-left mt-10 mb-10">
                For those seeking a more intense challenge and the thrill of competition, our <span className="text-maize mt-10">competitive section</span> provides opportunities to test your skills against other players in various tournaments and matches. 
                </p>

                <p className="text-white text-md md:text-lg lg:text-xl md:text-left mb-10">
                For those seeking a platform for skill development and team building, our <span className="text-maize mt-10">non-competitive</span> offers a relaxed and supportive environment where players can hone their abilities and gain confidence, preparing them for competitive play. 
                </p>
              </div>
            </div>
          </section>

          <section id="leadership" className="p-8 bg-white flex flex-row md:flex-row items-center justify-center w-full h-full -z-50">
            <div className="flex justify-center md:justify-start w-full mx-4 md:mx-10">
              <div className="flex flex-col">
                <h1 className="text-xl md:text-2xl lg:text-3xl text-maize font-bold uppercase mb-2 mt-2 md:text-left">Leadership</h1>
                <p className="text-darkblue text-sm md:text-md lg:text-lg md:text-left mt-10">
                As a student-led organization, our club is governed by a dedicated Executive Board comprised of passionate individuals who are committed to fostering a vibrant futsal community at the University of Michigan. 
                Our team works tirelessly to organize events, coordinate activities, and ensure that every member has the opportunity to thrive both on and off the court.
                </p>
                <div className="text-right">
                  <Link href="/forms/eboard" className="inline-block">
                    <button className="bg-maize text-darkblue px-4 py-2 rounded-md hover:bg-darkblue hover:text-maize mt-6">Apply</button>
                  </Link>
                </div>
              </div>
            </div>
          </section> 

          <ContactForm/>

        </section>
      </main>
  );
}
