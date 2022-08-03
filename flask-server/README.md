# How To Run
1. navigate to flask-server directory

2. to set up virtual environment, run 
### `mkdir venv`
### `python -m venv venv`
### `.\venv\Scripts\activate`

3. install dependencies using
### `pip install -r requirements.txt`

4. set up .env file, requires MAL API Client Key and Client Secret
### `echo CLIENT_ID=YOUR_ID_HERE CLIENT_SECRET=YOUR_SECRET_HERE > .env`

5. start flask app
### `flask run`



