package webapp;

import java.io.Serializable;
import java.time.Instant;
import java.util.UUID;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.ejb.Stateless;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotNull;

@Entity(name = "pointcheckresults")
@Stateless
public class PointCheckResult implements Serializable {

    @Id
    @GeneratedValue(generator = "uuid-hibernate-generator")
    @GenericGenerator(name = "uuid-hibernate-generator", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;
    @NotNull
    private double pointX;
    @NotNull
    private double pointY;
    @NotNull
    private double scale;

    @NotNull
    private boolean isIntersects;

    @NotNull
    private long calculationTime;

    // @NotNull
    // @Temporal(TemporalType.TIMESTAMP)
    // @JsonFormat(shape = JsonFormat.Shape.NUMBER, without = JsonFormat.Feature.WRITE_DATE_TIMESTAMPS_AS_NANOSECONDS)
    private Instant calculatedAt;

    public PointCheckResult() {
        super();
    }

    public double getPointX() {
        return pointX;
    }

    public void setPointX(double pointX) {
        this.pointX = pointX;
    }
    public double getPointY() {
        return pointY;
    }
    public void setPointY(double pointY) {
        this.pointY = pointY;
    }

    public double getScale() {
        return scale;
    }

    public void setScale(double scale) {
        this.scale = scale;
    }

    public void setPoint(Point point) {
        this.pointX = point.x();
        this.pointY = point.y();
        this.scale = point.scale();
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public boolean getIsIntersects() {
        return isIntersects;
    }

    public long getCalculationTime() {
        return calculationTime;
    }

    public Instant getCalculatedAt() {
        return calculatedAt;
    }

    public void setIntersects(boolean result) {
        this.isIntersects = result;
    }

    public void setCalculationTime(long calculationTime) {
        this.calculationTime = calculationTime;
    }

    public void setCalculatedAt(Instant calculatedAt) {
        this.calculatedAt = calculatedAt;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        long temp;
        temp = Double.doubleToLongBits(pointX);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(pointY);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(scale);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        result = prime * result + (isIntersects ? 1231 : 1237);
        result = prime * result + (int) (calculationTime ^ (calculationTime >>> 32));
        result = prime * result + ((calculatedAt == null) ? 0 : calculatedAt.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        PointCheckResult other = (PointCheckResult) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (Double.doubleToLongBits(pointX) != Double.doubleToLongBits(other.pointX))
            return false;
        if (Double.doubleToLongBits(pointY) != Double.doubleToLongBits(other.pointY))
            return false;
        if (Double.doubleToLongBits(scale) != Double.doubleToLongBits(other.scale))
            return false;
        if (isIntersects != other.isIntersects)
            return false;
        if (calculationTime != other.calculationTime)
            return false;
        if (calculatedAt == null) {
            if (other.calculatedAt != null)
                return false;
        } else if (!calculatedAt.equals(other.calculatedAt))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "PointCheckResult [id=" + id + ", pointX=" + pointX + ", pointY=" + pointY + ", scale=" + scale
                + ", isIntersects=" + isIntersects + ", calculationTime=" + calculationTime + ", calculatedAt="
                + calculatedAt + "]";
    }

}
