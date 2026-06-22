from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, constr
from datetime import datetime, date, time
import mysql.connector
import uvicorn
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

load_dotenv()

def send_email(to: str, subject: str, html_body: str):
    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = "info@vilius.site"
    msg["To"] = to
    msg.attach(MIMEText(html_body, "html"))

    with smtplib.SMTP_SSL("smtp.hostinger.com", 465) as server:
        server.login("info@vilius.site", os.getenv("PASSWORD"))
        server.sendmail("info@vilius.site", to, msg.as_string())

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
    conn=None
    try:
        db = get_connection()
        cursor = db.cursor()
        booking_time=datetime.combine(payload.date, payload.time)
        if booking_time<datetime.now():
            raise HTTPException(status_code=400, detail="invalid date or time")
        cursor.execute("INSERT INTO orders (name, email, date, time) VALUES (%s, %s, %s, %s)", 
                (payload.name, payload.email, payload.date, payload.time))
        db.commit()
        email_rec=payload.email
        email_subject="Pamokos informacija"
        email_content="Sveiki, "+str(payload.name)+", Jūsų pamoka užsakyta. Ji įvyks "+str(payload.date)+" : "+str(payload.time)+"."
        send_email(email_rec, email_subject, email_content)
    except mysql.connector.Error as e:
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
