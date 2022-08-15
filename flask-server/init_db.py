
import os
import db
import psycopg2

conn = psycopg2.connect(
    host = db.HOST,
    database = db.DATABASE,
    user = db.DB_USER,
    password = db.DB_PASSWORD
)

cur = conn.cursor()
cur.execute('create extension if not exists \"uuid-ossp\";')
conn.commit()

cur.execute('create table if not exists requests('
        'request_id uuid UNIQUE DEFAULT uuid_generate_v4() ,'
        'client_challenge char(128) UNIQUE NOT NULL ,'
        'request_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, '
        'primary key(request_id)'
    ');'
)
conn.commit()

cur.execute('create table if not exists users('
        'user_id uuid DEFAULT uuid_generate_v4(),'
        'auth_code VARCHAR(1024) NOT NULL UNIQUE,'
        'access_token VARCHAR(1024) NOT NULL,'
        'refresh_token VARCHAR(1024) NOT NULL,'
        'access_token_expiration TIMESTAMP NOT NULL,'
        'refresh_token_expiration TIMESTAMP '
            'DEFAULT (CURRENT_TIMESTAMP + interval \'31 days\'),'
        'primary key (user_id)'
    ');'
)
conn.commit()
cur.close()
conn.close()
