from pydantic import Field, BaseModel
import uuid
from datetime import date

class User(BaseModel):
    user_id: str = Field(default_factory=lambda: str(uuid.uuid4()), alias='userId')
    first_name: str = Field(..., alias='firstName')
    last_name: str = Field(..., alias='lastName')
    email: str = Field(...)
    age: int = Field(...)
    birth_date: date = Field(..., alias='birthDate')
    has_significant_other: bool = Field(..., alias='hasSignificantOther')

    class Config:
        populate_by_name = True
