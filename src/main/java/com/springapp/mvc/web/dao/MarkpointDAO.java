package com.springapp.mvc.web.dao;/*
 * Created by lyp on 2016-02-29.
 * @author lyp
 * @date 2016-02-29
 * @Description: 返回用于3d设备展示（数据访问层）
 * @Version: V1.0
 */

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.springapp.mvc.web.model.Markpoint;
import com.springapp.mvc.web.util.RestClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class MarkpointDAO {
    private static final Logger logger = LoggerFactory.getLogger(MarkpointDAO.class);
    RestClient rc = new RestClient();

    public JSONObject getDevices(String uri, String criteria) {
        logger.debug("MarkpointDAO.getDevices starts =================");
        System.out.println("MarkpointDAO.getDevices starts, uri:" + uri + ", criteria:" + criteria);
        JSONObject result = JSON.parseObject(rc.get(uri, criteria));
        if ("200".equals(result.getString("statuscode"))) {
            JSONArray data = result.getJSONArray("data");
            Map<String, List<Markpoint>> map;
            map = new HashMap<String, List<Markpoint>>();
            if (data.size() > 0) {
                for (Object o : data) {
                    JSONObject d = (JSONObject) JSONObject.toJSON(o);
                    Markpoint device = new Markpoint();

                    JSONObject desc = d.getJSONObject("description");
                    JSONObject loc = desc.getJSONObject("device_location");
                    List<Double> geoCoord = new ArrayList<Double>();
                    //组装Device
                    device.setIp(desc.getString("ip"));
                    device.setCountry(loc.getString("country"));
                    device.setCity(loc.getString("city"));
                    geoCoord.add(loc.getDouble("lon"));
                    geoCoord.add(loc.getDouble("lat"));
                    device.setGeoCoord(geoCoord);

                    //分类存放，以device_category为准进行一级分类，再根据device_permit进行二级分类
                    String category = desc.getString("device_category");
                    JSONArray permit = desc.getJSONArray("device_permit");
                    for (int j = 0; j < permit.size(); j++) {
                        String key = category + "_" + permit.get(j);
                        if (map.containsKey(key)) {
                            map.get(key).add(device);
                        } else {
                            List<Markpoint> MarkpointList = new ArrayList<Markpoint>();
                            MarkpointList.add(device);
                            map.put(key, MarkpointList);
                        }
                    }
                }
            }
            result.put("data", map);
        } else {
            result.put("data", new JSONObject());
        }
        System.out.println("DAO getResponse4Globe Result:" + result.toString());
        return result;
    }
}
