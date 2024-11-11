import logging
from src.models.User import User
from src.interfaces.UserRepositoryInterface import UserRepositoryInterface
from typing import Dict

logger = logging.getLogger(__name__)

class UserService:
    def __init__(self, user_repo: UserRepositoryInterface):
        self.user_repo = user_repo

    def create_user(self, user_data: User) -> User:
        if self.user_repo.find_by_id(user_data.user_id):
            logger.warning(f"Attempt to create user with existing email: {user_data.email}")
            raise Exception("Email already exists.")
        self.user_repo.save(user_data)
        logger.info(f"User created with ID: {user_data.user_id}")
        return user_data
