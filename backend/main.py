from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import polls, likes, users
from app.database import init_db

app = FastAPI(title="QuickPoll")

#  Correct CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#  Initialize database on startup
@app.on_event("startup")
def on_startup():
    init_db()

@app.get("/")
def home():
    return {"message": "Welcome to QuickPoll API 🚀"}

#  Include routers
app.include_router(polls.router)
app.include_router(likes.router)
app.include_router(users.router)
import logging
logging.basicConfig(level=logging.DEBUG)
