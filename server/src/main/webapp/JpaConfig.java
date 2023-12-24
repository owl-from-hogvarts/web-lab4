package webapp;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Persistence;
import jakarta.persistence.PersistenceContext;
import java.util.HashMap;
import java.util.Map;

public class JpaConfig {

    // @PersistenceContext
    // private static EntityManager entityManager;

    // public static EntityManager getEntityManager() {
    //     if (entityManager == null) {
    //         Map<String, String> properties = new HashMap<>();
    //         properties.put("javax.persistence.jdbc.url", "jdbc:postgresql://localhost:5432/web");
    //         properties.put("javax.persistence.jdbc.user", "your_username");
    //         properties.put("javax.persistence.jdbc.password", "your_password");
    //         properties.put("javax.persistence.jdbc.driver", "org.postgresql.Driver");

    //         // Add other Hibernate properties
    //         // properties.put("hibernate.hbm2ddl.auto", "update");

    //         entityManager = Persistence.createEntityManagerFactory("app", properties).createEntityManager();
    //     }
    //     return entityManager;
    // }
}
