from flask import Flask
from src.routes.UserRoutes import userRoutes
from src.routes.GoalRoutes import goalRoutes

def registerRoutes(app: Flask):
    app.register_blueprint(userRoutes)
    app.register_blueprint(goalRoutes)