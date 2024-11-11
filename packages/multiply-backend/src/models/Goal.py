import datetime as dt
from dataclasses import dataclass
from User import User

@dataclass(frozen=True)
class Goal:
    user: User
    goal_type: str
    target_amount: float
    target_date: dt.date
