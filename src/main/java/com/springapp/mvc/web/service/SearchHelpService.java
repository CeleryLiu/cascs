package com.springapp.mvc.web.service;/*
 * Created by lyp on 2016-03-09.
 * @author lyp
 * @date 2016-03-09
 * @Description: 热门搜索【、用户搜索记录】相关的业务层
 * @Version: V1.0
 */

import com.springapp.mvc.web.config.Constant;
import com.springapp.mvc.web.util.RestClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class SearchHelpService {
    private static final Logger logger = LoggerFactory.getLogger(SearchHelpService.class);
    RestClient rc = new RestClient();

    public String getResponse4HotSearch() {
        logger.debug("SearchHelpService.getResponse4HotSearch() starts ================");
        //没有做其他业务处理
        return rc.get(Constant.SE_HOTKEY_URL);
    }
}
