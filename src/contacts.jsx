import {React, useRef} from "react";
import "./contacts.css";
import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import  Mathbook  from "./mathbook.png";
gsap.registerPlugin(ScrollTrigger, SplitText);

function Contacts()
{
const aniRef = useRef();
    useGSAP(() => {
    const t1 = gsap.timeline({
      scrollTrigger: {          
            trigger: aniRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
        }}
    );
    t1.from(".contact-title-text", {
      x: -1500,
      duration: 1,
      ease: "power4.out",
    }).from(".contact-hr", {
      x: -1500,
      duration: 1,
      ease: "power4.out",
    })
    gsap.to(".contact-img", {
      scale: 0.9,
      duration: 1,
      ease: "power4.out",
      repeat: -1,
      yoyo: true,
    })
  }, []);
    return<>
        <section ref={aniRef} id="contact-section" className="contact-section">
        <div className="contact-card">
            <h1 className="contact-title-text">Kontaktinė informacija</h1>
            <hr className="contact-hr" />
          <div data-aos="flip-left" className="contact-info">
            <div className="contacts">
              <div className='email-div'><b>✉️</b>&nbsp;viliuspocius123@gmail.com</div>
              <div className='phone-div'><b>📞</b>&nbsp;+37063649151</div>
            </div>
            <a href="mailto:viliuspocius123@gmail.com" className="btn-main btn-form">Siųsti laišką</a>
          </div>
        <div className="media">
          <h2 data-aos="zoom-in" style={{alignSelf: "center", alignItems: "center", alignContent: "center", textAlign: "center"}}>Taip pat galite rasti mane socialiniuose tinkluose</h2>
          <div data-aos="zoom-in" className="media-links">
            <a href="https://www.facebook.com/profile.php?id=100007330425147" target="_blank" rel="noopener noreferrer" className="btn-main btn-media btn-facebook"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
          </svg></a>   
          </div>
        </div>  
        </div>
        <div className="contact-img">
          <img src={Mathbook} />
        </div>
</section>
    </>
}

export default Contacts;