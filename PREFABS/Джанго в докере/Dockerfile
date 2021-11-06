FROM python:3.9-alpine

WORKDIR /project

ENV PYTHONDONTWRITECODE=1 \
    PYTHONUNBUFFERED=1

COPY . .

RUN apk add --update --np-cache --virtual .tmp-build-deps \
        gcc libc-dev linux-headers postgresql-dev && \
    pip install --no-cache-dir -r requirements.txt