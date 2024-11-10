# Use the official Python image for production
FROM python:3.13

ENV PYTHONUNBUFFERED=1
WORKDIR /app

RUN pip install --upgrade pip

# Install Poetry
RUN pip install poetry

RUN poetry cache clear --all pypi

# Copy dependency files
COPY pyproject.toml poetry.lock ./

# Debugging step: Show installed packages to confirm packaging is installed
# RUN python -m pip show packaging && poetry --version

# Install dependencies without creating virtual environments
RUN poetry config virtualenvs.create false && poetry install --no-interaction --no-ansi

# Copy the application code
COPY . .

# Expose port 5000 for Flask
EXPOSE 5000

# Run the application in production mode (e.g., with Gunicorn)
CMD ["poetry", "run", "gunicorn", "-b", "0.0.0.0:5000", "app:app"]
