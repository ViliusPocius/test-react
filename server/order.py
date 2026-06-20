from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, constr
from datetime import date, time
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
    print("payload: ", payload)
    try:
        cursor.execute("INSERT INTO orders (name, email, date, time) VALUES (%s, %s, %s, %s)", 
                (payload.name, payload.email, payload.date, payload.time))
        db.commit()
    except mysql.connector.Error as e:
        print("error")
    return {"status": "success", "data": payload}


@app.get("/")
async def root():
    return {"message": "Order service running"}


if __name__ == "__main__":
    uvicorn.run(app=app, host="localhost", port=8000)
