package webapp;

import java.io.Serializable;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Stateless
public class UsersDAO implements Serializable {
  @PersistenceContext
  private EntityManager db;

  @Transactional
  public void save(UserEntity user) {
    db.persist(user);
  }

  @Transactional
  public UserEntity getUser(String login) {
    final var queryBuilder = db.getCriteriaBuilder();
    final var query = queryBuilder.createQuery(UserEntity.class);
    final var root = query.from(UserEntity.class);
    query.select(root).where(queryBuilder.equal(root.get("login"), login));
    return db.createQuery(query).getSingleResult();
  }
}
