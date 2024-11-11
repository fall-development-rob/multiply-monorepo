import logging

from flask import Blueprint, jsonify, request

from src.models.User import User

from src.services.UserService import UserService

logger = logging.getLogger(__name__)

userRoutes = Blueprint('userRoutes', __name__, url_prefix='/user')

userService = UserService()

@userRoutes.route('', methods=['POST'])
def createUser():
    try:
        data = request.get_json()
        userData = User(**data)

        user = userService.createUser(userData)
        return jsonify({'userId': user.user_id}), 201
    except Exception as e:
        logger.exception("Unhandled exception in createUser.")
        return jsonify({'error': 'An internal error occurred.'}), 500
    
@userRoutes.route('/<userId>', methods=['GET'])
def findUser(userId):
    try:
        user = userService.getUser(userId)
        return jsonify(user.model_dump(by_alias=True)), 200
    except Exception as e:
        logger.exception("Unhandled exception in findUser.")
        return jsonify({'error': 'An internal error occurred.'}), 500