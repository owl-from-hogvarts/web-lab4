package webapp;

import java.util.HashMap;

import jakarta.persistence.Persistence;
import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;

@ApplicationPath("/api/v1")
public class IntersectorApplication extends Application {
  // init persistance contexts
  // static {
  //   final var properties = new HashMap<>();
  //   properties.put("jakarta.persistence.jdbc.url", "jdbc:postgresql://localhost:5432/");
  //   properties.put("jakarta.persistence.jdbc.user", "your_username");
  //   properties.put("jakarta.persistence.jdbc.password", "your_password");
  //   properties.put("hibernate.dialect", "org.hibernate.dialect.PostgreSQLDialect");

  //   // Add other Hibernate properties
  //   // properties.put("hibernate.hbm2ddl.auto", "update");

  //   Persistence.createEntityManagerFactory("app", properties).createEntityManager();
  // }
}
