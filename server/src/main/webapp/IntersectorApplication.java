package webapp;

import java.util.HashMap;

import jakarta.persistence.Persistence;
import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.OPTIONS;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Application;
import jakarta.ws.rs.core.Response;

@ApplicationPath("/api/v1")
public class IntersectorApplication extends Application {
    @OPTIONS
    @Path("{path : *}")
    public Response options() {
        return Response.ok("")
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
                .header("Access-Control-Max-Age", "1209600")
                .build();
    }
}
