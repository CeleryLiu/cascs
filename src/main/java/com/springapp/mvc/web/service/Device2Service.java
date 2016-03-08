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
    private static final String uri4List2 = Constant.SE_LIST_SEARCH_2_URL;
    private static final String uri4Map = Constant.SE_MAP_SEARCH_URL;
    private final Device2DAO dao;

    @Autowired
    public Device2Service(Device2DAO dao) {
        this.dao = dao;
    }

    //普通搜索，http请求的参数格式wd=*&prilevel=1&page=1&pagesize=10
    public String getResponse4List(SearchCriteria search) {
        logger.debug("DeviceSearch.getResponse4List() ======");
//        System.out.println("DeviceSearch.getResponse4List() ======");
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

    //新搜索，http请求的参数格式：json格式字符串q={we:"",filter:{},...}
    public String getResponse4List2(SearchCriteria search) {
        logger.debug("DeviceSearch.getResponse4List2() ======");
//        System.out.println("DeviceSearch.getResponse4List2() ======");
        JSONObject result;
        if (isValidSearchCriteria(search)) {
            Map<String, Object> criteria = new HashMap<String, Object>();
            criteria.put("q", JSONObject.fromObject(search));
            result = dao.getDeviceData(uri4List2, criteria);
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

    //地图页面搜索查询，和getResponse4List2其实是一样的，只是url不一样，测试通过后，可以合并为一个方法
    public String getResponse4Map(SearchCriteria search) {
        logger.debug("DeviceSearch.getResponse4Map() ======");
//        System.out.println("DeviceSearch.getResponse4Map() ======");
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

/*    public static void main(String[] args) {
        Device2Service ss = new Device2Service(new Device2DAO());
        SearchCriteria criteria = new SearchCriteria();
        criteria.setWd("weak camera");
        Filter filter = new Filter();
        ArrayList<String> list = new ArrayList<String>();
        list.add("北京");
        list.add("上海");
        filter.setCity(list);
        criteria.setFilter(filter);
        String r = ss.getResponse4List2(criteria);
        System.out.println(r);
    }*/
}
