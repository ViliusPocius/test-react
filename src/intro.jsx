import React from 'react';
import "./intro.css";
import { useState, useEffect } from 'react';
import Prices from './prices.jsx';

const Intro = () => {
    const [showMoreInfo, setShowMoreInfo]=useState(false);
    const [showMore, setShowMore]=useState(false);
    const [showMore2, setShowMore2]=useState(false);
    const [showMore3, setShowMore3]=useState(false);
    const [showMore4, setShowMore4]=useState(false);
    const [showMore5, setShowMore5]=useState(false);

  return (
    <section className="intro-section">
        <div className="intro-div">
        <div data-aos="fade-down" className="intro-information">
        <h1>Sveiki, esu matematikos korepetitorius Vilius</h1>
        <h2>Užsiimu individualiomis pamokomis už prieinamą kainą</h2>
        <hr className='intro-hr'/>
        <div className="intro-list-div">
            <h2>Kreipkitės, jei Jums reikia:</h2>
            <ul className='intro-list'>
                <li className='intro-item'><span>⚡</span><span>Pasiruošti matematikos PUPP/VBE</span></li>
                <li className='intro-item'><span>⬆️</span><span>Pasiekti geresnį įvertinimą</span></li>
                <li className='intro-item'><span>🧠</span><span>Praplėsti turimas matematines žinias</span></li>
            </ul>
        </div>
        <div className={`more-info ${showMoreInfo ? 'unblur' : ''}`}>
            <p>Esu informatikos mokslų studentas, apsigynęs bakalaurą Vilniaus universitete. Turiu patirties dirbant matematikos korepetitoriumi.</p>
        </div>

        <button className='more-btn' onClick={()=>setShowMoreInfo(!showMoreInfo)}>
            {!showMoreInfo ? (
            <>Daugiau informacijos</>
            ) : (
                <>Mažiau informacijos</>
            )
}
            </button>
        </div>
        <div data-aos="fade-up" className="why-me">
            <h1><span className='question-mark'>❓</span>Kodėl verta naudotis mano paslaugomis?</h1>
            <hr className="intro-hr" />
            <ul className='intro-list'>
                <li><button onClick={() => setShowMore2(!showMore2)} className="list-item">
                        <span className="text">
                        <span className="label">
                        <span>✨</span><span>Atliekamų paslaugų kokybė</span></span>
                        </span>
                        </button>
                        {showMore2 && (
                        <div data-aos="zoom-in" className="content">
                        <div className="content-inside">
                            <p>
                                Vykdant pamokas bus užtikrinama paslaugų kokybė, naudojama mokyklinį kursą bei egzaminų turinį atitinkanti mokymo medžiaga.
                            </p>
                        </div>
                        </div>
                        )}
                </li>
                <li><button onClick={() => setShowMore3(!showMore3)} className="list-item">
                        <span className="text">
                        <span className="label">
                        <span>💵</span><span>Paslaugų kaina</span></span>
                        </span>
                        </button>
                        {showMore3 && (
                        <div data-aos="zoom-in" className="content">
                        <div className="content-inside">
                            <p>
                                Užsiėmimai vykdomi už prieinamą kainą. Kilus nesklandumams galimas užmokesčio grąžinimas.
                            </p>
                        </div>
                        </div>
                        )}
                </li>
                <li><button onClick={() => setShowMore4(!showMore4)} className="list-item">
                        <span className="text">
                        <span className="label">
                        <span>📅</span><span>Lankstus pamokų tvarkaraštis</span></span>
                        </span>
                        </button>
                        {showMore4 && (
                        <div data-aos="zoom-in" className="content">
                        <div className="content-inside">
                            <p>
                                Užsisakant paslaugas, klientui suteikiama galimybė laisvai rinktis jam tinkamą užsiėmimų grafiką.
                            </p>
                        </div>
                        </div>
                        )}
                </li>
            </ul>
        </div>        
        </div>
    </section>
  );
};

export default Intro;
