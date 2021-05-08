# The code is placed into public domain by anatoly techtonik
# Feel free to copy/paste wherever you like

# This is absolutely minimal example of PySide application
from PySide.QtGui import QApplication

# Here an application object is created. It is the main
# entrypoint through which you control underlying Qt framework.
app = QApplication([])
# Framework is quite powerful and contains a lot of stuff that
# is useful in languages like C++, but in Python there are usually
# better alternatives.

# For example, empty list parameter [] to QApplication is a list
# of command line arguments if you want to parse them with Qt,
# but in Python apps it is usually done with optparse.

# The next line starts the Qt/PySide application, which then waits
# for events to process. But we haven't define any windows to
# catch those events, so the app will just hang if we uncomment it
# app.exec_()

