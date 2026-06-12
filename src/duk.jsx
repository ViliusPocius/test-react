import React, { useState, useRef } from "react";
import './duk.css';
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger, SplitText);

function Duk() {
    const aniRef=useRef();
    const [openId, setOpenId] = useState(null);
    const [openId2, setOpenId2]=useState(null);
    const [openId3, setOpenId3]=useState(null);
    const [openId4, setOpenId4]=useState(null);
    const questions = [
        {
            id: 1,
            plus: "➕",
            question: "Kokių dalykų mokau?",
            answer: "Šiuo metu mokau 9-12 kl. mokinius matematikos.",
        },
        {
            id: 2,
            plus: "➕",
            question: "Ar galiu mokyti savaitgaliais bei šventinėmis dienomis?",
            answer: "Taip. Pamokas galima vykdyti ir ne darbo dienomis be jokio papildomo mokesčio.",
        },
        {
            id: 3,
            plus: "➕",
            question: "Kiek laiko trunka 1 matematikos pamoka?",
            answer: "Matematikos pamoka trunka lygiai 1h.",
        },
        {
            id: 4,
            plus: "➕",
            question: "Kiek kainuoja  matematikos pamokos?",
            answer: "Matematikos pamokos kainuoja 20€/h.",
        },
    ];

    const toggleQuestion = (id) => {
        setOpenId((current) => (current === id ? null : id));
    };
    useGSAP(()=>{
    const split = new SplitText(aniRef.current, { type: 'words, chars' });
    const t2 = gsap.timeline({
      scrollTrigger: {          
            trigger: aniRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
        }}
    );
      t2.from(split.chars, {
        y: -50,
        opacity: 0,
        rotation: Math.random() * 360 - 180,
        stagger: 0.05,
        ease: "power4.out",
        duration: 0.3,
      })
      .from(".duk-item", {
        x: -2666,
        stagger: 0.1,
      })
    }, []);
    return (
        <section className="duk-sec">
            <h1 className="duk-title-text"><span ref={aniRef}>Dažniausiai užduodami klausimai</span></h1>
            <div className="duk-main">
                <div className="duk-item">
                    <div
                        className="duk-question"
                        onClick={() => setOpenId(!openId)}
                        role="button"
                        onKeyPress={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                                toggleQuestion(openId);
                            }
                        }}
                    >
                        <span>➕</span><span>Kokių dalykų mokau?</span>
                    </div>
                    {openId &&(
                        <div data-aos="fade-down" className="wrapper">
                        <div className="duk-answer">
                            Šiuo metu mokau 9-12 kl. mokinius matematikos.
                        </div>
                        </div>
                        )
                    }   
                </div>

                <div className="duk-item">
                    <div
                        className="duk-question"
                        onClick={() => setOpenId2(!openId2)}
                        role="button"
                        onKeyPress={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                                toggleQuestion(openId2);
                            }
                        }}
                    >
                        <span>➕</span><span>Ar galiu mokyti savaitgaliais bei šventinėmis dienomis?</span>
                    </div>
                    {openId2 &&(
                        <div data-aos="fade-down" className="wrapper">
                        <div className="duk-answer">
                            Taip. Pamokas galima vykdyti ir ne darbo dienomis be jokio papildomo mokesčio.
                        </div>
                        </div>
                        )
                    }   
                </div>

                <div className="duk-item">
                    <div
                        className="duk-question"
                        onClick={() => setOpenId3(!openId3)}
                        role="button"
                        onKeyPress={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                                toggleQuestion(openId3);
                            }
                        }}
                    >
                        <span>➕</span><span>Kiek laiko trunka 1 matematikos pamoka?</span>
                    </div>
                    {openId3 &&(
                        <div data-aos="fade-down" className="wrapper">
                        <div className="duk-answer">
                            Matematikos pamoka trunka lygiai 1h.
                        </div>
                        </div>
                        )
                    }   
                </div>

                <div className="duk-item">
                    <div
                        className="duk-question"
                        onClick={() => setOpenId4(!openId4)}
                        role="button"
                        onKeyPress={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                                toggleQuestion(openId4);
                            }
                        }}
                    >
                        <span>➕</span><span>Kiek kainuoja  matematikos pamokos?</span>
                    </div>
                    {openId4 &&(
                        <div data-aos="fade-down" className="wrapper">
                        <div className="duk-answer">
                            Matematikos pamokos kainuoja 20€/h.
                        </div>
                        </div>
                        )
                    }   
                </div>
            </div>
        </section>
    );
}

export default Duk;