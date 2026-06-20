import React, {useState} from 'react';
import "./order.css";
export default function Order() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [lessonType, setLessonType] = useState('single');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function validate() {
    if (!name.trim()) return 'Prašome įrašyti savo vardą.';
    if (!email.trim()) return 'Prašome įrašyti el. paštą.';
    const re = /^\S+@\S+\.\S+$/;
    if (!re.test(email)) return 'Netinkamas el. paštas.';
    if (!date) return 'Nurodykite pamokos datą.';
    if (!time) return 'Nurodykite pamokos laiką.';
    return '';
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
        fetch('http://localhost:8000/order', {
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
            localStorage.setItem('token', data);

            setTimeout(() => {
                navigate('/');
            }, 1500);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    
    try {
      const existing = JSON.parse(localStorage.getItem('bookings') || '[]');
      existing.push(booking);
      localStorage.setItem('bookings', JSON.stringify(existing));
    } catch (err) {
      // ignore
    }

    setSubmitted(true);
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

      <label>Vardas/Pavardė</label>
      <input value={name} onChange={e=>setName(e.target.value)} className='order-input'/>

      <label style={{display:'block',marginTop:8}}>Jūsų el. paštas</label>
      <input value={email} onChange={e=>setEmail(e.target.value)} className='order-input' />

      <div className='fields-div'>
        <div>
          <label>Data</label>
          <input type="date" value={date} onChange={e=>setDate(e.target.value)} className='order-input' />
        </div>
        <div>
          <label>Laikas</label>
          <input type="time" value={time} onChange={e=>setTime(e.target.value)} className='order-input' />
        </div>
      </div>

      {error && <div role="alert" style={{color:'red',marginTop:8}}>{error}</div>}

      <div className="btn-div"><a onClick={handleSubmit} className='order-btn btn-form'>Pateikti</a></div>
    </form>
    </div>
  );
}
