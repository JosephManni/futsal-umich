import Image from 'next/image';
import ContactForm from '@/components/contact-form';

export default function About() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen mt-12">
      <section id="mission" className="bg-darkblue flex flex-col md:flex-row items-center justify-center w-full h-full -z-50">
        <div className="flex flex-col md:flex-row justify-center md:justify-start w-full md:w-1/2 mx-4 md:mx-10 mb-10 md:mb-0 p-8">
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl lg:text-3xl text-maize font-bold uppercase mb-2 mt-2 md:text-left">About Us</h1>
            <p className="text-white text-sm md:text-md lg:text-lg md:text-left mt-10">
              {"Our mission is simple yet ambitious: to provide a space where Michigan students can come together to play and enjoy the sport they love. We understand the challenges that many students face when it comes to pursuing futsal and soccer, from lack of available fields to unpredictable weather. That's why we're dedicated to addressing these obstacles and creating opportunities for everyone to participate."}
              {"Beyond just playing the game, we value building connections and fostering camaraderie among our members. Our club is open to anyone across campus who shares our passion for team sports and wants to make meaningful connections with fellow Wolverines. Whether you're looking to improve your skills, stay active, or simply meet new friends, you'll find a supportive community here."}
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0 p-8">
          <div className="relative w-56 h-56 mb-10">
            <Image src="/founders.jpg" alt="Club Futsal at the University of Michigan" layout="fill" objectFit="cover" />
            <p className="absolute -bottom-10 md:-bottom-20 text-white text-xs md:text-sm lg:text-md">Club Founders: (From left to right) Gabe Hutteman, Juno Kim, Jeff Ore</p>
          </div>
        </div>
      </section>
      <ContactForm />
    </main>
  );
}
