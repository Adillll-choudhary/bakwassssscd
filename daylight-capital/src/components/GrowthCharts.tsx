import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './GrowthCharts.css';

gsap.registerPlugin(ScrollTrigger);

const GrowthCharts = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const paths = gsap.utils.toArray('.chart-path');
    
    paths.forEach((path: any) => {
      const length = path.getTotalLength();
      
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 3,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: path,
          start: 'top 80%',
        }
      });
    });

    gsap.from('.chart-data-point', {
      scale: 0,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: '.charts-grid',
        start: 'top 70%',
      }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="section growth-charts-section">
      <div className="section-marker">
        <div className="marker-label">02 // PERFORMANCE METRICS</div>
      </div>
      <div className="container">
        <div className="charts-header">
          <h2 className="charts-title">Institutional <span className="text-accent">Trajectory.</span></h2>
          <p className="charts-subtitle">Visualizing our cumulative impact and capital velocity across global markets.</p>
        </div>

        <div className="charts-grid">
          {/* Chart 1: Capital Raised */}
          <div className="chart-card glass-panel">
            <div className="chart-info">
              <span className="chart-label">CUMULATIVE CAPITAL RAISED</span>
              <h3 className="chart-value">₹3,000 Cr+</h3>
            </div>
            <div className="chart-visual">
              <svg viewBox="0 0 400 200" className="chart-svg">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <path 
                  className="chart-path" 
                  d="M0,180 Q50,170 100,140 T200,100 T300,50 T400,20" 
                  fill="none" 
                  stroke="url(#grad1)" 
                  strokeWidth="3" 
                />
                <circle cx="400" cy="20" r="4" fill="var(--color-accent)" className="chart-data-point" />
              </svg>
            </div>
            <div className="chart-footer">
              <span>FY18</span>
              <span>FY24</span>
            </div>
          </div>

          {/* Chart 2: Transaction Count */}
          <div className="chart-card glass-panel">
            <div className="chart-info">
              <span className="chart-label">ADVISORY VELOCITY</span>
              <h3 className="chart-value">50+ Deals</h3>
            </div>
            <div className="chart-visual">
              <svg viewBox="0 0 400 200" className="chart-svg">
                <path 
                  className="chart-path" 
                  d="M0,180 L50,160 L100,170 L150,130 L200,140 L250,90 L300,100 L350,40 L400,20" 
                  fill="none" 
                  stroke="var(--color-accent)" 
                  strokeWidth="3" 
                />
                {[0, 50, 100, 150, 200, 250, 300, 350, 400].map((x, i) => {
                  const y = [180, 160, 170, 130, 140, 90, 100, 40, 20][i];
                  return <circle key={i} cx={x} cy={y} r="3" fill="var(--color-accent)" className="chart-data-point" />;
                })}
              </svg>
            </div>
            <div className="chart-footer">
              <span>2018</span>
              <span>2024</span>
            </div>
          </div>

          {/* Chart 3: Network Growth */}
          <div className="chart-card glass-panel">
            <div className="chart-info">
              <span className="chart-label">INVESTOR NETWORK</span>
              <h3 className="chart-value">100+ LPs</h3>
            </div>
            <div className="chart-visual">
              <div className="bars-container">
                {[40, 60, 45, 80, 70, 95].map((h, i) => (
                  <div key={i} className="chart-bar-wrapper">
                    <div className="chart-bar" style={{ height: `${h}%` }}></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="chart-footer">
              <span>ASIA</span>
              <span>MENA</span>
              <span>EU</span>
              <span>US</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrowthCharts;
