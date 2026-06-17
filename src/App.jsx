import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { Link } from 'react-router-dom'
import gsap from 'gsap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';
import MainContent from './mainContent';
import Order from './order';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText);

function App(props) {
  useEffect(() => {
    AOS.init({ duration: 1000, offset: 50});
  }, []);
const aniRef = useRef();
    useGSAP(() => {
    const t1 = gsap.timeline();

        const split = new SplitText(aniRef.current, { type: 'words, chars' });
        
        t1.from(split.chars, {
            opacity: 0,
            y: Math.random() * 100 - 250,
            rotation: Math.random() * 360 - 180,
            stagger: 0.075,
            ease: 'power4.out',
            duration: 0.1,
      }).from(".animatable", {
            opacity: 0,
            ease: "power4.out",
            duration: 0.1,
      }).from(".main-hr", {
            x: -800,
            stagger: 0.1,
            delay: 0.15,
            ease: 'power4.out',
            duration: 0.2,
      }).from(".main-card", {
            opacity: 0,
            scale: 0.2,
            transformOrigin: 'center',
            y: 20,
            rotation: 5,
            ease: 'power4.out',
            duration: 2,
      });
    }, []);
  return (
    <>

      {props.login && (
        <section className="main-sec">
                <div className="bg"></div>
      <div className="bg bg-2"></div>
      <div className="bg bg-3"></div>
          <div className="main-div">
             <div className='main-circle'>
        </div>
        <div className="secondary-circle secondary-circle-1"></div>
        <div className="secondary-circle secondary-circle-2"></div>
        <div className="secondary-circle secondary-circle-3"></div>
        <div className="secondary-circle secondary-circle-4"></div>
        <div className="secondary-circle secondary-circle-5"></div>
        
        <Order></Order>
        </div>
        </section>
      )
      }
      {!props.login && (
        <>
      <section className='main-sec'>
      <div className="bg"></div>
      <div className="bg bg-2"></div>
      <div className="bg bg-3"></div>
      <div className="main-div">
        <div className='main-circle'>
        </div>
        <div className="secondary-circle secondary-circle-1"></div>
        <div className="secondary-circle secondary-circle-2"></div>
        <div className="secondary-circle secondary-circle-3"></div>
        <div className="secondary-circle secondary-circle-4"></div>
        <div className="secondary-circle secondary-circle-5"></div>
        <div className="main-title">
          <h1><span ref={aniRef}>Matematikos korepetitorius</span> <span className='animatable'>Vilius</span></h1>
          <hr className='main-hr hr-20'/>
          <hr className='main-hr hr-40'/>
          <hr className='main-hr hr-60'/>
        </div>
        <div className="main-card">
          <div className="my-desc-div">
            <h3>Pilnas pasiruošimas kontroliniams darbams, žinių patikrinimui bei egzaminui</h3>
          </div>
          <a href="#contact-section" className="btn-nav">Susisiekite su manimi</a>
        </div>
      </div>
      </section>
      <MainContent></MainContent>
      </>
      )
      }
    </>
  )
}

export default App
