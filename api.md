1. “看世界”前端接口<br>
	接口名称：<basePath>/vision/getPictures
	<br>
	请求参数：pictureTag: <场景标签>
	<br>
	请求示例：1.1.1.1:8080/vision/getPictures?wd=description.other.pictureTags:学校
	<br>
	返回数据：
	<br>

	    {
	      "statuscode": 200,
	      "errmsg": "success",
	      "data": [
	    	{
	      		"ip": 10.1,
	      		"lng": 10.2,
	      		"lat": 1,
	      		"country": "中国",
	      		"city": "北京",
	      		"host": "reserved",
	      		"brand": "reserved",
	      		"src": "xx",
	      		"pictureUrl": "",
	      		"videoUrl": "",
	      		"pictureTags": [
	    			"景区"
	      		],
	      		"time": 1456883431000
	    	}
	      ]
	    }

	搜索平台数据→系统前端字段转换说明：<br>
	
	     {
	      "ipField": "data[i].description.ip",
	      "lngField": "data[i].description.device_location.lon",
	      "latField": "data[i].description.device_location.lat",
	      "countryField": "data[i].description.device_location.country",
	      "cityField": "data[i].description.device_location.city",
	      "hostField": "目前未使用，无法获取",
	      "brandField": "data[i].description.port_info[i].device_brand，目前未使用，不需获取",
	      "srcField": "data[i].description.other.filePath[length-1]",
	      "pictureUrlField": "data[i].description.other.pictureUrl",
	      "videoUrl": "data[i].description.other.videoUrl",
	      "pictureTags": "data[i].description.other.pictureTags",
	      "timeField": "data[i].lastModified"
	    }
