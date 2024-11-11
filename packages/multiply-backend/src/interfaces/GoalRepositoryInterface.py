
from abc import ABC, abstractmethod
from typing import Optional, Dict
from src.models import Goal

class GoalRepositoryInterface(ABC):
    @abstractmethod
    def save(self, goal: Goal) -> None:
        pass

    @abstractmethod
    def find_by_id(self, goal_id: str) -> Optional[Goal]:
        pass

    @abstractmethod
    def update(self, goal_id: str, updates: Dict) -> Optional[Goal]:
        pass