/**
 * @author lyp
 * @date 2016-03-09
 * @module name UserSearchHistory
 * @description 目前没有数据库，用户搜索历史保存在localStorage中，等使用数据库后再保存在对应用户的查询记录中
 */
/*
 * localStorage:{
 *   searchHistory:[item1,item2,...]
 * }
 * 之后如果添加数据库，这里的CRUD操作会留到后台做
 */
var UserSearchHistory = {
    addItem: function (item) {
        // (1)将最近一次搜索的item存入localStorage中
        // (1.1)取出searchHistory
        var searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
        // (1.2)如果searchHistory的中包含key==item，则其value++

        // (1.3)添加新key(item)
        // (2)重新生成搜索历史节点
    },
    getItem: function () {
        // 从localStorage.searchHistory中获取用户最近一次搜索的词
    },
    deleteItem: function (item) {
        // 将某次搜索的词item从localStorage.searchHistory中删除
    },
    getItems: function (itemCount) {
        //从localStorage.searchHistory中获取用户最近itemCount次搜索的词
    },
    generateDoms: function () {
        //生成用户搜索历史DOM节点

        //监听关闭按钮事件
    }
};