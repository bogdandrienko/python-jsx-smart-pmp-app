# The code is placed into public domain by anatoly techtonik
# Feel free to copy/paste wherever you like

# Absolutely minimal example of PySide application with button calling dialog

# More info about Qt dialogs:
# http://www.pyside.org/docs/pyside/PySide/QtGui/QDialog.html#PySide.QtGui.QDialog

from PySide.QtGui import QApplication, QPushButton, QColorDialog, QMessageBox,\
                         QPixmap


def choose_color():
    # Select color
    color  = QColorDialog().getColor()
    
    # Report about result of selection in QMessageBox dialog
    msgbox = QMessageBox()
    if color.isValid():
        # Create a memory image 50x50 filled with selected color to display
        # as a icon in the msgbox dialog
        pixmap = QPixmap(50, 50)
        pixmap.fill(color)
        msgbox.setWindowTitle(u'Selected Color')
        msgbox.setIconPixmap(pixmap)
    else:
        msgbox.setWindowTitle(u'No Color was Selected')
    msgbox.exec_()


app = QApplication([])
    
# Create top level window/button
button = QPushButton('Choose Color')
# Call function that invokes color selection dialog when the button is clicked
button.clicked.connect(choose_color)
button.show()

app.exec_()

