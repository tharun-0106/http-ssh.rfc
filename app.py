from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allows your React frontend (running on localhost:3000) to access Flask backend

# Dummy user for demo
users = {
    'admin': 'password123',
    'user1': 'pass1'
}

@app.route('/', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Missing username or password'}), 400

    if username in users and users[username] == password:
        return jsonify({'message': 'Login successful', 'token': 'fake-jwt-token'}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

if __name__ == '__main__':
    app.run(debug=True,port=5177)
