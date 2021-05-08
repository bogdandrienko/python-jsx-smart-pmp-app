# The code is placed into public domain by anatoly techtonik
# Feel free to copy/paste wherever you like

# Absolutely minimal example of PySide application with window

from PySide.QtGui import QApplication, QLabel

# Get entrypoint through which we control underlying Qt framework
app = QApplication([])

# Qt automatically creates top level application window if you
# instruct it to show() any GUI element
window = QLabel('Window from label')
window.show()

# IMPORTANT: `window` variable now contains a reference to a top
# level window, and if you lose the variable, the window will be
# destroyed by PySide automatically, e.g. this won't show:
# 
#   QLabel('New Window').show()
#
# This is true for other PySide objects, so be careful.

# Start Qt/PySide application. If we don't show any windows, the
# app would just loop at this point without the means to exit
app.exec_()

