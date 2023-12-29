package webapp;

import java.io.Serializable;
import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Stateless
public class SessionDAO implements Serializable {
  // value is embedded into sql query. be careful with syntax
  private static final int SESSION_EXPIRATION_INTERVAL_SECONDS = 30;
  
  @PersistenceContext
  private EntityManager db;

  @Transactional
  public void save(Session session) {
    db.persist(session);
  }

  // ! UNUSED !
  public List<Session> getSessionsForUser(String login) {
    final var builder = db.getCriteriaBuilder();
    final var query = builder.createQuery(Session.class);
    final var root = query.from(Session.class);
    query.select(root).where(builder.equal(root.get("user"), login));

    return db.createQuery(query).getResultList();
  }

  public boolean validateSession(UUID id) {
    final var builder = db.getCriteriaBuilder();
    final var query = builder.createQuery(Session.class);
    final var root = query.from(Session.class);
    query.select(root).where(builder.equal(root.get("sessionId"), id));
    final var session = db.createQuery(query).getResultStream().findFirst();
    if (session.isEmpty()) {
      return false;
    }

    final var isExpired = Duration.between(session.get().getCreatedAt(), Instant.now()).toSeconds() > SESSION_EXPIRATION_INTERVAL_SECONDS;
    if (isExpired) {
      final var deleteQuery = builder.createCriteriaDelete(Session.class);
      final var sessionRoot = deleteQuery.from(Session.class);
      deleteQuery.where(builder.equal(sessionRoot.get("sessionId"), session.get().getSessionId()));
      db.createQuery(deleteQuery);
    }

    return !isExpired;
  }

  /**
   * If database changes, update this!
   * 
   * Criteria api does not support comparison operations
   * with dates. Using postgresql directly
   */
  public void cleanupExpiredSessions() {
    // executed immediately
    final var query = db.createNativeQuery("DELETE FROM session WHERE (CURRENT_TIMESTAMP - createdAt) > '" + SESSION_EXPIRATION_INTERVAL_SECONDS +"s';");
    query.executeUpdate();
  }
}
