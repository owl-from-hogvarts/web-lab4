package webapp;

import java.util.List;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Stateless
public class PointsDAO {
  private static final int PAGE_SIZE = 25;
  
    @PersistenceContext(unitName = "app")
    private EntityManager db;

    /**
     * 
     * @param scale
     * @param page points are sorted from the newest to the oldest 
     * @return
     */
    @Transactional
    public List<PointCheckResult> getPoints(double scale, int page) {
        final var criteriaBuilder = db.getCriteriaBuilder();
        final var query = criteriaBuilder.createQuery(PointCheckResult.class);
        final var root = query.from(PointCheckResult.class);
        query.select(root).where(criteriaBuilder.equal(root.get("scale"), scale)).orderBy(criteriaBuilder.desc(root.get("calculatedAt")));
        final var preparedQuery = db.createQuery(query);
        preparedQuery.setFirstResult(PAGE_SIZE * (page - 1));
        preparedQuery.setMaxResults(PAGE_SIZE);
        return preparedQuery.getResultList();
    }

    @Transactional
    public void save(PointCheckResult result) {
      db.persist(result);
  }
}
