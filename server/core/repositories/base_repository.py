class BaseRepository:
    def __init__(self, model):
        """
        Initialize the repository with a Django model class.

        :param model: Django model class
        """
        self.model = model

    def get_all(self):
        """Retrieve all records from the database for the model."""
        return self.model.objects.filter(is_deleted=False)

    def get_first(self):
        """Retrieve all records from the database for the model."""
        return self.get_all().first()

    def get_by_id(self, record_id):
        """Retrieve a single record by its ID."""
        return self.model.objects.filter(id=record_id, is_deleted=False).first()

    def create(self, record_data):
        """Create a new record."""
        return self.model.objects.create(**record_data)

    def update(self, record_id, record_data):
        """Update an existing record."""
        self.model.objects.filter(id=record_id).update(**record_data)

    def delete(self, record_id):
        """Soft delete a record by setting is_deleted to True."""
        record = self.get_by_id(record_id)
        if record:
            record.is_deleted = True
            record.save()
