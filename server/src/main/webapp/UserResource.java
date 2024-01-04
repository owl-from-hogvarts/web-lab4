package webapp;

import java.util.UUID;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import webapp.errors.AuthError;
import webapp.errors.InvalidValue;
import webapp.errors.ParamNotFound;
import webapp.errors.WrongPassword;

@Path("/users")
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {
  private static final int MIN_LENGTH = 3;
  private static final String PARAM_NAME_LOGIN = "login";
  private static final String PARAM_NAME_PASSWORD = "password";
  
  @Inject
  private UsersDAO users;
  @Inject
  private SessionDAO sessions;

  @POST
  public void register(@QueryParam(PARAM_NAME_LOGIN) String login, @QueryParam(PARAM_NAME_PASSWORD) String password) throws InvalidValue, ParamNotFound {
    validateMinimalLength(PARAM_NAME_LOGIN, login, MIN_LENGTH);
    validateMinimalLength(PARAM_NAME_PASSWORD, password, MIN_LENGTH);
  
    final var user = new UserEntity(login, password);

    users.save(user);
  }

  @GET
  public UUID login(@QueryParam(PARAM_NAME_LOGIN) String login, @QueryParam(PARAM_NAME_PASSWORD) String password) throws InvalidValue, AuthError, ParamNotFound {
    validateMinimalLength(PARAM_NAME_LOGIN, login, MIN_LENGTH);
    validateMinimalLength(PARAM_NAME_PASSWORD, password, MIN_LENGTH);

    final var user = users.getUser(login);

    final boolean isPasswordValid = user.validatePassword(password);
    if (!isPasswordValid) {
      throw new WrongPassword(login);
    }

    final var session = new Session(user);
    sessions.save(session);
    return session.getSessionId();
  }

  private void validateMinimalLength(String paramName, String value, int minLength) throws InvalidValue, ParamNotFound {
    if (value == null) {
      throw new ParamNotFound(paramName);
    }
    if (value.length() < minLength) {
      throw new InvalidValue(paramName, "should be longer than " + minLength);
    }
  }
}
