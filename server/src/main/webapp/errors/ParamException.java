package webapp.errors;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.fasterxml.jackson.annotation.JsonRootName;

@JsonIncludeProperties(value = {"paramName", "message"})
@JsonRootName(value = "error")
public abstract class ParamException extends Exception {
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
}
