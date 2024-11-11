from src.models import User
from typing import Optional
from threading import Lock

from src.interfaces.UserRepositoryInterface import UserRepositoryInterface

# Import the global stores
from src.utils.storage import USER_STORE

class UserRepository(UserRepositoryInterface):
    _lock = Lock()

    def save(self, user: User) -> None:
        with self._lock:
            USER_STORE[user.user_id] = user

    def findByEmail(self, email: str) -> Optional[User]:
        with self._lock:
            return next((u for u in USER_STORE.values() if u.email == email), None)

    def findById(self, userId: str) -> Optional[User]:
        with self._lock:
            return USER_STORE.get(userId)
