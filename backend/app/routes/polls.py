from fastapi import APIRouter, Depends, HTTPException, Body
from sqlmodel import Session, select
from app.models import Poll
from app.database import get_session

router = APIRouter(prefix="/polls", tags=["Polls"])

#  Create poll
@router.post("/")
def create_poll(poll: Poll, session: Session = Depends(get_session)):
    session.add(poll)
    session.commit()
    session.refresh(poll)
    return poll

#  Get all polls
@router.get("/")
def get_polls(session: Session = Depends(get_session)):
    polls = session.exec(select(Poll)).all()
    return polls

#  Vote for an option (fixed)
@router.post("/{poll_id}/vote/")
def vote_poll(
    poll_id: int,
    data: dict = Body(...),
    session: Session = Depends(get_session)
):
    poll = session.get(Poll, poll_id)
    if not poll:
        raise HTTPException(status_code=404, detail="Poll not found")

    option_index = data.get("option_index")
    if option_index not in [0, 1]:
        raise HTTPException(status_code=400, detail="Invalid option index")

    #  Increase the right vote field
    if option_index == 0:
        poll.votes1 += 1
    else:
        poll.votes2 += 1

    session.add(poll)
    session.commit()
    session.refresh(poll)
    return poll

#  Like poll (optional)
@router.post("/{poll_id}/like/")
def like_poll(poll_id: int, session: Session = Depends(get_session)):
    print(f" Received like for poll {poll_id}")  # Debug line

    poll = session.get(Poll, poll_id)
    if not poll:
        raise HTTPException(status_code=404, detail="Poll not found")

    poll.likes = (poll.likes or 0) + 1
    session.add(poll)
    session.commit()
    session.refresh(poll)
    return poll


@router.delete("/{poll_id}")
def delete_poll(poll_id: int, session: Session = Depends(get_session)):
    poll = session.get(Poll, poll_id)
    if not poll:
        raise HTTPException(status_code=404, detail="Poll not found")
    
    session.delete(poll)
    session.commit()
    return {"message": f"Poll with ID {poll_id} deleted successfully"}

