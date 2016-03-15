package com.springapp.mvc.web.util;/*
 * Created by lyp on 2016-03-15.
 * @author lyp
 * @date 2016-03-15
 * @Description: 获取年月日的工具
 * @Version: V1.0
 */

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
     * 将Unix时间戳转换成指定格式的日期
     * @param timestampStr 字符串类型的unix时间戳
     * @param formats 日期格式
     * @return 指定格式的日期
     */
    public static String unixTimestamp2Date(String timestampStr, String formats) {
        Long timestamp = Long.parseLong(timestampStr) * 1000;
        String date = new java.text.SimpleDateFormat(formats).format(new java.util.Date(timestamp));
        return date;
    }

    /*
     * 获取当前日期前六个月的第一天的unix时间戳
     * @param
     * @return 当前日期之前6个月第一天的unix时间戳
     */
    public static long getFirstDayOfPrevious6Month() {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MONTH, -5);   //获取当前时间的前6个月（包含当前月）
        System.out.println(calendar.getTimeInMillis() / 1000);
        return calendar.getTimeInMillis() / 1000;
    }

    public static void main(String[] args) {
        getFirstDayOfPrevious6Month();
//        System.out.println(getFirstDayOfMonth(new Date()));
//        System.out.println(getFirstDayOfMonth(2015, 12));
//        System.out.println(getLastDayOfMonth(new Date()));
//        System.out.println(getLastDayOfMonth(2016, 1));
//        System.out.println(unixTimestamp2Date(getFirstDayOfMonth(new Date()) + "", "yyyy-MM-dd"));

    }
}
