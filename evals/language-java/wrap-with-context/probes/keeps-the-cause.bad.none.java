try { db.save(u); } catch (SQLException e) { throw new StorageException("saving user " + id); }
