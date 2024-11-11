from threading import Lock
from typing import Optional, Dict
from src.models.Goal import Goal
from src.utils.storage import GOAL_STORE
from src.interfaces.GoalRepositoryInterface import GoalRepositoryInterface

class GoalRepository(GoalRepositoryInterface):
    _lock = Lock()

    def save(self, goal: Goal) -> None:
        with self._lock:
            GOAL_STORE[goal.goal_id] = goal

    def find_by_id(self, goal_id: str) -> Optional[Goal]:
        with self._lock:
            return GOAL_STORE.get(goal_id)

    def update(self, goal_id: str, updates: Dict) -> Optional[Goal]:
        with self._lock:
            goal = GOAL_STORE.get(goal_id)

            if goal:
                data = goal.dict(by_alias=True)
                # Merge updates
                data.update(updates)
                updated_goal = Goal(**data)
                GOAL_STORE[goal_id] = updated_goal
                return updated_goal
            return None
