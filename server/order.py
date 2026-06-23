from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime, date, time
import mysql.connector
import uvicorn
import os
import resend
from dotenv import load_dotenv

load_dotenv()
resend.api_key=os.getenv("API_KEY")
def send_email(to: str, subject: str, html_body: str):
    r = resend.Emails.send({
    "from": "info@vilius.site",
    "to": to,
    "subject": subject,
    "html": html_body
    })
def get_connection():
    return mysql.connector.connect(
        host="srv1726.hstgr.io",
        user="u520430181_root",
        password="Songokas.1",
        database="u520430181_corep_db"
    )

app = FastAPI()

app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)


class OrderRequest(BaseModel):
	name: str
	email: str
	date: date
	time: time 

class OrderResponse(BaseModel):
    status: str
    data: OrderRequest

@app.post("/order", response_model=OrderResponse)
def create_order(payload: OrderRequest):
    try:
        db = get_connection()
        cursor = db.cursor()
        booking_time=datetime.combine(payload.date, payload.time)
        if booking_time<datetime.now():
            raise HTTPException(status_code=400, detail="invalid date or time")
        cursor.execute("INSERT INTO orders (name, email, date, time, fulldate) VALUES (%s, %s, %s, %s, %s)", 
                (payload.name, payload.email, payload.date, payload.time, booking_time))
        db.commit()
        email_rec=payload.email
        email_subject="Pamokos informacija"
        email_content="Sveiki, "+str(payload.name)+", Jūsų pamoka užsakyta. Ji įvyks <b>"+str(payload.date)+" d. "+str(payload.time)+" h.</b>"
        send_email(email_rec, email_subject, email_content)
    except Exception as e:
        db.rollback()
        print("error", e)
        raise HTTPException(status_code=500, detail="database error")
    finally:
        db.close()
    return {"status": "success", "data": payload}

@app.get("/get-orders")
def get_orders():
    try:
        db=get_connection()
        cursor=db.cursor()
        cursor.execute("SELECT * FROM orders")
        orders=cursor.fetchall()
    except Exception as e:
        print(f"Error fetching orders: {e}")
        raise HTTPException(status_code=500, detail="Error fetching orders")
    return {"status": "success", "data": orders}
@app.get("/")
async def root():
    return {"message": "Order service running"}


if __name__ == "__main__":
    uvicorn.run(app=app, host="localhost", port=8000)
