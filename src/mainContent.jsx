import React, { useState } from 'react';
import Intro from './intro';
import Prices from './prices';
import Duk from './duk';
import Contacts from './contacts';
import "./mainContent.css"
function MainContent(){
    const [chatWindow, showChatWindow]=useState(false);
    const [messageDiv, showMessageDiv]=useState(false);
    const [responseDiv, showResponseDiv]=useState(false);
    const [isEmail, setIsEmail]=useState(false);
    const [email, setEmail]=useState("");
    function sendQuestion()
    {
        const questionField = document.getElementsByName('question')[0];
        if (questionField) {
            var body=questionField.value;
            console.log(body);
            showMessageDiv(body);
            showResponseDiv("Sveiki, Jūsų užklausa gauta. Atsakymas bus išsiųstas el. paštu "+email+" per artimiausias 24h. Geros dienos!");
            // 'https://test-react-3vjj.onrender.com/send-question'
            fetch('https://test-react-3vjj.onrender.com/send-question', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, body: body}),
        })
        .then(async response => {
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.detail || "Nepavyko prisijungti");
            }
            return data;
        })
        .catch((error) => {
            console.error("an error occured");
        });
        } else {
            console.log('Question field not found');
        }
        questionField.value="";
    }
    return <>
    <section className='main-full'>
    <div className="main-full-div">
        <Intro></Intro>
        <Prices></Prices>
        <Duk></Duk>
        <Contacts></Contacts>
    </div>
    {chatWindow && (
    <div data-aos="fade-up" data-aos-duration="200" className="chat-container">
        {isEmail && (<>
        <div className="chat-top"><h2>Pateikite klausimą</h2><button onClick={()=>setIsEmail(false)} className="close-btn">❌</button></div>
        <div className="chat-mid">
            {messageDiv && (
            <div className="message-div">{messageDiv}</div>
            )
            }
            {responseDiv && (
            <div className="response-div">{responseDiv}</div>
            )
            }
        </div>
        <div className="chat-bottom"><textarea name='question' type="text" className="chat-input" /><button onClick={()=>sendQuestion()} className='chat-submit'>➡️</button></div>
</>
    )
    }
    {!isEmail &&(
        <>
            <div className="email-form-div">
                <div className="email-form">
                    <h2>Įrašykite savo el. paštą</h2>
                    <input type="email" onChange={(e)=>setEmail(e.target.value)} className='email-input' name="email" value={email}/>
                    <button className='email-submit' onClick={()=>{if (email) setIsEmail(true)}}>Išsaugoti</button>
                </div>
            </div>
        </>
    )}
    </div>
    )
    }
    <div className="chat-div"><button onClick={()=>showChatWindow(!chatWindow)} className="btn-chat">🗨️</button></div>
    </section>
    </>
}

export default MainContent;
