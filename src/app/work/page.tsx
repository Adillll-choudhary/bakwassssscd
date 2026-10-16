import dynamic from 'next/dynamic';

const Spectrum = dynamic(() => import("@/components/sections/Spectrum"));
const CaseStudies = dynamic(() => import("@/components/sections/CaseStudies"));

export default function WorkPage() {
    return (
        <div className="pt-24 pb-20 overflow-x-hidden">
            <Spectrum />
            <CaseStudies />
        </div>
    );
}
