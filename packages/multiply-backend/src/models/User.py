import datetime as dt

from pydantic import Field, BaseModel, dataclasses
# from pydantic.dataclasses import dataclass
import uuid

@dataclasses.dataclass(frozen=True)
class User:
    user_id: str = Field(default_factory=lambda: str(uuid.uuid4()), alias='userId')
    first_name: str = Field(..., alias='firstName')
    # email: str

    class Config:
        populate_by_name = True
