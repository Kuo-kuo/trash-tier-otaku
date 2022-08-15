# Backend for Trash Tier Otaku Webapp
This is the backend api for TTO. It requires Python and Postgres to run properly

# How To Run Locally
1. navigate to flask-server directory

2. set up virtual environment, run the following:

**mkdir venv**

**python -m venv venv**

**.\venv\Scripts\activate**

3. install dependencies using **pip install -r requirements.txt**

4. set up .env file, requires CLIENT_ID and CLIENT_SECRET

5. set up db.py file, requires variables HOST, DATABASE, DB_USER, DB_PASSWORD (vartype: string)

6. start flask app using **flask run**

# How to set up PSQL Server
1. Download PSQL and log onto server with superuser **psql -U postgres**
2. Create a database with **CREATE DATABASE (database_name);**
3. Create a user to write and store data for backend with **CREATE USER (db_user) WITH PASSWORD (password);**
4. Grant user rights to the database with **GRANT ALL PRIVILEGES ON (database_name) TO (db_user);**