import Image from 'next/image';
import ContactForm from '@/components/contact-form';
const eboard = [
    {
      name: 'Jeff Ore',
      role: 'Co-Founder / President',
      imageUrl:
        '/logo.jpg',
    },
    {
        name: 'Gabe Huttemann',
        role: 'Co-Founder / Vice President',
        imageUrl:
          '/logo.jpg',
    },
    {
        name: 'Xander Lucas',
        role: 'Competitive Manager',
        imageUrl:
          '/logo.jpg',
    },
    {
        name: 'Lucas Gavilan',
        role: 'Non-Competitive Manager',
        imageUrl:
          '/logo.jpg',
    },
    {
        name: 'Barni Kiss',
        role: 'Secretary',
        imageUrl:
          '/logo.jpg',
    },
    {
        name: 'Violet Potempski',
        role: 'Social Media Manager / Recruitment',
        imageUrl:
          '/logo.jpg',
    },
    {
        name: 'Nikhil Satpathy',
        role: 'Treasurer',
        imageUrl:
          '/logo.jpg',
    },
    {
        name: 'Joseph Manni',
        role: 'Webmaster',
        imageUrl:
          '/logo.jpg',
    },
    {
        name: 'Juno Kim',
        role: 'Social Chair',
        imageUrl:
          '/logo.jpg',
    },
    // More people...
  ]
export default function Leadership() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen mt-12">
      <section id="mission" className="bg-darkblue flex flex-col md:flex-row items-center justify-center w-full h-full -z-50">
        <div className="flex flex-col md:flex-row justify-center md:justify-start w-full mx-4 md:mx-10 mb-10 md:mb-0 p-8">
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl lg:text-3xl text-maize font-bold uppercase mb-2 mt-2 md:text-left">Leadership</h1>
            <p className="text-white text-sm md:text-md lg:text-lg md:text-left mt-10">
                As a student-led organization, our club is governed by a dedicated Executive Board comprised of passionate individuals who are committed to fostering a vibrant futsal community at the University of Michigan. Our team works tirelessly to organize events, coordinate activities, and ensure that every member has the opportunity to thrive both on and off the court
            </p>
          </div>
        </div>
      </section>

      <section id='bios' className='bg-gradient-to-b from-maize to-darkblue -z-50 w-full'>
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
                <div className="max-w-2xl">
                <h2 className="text-3xl font-bold tracking-tight text-darkblue sm:text-4xl">Meet our Team!</h2>
                </div>
                <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                {eboard.map((person) => (
                    <li key={person.name}>
                    <div className="flex items-center gap-x-6">
                        <Image className="h-16 w-16 rounded-full" height={16} width={16} src={person.imageUrl} alt="" />
                        <div>
                        <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                        <p className="text-sm font-semibold leading-6 text-indigo-600">{person.role}</p>
                        </div>
                    </div>
                    </li>
                ))}
                </ul>
            </div>
        </div>
      </section>
      <ContactForm />
    </main>
  );
}
