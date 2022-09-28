# Hugin API Cockpit
#
# Author: Marcus Cvjeticanin
# Location: Växjö, Sweden
# Website: https://github.com/mjovanc
# Project URL: https://github.com/kryptokrona/hugin-api

import os
import sys

from PyQt6.Widgets import QtWidgets, QtCore

from view.main_window import MainWindow

BASE_DIR = os.path.abspath('..')

def main():
    """Starting point of application."""
    app = QtWidgets.QApplication(sys.argv)

    # Initializing the MainWindow
    window = MainWindow()
    window.show()
    sys.exit(app.exec_())


if __name__ == '__main__':
    main()
