import psycopg2
import os
from time import sleep


def wait_for_db():
    """Wait for the database to become available."""
    db_ready = False
    while not db_ready:
        try:
            conn = psycopg2.connect(
                dbname=os.getenv("DB_NAME", "solar"),
                user=os.getenv("DB_USER", "shohelrana"),
                password=os.getenv("DB_PASSWORD", "admin"),
                host="db"
            )
            conn.close()
            print("Database is ready!")
            db_ready = True
        except psycopg2.OperationalError as e:
            print("Waiting for database...", str(e))
            sleep(1)


if __name__ == "__main__":
    wait_for_db()
