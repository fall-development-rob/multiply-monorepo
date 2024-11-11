import datetime as dt
from pydantic import Field, BaseModel, validator
import uuid

ALLOWED_GOAL_TYPES = {'WEDDING', 'HOMEBUYING', 'NEW_CAR', 'CUSTOM'}

class Goal(BaseModel):
    goal_id: str = Field(default_factory=lambda: str(uuid.uuid4()), alias='goalId')
    user_id: str = Field(..., alias='userId')
    goal_type: str = Field(..., alias='goalType')
    target_amount: float = Field(default=0.00, alias='targetAmount')

    class Config:
        populate_by_name = True
        allow_population_by_alias = True
        arbitrary_types_allowed = True

    @validator('goal_type')
    def validate_goal_type(cls, value):
        if value not in ALLOWED_GOAL_TYPES:
            raise ValueError(f"Invalid goalType. Allowed types are {ALLOWED_GOAL_TYPES}.")
        return value
