import Link from "next/link";

export default function Announcement() {
  return (
    <div className="bg-maize text-darkblue py-2 text-center w-full">
      <p className="text-lg font-bold">
        {/* Tryouts Starting Soon! Check Back For Updates! */}
        Tryouts are here! <Link className="underline" href="/players/portal">Sign up in your player portal now!</Link>
      </p>
    </div>
  );
}