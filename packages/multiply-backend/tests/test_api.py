import pytest
from src.api import app

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_create_user(client):
    response = client.post('/user', json={
        'firstName': 'Jan',
        'email': 'jan@multiply.ai'
    })
    assert response.status_code == 201
    data = response.get_json()
    assert 'userId' in data

def test_create_user_existing_email(client):
    # Create first user
    client.post('/user', json={
        'firstName': 'Jan',
        'email': 'jan@multiply.ai'
    })
    # Attempt to create second user with same email
    response = client.post('/user', json={
        'firstName': 'Jan',
        'email': 'jan@multiply.ai'
    })
    assert response.status_code == 400
    data = response.get_json()
    assert 'error' in data
    assert data['error'] == 'Email already registered'

def test_create_goal(client):
    response = client.post('/goal', json={
        'goalType': 'WEDDING',
        'targetAmount': 100.00
    })
    assert response.status_code == 201
    data = response.get_json()
    assert 'goalId' in data

def test_update_goal(client):
    # Create a goal first
    create_response = client.post('/goal', json={
        'goalType': 'NEW_CAR',
        'targetAmount': 15000.00
    })
    goal_id = create_response.get_json()['goalId']

    # Update the goal
    update_response = client.post('/goal', json={
        'goalId': goal_id,
        'targetAmount': 20000.00
    })
    assert update_response.status_code == 200
    data = update_response.get_json()
    assert 'goalId' in data
    assert data['goalId'] == goal_id

def test_get_goal(client):
    # Create a goal first
    create_response = client.post('/goal', json={
        'goalType': 'HOMEBUYING',
        'targetAmount': 300000.00
    })
    goal_id = create_response.get_json()['goalId']

    # Retrieve the goal
    get_response = client.get('/goal', json={'goalId': goal_id})
    assert get_response.status_code == 200
    goal_data = get_response.get_json()
    assert goal_data['goal_id'] == goal_id
    assert goal_data['goal_type'] == 'HOMEBUYING'
    assert goal_data['target_amount'] == 300000.00

def test_get_goal_not_found(client):
    response = client.get('/goal', json={'goalId': 'nonexistent-id'})
    assert response.status_code == 404
    data = response.get_json()
    assert 'error' in data
    assert data['error'] == 'Goal not found'
