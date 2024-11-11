from flask import Flask
from src.routes.UserRoutes import userRoutes

def registerRoutes(app: Flask):
    app.register_blueprint(userRoutes)