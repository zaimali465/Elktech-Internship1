from flask import Flask, request, jsonify
app = Flask(__name__)

users = [
    {"id": 1, "name": "Zain"},
    {"id": 2, "name": "Ali"}
]
@app.route('/users', methods=['GET'])
def get_users():
    return jsonify(users)
@app.route('/users', methods=['POST'])
def add_user():
    data = request.get_json()
    if not data or "name" not in data:
        return jsonify({"error": "Name is required"}), 400

    new_user = {
        "id": len(users) + 1,
        "name": data["name"]
    }
    users.append(new_user)
    return jsonify(new_user), 201
if __name__ == '__main__':
    app.run(debug=True)
