from flask import (
    Blueprint, flash, g, redirect, request, jsonify
)
from werkzeug.exceptions import abort
import json

from parc.db import get_db

bp = Blueprint('maintenances', __name__, url_prefix='/maintenances')


@bp.route('/')
def index():
    db = get_db()
    rows = db.execute(
        'SELECT m.id, m.date, m.montant, m.description, m.car_mat'
        ' FROM maintenances m'
    ).fetchall()

    return jsonify(rows)

@bp.route('/delete/<id>', methods=['DELETE'])
def delete(id):
    db = get_db()
    db.execute("DELETE FROM maintenances WHERE id = ?",(id,))
    db.commit()
    return {"message": "Mission deleted successfully!"}, 201


@bp.route('/create', methods=['POST'])
def create():
    date = request.json['date']
    car_mat = request.json['car_mat']
    montant = request.json['montant']
    description = request.json['description']
    
    error = None

    if not montant:
        error = 'Montant is required.'

    if error is not None:
        flash(error)
    else:
        db = get_db()
        db.execute(
            'INSERT INTO maintenances (montant, description, date, car_mat)'
            ' VALUES (?, ?, ?, ?)',
            (montant, description, date, car_mat)
        )
        db.commit()
    return {"message": "Maintenance added successfully!"}, 201


@bp.route('/modifier/<id>', methods=['PUT'])
def modifier(id):
    date = request.json['date']
    car_mat = request.json['car_mat']
    montant = request.json['montant']
    description = request.json['description']
    db = get_db()
    db.execute("UPDATE maintenances SET  montant = ? , description = ? ,date = ? , car_mat = ?  WHERE id = ? ",(montant, description, date, car_mat,id,))
    db.commit()
    return {"message": "maintenances update successfully!"}, 201


@bp.route('/get', methods=['GET'])
def maintenances():
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
            'SELECT montant, description, car_mat, date FROM maintenances WHERE date between ? AND ?',
            (startDate, endDate)
        ).fetchall()
    return jsonify(missions)



@bp.route('/getone/<id>',methods=["GET"])
def getone(id):
    db = get_db()
    res = db.execute("SELECT * FROM maintenances WHERE id = ?",(id,)).fetchall()
    print(res)
    return jsonify(res)