package com.springapp.mvc.web.dao;/*
 * Created by lyp on 2016-03-01.
 * @author lyp
 * @date 2016-03-01
 * @Description: 返回用于3d数据流展示（数据访问层）
 * @Version: V1.0
 */

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.springapp.mvc.web.model.MarkLine;
import com.springapp.mvc.web.util.RestClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class MarklineDAO {
    private static final Logger logger = LoggerFactory.getLogger(MarklineDAO.class);
    private RestClient rc;

    //Init line types, the mapping from attributes to interface words
    @PostConstruct
    private void initLineTypes() { //以后使用配置文件来对应
//        lineTypes.put("port_info", "搜索探测");
//        lineTypes.put("weak_password", "弱口令漏洞验证");
//        lineTypes.put("others", "漏洞扫描");
        //markLines.setLineTypes(lineTypes);
    }


    //返回用于3d数据流展示的数据
    public MarkLine getMarklines(String uri4Line, String pageId) {
        logger.debug("MarklineDAO.getMarkLines() starts =================");
        MarkLine markLine = null;
        rc = new RestClient();
        JSONArray resArr = rc.getJSONArray(uri4Line + pageId);
        if (resArr.size() > 0) {
            markLine = new MarkLine();
            List<MarkLine.LinesEntity> lines = new ArrayList<MarkLine.LinesEntity>();             //lines
            Map<String, double[]> points = new HashMap<String, double[]>();    //points
            Map<String, String> lineTypes = new HashMap<String, String>();                   //line types

            for (Object o : resArr) {
                JSONObject json = (JSONObject) JSONObject.toJSON(o);
                JSONObject sLoc = json.getJSONObject("start_geo");
                JSONObject eLoc = json.getJSONObject("end_geo");
                String lineType = json.getString("scan_type");

                //line types
                lineTypes.put(lineType, lineType);

                //lines
                MarkLine.LinesEntity line = new MarkLine.LinesEntity();
                double[] sGeo = {sLoc.getDouble("lon"), sLoc.getDouble("lat")},
                        eGeo = {eLoc.getDouble("lon"), eLoc.getDouble("lat")};
                line.setType_name(lineType);
                line.setStartGeo(sGeo);
                line.setEndGeo(eGeo);
                lines.add(line);

                //devices
                points.put(json.getString("start_ip"), sGeo);
                points.put(json.getString("end_ip"), eGeo);
            }
            markLine.setLineTypes(lineTypes);
            markLine.setLines(lines);
            markLine.setPoints(points);
        }
        return markLine;
    }

   /* public static void main(String[] args) {
        MarklineDAO mkDAO = new MarklineDAO();
        MarkLines ms = mkDAO.getMarkLines(Constant.LG_MARKLINE_SEARCH_URL, "1");
        System.out.println(JSONObject.toJSON(ms));
    }*/
}