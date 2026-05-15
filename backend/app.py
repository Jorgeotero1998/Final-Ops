from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity
)
from datetime import datetime

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///tasks.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "secret-key"

db = SQLAlchemy(app)

bcrypt = Bcrypt(app)

jwt = JWTManager(app)

CORS(app)

class User(db.Model):

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    email = db.Column(
        db.String(120),
        unique=True,
        nullable=False
    )

    password = db.Column(
        db.String(255),
        nullable=False
    )

class Task(db.Model):

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    title = db.Column(
        db.String(200),
        nullable=False
    )

    description = db.Column(
        db.Text
    )

    status = db.Column(
        db.String(50),
        default="Pending"
    )

    priority = db.Column(
        db.String(50),
        default="Medium"
    )

    due_date = db.Column(
        db.String(100)
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    user_id = db.Column(
        db.Integer
    )

    def serialize(self):

        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "status": self.status,
            "priority": self.priority,
            "due_date": self.due_date
        }

@app.route("/api/register", methods=["POST"])
def register():

    data = request.json

    user_exists = User.query.filter_by(
        email=data["email"]
    ).first()

    if user_exists:

        return jsonify({
            "error": "User exists"
        }), 400

    hashed_password = bcrypt.generate_password_hash(
        data["password"]
    ).decode("utf-8")

    user = User(
        email=data["email"],
        password=hashed_password
    )

    db.session.add(user)

    db.session.commit()

    token = create_access_token(
        identity=str(user.id)
    )

    return jsonify({
        "token": token
    })

@app.route("/api/login", methods=["POST"])
def login():

    data = request.json

    user = User.query.filter_by(
        email=data["email"]
    ).first()

    if not user:

        return jsonify({
            "error": "Invalid credentials"
        }), 401

    valid = bcrypt.check_password_hash(
        user.password,
        data["password"]
    )

    if not valid:

        return jsonify({
            "error": "Invalid credentials"
        }), 401

    token = create_access_token(
        identity=str(user.id)
    )

    return jsonify({
        "token": token
    })

@app.route("/api/tasks", methods=["GET"])
@jwt_required()
def get_tasks():

    user_id = int(
        get_jwt_identity()
    )

    tasks = Task.query.filter_by(
        user_id=user_id
    ).all()

    return jsonify([
        task.serialize()
        for task in tasks
    ])

@app.route("/api/tasks", methods=["POST"])
@jwt_required()
def create_task():

    data = request.json

    user_id = int(
        get_jwt_identity()
    )

    task = Task(
        title=data["title"],
        description=data.get("description"),
        status=data.get("status"),
        priority=data.get("priority"),
        due_date=data.get("due_date"),
        user_id=user_id
    )

    db.session.add(task)

    db.session.commit()

    return jsonify(task.serialize())

@app.route("/api/tasks/<int:id>", methods=["PUT"])
@jwt_required()
def update_task(id):

    task = Task.query.get(id)

    if not task:

        return jsonify({
            "error": "Task not found"
        }), 404

    data = request.json

    task.title = data.get(
        "title",
        task.title
    )

    task.description = data.get(
        "description",
        task.description
    )

    task.status = data.get(
        "status",
        task.status
    )

    task.priority = data.get(
        "priority",
        task.priority
    )

    task.due_date = data.get(
        "due_date",
        task.due_date
    )

    db.session.commit()

    return jsonify(task.serialize())

@app.route("/api/tasks/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_task(id):

    task = Task.query.get(id)

    if not task:

        return jsonify({
            "error": "Task not found"
        }), 404

    db.session.delete(task)

    db.session.commit()

    return jsonify({
        "message": "Deleted"
    })

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
