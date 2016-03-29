package com.springapp.mvc.web.dao;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.springapp.mvc.web.config.Constant;
import com.springapp.mvc.web.util.RestClient;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/*
 * Created by lyp on 2016-03-25.
 * @author lyp
 * @date 2016-03-25
 * @Description: "看世界”数据访问层
 * @Version: V1.0
 */
@Repository
public class VisionDAO {
    private static final Logger logger = LoggerFactory.getLogger(VisionDAO.class);
    private RestClient rc;

    /*
     * @function name:
     * @param: {uri:"搜索平台请求地址（包含参数），例如：http://10.10.2.143:8083/se/search?pagesize=9999&page=1&wd=政府机关"}
     * @return: JSONObject，返回搜索平台返回的原始数据中data替换为转换后的数据
     * @description: 获取设备数据并将data转换为前端所需格式
     * "data": [
	    	{
	      		"ip": 10.10.10.10,
	      		"lng": 10.2,
	      		"lat": 10.2,
	      		"country": "中国",
	      		"city": "北京",
	      		"host": "目前未使用，不需获取,
	      		"brand": "目前未使用，暂不获取",
	      		"src": "xx",
	      		"pictureUrl": "",
	      		"videoUrl": "",
	      		"pictureTags": [ "景区" ],
	      		"time": 1456883431000
	    	}
	      ]
     * @author: lyp
     * @date: 2016-03-25
     */
    public JSONObject getPictures(String uri) {
        logger.debug("VisionDAO.getPictures() ======");
//        System.out.println("VisionDAO.getPictures() ======");
        rc = new RestClient();
        JSONObject result = JSON.parseObject(rc.get(uri));
        if (StringUtils.equals(result.getString("statuscode"), "200") && result.getJSONArray("data").size() > 0) {
            JSONArray oldData = result.getJSONArray("data");
            JSONArray newDate = new JSONArray();
            Map<String, Integer> countries = new HashMap<String, Integer>();
            for (Iterator it = oldData.iterator(); it.hasNext(); ) {
                JSONObject oldObj = (JSONObject) it.next();
                JSONObject desc = oldObj.getJSONObject("description");
                JSONObject location = desc.getJSONObject("device_location");
                JSONObject other = desc.getJSONObject("other");
                String ip = desc.getString("ip");
                //images
                JSONObject newObj = new JSONObject();
                newObj.put("ip", ip);//ip
                newObj.put("lng", location.getDoubleValue("lon"));//longitude
                newObj.put("lat", location.getDoubleValue("lat"));    //latitude
                if (StringUtils.isNotBlank(location.getString("country"))) {
                    String country = location.getString("country");
                    //country
                    newObj.put("country", country);
                    //countries[i]
                    if (countries.containsKey(country)) {
                        countries.put(country, countries.get(country) + 1);
                    } else {
                        countries.put(country, 1);
                    }
                }
                if (StringUtils.isNotBlank(location.getString("city"))) {//city
                    newObj.put("city", location.getString("city"));
                }
                JSONArray filePath = other.getJSONArray("filePath");
                newObj.put("src", filePath.getString(filePath.size() - 1));   //image file path (src)
                if (StringUtils.isNotBlank(other.getString("pictureUrl"))) {
                    String pictureUrl = other.getString("pictureUrl");
                    pictureUrl = pictureUrl.replace("{_ip_DS_}", ip);
                    newObj.put("pictureUrl", pictureUrl);
                }
                if (StringUtils.isNotBlank(other.getString("videoUrl"))) {
                    newObj.put("videoUrl", other.getString("videoUrl"));
                }
                if (StringUtils.isNotBlank(other.getString("pictureTags"))) {
                    newObj.put("pictureTags", other.getJSONArray("pictureTags"));
                }
                if (StringUtils.equals("0", oldObj.getString("lastModified"))) {
                    newObj.put("time", oldObj.getLongValue("lastModified"));
                }
                newDate.add(newObj);
            }
            result.put("data", newDate);
            result.put("countries", countries);
            result.remove("aggregation");
        }
        return result;
    }

    public JSONObject getAllPictures() {
        logger.debug("VisionDAO.getAllPictures() ======");
        rc = new RestClient();
        JSONObject result = new JSONObject();
        JSONArray data = new JSONArray();
        Map<String, Integer> countries = new HashMap<String, Integer>();
        int total = 0, took = 0;
        String[] tags = Constant.VISION_PICTURE_TAGS.split(",");
        for (int i = 0; i < tags.length; i++) {
            JSONObject tmpResult = getPictures(Constant.SE_VISION_STATIC_URL + tags[i]);
            data.addAll(tmpResult.getJSONArray("data"));//images

            Map<String, Integer> tmpCountries = (HashMap<String, Integer>) tmpResult.get("countries");
            for (Map.Entry<String, Integer> entry : tmpCountries.entrySet()) {
                String key = entry.getKey();
                Integer value = entry.getValue();
                if (countries.containsKey(key)) {
                    countries.put(key, countries.get(key) + value);
                } else {
                    countries.put(key, value);
                }
            }
            total += tmpResult.getIntValue("total");
            took += tmpResult.getIntValue("took");
        }
        result.put("data", data);
        result.put("countries", countries);
        result.put("statuscode", 200);
        result.put("took", took);
        result.put("total", total);
        return result;
    }
}