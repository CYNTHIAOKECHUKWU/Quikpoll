from sqlmodel import SQLModel, Field
from typing import Optional

class Poll(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    question: str
    option1: str
    option2: str
    votes1: int = 0
    votes2: int = 0
    likes: int = Field(default=0)
    