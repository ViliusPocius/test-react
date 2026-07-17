import React, {useState, useEffect} from 'react';
import "./order.css";
import { Navigate, useNavigate } from 'react-router-dom';
import Logo from "./top-logo.png";
export default function Order() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [current, setCurrent] = useState(1);
  const [target, setTarget] = useState(1);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [orders, setOrders] = useState([]);
  const [step, setStep]=useState(1);
  const navigate = useNavigate();
  const orderTimes = generateTimeSlots(0, 24, 60);
  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders() {
    fetch('https://test-react-3vjj.onrender.com/get-orders')
      .then(async response => {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.detail || 'Nepavyko gauti užsakymų');
        }
        console.log(data.data);
        setOrders(data.data);
        console.log("Orders::", orders);
      })
      .catch((fetchError) => {
        console.error('Error fetching orders:', fetchError);
        setError('Nepavyko gauti užsakymų.');
      });
  }

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
  function handleNext(e)
  {
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setError("");
    setStep(2);
  }
  function handleSubmit(e) {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setError('');

    const booking = { name, email, date, time, current, target, comment };
    // https://test-react-3vjj.onrender.com/order
    // http://localhost:8000/order

        fetch('http://localhost:8000/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name, email: email, date: date, time: time, current: current, target: target, comment: comment }),
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
          setStep(1);
        })
        .catch((error) => {
            setSubmitted(false);
            setError("Netinkama data ir laikas");
        });
      }
  if (submitted) {
    return (
      <div className="order-div">
      <div className="order-form">
        <h2>Pamoka užsakyta</h2>
        <p>Sveiki, <b> {name} </b>. Jūsų pamoka užsakyta. Ji įvyks {date} : {time}. <br></br>Visa su pamoka susijusi informacija bus išsiųsta el. paštu <b>{email}</b>.</p>
        <a className='order-btn' onClick={() => { setSubmitted(false); setName(''); setEmail(''); setDate(''); setTime(''); setStep(1); }}>Užsakyti kitą pamoką</a>
      </div>
      </div>
    );
  }

  return (
    <div className="order-div">
    <form className="order-form">
      <div className="logo-div"><img width="120px" height="auto" src={Logo} alt="" />
      
      <div className="form-title-div">{step==1 && (<h2>Užsisakykite pamoką</h2>)}</div>
      </div>
      {step==1 && (<>
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
          <select value={time} onChange={e=>setTime(e.target.value)} className='order-input'>
          {Array.isArray(orders) && 
          orderTimes.map(order=>
            (
              <option key={order}>{order}</option>
            )
            )
          }
          </select>
        </div>
      </div>
      {error && <div role="alert" style={{color:'red',marginTop:8}}>{error}</div>}
      <div className="btn-div"><a onClick={()=>handleNext()} className='order-btn btn-form'>Toliau</a></div>
    </>
    )}
    {step==2 && (
      <>
      {error && <div role="alert" style={{color:'red',marginTop:8}}>{error}</div>}
      <div className="form-title-div"><h4>Pateikite daugiau informacijos apie turimas bei norimas įgyti matematikos žinias</h4></div>
      <div className="grades-div">
        <div className="current-div">
        <label htmlFor="current-grade">Turimas vidurkis</label>
        <select value={current} onChange={e=>setCurrent(e.target.value)} name="current-grade" className="order-input">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
      <div className="target-div">
        <label htmlFor="target-grade">Norimas vidurkis</label>
        <select value={target} onChange={e=>setTarget(e.target.value)} name="target-grade" className="order-input">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        </div>
      </div>
      <div className="comment-div">
        <div className="comment-title"><h3>Ko tikitės iš pamokų?</h3></div>
        <textarea value={comment} onChange={(e)=>setComment(e.target.value)} className='comment-area'></textarea>
      </div>
      <div className="btn-div"><a onClick={()=>setStep(1)} className='order-btn btn-form'>Atgal</a></div>
      <div className="btn-div"><a onClick={handleSubmit} className='order-btn btn-form'>Pateikti</a></div>
      </>
      )}
    </form>
    </div>
  );
}
