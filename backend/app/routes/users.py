from fastapi import APIRouter

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

@router.get("/")
def get_all_users():
    return {"message": "All users"}

@router.post("/")
def create_user():
    return {"message": "User created"}
