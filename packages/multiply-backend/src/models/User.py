from pydantic import Field, BaseModel
import uuid

class User(BaseModel):
    user_id: str = Field(default_factory=lambda: str(uuid.uuid4()), alias='userId')
    first_name: str = Field(..., alias='firstName')
    email: str = Field(...)

    class Config:
        populate_by_name = True
