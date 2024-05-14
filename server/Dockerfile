# server/Dockerfile
FROM python:3.10-alpine
WORKDIR /app

# Install build dependencies necessary for compiling packages like psycopg2 and cffi
RUN apk add --no-cache --virtual .build-deps \
    gcc \
    musl-dev \
    python3-dev \
    postgresql-dev \
    libffi-dev  # Add libffi-dev here to provide the ffi.h file for cffi

# Install Python dependencies
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Remove build dependencies to reduce image size, ensuring runtime dependencies remain
RUN apk del .build-deps

# Copy the .env.example to .env
COPY ./.env.example /app/.env

# Copy the rest of the application
COPY . /app

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]