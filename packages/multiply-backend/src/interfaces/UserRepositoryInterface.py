
from abc import ABC, abstractmethod
from typing import Optional
from src.models import User


class UserRepositoryInterface(ABC):
    @abstractmethod
    def save(self, user: User) -> None:
        pass

    @abstractmethod
    def find_by_email(self, email: str) -> Optional[User]:
        pass

    @abstractmethod
    def find_by_id(self, user_id: str) -> Optional[User]:
        pass