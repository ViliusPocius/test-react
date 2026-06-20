from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, constr
from datetime import datetime, date, time
import mysql.connector
import uvicorn

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="corep_db"
)

cursor = db.cursor()

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
        booking_time=datetime.combine(payload.date, payload.time)
        if booking_time<datetime.now():
            raise HTTPException(status_code=400, detail="invalid date or time")
        cursor.execute("INSERT INTO orders (name, email, date, time) VALUES (%s, %s, %s, %s)", 
                (payload.name, payload.email, payload.date, payload.time))
        db.commit()
    except mysql.connector.Error as e:
        db.rollback()
        print("error", e)
        raise HTTPException(status_code=500, detail="database error")
    return {"status": "success", "data": payload}


@app.get("/")
async def root():
    return {"message": "Order service running"}


if __name__ == "__main__":
    uvicorn.run(app=app, host="localhost", port=8000)
