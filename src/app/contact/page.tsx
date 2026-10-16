import dynamic from 'next/dynamic';

const Contact = dynamic(() => import("@/components/sections/Contact"));

export default function ContactPage() {
    return (
        <div className="pt-24 overflow-x-hidden">
            <Contact />
        </div>
    );
}
