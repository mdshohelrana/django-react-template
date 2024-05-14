# GUI of Production data of solar panel and charging recommendations for Tesla

This repository hosts the complete source code for solar panel and charging recommendations for Tesla, encompassing both backend and frontend components.

## Backend Setup

### Overview

The backend code is developed using Python 3.11 and is intended to serve as the server-side for the Tesla project.

### Prerequisites

- Python 3.11
- Docker (for Docker-specific commands, optional)

### Setup Instructions

#### Creating a Virtual Environment

- **Windows**:

  ```bash
  python -m venv myenv
  myenv\Scripts\activate
  ```

- **macOS and Linux**:

  ```bash
  python -m venv myenv
  source myenv/bin/activate
  ```

- **Installing Dependencies**:

  ```bash
  python -m venv myenv
  cd server
  pip install -r requirements.txt
  ```

- **Running the Application**:

  ```bash
  python manage.py runserver
  ```

#### Deactivating the Virtual Environment

- **Windows**:

  ```bash
  python -m venv myenv
  myenv\Scripts\activate
  ```

- **macOS and Linux**:
  ```bash
  python -m venv myenv
  source myenv/bin/activate
  ```

## Frontend Setup

### Overview

The frontend is designed for the web development part of the Tesla project using modern JavaScript frameworks and libraries.

- **Installing Dependencies**:

  ```bash
  cd client
  yarn install
  ```

- **Start the Development Server**:

```bash
yarn dev  # or yarn dev, pnpm dev, bun dev
Open http://localhost:3006 with your browser to see the result.
```

- **Docker and Database Configuration**:
- **_Docker Commands_**:
- Pull the latest code from the main branch.
- Start the application and services:

```bash
docker-compose up --build
```

- **_Application Access_**:

```bash
Application URL: http://localhost:3006/
Admin Panel URL: http://localhost:8000/admin/
```

- **_Connect to PgAdmin_**:

```bash
URL: http://localhost:5050/

Credentials:
Email: admin@admin.com
Password: admin

Database User: shohelrana
```

# Useful Docker Commands

```bash
docker-compose exec backend python manage.py generate_fake_data
docker-compose exec backend python manage.py createsuperuser
docker-compose exec db psql -U shohelrana -d solar

# To clear Docker completely
docker stop $(docker ps -aq)
docker rm $(docker ps -aq)
docker rmi $(docker images -q) -f
docker volume rm $(docker volume ls -q)

# Alternatively, to clean up
docker system prune
docker system prune -a --volumes

```
