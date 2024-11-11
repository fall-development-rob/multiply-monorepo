
from abc import ABC, abstractmethod
from src.models import User

class UserServiceInterface(ABC):
    @abstractmethod
    def create_user(self, user_data: User) -> User:
        pass