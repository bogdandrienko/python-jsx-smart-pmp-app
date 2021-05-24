from imaplib import IMAP4_SSL
import email
import re
import time


YA_HOST = "imap.yandex.ru"
YA_PORT = 994
YA_USER = ""
YA_PASSWORD = ""
SENDER = ""

connection = IMAP4_SSL(host=YA_HOST, port=YA_PORT)
connection.login(user=YA_USER, password=YA_PASSWORD)
status, msgs = connection.select('INBOX')
assert status == 'OK'
last_mes_id = 15
while True:
status, msgs = connection.select('INBOX')
typ, data = connection.search(None, 'TO', '{}'.format(YA_USER))
for num in data[0].split():
typ, message_data= connection.fetch(num, '(RFC822)')
if last_mes_id < int(num.decode()):
last_mes_id = int(num.decode())
print('пришло новое сообщение')
print(num, 'от', message_data[0][1].decode().split('\r\n')[-5][12:],
message_data[0][1].decode().split('\r\n')[-2])
#print('Message %s\n%s\n' % (num, message_data[0][1].decode().split('\r\n')))
time.sleep(5)

connection.close()
connection.logout()

server = smtplib.SMTP(HOST, 587, timeout=10)
server.set_debuglevel(1)
try:
server.starttls()
server.login('', '')
server.sendmail(FROM, TO, BODY)
finally:
server.quit()