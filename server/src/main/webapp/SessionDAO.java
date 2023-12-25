package webapp;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Stateless
public class SessionDAO implements Serializable {
  @PersistenceContext
  private EntityManager db;
  
  @Transactional
  public void save(Session session) {
    db.persist(session);
  }

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
    return db.createQuery(query).getResultStream().findFirst().isPresent();
  }
}
