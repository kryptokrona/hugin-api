import os

from configparser import ConfigParser
from PyQt6.QtWidgets import QMainWindow
from PyQt6 import QtWidgets, uic

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
UI_FILE = os.path.join(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ui'), 'window_main.ui')

parser = ConfigParser()
parser.read(os.path.join(BASE_DIR, 'settings.ini'),)


class MainWindow(QMainWindow):
    """
    Displays the Main Window.
    """
    def __init__(self):
        super().__init__()
        uic.loadUi(UI_FILE, self)
        self.setWindowTitle(parser.get('default', 'window_title'))
