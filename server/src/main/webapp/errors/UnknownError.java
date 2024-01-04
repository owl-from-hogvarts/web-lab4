package webapp.errors;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;

@JsonIncludeProperties({"message", "details", "errorType"})
public class UnknownError extends JsonError {
  @JsonInclude
  private String details;

  public String getDetails() {
    return details;
  }

  public UnknownError(String message) {
    this();
    details = message;
  }

  public UnknownError() {
    super("Unknown error occurred! Please, contact site administration");
  }

  @Override
  public String getErrorType() {
    return super.getErrorType() + "unknown";
  }
  
}
