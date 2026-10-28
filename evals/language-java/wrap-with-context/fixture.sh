#!/usr/bin/env bash
set -euo pipefail
mkdir -p src/main/java/com/example
cat > pom.xml <<'XML'
<project xmlns="http://maven.apache.org/POM/4.0.0">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.example</groupId>
  <artifactId>users</artifactId>
  <version>1.0.0</version>
  <properties>
    <maven.compiler.source>17</maven.compiler.source>
    <maven.compiler.target>17</maven.compiler.target>
  </properties>
</project>
XML
cat > src/main/java/com/example/UserStore.java <<'JAVA'
package com.example;

import java.sql.SQLException;

public class UserStore {
    private final Database db;

    public UserStore(Database db) {
        this.db = db;
    }

    // TODO: catch the SQLException and report it to the caller of the service layer.
    public void save(long id, String name) throws SQLException {
        db.insert("users", id, name);
    }
}
JAVA
cat > src/main/java/com/example/Database.java <<'JAVA'
package com.example;

import java.sql.SQLException;

public interface Database {
    void insert(String table, Object... values) throws SQLException;
}
JAVA
