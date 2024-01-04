package webapp.errors;


public class AuthError extends JsonError {
  public static final String AUTH_ERROR_PREFIX = "auth/";
  
  public AuthError(String login, String message) {
    super("Auth for user with login: " + login + " failed! Reason: " + message);
  }

  public AuthError(String login) {
    this(login, "Unknown error occurred!");
  }

  @Override
  public String getErrorType() {
    return super.getErrorType() + AUTH_ERROR_PREFIX;
  }

}
