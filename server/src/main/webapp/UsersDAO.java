package webapp;

import java.io.Serializable;

import org.hibernate.exception.ConstraintViolationException;

import jakarta.ejb.EJBTransactionRolledbackException;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
  import jakarta.transaction.Transactional;
import jakarta.transaction.Transactional.TxType;
import webapp.errors.UserAlreadyExists;
import webapp.errors.UserNotFound;

@Stateless
public class UsersDAO implements Serializable {
  @PersistenceContext
  private EntityManager db;

  @Transactional
  public void save(UserEntity user) {
      db.persist(user);
  }

  @Transactional
  public UserEntity getUser(String login) throws UserNotFound {
    final var queryBuilder = db.getCriteriaBuilder();
    final var query = queryBuilder.createQuery(UserEntity.class);
    final var root = query.from(UserEntity.class);
    query.select(root).where(queryBuilder.equal(root.get("login"), login));
    try {
      return db.createQuery(query).getSingleResult();
    } catch (NoResultException e) {
      throw new UserNotFound(login);
    }
  }
}
