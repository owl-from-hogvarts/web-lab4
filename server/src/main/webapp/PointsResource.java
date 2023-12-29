package webapp;

import java.io.IOException;
import java.time.Duration;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import jakarta.annotation.Nullable;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import webapp.errors.InvalidValue;
import webapp.errors.ParamNotFound;
import webapp.errors.ParamValueNotProvided;

@Path("/points")
@ProtectedEndpoint
@Produces(MediaType.APPLICATION_JSON)
public class PointsResource {
  private static final String PARAM_POINT_X = "pointX";
  private static final String PARAM_POINT_Y = "pointY";
  private static final String PARAM_SCALE = "scale";

  private static final Set<Double> ALLOWED_SCALE_VALUES = new HashSet<>();
  private static final double SCALE_TOLERANCE = 0.20d;
  private static final Intersector intersector = new Intersector();

  @Inject
  private PointsDAO points;

  static {
    ALLOWED_SCALE_VALUES.add(1.0d);
    ALLOWED_SCALE_VALUES.add(1.5d);
    ALLOWED_SCALE_VALUES.add(2d);
    ALLOWED_SCALE_VALUES.add(2.5d);
    ALLOWED_SCALE_VALUES.add(3d);

  }

  @GET
  public Response getPoints(@QueryParam(PARAM_SCALE) String scaleStr, @QueryParam("page") String pageStr) throws InvalidValue {
    double scale = 1.0;
    int page = 1;
    
    if (scaleStr != null) { 
      final double scaleApproximate = parseDoubleParam(PARAM_SCALE, scaleStr);
      scale = getInSet(PARAM_SCALE, scaleApproximate, ALLOWED_SCALE_VALUES, SCALE_TOLERANCE);
    }

    if (pageStr != null) {
      page = parseLongParam(scaleStr, pageStr);
    }
    
    return Response.ok(points.getPoints(scale, page)).build();
  }

  @POST
  public Response addPointsWrapper(@QueryParam(PARAM_POINT_X) String paramPointX, @QueryParam(PARAM_POINT_Y) String paramPointY,
      @QueryParam(PARAM_SCALE) String paramScale) throws IOException {
    try {
      return addPoints(paramPointX, paramPointY, paramScale);
    } catch (Exception e) {
      return Response.status(501).entity(e).build();
    }
  }

  private Response addPoints(String paramPointX, String paramPointY, String paramScale) throws IOException, ParamNotFound, ParamValueNotProvided, InvalidValue {
    final var start = System.nanoTime();

    final String strPointX = requiredParam(PARAM_POINT_X, paramPointX);
    final String strPointY = requiredParam(PARAM_POINT_Y, paramPointY);
    final String strScale = requiredParam(PARAM_SCALE, paramScale);

    // validate params in numeric form (checks for ranges)
    final double pointX = parseDoubleParam(PARAM_POINT_X, strPointX);
    checkRange(PARAM_POINT_X, -5, pointX, 5);
    final double pointY = parseDoubleParam(PARAM_POINT_Y, strPointY);
    checkRange(PARAM_POINT_Y, -5, pointY, 5);
    final double scaleApproximate = parseDoubleParam(PARAM_SCALE, strScale);
    final double scale = getInSet(PARAM_SCALE, scaleApproximate, ALLOWED_SCALE_VALUES, SCALE_TOLERANCE);

    // compute intersect
    final var point = new Point(pointX, pointY, scale);
    final boolean isIntersects = intersector.intersect(point);

    final var end = System.nanoTime();
    final var duration = end - start;

    final var areaData = new PointCheckResult();
    areaData.setPoint(point);
    areaData.setCalculatedAt(Instant.now());
    areaData.setCalculationTime(duration / 1_000);
    areaData.setIntersects(isIntersects);
    points.save(areaData);
    
    return Response.ok().build();
  }

  private static void validateNumericString(String param, String numericString) throws InvalidValue {
    final int MAX_STRING_LENGTH = 13;

    if (numericString.length() < 1) {
      throw new InvalidValue(param, "Empty string provided! Excepted non empty string!");
    }

    if (numericString.length() > MAX_STRING_LENGTH) {
      throw new InvalidValue(param, "Max allowed length is " + MAX_STRING_LENGTH + ". Got: " + numericString.length());
    }
  }

  private static String requiredParam(String paramName, @Nullable String paramValue) throws ParamNotFound {
    if (paramValue == null || paramValue.isEmpty()) {
      throw new ParamNotFound(paramName);
    }

    return paramValue;
  }

  private static double parseDoubleParam(String paramName, String value) throws InvalidValue {
    try {
      // validate params in string form
      validateNumericString(paramName, value);
      // parse params
      return Double.parseDouble(value);
    } catch (NumberFormatException e) {
      throw new InvalidValue(paramName);
    }
  }

  private static int parseLongParam(String paramName, String value) throws InvalidValue {
    try {
      validateNumericString(paramName, value);
      return Integer.parseInt(value);
    } catch(NumberFormatException e) {
      throw new InvalidValue(paramName);
    }
  }

  /**
   * Checks both side inclusive
   * 
   * @throws InvalidValue
   */
  private static void checkRange(String paramName, double lower, double value, double upper) throws InvalidValue {
    if (!(lower <= value && value <= upper)) {
      throw new InvalidValue(paramName, "Value not within range: should be higher or equal to " + lower
          + " and lower or equal to " + upper + ". Got " + value);
    }
  }

  private static double getInSet(String paramName, double value, Set<Double> set, double tolerance)
      throws InvalidValue {
    tolerance = Math.abs(tolerance);

    for (final double target : set) {
      if (((target - tolerance) <= value && value <= (target + tolerance))) {
        return target;
      }
    }

    throw new InvalidValue(paramName, "Value " + value + " is not in set!");
  }
}
