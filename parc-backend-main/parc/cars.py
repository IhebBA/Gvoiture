from flask import (
    Blueprint, flash, g, redirect, request, jsonify
)
from werkzeug.exceptions import abort
import json

from parc.db import get_db

bp = Blueprint('cars', __name__, url_prefix='/cars')


@bp.route('/')
def index():
    db = get_db()
    rows = db.execute(
        'SELECT matricule, marque, modele, type, energie,date,dernière_vidange'
        ' FROM cars '
        
    ).fetchall()

    return jsonify(rows)

@bp.route('/delete/<id>', methods=['DELETE'])
def delete(id):
    db = get_db()
    db.execute("DELETE FROM cars WHERE matricule = ?",(id,))
    db.commit()
    return {"message": "cars deleted successfully!"}, 201


@bp.route('/modifier/<id>', methods=['PUT'])
def modifier(id):
    matricule = request.json['matricule']
    marque = request.json['marque']
    modele = request.json['modele']
    typecars = request.json['type']
    energie = request.json['energie']
    date = request.json['date']
    dernière_vidange = request.json['dernière_vidange']
    #prochain_vidange = request.json['prochain_vidange']
    #Kilométrage = request.json['Kilométrage']
    

    db = get_db()
    db.execute("UPDATE cars SET  marque = ? , modele = ? , type = ? , energie =? ,date = ?,dernière_vidange = ? WHERE matricule = ? ",(marque, modele, typecars, energie,date,dernière_vidange,id,))
    db.commit()
    return {"message": "cars update successfully!"}, 201




@bp.route('/create', methods=['POST'])
def create():
    matricule = request.json['matricule']
    marque = request.json['marque']
    modele = request.json['modele']
    typecars = request.json['type']
    energie = request.json['energie']
    date = request.json['date']
    dernière_vidange = request.json['dernière_vidange']
    #prochain_vidange = request.json['prochain_vidange']
    #Kilométrage = request.json['Kilométrage']
    error = None

    if not matricule:
        error = 'matricule is required.'

    if error is not None:
        flash(error)
    else:
        db = get_db()
        db.execute(
            'INSERT INTO cars (matricule, marque, modele, type, energie,date,dernière_vidange)'
            ' VALUES (?, ?, ?, ?, ?, ?,?)',
            (matricule, marque, modele, typecars, energie,date,dernière_vidange)
        )
        db.commit()
    return {"message": "cars added successfully!"}, 201


@bp.route('/getone/<id>',methods=["GET"])
def getone(id):
    db = get_db()
    res = db.execute("SELECT * FROM cars WHERE matricule = ?",(id,)).fetchall()
    return jsonify(res)



