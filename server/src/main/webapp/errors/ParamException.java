package webapp.errors;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;

@JsonIncludeProperties(value = {"paramName", "message", "errorType"})
public abstract class ParamException extends JsonError {
  private final String paramName;
  public String getParamName() {
    return paramName;
  }

  public ParamException(String paramName) {
    this(paramName, "Unknown error related to parameter");
  }

  public ParamException(String paramName, Throwable cause) {
    this(paramName, cause.getMessage());
  }
  
  public ParamException(String paramName, String errorMessage) {
    super(errorMessage);
    this.paramName = paramName;
  }

  @Override
  public String getErrorType() {
    return super.getErrorType() + "params/";
  }
}
