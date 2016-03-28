package com.springapp.mvc.web.service;

import com.alibaba.fastjson.JSONObject;
import com.springapp.mvc.web.config.Constant;
import com.springapp.mvc.web.dao.VisionDAO;
import com.springapp.mvc.web.model.CachedData;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/*
 * Created by lyp on 2016-03-25.
 * @author lyp
 * @date 2016-03-25
 * @Description: "看世界"业务层
 * @Version: V1.0
 */
@Service
public class VisionService {
    private static final Logger logger = LoggerFactory.getLogger(VisionService.class);
    private final VisionDAO dao;
    private int pagesize = 9999;
    private int page = 1;

    @Autowired
    public VisionService(VisionDAO dao) {
        this.dao = dao;
    }

    /*
     * @function name:
     * @param: {pictureTag:"String类型，图片所属的场景标记，用于组合成uri。例如：uri = http://10.10.2.143:8083/se/search?pagesize=9999&page=1&wd=pictureTag"}
     * @return: JSONObject
     * @description: 根据pictureTag所表示的场景，返回“看世界”界面所需的设备数据
     * @author: lyp
     * @date: 2016-03-25
     */
    public JSONObject getVisionResponse(String pictureTag) {
        logger.debug("VisionService.getVisionResponse() ======");
//        System.out.println("VisionService.getVisionResponse() ======");
        JSONObject result;
        String uri;
        if (StringUtils.isNotBlank(pictureTag)) {
            if (StringUtils.equals("all", pictureTag)) {
                result = CachedData.AllPictures;
                if (result == null) {
                    result = dao.getAllPictures();
                }
            } else {
                uri = Constant.SE_VISION_STATIC_URL + pictureTag;
                result = dao.getPictures(uri);
            }
            if ("200".equals(result.getString("statuscode")) && result.getJSONArray("data").size() <= 0) {
                result.put("statuscode", "204");
                result.put("errmsg", "No related data!");
            }
        } else {
            result = new JSONObject();
            result.put("statuscode", "400");
            result.put("errmsg", "Search criteria is empty!");
        }
        return result;
    }
}
