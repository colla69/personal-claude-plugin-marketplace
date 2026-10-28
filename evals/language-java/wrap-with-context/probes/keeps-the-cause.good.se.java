try { db.save(u); } catch (SQLException se) { throw new StorageException("saving user " + id, se); }
