import { useState } from 'react';
import './InsightsPage.css';
import SEO from '../components/SEO';

const tags = ["ALL", "CONSUMER", "VC", "DEBT", "STRATEGY"];

const blogs = [
  {
    id: 12,
    title: "Startups focus on in-house manufacturing to exercise quality control, build competitive edge | Mint",
    date: "JUL 03, 2026",
    tags: ["CONSUMER", "STRATEGY"],
    url: "https://www.livemint.com/industry/manufacturing/startups-in-house-manufacturing-competitive-edge-product-quality-inventory-control-innovation-d2c-11782967738143.html",
    image: "https://www.livemint.com/lm-img/img/2026/07/02/600x338/french_fries_line_1758795973813_1782987380397_21089030-ec46-49f7-a022-b11032802215.jpg"
  },
  {
    id: 1,
    title: "Keshav Agarwal Invests In Kreative Digitals, Backing Redefined D2C Growth.",
    date: "SEP 10, 2025",
    tags: ["CONSUMER", "VC"],
    url: "https://www.aninews.in/news/business/daylight-capitals-keshav-agarwal-invests-in-kreative-digitals-backing-the-agencys-vision-to-redefine-d2c-growth20250910165306/",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "What Will Drive D2C Brands In An Evolving Ecosystem — Keshav Agarwal Answers.",
    date: "MAY 15, 2025",
    tags: ["CONSUMER", "STRATEGY"],
    url: "https://inc42.com/features/what-will-drive-d2c-brands-in-an-evolving-ecosystem-daylight-capitals-keshav-agarwal-answers/",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Peyush Bansal, Tudip Ventures & Others Invest In House Of Chikankari.",
    date: "FEB 22, 2025",
    tags: ["CONSUMER", "VC"],
    url: "https://indianstartupnews.com/funding/peyush-bansal-tudip-ventures-others-invests-in-house-of-chikankari-8624127",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "China imported roughly 396,000 tonnes of Indian seafood worth US$1.27 billion, making it one of India’s largest seafood markets.",
    date: "FEB 10, 2026",
    tags: ["CONSUMER", "STRATEGY"],
    url: "https://www.linkedin.com/posts/keshavmagarwal_consumer-daylight-capital-activity-7464574141699006465-7f2N",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "India’s next large apparel opportunity may not be adult fashion.",
    date: "JAN 28, 2026",
    tags: ["CONSUMER", "STRATEGY"],
    url: "https://www.linkedin.com/posts/keshavmagarwal_consumer-kidsapparel-retail-activity-7462506489547718657-eiFW",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "India’s QSR opportunity is becoming too large for global food brands to ignore.",
    date: "JAN 12, 2026",
    tags: ["CONSUMER", "STRATEGY"],
    url: "https://www.linkedin.com/posts/keshavmagarwal_consumer-qsr-brands-activity-7460597081599012864-_XBs",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 7,
    title: "Daylight Capital acted as the exclusive financial advisor to House of Chikankari on its ₹25 Cr Series A fundraise from Cap Alpha Ventures, formerly known as Client Associates Alternate Fund (CAAF).",
    date: "DEC 15, 2025",
    tags: ["CONSUMER", "VC"],
    url: "https://www.linkedin.com/posts/keshavmagarwal_fundraise-consumerbrands-ethnicwear-activity-7456275732881743872-dvr-",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 8,
    title: "The Growth Stage Stress. The ₹3 Cr → ₹10 Cr MRR Journey where even the best of brands sweat and break apart.",
    date: "NOV 28, 2025",
    tags: ["CONSUMER", "STRATEGY"],
    url: "https://www.linkedin.com/posts/keshavmagarwal_consumer-brand-daylightcapital-activity-7453024465334210560-y6SU",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 9,
    title: "Most consumers don’t buy products. They buy permission.",
    date: "NOV 25, 2025",
    tags: ["CONSUMER", "STRATEGY"],
    url: "https://www.linkedin.com/posts/keshavmagarwal_consumer-startups-brands-activity-7452680174254567424-uZVj",
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 10,
    title: "Daylight Capital acted as the exclusive financial advisor for Supply6,",
    date: "OCT 05, 2025",
    tags: ["CONSUMER", "VC"],
    url: "https://www.linkedin.com/posts/keshavmagarwal_dealannouncement-startupgrowth-fundraising-activity-7374319553566195712-gso1",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 11,
    title: "Thrilled to announce that Daylight Capital exclusively advised Conscious Chemist to raise INR 10 Cr of Debt from RBL Bank!",
    date: "AUG 20, 2025",
    tags: ["CONSUMER", "DEBT"],
    url: "https://www.linkedin.com/posts/keshavmagarwal_d2c-brands-funding-activity-7360624932654841857-hFEy",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800&auto=format&fit=crop"
  }
];

const InsightsPage = () => {
  const [activeTag, setActiveTag] = useState("ALL");

  const filteredBlogs = activeTag === "ALL" 
    ? blogs 
    : blogs.filter(blog => blog.tags.includes(activeTag));

  return (
    <div className="insights-page">
      <SEO 
        title="Insights & Market Intelligence | Daylight Capital" 
        description="Read institutional insights, market trends, and strategic perspectives on consumer behavior, structural moats, and capital strategies from Daylight Capital." 
      />
      <header className="insights-hero">
        <div className="container">
          <span className="insights-eyebrow">INSIGHTS & NEWSROOM</span>
          <h1 className="insights-title">Thought <span className="text-accent serif-italic">Leadership.</span></h1>
        </div>
      </header>

      <section className="insights-content">
        <div className="container">
          <div className="filter-bar">
            {tags.map(tag => (
              <button 
                key={tag} 
                className={`filter-tag ${activeTag === tag ? 'active' : ''}`}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="insights-grid">
            {filteredBlogs.map(blog => (
              <div key={blog.id} className="blog-card" style={{ cursor: 'pointer' }} onClick={() => window.open(blog.url, '_blank')}>
                <div className="blog-image">
                  <img src={blog.image} alt={blog.title} />
                </div>
                <div className="blog-content">
                  <div className="blog-tags">
                    {blog.tags.map(tag => <span key={tag} className="blog-tag">{tag}</span>)}
                  </div>
                  <h3 className="blog-title">{blog.title}</h3>
                  <button className="read-blog-btn" onClick={(e) => { e.stopPropagation(); window.open(blog.url, '_blank'); }}>READ ARTICLE //</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default InsightsPage;
