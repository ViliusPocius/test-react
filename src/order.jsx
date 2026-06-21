import React, {useState} from 'react';
import "./order.css";
import { Navigate, useNavigate } from 'react-router-dom';
export default function Order() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [lessonType, setLessonType] = useState('single');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const navigate=useNavigate();
  function validate() {
    if (!name.trim()) return 'Prašome įrašyti savo vardą.';
    if (!email.trim()) return 'Prašome įrašyti el. paštą.';
    const re = /^\S+@\S+\.\S+$/;
    if (!re.test(email)) return 'Netinkamas el. paštas.';
    if (!date) return 'Nurodykite pamokos datą.';
    if (!time) return 'Nurodykite pamokos laiką.';
    return '';
  }
  function generateTimeSlots(startHour, endHour, stepMinutes) {
    const slots = [];
    for (let h = startHour; h < endHour; h++) {
      for (let m = 0; m < 60; m += stepMinutes) {
        const hh = String(h).padStart(2, '0');
        const mm = String(m).padStart(2, '0');
        slots.push(`${hh}:${mm}`);
      }
    }
    return slots;
  }
  function getCurrentDate()
  {
    let date=new Date();
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
  function handleSubmit(e) {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setError('');

    const booking = { name, email, date, time };
    // fetch data from local API endpoint
        fetch('https://test-react-3vjj.onrender.com/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name, email: email, date: date, time: time }),
        })
        .then(async response => {
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.detail || "Nepavyko prisijungti");
            }
            return data;
        })
        .then(data => {

          try {
            const existing = JSON.parse(localStorage.getItem('bookings') || '[]');
            existing.push(booking);
            localStorage.setItem('bookings', JSON.stringify(existing));
          } catch (err) {
            // ignore
          }
          setSubmitted(true);
        })
        .catch((error) => {
            setSubmitted(false);
            setError("Netinkama data ir laikas")
        });
      }
  if (submitted) {
    return (
      <div className="order-div">
      <div className="order-form">
        <h2>Pamoka užsakyta</h2>
        <p>Sveiki, {name}. Jūsų pamoka užsakyta. Ji įvyks {date} : {time}. <br></br>Visa su pamoka susijusi informacija išsiųsta el. paštu {email}.</p>
        <a className='order-btn' onClick={() => { setSubmitted(false); setName(''); setEmail(''); setDate(''); setTime(''); setLessonType('single'); }}>Užsakyti kitą pamoką</a>
      </div>
      </div>
    );
  }

  return (
    <div className="order-div">
    <form className="order-form">
      <h2>Užsisakykite pamoką</h2>
    <div className="order-name-div">
          <label>Vardas/Pavardė</label>
          <input value={name} onChange={e=>setName(e.target.value)} className='order-input'/>
    </div>
      <div className="order-email-div">
          <label>El. paštas</label>
          <input type='email' value={email} onChange={e=>setEmail(e.target.value)} className='order-input' />
      </div>
      <div className='fields-div'>
        <div className='date-div'>
          <label>Data</label>
          <input type="date" value={date} onChange={e=>setDate(e.target.value)} className='order-input' />
        </div>
        <div className='time-div'>
          <label>Laikas</label>
          <input type="time" step="60" value={time} onChange={e=>setTime(e.target.value)} className='order-input' />
        </div>
      </div>

      {error && <div role="alert" style={{color:'red',marginTop:8}}>{error}</div>}

      <div className="btn-div"><a onClick={handleSubmit} className='order-btn btn-form'>Pateikti</a></div>
    </form>
    </div>
  );
}
