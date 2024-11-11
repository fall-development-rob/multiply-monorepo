
from abc import ABC, abstractmethod
from src.models import User

class UserServiceInterface(ABC):
    @abstractmethod
    def createUser(self, user_data: User) -> User:
        pass