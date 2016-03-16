package com.springapp.mvc.web.util;/*
 * Created by lyp on 2016-03-15.
 * @author lyp
 * @date 2016-03-15
 * @Description: 获取年月日的工具
 * @Version: V1.0
 */

import com.alibaba.fastjson.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateUtil {
    SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");//设置日期格式


    /*
     * 返回指定日期的月的第一天
     * @param year
     * @param month
     * @return
     */
    public static Date getFirstDayOfMonth(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH), 1);
        return calendar.getTime();
    }

    /*
     * 返回指定年月的月的第一天
     * @param year
     * @param month
     * @return
     */
    public static Date getFirstDayOfMonth(Integer year, Integer month) {
        Calendar calendar = Calendar.getInstance();
        if (year == null) {
            year = calendar.get(Calendar.YEAR);
        }
        if (month == null) {
            month = calendar.get(Calendar.MONTH);
        }
        calendar.set(year, month - 1, 1);
        return calendar.getTime();
    }

    /*
     * 返回指定日期的月的最后一天
     * @param year
     * @param month
     * @return
     */
    public static Date getLastDayOfMonth(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH), 1);
        calendar.roll(Calendar.DATE, -1);
        return calendar.getTime();
    }

    /*
     * 返回指定年月的月的最后一天
     * @param year
     * @param month
     * @return
     */
    public static Date getLastDayOfMonth(Integer year, Integer month) {
        Calendar calendar = Calendar.getInstance();
        if (year == null) {
            year = calendar.get(Calendar.YEAR);
        }
        if (month == null) {
            month = calendar.get(Calendar.MONTH);
        }
        calendar.set(year, month - 1, 1);
        calendar.roll(Calendar.DATE, -1);
        return calendar.getTime();
    }

    /*
     * 返回指定日期对应的unix时间戳
     * @param date
     * @return unix时间戳
     */
    public static long date2UnixTimestamp(Date date) {
        long unixTimestamp = 0L;
        try {
            unixTimestamp = date.getTime() / 1000;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return unixTimestamp;
    }

    /*
     * 将时间戳转换成指定格式的日期
     * @param timestampStr 字符串类型的时间戳
     * @param formats 日期格式
     * @return 指定格式的日期
     */
    public static String timestamp2Date(long timestamp, String formats) {
        if (formats == null) {
            formats = "yyyy-MM-dd";
        }
        return new java.text.SimpleDateFormat(formats).format(new java.util.Date(timestamp));
    }


    /*
     * 获取时间戳所表示的年、月、日
     * @param long 时间戳
     * @return JSONObject{year:2015,month:03,day:01}
     */
    public static JSONObject getJsonDate(long timestamp) {
        String formatted = timestamp2Date(timestamp, "yyyy-MM-dd");
        String[] arr = formatted.split("-");
        JSONObject result = new JSONObject();
        result.put("date", formatted);
        result.put("year", arr[0]);
        result.put("month", arr[1]);
        result.put("day", arr[2]);
        return result;
    }

    /*
     * 获取当前日期前n个月的第一天的unix时间戳（包含当前月）
     * @param
     * @return 当前日期之前n个月第一天的时间戳
     */
    public static long getFirstDayOfPreviousNMonth(int n) {
        Calendar calendar = Calendar.getInstance();
        calendar.set(calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH) - n + 1, 1);
        return calendar.getTimeInMillis();
    }

/*    public static void main(String[] args) {
        getFirstDayOfPreviousNMonth(6);
//        System.out.println(getFirstDayOfMonth(new Date()));
//        System.out.println(getFirstDayOfMonth(2015, 12));
//        System.out.println(getLastDayOfMonth(new Date()));
//        System.out.println(getLastDayOfMonth(2016, 1));
//        System.out.println(timestamp2Date(Calendar.getInstance().getTimeInMillis() + "", "yyyy-MM-dd"));
//        long timestamp = System.currentTimeMillis();
//        System.out.println(timestamp);
        System.out.println(getJsonDate(System.currentTimeMillis()));
    }*/
}
