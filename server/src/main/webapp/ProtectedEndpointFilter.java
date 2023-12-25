package webapp;

import java.io.IOException;
import java.util.UUID;

import jakarta.inject.Inject;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.Provider;

@Provider
@ProtectedEndpoint
public class ProtectedEndpointFilter implements ContainerRequestFilter {
  private static final String PARAM_NAME_USER_TOKEN = "user_token";
  
  @Inject
  private SessionDAO sessions;

  @Override
  public void filter(ContainerRequestContext requestContext) throws IOException {
    final var params = requestContext.getUriInfo().getQueryParameters();
    
    if (!params.containsKey(PARAM_NAME_USER_TOKEN)) {
      requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).build());
      return;
    }

    final var uuid = UUID.fromString(params.getFirst(PARAM_NAME_USER_TOKEN));
    if (!sessions.validateSession(uuid)) {
      requestContext.abortWith(Response.status(Response.Status.FORBIDDEN).build());
    }
    
  }
  
}