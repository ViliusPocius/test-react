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
            {questions.map((item) => (
                <div key={item.id} className="duk-item">
                    <div
                        className="duk-question"
                        onClick={() => toggleQuestion(item.id)}
                        role="button"
                        onKeyPress={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                                toggleQuestion(item.id);
                            }
                        }}
                    >
                        <span>{item.plus}</span><span>{item.question}</span>
                    </div>
                    {openId === item.id && (
                        <div data-aos="fade-down" className="wrapper">
                        <div className="duk-answer">
                            {item.answer}
                        </div>
                    </div>
                    )}
                </div>
            ))}
</div>
        </section>
    );
}

export default Duk;