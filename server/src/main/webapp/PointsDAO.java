package webapp;

import java.util.List;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Stateless
public class PointsDAO {
    @PersistenceContext(unitName = "app")
    private EntityManager db;

    @Transactional
    public List<PointCheckResult> getPoints() {
        final var criteriaBuilder = db.getCriteriaBuilder();
        final var query = criteriaBuilder.createQuery(PointCheckResult.class);
        final var root = query.from(PointCheckResult.class);
        query.select(root);
        return db.createQuery(query).getResultList();
    }

    @Transactional
    public void save(PointCheckResult result) {
      db.persist(result);
      System.out.println(db.getProperties().get("hibernate.connection.url"));
      System.out.println(result.toString());
  }
}
