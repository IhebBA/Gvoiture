from flask import (
    Blueprint, flash, g, redirect, request, jsonify
)
from werkzeug.exceptions import abort
import json

from parc.db import get_db

bp = Blueprint('missions', __name__, url_prefix='/missions')


@bp.route('/')
def index():
    db = get_db()
    rows = db.execute(
        'SELECT m.id, m.date, m.distance, m.carburant, m.nom, c.matricule, a.nom AS chauffeur'
        ' FROM missions m'
        ' INNER JOIN cars c on m.car_mat = c.matricule'
        ' INNER JOIN agents a on m.chauffeur_id = a.idA'
    ).fetchall()

    return jsonify(rows)

@bp.route('/delete/<id>', methods=['DELETE'])
def delete(id):
    db = get_db()
    db.execute("DELETE FROM missions WHERE id = ?",(id,))
    db.commit()
    return {"message": "Mission deleted successfully!"}, 201


@bp.route('/modifier/<id>', methods=['PUT'])
def modifier(id):
    distance = request.json['distance']
    carburant = request.json['carburant']
    date = request.json['date']
    car_mat = request.json['car_mat']
    nom = request.json['nom']
    chauffeur_id = request.json['chauffeur_id']

    db = get_db()
    db.execute("UPDATE missions SET  nom = ? , distance = ? ,carburant = ? , chauffeur_id = ? , car_mat =? , date = ? WHERE id = ? ",(nom, distance, carburant, chauffeur_id, car_mat, date,id,))
    db.commit()
    return {"message": "Mission update successfully!"}, 201




@bp.route('/create', methods=['POST'])
def create():
    distance = request.json['distance']
    carburant = request.json['carburant']
    date = request.json['date']
    car_mat = request.json['car_mat']
    nom = request.json['nom']
    chauffeur_id = request.json['chauffeur_id']
    error = None

    if not distance:
        error = 'distance is required.'

    if error is not None:
        flash(error)
    else:
        db = get_db()
        db.execute(
            'INSERT INTO missions (nom, distance, carburant, chauffeur_id, car_mat, date)'
            ' VALUES (?, ?, ?, ?, ?, ?)',
            (nom, distance, carburant, chauffeur_id, car_mat, date)
        )
        db.commit()
    return {"message": "Mission added successfully!"}, 201


@bp.route('/get', methods=['GET'])
def mission():
    startDate = request.args.get('startDate')
    endDate = request.args.get('endDate')

    error = None

    if not startDate:
        error = 'Start Date is required.'

    if not endDate:
        error = 'End Date is required.'

    if error is not None:
        flash(error)
    else:
        db = get_db()
        missions = db.execute(
            'SELECT distance, carburant, car_mat FROM MISSIONS WHERE date between ? AND ?',
            (startDate, endDate)
        ).fetchall()
    return jsonify(missions)


@bp.route('/getone/<id>',methods=["GET"])
def getone(id):
    db = get_db()
    res = db.execute("SELECT * FROM missions WHERE id = ?",(id,)).fetchall()
    print(res)
    return jsonify(res)

@bp.route('/getDistance/<id>',methods=["GET"])
def getDistance(id):
    db = get_db()
    res = db.execute("SELECT distance FROM missions WHERE car_mat = ?",(id,)).fetchall()
    print(res)
    return jsonify(res)