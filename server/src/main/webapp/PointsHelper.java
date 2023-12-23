package webapp;

import java.util.LinkedList;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.json.JsonMapper;

import jakarta.servlet.http.HttpSession;
import webapp.data.UserAreaData;

public class PointsHelper {
  public static final String SESSION_POINTS = "points";
  public static final ObjectMapper objectMapper = JsonMapper.builder().findAndAddModules().enable(SerializationFeature.WRAP_ROOT_VALUE).build();

  
  public static UserAreaData getPointsSafe(HttpSession session) {
    final var hasPoints = session.getAttribute(SESSION_POINTS) != null;
    
    if (!hasPoints) {
      final var userAreaData = new UserAreaData();
      userAreaData.setAreaDataList(new LinkedList<>());
      session.setAttribute(SESSION_POINTS, userAreaData);
    }

    return (UserAreaData) session.getAttribute(SESSION_POINTS);
  }
}
