import ContactForm from "@/components/contact-form";
export default function Contact(){
    return (
        <main className="flex flex-col items-center justify-between min-h-screen mt-12 ">
            <div className="bg-darkblue">
            <ContactForm />
            </div>
        </main>
    );
}