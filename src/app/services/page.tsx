import dynamic from 'next/dynamic';

const Services = dynamic(() => import("@/components/sections/Services"));
const Pricing = dynamic(() => import("@/components/sections/Pricing"));

export default function ServicesPage() {
    return (
        <div className="pt-24 pb-20">
            <Services />
            <Pricing />
        </div>
    );
}
