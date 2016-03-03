package com.springapp.mvc.web.service;/*
 * Created by lyp on 2016/2/26.
 * Author: lyp
 * Date: 2016/2/26
 * Description:普通搜索查询业务逻辑层
 * Version: V1.0 
 */

import com.springapp.mvc.web.config.Constant;
import com.springapp.mvc.web.dao.Device2DAO;
import com.springapp.mvc.web.model.SearchCriteria;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class Device2Service {
    private static final Logger logger = LoggerFactory.getLogger(DeviceService.class);
    private static final String uri4List = Constant.SE_LIST_SEARCH_URL;
    private static final String uri4Map = Constant.SE_MAP_SEARCH_URL;
    private final Device2DAO dao;

    @Autowired
    public Device2Service(Device2DAO dao) {
        this.dao = dao;
    }

    public String getResponse4List(SearchCriteria search) {
        logger.debug("DeviceSearch.getResponse4List() ======");
        System.out.println("DeviceSearch.getResponse4List() ======");
        JSONObject result;
        if (isValidSearchCriteria(search)) {
            Map<String, Object> criteria = new HashMap<String, Object>();
            criteria.put("wd", search.getWd());
            criteria.put("page", search.getPage());
            result = dao.getDeviceData(uri4List, criteria);
            if ("200".equals(result.getString("statuscode")) && result.getJSONArray("data").size() <= 0) {
                result.put("statuscode", "204");
                result.put("errmsg", "No related data!");
            }
        } else {
            result = new JSONObject();
            result.put("statuscode", "400");
            result.put("errmsg", "Search criteria is empty!");
        }
        return result.toString();
    }

    public String getResponse4Map(SearchCriteria search) {
        logger.debug("DeviceSearch.getResponse4Map() ======");
        System.out.println("DeviceSearch.getResponse4Map() ======");
        JSONObject result;
        if (isValidSearchCriteria(search)) {
            Map<String, Object> criteria = new HashMap<String, Object>();
            criteria.put("q", JSONObject.fromObject(search));
            result = dao.getDeviceData(uri4Map, criteria);
            if ("200".equals(result.getString("statuscode")) && result.getJSONArray("data").size() <= 0) {
                result.put("statuscode", "204");
                result.put("errmsg", "No related data!");
            }
        } else {
            result = new JSONObject();
            result.put("statuscode", "400");
            result.put("errmsg", "Search criteria is empty!");
        }
        return result.toString();
    }

    public boolean isValidSearchCriteria(Object criteria) {
        boolean valid = true;
        if (criteria == null) {
            valid = false;
        } else {
            if ("".equals(criteria.toString())) {
                valid = false;
            }
        }
        return valid;
    }

   /* public static void main(String[] args) {
        DeviceSearch ss = new DeviceSearch(new DeviceDAO());
        SearchCriteria criteria = new SearchCriteria();
        criteria.setWd("weak camera");
        String r = ss.getResponse4Map(criteria);
        System.out.println(r);
    }*/
}
