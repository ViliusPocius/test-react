import {React, useRef} from 'react';
import "./prices.css";
import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import {ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger, SplitText);

function Prices() {
  const aniRef = useRef();
    useGSAP(() => {
    const split = new SplitText(aniRef.current, { type: 'words, chars' });
    const t1 = gsap.timeline({
      scrollTrigger: {          
            trigger: aniRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
        }}
    );
      t1.from(split.chars, {
        y: -50,
        opacity: 0,
        rotation: Math.random() * 360 - 180,
        stagger: 0.05,
        ease: "power4.out",
        duration: 0.3,
      }).from(".details-item", {
        x: -1666,
        stagger: 0.1,
      })
    }, []);
  return (
    <section className="prices">
        <div className="prices-title">
            <h2 className='prices-title-text'><span ref={aniRef}>Kaip vyksta pamokos?</span></h2>
        </div>
          <div className="price-card">
              <ul className='price-details-list'>
                  <li><div className="details-item">Atliekamas bandomasis žinių patikrinimo testas</div></li>
                  <li><div className="details-item">Nustatomas žinių lygis</div></li>
                  <li><div className="details-item">Sudaromas pamokų planas</div></li>
                  <li><div className="details-item">Pamokos vykdomos pagal sudarytą tvarkaraštį</div></li>
              </ul>
          </div>
    </section>
  );
}

export default Prices;
