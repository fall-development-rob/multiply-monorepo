# Use the official Python image for production
FROM python:3.9-slim

ENV PYTHONUNBUFFERED=1
WORKDIR /app

# Install Poetry
RUN pip install poetry

# Copy dependency files
COPY pyproject.toml poetry.lock ./

# Install dependencies without creating virtual environments
RUN poetry config virtualenvs.create false && poetry install --no-interaction --no-ansi

# Copy the application code
COPY . .

# Expose port 5000 for Flask
EXPOSE 5000

# Run the application in production mode (e.g., with Gunicorn)
CMD ["poetry", "run", "gunicorn", "-b", "0.0.0.0:5000", "app:app"]
