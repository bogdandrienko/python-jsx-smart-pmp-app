import time
import sys
from colorama import init, Fore, AnsiToWin32

init(wrap=False)
stream = AnsiToWin32(sys.stderr).stream


def render(sec, minut, hour):
    print(Fore.GREEN + str(hour), Fore.WHITE + ":", Fore.BLUE + str(minut), Fore.WHITE + ":",
          Fore.RED + str(sec), file=stream)


def tick(seconds_, multiplayer_seconds):
    seconds_ += int(multiplayer_seconds)
    return seconds_


seconds = float(0)
minutes = float(0)
hours = float(0)
while True:
    seconds = tick(seconds, 1)
    if seconds > 59:
        seconds = float(0)
        minutes += 1
        if minutes > 59:
            minutes = float(0)
            hours += 1
            if hours > 24:
                hours = float(0)
                minutes = float(0)
                seconds = float(0)
    render(int(seconds), int(minutes), int(hours))
    time.sleep(1.0)
