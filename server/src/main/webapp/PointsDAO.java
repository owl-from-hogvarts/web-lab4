package webapp;


import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.transaction.Transactional;
// import webapp.errors.InvalidPage;
import webapp.errors.InvalidPage;

@Stateless
public class PointsDAO {
  private static final int PAGE_SIZE = 25;

  @PersistenceContext(unitName = "app")
  private EntityManager db;

  /**
   * 
   * @param scale
   * @param page  points are sorted from the newest to the oldest
   * @return
   * @throws InvalidPage
   */
  @Transactional
  public PointsResponse getPoints(double scale, int page) throws InvalidPage {
    final var builder = db.getCriteriaBuilder();
    final var query = builder.createQuery(PointCheckResult.class);
    // jpa does not allow to reuse objects between queries
    // https://stackoverflow.com/a/63103588/13167052
    final var root = query.from(PointCheckResult.class);

    final var totalPoints = getPointsAmount(scale);
    final var totalPages = totalPoints / PAGE_SIZE + 1;

    if (page < 1 || page > totalPages) {
      throw new InvalidPage("Page number is invalid. Got: " + page);
    }

    query.select(root).where(filterByScale(scale, root))
        .orderBy(builder.desc(root.get("calculatedAt")));
    final var preparedQuery = db.createQuery(query);
    preparedQuery.setFirstResult(PAGE_SIZE * (page - 1));
    preparedQuery.setMaxResults(PAGE_SIZE);
    final var points = preparedQuery.getResultList();

    return new PointsResponse(points, totalPages);
  }

  @Transactional
  private long getPointsAmount(double scale) {
    final var builder = db.getCriteriaBuilder();
    final var query = builder.createQuery(Long.class);
    final var root = query.from(PointCheckResult.class);
    query.select(builder.count(root)).where(filterByScale(scale, root));
    return db.createQuery(query).getSingleResult();
  }

  private Predicate filterByScale(double scale, Root<PointCheckResult> root) {
    final var builder = db.getCriteriaBuilder();
    return builder.equal(root.get("scale"), scale);
  }

  @Transactional
  public void save(PointCheckResult result) {
    db.persist(result);
  }
}
