# U of U Coding Challenge

License: MIT

## Getting Started

These instructions will get you through launching phase of this project.

### Prerequisites

- Make sure that you have Docker and Docker Compose installed
  - Windows or macOS:
    [Install Docker Desktop](https://www.docker.com/get-started)
  - Linux: [Install Docker](https://www.docker.com/get-started) and then
    [Docker Compose](https://github.com/docker/compose)

### Launching Project

- Clone this repository

- CD into the frotnend directory and install vue-cli-service using the command:
      
      $ cd frontend && npm install @vue/cli-service --save-dev && cd ../

- To launch, run the command:

      $ docker compose up -d --build

- To create a **superuser account**, use this command:

      $ docker compose run --rm django ./manage.py createsuperuser

- To load pre-created players data run:

      $ docker compose run --rm django ./manage.py loaddata soccer_small


### Project Urls

- Frontend port at [localhost:8080](http://localhost:8080)
- Backend port at [localhost:8000](http://localhost:8000/api/)

### Available API Urls:
  - Players - [http://localhost:8000/api/players](http://localhost:8000/api/players)
  - Player by Name - [http://localhost:8000/api/players/{name}](http://localhost:8000/api/players)
  - Clubs - [http://localhost:8000/api/clubs](http://localhost:8000/api/clubs)
  - Attributes - [http://localhost:8000/api/attributes](http://localhost:8000/api/attributes)