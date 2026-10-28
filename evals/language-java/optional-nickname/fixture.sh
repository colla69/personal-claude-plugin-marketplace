#!/usr/bin/env bash
# A Maven project that targets Java 8, with one existing class to show the style.
set -euo pipefail
mkdir -p src/main/java/com/example
cat > pom.xml <<'XML'
<project xmlns="http://maven.apache.org/POM/4.0.0">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.example</groupId>
  <artifactId>shop</artifactId>
  <version>1.0.0</version>
  <properties>
    <maven.compiler.source>8</maven.compiler.source>
    <maven.compiler.target>8</maven.compiler.target>
  </properties>
</project>
XML
cat > src/main/java/com/example/Order.java <<'JAVA'
package com.example;

public class Order {
    private final String id;

    public Order(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }
}
JAVA
cat > src/main/java/com/example/Customer.java <<'JAVA'
package com.example;

public class Customer {
    private final String name;

    public Customer(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
JAVA
