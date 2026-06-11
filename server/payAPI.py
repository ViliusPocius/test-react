from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic_settings import BaseSettings, SettingsConfigDict
import stripe
import os
import uvicorn
import mysql.connector
from dotenv import load_dotenv

load_dotenv()
stripe.api_key = os.getenv("SECRET_KEY")
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
SERVICES = {
    1: {
        "name": "Reprezentacinė internetinė svetainė",
        "price": 199
    },
    2: {
        "name": "Internetinė svetainė smulkiam verslui",
        "price": 299
    }
}
@app.post("/create-checkout-session")
async def create_checkout_session(request: Request):

    try:
        conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="pay_api_db"
    )
        data = await request.json()
        print("Creating checkout session...", data)
        cursor=conn.cursor()
        id=data["id"]
        print("ID", id)
        cursor.execute("SELECT * FROM services WHERE ID = %s", (id,))
        result=cursor.fetchone()
        print("database result...", result)

        checkout_session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[
                {
                    "price_data": {
                        "currency": "eur",
                        "product_data": {
                            "name": result[1],
                        },
                        "unit_amount_decimal": result[2] * 100,
                    },
                    "quantity": 1,
                },
            ],
            mode="payment",
            success_url="http://localhost:5173/success",
            cancel_url="http://localhost:5173/cancel",
        )
        return {"id": checkout_session.id, "url": checkout_session.url}
    except Exception as e:
        print(f"Error creating checkout session: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    
if __name__ == "__main__":
    uvicorn.run(app=app, host="localhost", port=8000)