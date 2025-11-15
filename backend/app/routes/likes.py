from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from app.database import get_session
from app.models import Poll

router = APIRouter(
    prefix="/polls",
    tags=["Polls Likes"]
)

@router.post("/{poll_id}/like/")
def like_poll(poll_id: int, session: Session = Depends(get_session)):
    poll = session.get(Poll, poll_id)
    if not poll:
        raise HTTPException(status_code=404, detail="Poll not found")

    #  Increment likes
    poll.likes = (poll.likes or 0) + 1
    session.add(poll)
    session.commit()
    session.refresh(poll)

    return {"message": "Poll liked!", "likes": poll.likes}
