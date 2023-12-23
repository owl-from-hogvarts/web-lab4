package webapp;

import webapp.data.Point;

public class Intersector {

  public boolean intersect(Point point) {
    if (point.x() > 0 && point.y() > 0) {
      return false;
    }

    if (point.x() <= 0 && point.y() >= 0) {
      return intersectTopLeft(point);
    }

    if (point.x() <= 0 && point.y() <= 0) {
      return intersectBottomLeft(point);
    }

    if (point.x() >= 0 && point.y() <= 0) {
      return intersectBottomRight(point);
    }

    return false;
  }

  private boolean intersectBottomRight(Point point) {
    return Math.sqrt(Math.pow(point.x(), 2d) + Math.pow(point.y(), 2d)) <= halfRadius(point);
  }

  private boolean intersectBottomLeft(Point point) {
    return (Math.abs(point.x()) + Math.abs(point.y())) < halfRadius(point);
  }

  private boolean intersectTopLeft(Point point) {
    return Math.abs(point.x()) <= halfRadius(point) && Math.abs(point.y()) <= point.scale();
  }

  private static double halfRadius(Point point) {
    return point.scale() / 2;
  }
}
