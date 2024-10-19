import Image from 'next/image';

export default function Sponsors() {
    return (
        <section id="sponsors" className="p-8 bg-darkblue flex flex-col items-center justify-center w-full">
            <h1 className="text-xl md:text-2xl lg:text-3xl text-maize font-bold uppercase mb-2 mt-2 text-center">
                Thanks to Our Sponsors
            </h1>
            <div className="flex flex-wrap justify-center mt-4">
                <Image src="/sponsor-redbull.png" alt="Redbull" width={200} height={64} className="p-4 mb-4" />
                <Image src="/sponsor-sapphire.png" alt="Sapphire" width={200} height={64} className="p-4 mb-4" />
                <Image src="/sponsor-studentlifeumich.png" alt="Michigan Student Life" width={200} height={64} className="p-4 mb-4" />
            </div>
        </section>
    );
}