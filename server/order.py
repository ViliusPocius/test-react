from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, constr
from datetime import datetime, date, time
import mysql.connector
import uvicorn
import smtplib
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
        cursor.execute("INSERT INTO orders (name, email, date, fulldate) VALUES (%s, %s, %s, %s)", 
                (payload.name, payload.email, payload.date, booking_time))
        db.commit()
        email_rec=payload.email
        email_subject="Pamokos informacija"
        email_content="Sveiki, "+str(payload.name)+", Jūsų pamoka užsakyta. Ji įvyks <b>"+str(payload.date)+" : "+str(payload.time)+"</b>"
        send_email(email_rec, email_subject, email_content)
    except Exception as e:
        db.rollback()
        print("error", e)
        raise HTTPException(status_code=500, detail="database error")
    finally:
        db.close()
    return {"status": "success", "data": payload}


@app.get("/")
async def root():
    return {"message": "Order service running"}


if __name__ == "__main__":
    uvicorn.run(app=app, host="localhost", port=8000)
