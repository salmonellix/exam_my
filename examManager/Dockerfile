# pull official base image
FROM python:3.9-alpine


# set environment variables
ENV PYTHONUNBUFFERED 1

RUN mkdir /exam_manager
WORKDIR /exam_manager

# install psycopg2 dependencies
RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# copy project
COPY . .

## copy entrypoint.sh
COPY ./entrypoint.sh /
ENTRYPOINT ["sh", "entrypoint.sh"]

