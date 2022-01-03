FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt .
COPY entrypoint.sh .

RUN pip install -r requrements.txt
RUN chmod +x entrypoint.sh

COPY . .

ENTRYPOINT ["/usr/src/app/entrypoint.sh"]