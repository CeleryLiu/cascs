package com.springapp.mvc.web.dao;/*
 * Created by lyp on 2016-02-29.
 * @author lyp
 * @date 2016-02-29
 * @Description: 设备数据获取
 * @Version: V1.0
 */

import com.springapp.mvc.web.config.Constant;
import com.springapp.mvc.web.model.NewDevice;
import com.springapp.mvc.web.util.RestClient;
import com.springapp.mvc.web.util.Tool;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class Device2DAO {
    private static final Logger logger = LoggerFactory.getLogger(Device2DAO.class);
    RestClient rc = new RestClient();

    /*
     * @function name: 
     * @param: {arg[0]:"描述",arg[1]:"描述",...}
     * @return: 返回值描述
     * @description: 方法描述
     * @author: lyp
     * @date: 2016-02-29
     */
    //返回用户查询的数据，用于前端以列表的形式显示设备信息（数据访问层）高级搜素
    public JSONObject getDeviceData(String uri, Map<String, Object> criteria) {
        logger.debug("DeviceDAO.getDeviceData(), uri:" + uri + ", criteria:" + JSONObject.fromObject(criteria));
//        System.out.println("DeviceDAO.getDeviceData(), uri:" + uri + ", criteria:" + JSONObject.fromObject(criteria));
        JSONObject result = JSONObject.fromObject(rc.get(uri, criteria));
        if ("200".equals(result.getString("statuscode"))) {
            result = convertData(result);
        }
        return result;
    }

    /*
     * @function name: convertData
     * @param: {rawData:"需要转换的原始json数据，是从搜索平台获取到的原始设备数据"}
     * @return: 转换后的设备数据JSONObject。{}
     * @description: 将从搜索平台获取到的原始数据，转换为前端需要的格式，同时对数据做一些预处理，包括特殊字符和空值的处理
     * @author: lyp
     * @date: 2016-02-29
     */
    @SuppressWarnings({"rawtypes", "unchecked"})
    private JSONObject convertData(JSONObject rawData) {
        //rawData.aggregation.country@%city
        JSONObject agg = rawData.getJSONObject("aggregation");
        if (agg.containsKey("country@%city")) {
            JSONObject cc = agg.getJSONObject("country@%city");
            agg.put("country@%city", convertCountryCity(cc));
            rawData.put("aggregation", agg);
        }

        //rawData.data
        JSONArray data = rawData.getJSONArray("data");
        if (data.size() > 0) {
            rawData.put("data", convertDevices(data));
        }
        return rawData;
    }

    /*
     * @function name:convertCountryCity
     * @param: {cc:"从搜素平台获取到的数据response中的部分数据：response.aggregation.country@%city"}
     * @return: 转化后的国家和城市数据
     * @description: 将原始国家和城市数据转换为前台所需的格式
     * @author: lyp
     * @date: 2016-02-29
     */
    private JSONObject convertCountryCity(JSONObject cc) {
        JSONObject zh2en = Tool.getCountryMapping();
        JSONObject result = new JSONObject();    //用于存储处理后的countries
        Iterator<String> it = cc.keySet().iterator();
        while (it.hasNext()) {
            String key = it.next();
            String countryName = "", cityName = key;
            try {
                if ("@%".equals(key)) {//如果国家城市都为空则丢弃
                    continue;
                }
                if (key.endsWith("@%")) {//城市名为空，则城市设为unknown
                    countryName = key.replace("@%", "");
                    cityName = "Unknown";
                } else if (key.startsWith("@%")) {//国家名为空，则国家设为unknown
                    countryName = "Unknown";
                    cityName =key;
                } else {
                    countryName = key.split("@%")[0];
                    cityName = key.split("@%")[1];
                }
                if (!result.containsKey(countryName)) {
                    JSONObject countryObj = new JSONObject();
                    int initCount = cc.getInt(key);
                    JSONObject cities = new JSONObject();
                    cities.put(cityName, initCount);
                    countryObj.put("count", initCount);
                    countryObj.put("cities", cities);
                    countryObj.put("zh", countryName);
                    if (zh2en.has(countryName)) {
                        countryObj.put("en", zh2en.getString(countryName));
                    }
                    result.put(countryName, countryObj);
                } else {
                    JSONObject tmpCountry = result.getJSONObject(countryName);
                    JSONObject tmpCities = tmpCountry.getJSONObject("cities");
                    tmpCities.put(cityName, cc.getInt(key));
                    tmpCountry.put("count", tmpCountry.getInt("count") + cc.getInt(key));
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        sortCountries(result);
        return result;
    }

    /*
     * @function name:
     * @param: {arg[0]:"描述",arg[1]:"描述",...}
     * @return: 将从搜索平台获取到的设备信息转换为前端所需格式
     * @description: 方法描述
     * @author: lyp
     * @date: 2016-03-01
     */
    private List convertDevices(JSONArray deviceList) {
        List<NewDevice> result = new ArrayList<NewDevice>();
        for (Object obj : deviceList) {
            NewDevice device = new NewDevice();
            JSONObject d = JSONObject.fromObject(obj);
            JSONObject desc = d.getJSONObject("description");
            JSONObject device_location = desc.getJSONObject("device_location");
            JSONArray vul_info = desc.getJSONArray("vul_info");
            JSONArray port_info = desc.getJSONArray("port_info");
            JSONObject os_info = desc.getJSONObject("os_info");

            //(1.a)tags
            List<String> tags = new ArrayList<String>();
            //(2)ip
            device.setIp(desc.getString("ip"));
            //(3)lon
            device.setLon(device_location.getDouble("lon"));
            //(4)lat
            device.setLat(device_location.getDouble("lat"));
            //(5)location
            String location = "", country, city, province;

            country = StringUtils.isNotBlank(device_location.getString("zh_CN")) ? device_location.getString("zh_CN") : device_location.getString("country");
            province = StringUtils.isNotBlank(device_location.getString("zh_Pro")) ? device_location.getString("zh_Pro") : device_location.getString("province");
            city = StringUtils.isNotBlank(device_location.getString("zh_City")) ? device_location.getString("zh_City") : device_location.getString("city");
            if (StringUtils.isNotBlank(country)) {
                location += country;
            }
            if (StringUtils.isNotBlank(province)) {
                location += ", " + province;
            }
            if (StringUtils.isNotBlank(city)) {
                location += ", " + city;
            }
            device.setLocation(location);
            //(6)ports
            if (port_info.size() > 0) {
                List<Map<String, String>> ports = new ArrayList<Map<String, String>>();
                for (int i = 0; i < port_info.size(); i++) {
                    Map<String, String> port = new HashMap<String, String>();
                    JSONObject item = port_info.getJSONObject(i);
                    String portKey, portValue;
                    portKey = item.getString("protocol") + ":" + item.getString("port");
                    portValue = item.getString("banner");
                    if (StringUtils.isBlank(portValue)) {
                        portValue = "null";
                    }
                    port.put(portKey, portValue);
                    ports.add(port);

                    String type = item.getString("device_type"),
                            brand = item.getString("device_brand"),
                            model = item.getString("device_model");
                    //(1.b)tags.type
                    if (StringUtils.isNotBlank(type) && !contains(tags, type)) {
                        tags.add(type);
                    }
                    //(1.c)tags.brand
                    if (StringUtils.isNotBlank(brand) && !contains(tags, brand)) {
                        tags.add(brand);
                    }
                    //(1.d)tags.model
                    if (StringUtils.isNotBlank(model) && !contains(tags, model)) {
                        tags.add(model);
                    }
                }
                device.setPorts(ports);
            }
            //(1.e)tags.os
            if (os_info.containsKey("os")) {
                String os = os_info.getString("os");
                if (StringUtils.isNotBlank(os) && !contains(tags, os)) {
                    tags.add(os_info.getString("os"));
                }
            }
            //(7)vuls
            if (vul_info.size() > 0) {
                List<Map<String, NewDevice.VulValueEntity>> vuls = new ArrayList<Map<String, NewDevice.VulValueEntity>>();
                for (int i = 0; i < vul_info.size(); i++) {
                    Map<String, NewDevice.VulValueEntity> vul = new HashMap<String, NewDevice.VulValueEntity>();
                    JSONObject item = vul_info.getJSONObject(i), vul_ID = item.getJSONObject("vul_ID");

                    NewDevice.VulValueEntity vulValue = new NewDevice.VulValueEntity();
                    String vulKey;
                    vulKey = StringUtils.isNotBlank(vul_ID.getString("CVE")) ? vul_ID.getString("CVE") : vul_ID.getString("CNVD");
                    vulValue.setData(item.getJSONObject("data"));
                    vulValue.setDesc(item.getString("description"));
                    vulValue.setPlatform(item.getString("platform"));
                    vulValue.setImgURL(item.getString("get_picture"));
                    vul.put(vulKey, vulValue);
                    vuls.add(vul);
                }
                device.setVuls(vuls);
            }

            //(8)lastModified (timestamp)
            device.setTimestamp(d.getString("lastModified"));
            //(1.f)
            device.setTags(tags);
            result.add(device);
        }
        return result;
    }

    /*
     * @function name: contains
     * @param:{sArr:"字符串数组",s:"待查询的字符串"}
     * @return: {true:"sArr中包含s", false:"sArr中不包含s"}
     * @description: sArr字符串数组中是否包含s。如果包含则返回true，否则返回false
     * @author lyp
     * @date 2016-02-29
     */
    private boolean contains(List<String> sArr, String s) {
        boolean has = false;
        if (sArr != null) {
            for (int i = 0; i < sArr.size(); i++) {
                if (s.equals(sArr.get(i))) {
                    has = true;
                }
            }
        }
        return has;
    }


    private JSONObject sortCountries(JSONObject countryAndCity) {
        JSONObject result = new JSONObject();
        List<JSONObject> countryList = new ArrayList<JSONObject>();
        for (String key : new ArrayList<String>(countryAndCity.keySet())) {
            countryList.add(countryAndCity.getJSONObject(key));
        }
        countryList = Tool.solrBucketList(countryList);
        for (int i = 0; i < countryList.size(); i++) {
            JSONObject tmp = countryList.get(i);
            result.put(tmp.getString("zh"), tmp);
        }
        return result;
    }


    /*public static void main(String[] args) {
        Device2DAO dd = new Device2DAO();
        Map<String, Object> criteria = new HashMap<String, Object>();
        criteria.put("wd", "abc");
        criteria.put("page", 1);
        dd.getDeviceData(Constant.SE_LIST_SEARCH_URL, criteria);
    }*/
}
