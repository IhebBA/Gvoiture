from flask import (
    Blueprint, flash, g, redirect, request, jsonify
)
from werkzeug.exceptions import abort
import json

from parc.db import get_db

bp = Blueprint('agents', __name__, url_prefix='/agents')


@bp.route('/')
def index():
    db = get_db()
    rows = db.execute(
        'SELECT a.id, a.idA , a.cin, a.nom,a.date ' 
        ' FROM agents a '
        
    ).fetchall()

    return jsonify(rows)

@bp.route('/delete/<id>', methods=['DELETE'])
def delete(id):
    db = get_db()
    db.execute("DELETE FROM agents WHERE id = ?",(id,))
    db.commit()
    return {"message": "agents deleted successfully!"}, 201


@bp.route('/modifier/<id>', methods=['PUT'])
def modifier(id):
    idA = request.json['idA']
    cin = request.json['cin']
    nom = request.json['nom']
    date = request.json['date']
    
    db = get_db()
    db.execute("UPDATE agents SET  idA = ? ,cin = ? , nom = ?,date = ?   WHERE id = ? ",(idA,cin, nom,date,id,))
    db.commit()
    return {"message": "agents update successfully!"}, 201




@bp.route('/create', methods=['POST'])
def create():
    idA = request.json['idA']
    cin = request.json['cin']
    nom = request.json['nom']
    date = request.json['date']
    error = None

    if not cin:
        error = 'cin is required.'

    if error is not None:
        flash(error)
    else:
        db = get_db()
        db.execute(
            'INSERT INTO agents (idA,cin, nom,date)'
            ' VALUES (?, ?,?,?)',
            (idA,cin, nom,date)
        )
        db.commit()
    return {"message": "agents added successfully!"}, 201





@bp.route('/getone/<id>',methods=["GET"])
def getone(id):
    db = get_db()
    res = db.execute("SELECT * FROM agents WHERE id = ?",(id,)).fetchall()
    return jsonify(res)
    


