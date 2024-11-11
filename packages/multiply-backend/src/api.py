from flask import Flask, request, jsonify

from src.models.User import User

from src.services.UserService import UserService

from src.repositories.UserRepository import UserRepository
import logging

app = Flask(__name__)
logger = logging.getLogger(__name__)

@app.route('/user', methods=['POST'])
def createUser():
    try:
        data = request.get_json()
        user_data = User(**data)

        user_service = UserService(UserRepository())

        user = user_service.create_user(user_data)
        return jsonify({'userId': user.user_id}), 201
    except Exception as e:
        logger.exception("Unhandled exception in create_user.")
        return jsonify({'error': 'An internal error occurred.'}), 500
    