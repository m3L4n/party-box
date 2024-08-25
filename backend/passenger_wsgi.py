# passenger_wsgi.py

import sys
import os

venv_path = "/home/sifo9190/virtualenv/partybox/3.12/bin/python"
sys.path.insert(0, os.path.dirname(__file__))
sys.path.insert(0, venv_path)

from main import app as application
