package webapp.errors;

public class InvalidValue extends ParamException {

  public InvalidValue(String paramName, String errorMessage) {
    super(paramName, errorMessage);
  }

  public InvalidValue(String paramName) {
    this(paramName, "Provided value is invalid!");
  }
  
}
