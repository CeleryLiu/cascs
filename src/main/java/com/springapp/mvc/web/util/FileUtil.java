package com.springapp.mvc.web.util;/*
 * Created by lyp on 2016-04-12.
 * @author lyp
 * @date 2016-04-12
 * @Description: 
 * @Version: V1.0
 */

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import java.io.File;

public class FileUtil {
    public static JSONObject getFile(String path) {
        JSONObject files = new JSONObject();//{"folderName" [file1Name,file2Name,...]:}
        // get file list where the path has
        File file = new File(path);
        // get the folder list
        File[] array = file.listFiles();
        for (int i = 0; i < array.length; i++) {
            if (array[i].isDirectory()) {
                files.put(array[i].getName(), getFileNamesFromFolder(array[i].getPath()));
            }
        }
        return files;
    }

    private static JSONArray getFileNamesFromFolder(String folderPath) {
        JSONArray result = new JSONArray();
        File folder = new File(folderPath);
        File[] array = folder.listFiles();
        for (int i = 0; i < array.length; i++) {
            if (array[i].isFile()) {
                // only take file name
                result.set(i, array[i].getName());
                // take file path and name
            }
        }
        return result;
    }
}
