package webapp.data;

import java.beans.JavaBean;
import java.io.Serializable;
import java.util.LinkedList;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;

@JavaBean
@JsonRootName(value = "user")
public class UserAreaData implements Serializable {
    @JsonProperty("points")
    private LinkedList<AreaData> areaDataList;

    public UserAreaData() {
        super();
    }

    public LinkedList<AreaData> getAreaDataList() {
        return areaDataList;
    }

    public void setAreaDataList(LinkedList<AreaData> areaDataList) {
        this.areaDataList = areaDataList;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserAreaData)) return false;
        UserAreaData that = (UserAreaData) o;
        return Objects.equals(getAreaDataList(), that.getAreaDataList());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getAreaDataList());
    }

    @Override
    public String toString() {
        return "UserAreaDatas{" +
                "areaDataList=" + areaDataList +
                '}';
    }
}
