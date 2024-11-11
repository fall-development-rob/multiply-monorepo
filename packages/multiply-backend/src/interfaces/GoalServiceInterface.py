
from abc import ABC, abstractmethod
from typing import Optional, Dict
from src.models import Goal

class GoalServiceInterface(ABC):
    @abstractmethod
    def create_goal(self, goal_data: Goal) -> Goal:
        pass

    @abstractmethod
    def update_goal(self, goal_id: str, updates: Dict) -> Goal:
        pass

    @abstractmethod
    def get_goal(self, goal_id: str) -> Goal:
        pass