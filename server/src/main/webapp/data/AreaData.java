package webapp.data;

import java.beans.JavaBean;
import java.io.Serializable;
import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonFormat;

@JavaBean
public class AreaData implements Serializable {
    private Point point;
    public Point getPoint() {
        return point;
    }

    public void setPoint(Point point) {
        this.point = point;
    }

    private boolean result;
    private long calculationTime;
    @JsonFormat(shape = JsonFormat.Shape.NUMBER, without = JsonFormat.Feature.WRITE_DATE_TIMESTAMPS_AS_NANOSECONDS)
    private Instant calculatedAt;

    public AreaData() {
        super();
    }

    public boolean getResult() {
        return result;
    }

    public long getCalculationTime() {
        return calculationTime;
    }

    public Instant getCalculatedAt() {
        return calculatedAt;
    }

    public void setResult(boolean result) {
        this.result = result;
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
        result = prime * result + ((point == null) ? 0 : point.hashCode());
        result = prime * result + (this.result ? 1231 : 1237);
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
        AreaData other = (AreaData) obj;
        if (point == null) {
            if (other.point != null)
                return false;
        } else if (!point.equals(other.point))
            return false;
        if (result != other.result)
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
        return "AreaData [point=" + point + ", result=" + result + ", calculationTime=" + calculationTime
                + ", calculatedAt=" + calculatedAt + "]";
    }
}
