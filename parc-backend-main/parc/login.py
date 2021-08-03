from flask import (
    Blueprint, flash, g, redirect, request, jsonify
)
from werkzeug.exceptions import abort
import json

from parc.db import get_db


from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

bp = Blueprint('login', __name__, url_prefix='/login')





@bp.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    motpass = request.json.get("motpass", None)
    if email != "test" or motpass != "test":
        return jsonify({"msg": "Bad email or motpass"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token) 
    
@bp.route("/signin", methods=["POST"])
def signin():
    email = request.json.get("email", None)
    motpass = request.json.get("motpass", None)
    db = get_db()
    rows = db.execute("SELECT * FROM utilisateur WHERE email = ? and motpass = ?",(email,motpass)).fetchall()
    print(rows)
    if len(rows)>0:
        access_token = create_access_token(identity=email)
        return jsonify(rows)
    else:
        return jsonify({"msg": "Bad email or motpass"}), 401  


    