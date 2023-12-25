package webapp.errors;

public class AuthError extends Exception {
  public AuthError(String login, String message) {
    super("Auth for user with login: " + login + " failed! Reason: " + message);
  }

  public AuthError(String login) {
    this(login, "Unknown error occurred!");
  }
}
