package webapp.errors;

/**
 * Params found in url but without value:
 * {@code
 *    ?paramPresentWithoutValue&paramWithValue=1
 * }
 */
public class ParamValueNotProvided extends ParamException{

  public ParamValueNotProvided(String paramName) {
    super(paramName, "Parameter supplied, but value was not found!");
  }

  @Override
  public String getErrorType() {
    return super.getErrorType() + "value-not-provided";
  }
  
}
