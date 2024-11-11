from src.models import User
from typing import Optional
from threading import Lock

# Import the global stores
from src.utils.storage import USER_STORE

class UserRepository:
    _lock = Lock()

    def save(self, user: User) -> None:
        with self._lock:
            USER_STORE[user.user_id] = user

    def find_by_email(self, email: str) -> Optional[User]:
        with self._lock:
            return next((u for u in USER_STORE.values() if u.email == email), None)

    def find_by_id(self, user_id: str) -> Optional[User]:
        with self._lock:
            return USER_STORE.get(user_id)
