import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, IndianRupee, Clock } from 'lucide-react';
import './Metrics.css';

gsap.registerPlugin(ScrollTrigger);

const Metrics = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const stats = [
    { target: 100, suffix: "+", label: "CONSUMER BRANDS ADVISED", icon: Award },
    { target: 500, prefix: "INR ", suffix: "+ CR", label: "GROWTH CAPITAL FACILITATED", icon: IndianRupee },
    { target: 1000, suffix: "+", label: "HOURS SPENT IN MARKET RESEARCH", icon: Clock }
  ];

  useGSAP(() => {
    const valueElements = gsap.utils.toArray('.metric-value-anim');
    
    valueElements.forEach((el: any, i) => {
      const targetVal = stats[i].target;
      const obj = { value: 0 };
      
      gsap.to(el, {
        scale: 1.1,
        duration: 0.5,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        }
      });

      gsap.to(obj, {
        value: targetVal,
        duration: 2.5,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        onUpdate: () => {
          const prefix = stats[i].prefix || "";
          const suffix = stats[i].suffix || "";
          el.innerHTML = `<span class="metric-unit">${prefix}</span>${Math.floor(obj.value)}<span class="metric-unit">${suffix}</span>`;
        }
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="metrics-bar">
      <div className="metrics-full-width">
        <div className="metrics-grid">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="metric-col">
                <div className="metric-icon-wrapper">
                  <Icon size={24} />
                </div>
                <span className="metric-value metric-value-anim">
                  <span className="metric-unit">{stat.prefix || ""}</span>
                  {stat.target}
                  <span className="metric-unit">{stat.suffix || ""}</span>
                </span>
                <span className="metric-label">{stat.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Metrics;
