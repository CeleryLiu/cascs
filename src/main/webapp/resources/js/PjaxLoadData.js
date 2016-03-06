/*
 * Created by lyp on 2016/3/6.
 * Author: lyp
 * Date: 2016/3/6
 * Description:使用pjax加载数据
 * Version: V1.0 
 */
var PjaxLoadData = {
    post: function () {
       /* if ($.support.pjax) {
         $(document).on('click', 'a[data-pjax]', function(event) {
         var container = $(this).closest('[data-pjax-container]')
         $.pjax.click(event, {container: container})
         })
         }*/
        $.fn.pjax({
            timeout:50000,
            type:'POST',
            dataType:'json',
            url:'',
            target:''
        });
    }
};