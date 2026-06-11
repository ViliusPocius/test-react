import React from 'react';
import Intro from './intro';
import Prices from './prices';
import Duk from './duk';
import Contacts from './contacts';
import "./mainContent.css"
function MainContent(){

    return <>
    <section className='main-full'>
    <div className="main-full-div">
        <Intro></Intro>
        <Prices></Prices>
        <Duk></Duk>
        <Contacts></Contacts>
    </div>
    </section>
    </>
}

export default MainContent;
