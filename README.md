# Notes Backend

### 1. Install PROJECT dependencies:
`npm install`



### 2. Setup dB:
Make database for Notes-backend.
Follow below instructions to setup local database.
##### Setting Up a local database

To run the application locally, you need to setup a postgres database on your system.
Install postgres
```
sudo apt install postgresql libpq-dev
```

Login as the 'postgres' user and start postgres shell

```
sudo su - postgres
```

```
psql
```

Create a user for use with the application.
Remember to wrap your password in single quotes. 
```
create user notesdev with password 'complicated';
``` 

Create a database and give permissions for the above user
```
create database notesdb;
```

```
grant ALL privileges on database notesdb to notesdev;
```

Give permissions to the user to create database so that test databses can be created
```
ALTER USER notesdev CREATEDB;
```


### 3. Setup .env files 
Use example env files create local .env files
```
cp .env.example .env
```


### 4. Migrate the Models to dB
```
npm run db:migrate
```


### 5. Run the Server (port:5000)
`npm start`
