from flask import Blueprint, jsonify, request

from dataclasses import asdict

from src.models.Goal import Goal

from src.services.GoalService import GoalService

import logging

logger = logging.getLogger(__name__)

goalRoutes = Blueprint('goalRoutes', __name__, url_prefix='/goal')

goalService = GoalService()

@goalRoutes.route('', methods=['POST'])
def createGoal():
    try:
        data = request.get_json()
        goalData = Goal(**data)

        goalService = GoalService()

        goal = goalService.create_goal(goalData)
        return jsonify({'goalId': goal.goal_id}), 201
    except Exception as e:
        logger.exception("Unhandled exception in createGoal.")
        return jsonify({'error': 'An internal error occurred.'}), 500
    
@goalRoutes.route('/<goalId>', methods=['GET'])
def get_goal(goalId):
    try:
        goal = goalService.get_goal(goalId)
        return jsonify(goal.model_dump(by_alias=True)), 200

    except Exception as e:
        logger.exception("Unhandled exception in get_goal.")
        return jsonify({'error': 'An internal error occurred.'}), 500
    
@goalRoutes.route('/update/<goalId>', methods=['PUT', 'PATCH'])
def updateGoal(goalId):
    try:
        updates = request.get_json()
        if not updates:
            logger.warning("Invalid or missing JSON body.")
            return jsonify({'error': 'Invalid or missing JSON body.'}), 400
            
        goal = goalService.update_goal(goalId, updates)
        return jsonify({'goalId': goal.goal_id}), 200

    except Exception as e:
        logger.exception("Unhandled exception in update_goal.")
        return jsonify({'error': 'An internal error occurred.'}), 500