import './RecruitersPage.css';
import SEO from '../components/SEO';

/*
const candidates = [
  {
    id: "DC-001",
    name: "Alex Thompson",
    age: 32,
    designation: "VP, Investment Banking",
    city: "London",
    availability: "IMMEDIATE",
    description: "Expert in cross-border M&A with a focus on luxury retail conglomerates. Led multiple $500M+ transactions across EU and Asia."
  },
  {
    id: "DC-002",
    name: "Sriya Rao",
    age: 29,
    designation: "Head of Strategy, D2C",
    city: "Mumbai",
    availability: "30 DAYS",
    description: "Architected the growth roadmap for three category-leading consumer brands in India. Specialist in unit economics and scale."
  },
  {
    id: "DC-003",
    name: "James Wilson",
    age: 35,
    designation: "Director, Capital Markets",
    city: "New York",
    availability: "90 DAYS",
    description: "Developed sophisticated equity structures for high-growth tech portfolios. Deep relationships with tier-1 global LPs."
  }
];
*/

const RecruitersPage = () => {
  /*
  const handleInquiry = (id: string) => {
    const subject = `Candidate Inquiry – [${id}]`;
    const body = `Hi Daylight Capital Team,\n\nI am interested in learning more about candidate ${id}.`;
    window.location.href = `mailto:admin@daylightcapital.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  */

  return (
    <div className="recruiters-page">
      <SEO 
        title="Talent Network & Discovery | Daylight Capital" 
        description="Connect with world-class strategic talent. Daylight Capital builds executive networks to place exceptional leaders in high-growth companies." 
      />
      <header className="recruiters-hero">
        <div className="container">
          <span className="recruiters-eyebrow">TALENT DISCOVERY</span>
          <h1 className="recruiters-title">The <span className="text-accent serif-italic">Talent</span> <br/>Network.</h1>
          <p className="recruiters-subtitle">Connecting world-class strategic talent with exceptional opportunities.</p>
        </div>
      </header>

      <section className="recruiters-content">
        <div className="container" style={{ textAlign: 'center', padding: '120px 0' }}>
          <p className="recruiters-placeholder-text" style={{ 
            fontFamily: 'var(--font-sans)', 
            fontSize: '1.25rem', 
            letterSpacing: '0.15em', 
            color: 'var(--color-text-secondary)',
            fontWeight: '400',
            textTransform: 'uppercase'
          }}>
            We will be adding profiles and opportunities here shortly.
          </p>
        </div>
      </section>
    </div>
  );
};

export default RecruitersPage;
