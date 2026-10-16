import Hero from '../components/Hero';
import About from '../components/About';
import Industries from '../components/Industries';
import Metrics from '../components/Metrics';
import BrandMarquee from '../components/BrandMarquee';
import Contact from '../components/Contact';

import SEO from '../components/SEO';

const Home = () => {
  return (
    <>
      <SEO 
        title="Daylight Capital | Strategic Capital & Growth Advisory" 
        description="Daylight Capital provides institutional capital access, strategic business planning, and growth advisory for category-leading consumer brands in India." 
      />
      <Hero />
      <BrandMarquee />
      <About />
      <Industries />
      <Metrics />
      <Contact />
    </>
  );
};

export default Home;
