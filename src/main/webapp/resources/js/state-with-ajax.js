/**
 * @author lyp
 * @date 2016-03-03
 * @module 状态管理，参考http://www.rdeeson.com/weblog/113/going-back-in-history-with-ajax-and-html5.html?page=1
 * @description
 */

//whenever content of the currentPage is changed using AJAX methods
//(1)push the new state onto the history stack along with an object that will let you regenerate that state.
function createView(stateObject, pushHistory) {
    document.getElementById('contentBox').innerHTML = '<h1>' + stateObject.data + '</h1>' + boxcontent[stateObject.currentPage];
    currentPage = stateObject.currentPage;

    // Save state on history stack
    // - First argument is any object that will let you restore state
    // - Second argument is a title (not the page title, and not currently used)
    // - Third argument is the URL - this will appear in the browser address bar
    if (pushHistory) history.pushState(stateObject, stateObject.title, '?q=' + stateObject.q);
}

var boxcontent = [];
boxcontent[1] = 'Content for Page 1 is content.';
boxcontent[2] = 'This exciting stuff is content for Page 2.';
boxcontent[3] = 'Page 3 is probably the best page, in content terms.';
boxcontent[4] = 'Wow, you\'re still reading this crap?';

// (state-1) use a global variable to hold the current page number
var currentPage = 'home';

// (state-2) push the initial state onto the history stack
var myData = "用来渲染页面的数据";
history.pushState({contentId: currentPage, data: myData,q:'aif'}, 'CASCS', '?q=' + currentPage);

// (state-3) use false as the second argument below,state will already be on the stack when going Back/Forwards
window.onpopstate = function (event) {
    console.log(event.state,'onpopstate event state-------------------');
    createView(event.state, false);
};