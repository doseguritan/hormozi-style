from fastapi import FastAPI, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import func
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
from datetime import datetime

from models import Lead as LeadModel, Base, Visit as VisitModel
from db import engine, get_db

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # replace with frontend origin in production
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create DB tables on startup
@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

# Pydantic schema
class Lead(BaseModel):
    name: str
    email: str
    phone: str = ""
    message: str = ""
    source: str = ""

@app.get("/")
async def home():
    return {"message": "Welcome to the Leads API"}

@app.post("/submit")
async def submit_lead(lead: Lead, db: AsyncSession = Depends(get_db)):
    new_lead = LeadModel(
        name=lead.name,
        email=lead.email,
        phone=lead.phone,
        message=lead.message,
        source=lead.source
    )
    db.add(new_lead)
    await db.commit()
    await db.refresh(new_lead)
    print("✅ New lead saved:", new_lead)
    return {"success": True, "message": "Lead stored successfully"}

@app.get("/track/visit")
async def track_visit(request: Request, db: AsyncSession = Depends(get_db)):
    ip = request.client.host
    source = request.query_params.get("utm_source", "direct")

    visit = VisitModel(ip=ip, source=source)
    db.add(visit)
    await db.commit()

    print(f"📈 Visit logged from {ip} via {source}")
    return {"status": "ok"}

@app.get("/analytics")
async def get_analytics(db: AsyncSession = Depends(get_db)):
    lead_count = await db.scalar(func.count(LeadModel.id))
    visit_count = await db.scalar(func.count(VisitModel.id))
    unique_visitors = await db.scalar(select(func.count(func.distinct(VisitModel.ip))))
    return {
        "total_visits": visit_count,
        "total_leads": lead_count,
        "unique_visitors": unique_visitors
    }