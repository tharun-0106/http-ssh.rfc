from flask import Flask, request, render_template, jsonify

app = Flask(__name__)

# Serve the login page
@app.route('/')
def home():
    return render_template('index.html')

# Receive command (this is for later, still fine)
@app.route('/execute', methods=['POST'])
def execute():
    data = request.get_json()
    command = data.get('command', '')
    return jsonify({
        "status": "received",
        "command": command
    })

# ✅ New: Login route to handle JSON login request
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Dummy credentials for now
    if username == "admin" and password == "admin123":
        return jsonify({"message": "Login successful!"}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

if __name__ == '__main__':
    app.run(debug=True)
