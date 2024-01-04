package webapp.errors;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;

import jakarta.ws.rs.WebApplicationException;


@JsonRootName(value = "error")
@JsonIncludeProperties({"message", "errorType"})
public abstract class JsonError extends Exception {

  public static final String ERROR_TYPE_PREFIX = "error/";
  

  public JsonError(String message) {
    super(message);
  }

  @JsonProperty()
  public String getErrorType() {
    return ERROR_TYPE_PREFIX;
  }
  
}
