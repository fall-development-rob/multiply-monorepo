import logging
from src.models.User import User
from src.interfaces.UserRepositoryInterface import UserRepositoryInterface
from src.interfaces.UserServiceInterface import UserServiceInterface

from src.repositories.UserRepository import UserRepository

logger = logging.getLogger(__name__)

class UserService(UserServiceInterface):
    def __init__(self, userRepo: UserRepositoryInterface = UserRepository()):
        self.userRepo = userRepo

    def createUser(self, userData: User) -> User:
        if self.userRepo.findById(userData.user_id):
            logger.warning(f"Attempt to create user with existing email: {userData.email}")
            raise Exception("Email already exists.")
        self.userRepo.save(userData)
        logger.info(f"User created with ID: {userData.user_id}")
        return userData
    
    def getUser(self, userId: str) -> User:
        user = self.userRepo.findById(userId)
        if not user:
            logger.warning(f"Attempt to retrieve non-existent user ID: {userId}")
            raise Exception("User not found.")
        logger.info(f"User retrieved with ID: {user.user_id}")
        return user
