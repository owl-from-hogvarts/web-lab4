package webapp.errors;

public class InvalidPage extends ParamException {

  public InvalidPage(String errorMessage) {
    super("page", errorMessage);
  }
  
}
