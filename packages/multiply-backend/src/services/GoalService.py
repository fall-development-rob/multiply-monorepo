import logging
from typing import Dict
from src.models import Goal
from src.repositories.GoalRepository import GoalRepository
from src.repositories.UserRepository import UserRepository
from src.interfaces import GoalServiceInterface, GoalRepositoryInterface, UserRepositoryInterface
from src.interfaces.GoalServiceInterface import GoalServiceInterface
from src.interfaces.GoalRepositoryInterface import GoalRepositoryInterface
from src.interfaces.UserRepositoryInterface import UserRepositoryInterface

logger = logging.getLogger(__name__)

class GoalService(GoalServiceInterface):
    def __init__(self, goal_repo: GoalRepositoryInterface = GoalRepository(), user_repo: UserRepositoryInterface = UserRepository()):
        self.goal_repo = goal_repo
        self.user_repo = user_repo

    def create_goal(self, goal_data: Goal) -> Goal:
        if not self.user_repo.findById(goal_data.user_id):
            logger.warning(f"Attempt to create goal for non-existent user ID: {goal_data.user_id}")
            raise Exception("User not found.")
        self.goal_repo.save(goal_data)
        logger.info(f"Goal created with ID: {goal_data.goal_id}")
        return goal_data

    def update_goal(self, goal_id: str, updates: Dict) -> Goal:
        goal = self.goal_repo.update(goal_id, updates)
        if not goal:
            logger.warning(f"Attempt to update non-existent goal ID: {goal_id}")
            raise Exception("Goal not found.")
        logger.info(f"Goal updated with ID: {goal.goal_id}")
        return goal

    def get_goal(self, goal_id: str) -> Goal:
        goal = self.goal_repo.find_by_id(goal_id)
        if not goal:
            logger.warning(f"Attempt to retrieve non-existent goal ID: {goal_id}")
            raise Exception("Goal not found.")
        logger.info(f"Goal retrieved with ID: {goal.goal_id}")
        return goal