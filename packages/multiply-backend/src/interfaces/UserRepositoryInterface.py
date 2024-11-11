
from abc import ABC, abstractmethod
from typing import Optional
from src.models import User

class UserRepositoryInterface(ABC):
    @abstractmethod
    def save(self, user: User) -> None:
        pass

    @abstractmethod
    def findByEmail(self, email: str) -> Optional[User]:
        pass

    @abstractmethod
    def findById(self, userId: str) -> Optional[User]:
        pass