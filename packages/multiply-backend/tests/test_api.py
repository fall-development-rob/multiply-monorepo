import pytest
from src.api import app

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_createUser(client):
    response = client.post('/user', json={
        'firstName': 'Jan',
        'email': 'jan@multiply.ai'
    })
    assert response.status_code == 201
    data = response.get_json()
    assert 'userId' in data
