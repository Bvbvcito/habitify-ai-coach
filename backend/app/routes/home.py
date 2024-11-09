from flask import Blueprint, request
from ..controllers.home_controller import get_home_data, post_home_data

bp = Blueprint('home', __name__)

@bp.route('/', methods = ["GET", "POST"])

def home():
    if request.method == "GET":
        return get_home_data()  
    
    if request.method == "POST":
        return post_home_data()