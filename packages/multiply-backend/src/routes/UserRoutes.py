from flask import Blueprint, jsonify, request

from src.models.User import User

from src.services.UserService import UserService

import logging

logger = logging.getLogger(__name__)

userRoutes = Blueprint('userRoutes', __name__, url_prefix='/user')

@userRoutes.route('', methods=['POST'])
def createUser():
    try:
        data = request.get_json()
        userData = User(**data)

        userService = UserService()

        user = userService.createUser(userData)
        return jsonify({'userId': user.user_id}), 201
    except Exception as e:
        logger.exception("Unhandled exception in createUser.")
        return jsonify({'error': 'An internal error occurred.'}), 500