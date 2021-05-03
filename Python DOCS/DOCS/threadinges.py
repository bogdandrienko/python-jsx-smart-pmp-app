import time
import threading
import multiprocessing

a = threading.Barrier()
b = multiprocessing.Barrier()


class HorseRace:
    def __init__(self):
        self.barrier = threading.lock()
        self.horses = ['Artax', 'Frankel', 'Bucephalus', 'Barton']

    def lead(self):
        horse = self.horses.pop()
        time.sleep(1.5)
