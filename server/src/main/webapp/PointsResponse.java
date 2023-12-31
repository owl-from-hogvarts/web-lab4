package webapp;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.fasterxml.jackson.annotation.JsonRootName;
@JsonIncludeProperties(value = {"points", "totalPages"})
@JsonRootName("response")
public class PointsResponse {
  private final List<PointCheckResult> points;
  private final long totalPages;

  public PointsResponse(List<PointCheckResult> points, long totalPages) {
    this.points = points;
    this.totalPages = totalPages;
  }

  public List<PointCheckResult> getPoints() {
    return points;
  }

  public long getTotalPages() {
    return totalPages;
  }
}
