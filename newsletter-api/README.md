# Newsletter - REST API

This is the REST API built for the project using FastAPI and Python 3.9

## 💻 Installation

This API can be deployed by the docker-compose file or by building an image using it's DockerFile and runing it. But in case that it needs to be deployed without containers, it can be done using the following steps:

**For Windows:**

```bash
# Creation of a Virtual Environment
py -m venv venv

# Activation of Virtual Environment
./venv/Scripts/activate

# Installation of dependencies
pip install -r requirements.txt

# Execution in a development environment
uvicorn app.main:app --reload
```

**For Linux/MacOS:**

```bash
# Creation of a Virtual Environment
py -m venv venv

# Activation of Virtual Environment
venv/bin/activate

# Installation of dependencies
pip install -r requirements.txt

# Execution in a development environment
uvicorn app.main:app --reload
```

This project uses MongoDB as it's database, so it needs to be installed as well.

## ⚡Endpoints of the API

These are the following endpoint for this API:

- **User endpoints**: These endpoints allows to perform CRUD operations for an user and log in to the page.

  - **GET: /users**: Allows to get all users.
  - **GET: /users/{admin_email}**: Allows to get one user with the e-mail passed in the path.
  - **POST: /users/create-user**: Allows to create user.
  - **POST: /users/login**: Compares the passed password's hash with the password stored.
  - **PUT: /users/modify-user**: Allows to modify the password of the user.
  - **POST: /users/delete-user**: Allows to delete the user.

- **Recipient list endpoints**: These endpoints allows to create a recipients list, add new recipients and modify the unsubscribed topics of each recipient.

  - **GET: /{admin_email}/recipients**: Allows to get the recipients list of an admin user.
  - **POST: /{admin_email}/recipients/create-list**: Allows to create a recipients list for an user.
  - **PUT: /{admin_email}/recipients/add-recipient/{new_recipient}**: Allows to add a new recipient to the recipient list.
  - **PUT: /{admin_email}/recipients/{recipient}/unsub**: Modifies the unsubscription of a recipient.

- **Newsletter endpoints**: These endpoints allows to publish a newsletter an retrieve it's topics.
  - **POST: /{admin_email}/newsletter/publish**: Allows to publish and register a new newsletter..
  - **GET: /{admin_email}/newsletter/{newsletter_id}/get-topics**: Allows to retrieve the topics of a newsletter..

This also can be viewed by accessing to http://localhost:8000/docs once the project is deployed.
