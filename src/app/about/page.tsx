import dynamic from 'next/dynamic';

const Founders = dynamic(() => import("@/components/sections/Founders"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));

export default function AboutPage() {
    return (
        <div className="pt-24 pb-20 overflow-x-hidden">
            <Founders />
            <Testimonials />
        </div>
    );
}
