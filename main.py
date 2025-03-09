import json
import os
from pathlib import Path
from typing import List, Optional

import stripe
from dotenv import load_dotenv
from fastapi import FastAPI, Request, Response, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

# Load environment variables
load_dotenv(Path("./config/.env.local"))

# Initialize Stripe
stripe.api_key = os.getenv("STRIPE_SECRET")

# Load the fakeToStripe mapping
with open("fakeToStripe.json", "r") as f:
    fake_to_stripe = json.load(f)

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static files
app.mount("/static", StaticFiles(directory="client/public"), name="static")

# Define models
class Item(BaseModel):
    id: int
    quantity: int
    price: Optional[float] = None
    title: Optional[str] = None
    image: Optional[str] = None

class CheckoutRequest(BaseModel):
    items: List[Item]

@app.post("/checkout")
async def checkout(request: CheckoutRequest):
    try:
        line_items = [
            {
                "price": fake_to_stripe[str(item.id)],
                "quantity": item.quantity
            } for item in request.items
        ]
        
        session = stripe.checkout.Session.create(
            line_items=line_items,
            mode="payment",
            success_url="http://localhost:3001/success",
            cancel_url="http://localhost:3001/cancel"
            # Uncomment for production URLs
            # success_url="https://newyorkcollection.shop/success",
            # cancel_url="https://newyorkcollection.shop/cancel"
        )
        
        return {"url": session.url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api")
async def api():
    return {"message": "Hello from server!"}

# Serve the React app for any other routes
@app.get("/{full_path:path}")
async def serve_react_app(full_path: str):
    # Check if client/build exists (production build)
    client_build_path = Path("./client/build")
    index_path = client_build_path / "index.html"
    
    # Check if client/public exists (development files)
    client_public_path = Path("./client/public")
    public_index_path = client_public_path / "index.html"
    
    # First try to serve from build directory (production)
    if index_path.exists():
        return FileResponse(index_path)
    # Then try to serve from public directory (development)
    elif public_index_path.exists() and full_path in ["", "index.html"]:
        return FileResponse(public_index_path)
    # For API requests or when neither exists
    else:
        # During development, the frontend is typically served by a separate dev server
        return {"message": "This is the FastAPI backend. The React frontend should be running on a different port."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=3001, reload=True)
