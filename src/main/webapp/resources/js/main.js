/**
 * Created by lyp on 2016/2/21.
 * !!IMPORTANT never use fonts of bootstrap, which do not compatible with the fullpagejs
 */
$(function () {
    //functions
    var addTooltip4Slides = function (slideNavTipList) {
        var slideNavList = $('.fp-slidesNav a');
        $.each(slideNavTipList, function (idx, tip) {
            $(slideNavList[idx]).attr({
                'data-toggle': 'tooltip',
                'title': tip
            });
        });
        slideNavList.tooltip();
    };
    var hideNodes4NoSearchSec = function (sectionIdx) {
        var hideIdxList = Constant.NO_SEARCH_SECTION_IDX;
        if ($.inArray(sectionIdx, hideIdxList) > -1) {
            if (!GlobalSearchForm.isHidden()) {
                GlobalSearchForm.hide();
            }
            if (!Sidebar.isHidden()) {
                Sidebar.hide();
            }
            if (!Pivot.isHidden()) {
                Pivot.hide();
            }
        } else {
            if (GlobalSearchForm.isHidden()) {
                GlobalSearchForm.show();
            }
            if (Sidebar.isHidden()) {
                Sidebar.showOnly();
            }
            if (Pivot.isHidden()) {
                Pivot.show();
            }
        }
    };

    $('.fullpage').fullpage({
        //↓Navigation
        menu: '#menu',
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: Constant.SECTION_NAV_TOOLTIPS,
        //slidesNavigation: true,
        //slidesNavPosition: 'bottom',

        //↓Accessibility
        animateAnchor: false,//scroll with animation or will directly load on the given section; default to true
        keyboardScrolling: false,

        //↓Design
        controlArrows: false,
        sectionsColor: Constant.SECTIONS_BG_COLOR,
        fixedElements: Constant.FIXED_ELEMENTS,
        resize: true,
        paddingTop: '4.8rem',     //header height = 4.6rem
        paddingBottom: '2.8rem',  //footer height = 2.6rem
        //responsiveHeight:900,

        //↓Scrolling
        normalScrollElements: '#mapHolder,.list-wrappe', //avoid the auto scroll when scrolling over map
        normalScrollElementTouchThreshold: 3,
        scrollOverflow: true,

        //↓events
        afterRender: function () {  //initialize
            console.log('Inside afterRender() ======');
            //(init-1)add slides nav tips, NOT IN USE FOR NOW
            //addTooltip4Slides(Constant.SLIDE_NAV_TOOLTIPS);

            //(init-2)custom initialize
            InputSuggest.init();
            HomeSearch.listenerStart();
            GlobalSearchForm.listenerStart();
            User.listenerStarts();
            //Map.init();
            mainInit();
            initMap();

            //(init-3)updates the DOM structure to fit the new window
            $.fn.fullpage.reBuild();
        },
        afterResize: function () {
            //console.log('Inside afterResize() ======');
        },
        onLeave: function (index, nextIndex, direction) {
            //console.log('Inside onLeave() ======,');
            //console.log('Inside onLeave() ======, index = ' + index + ', nextIndex = ' + nextIndex + ', direction = ' + direction);
            //↓如果下一个section不是搜索界面/首页，则隐藏全局搜索框、侧边栏和Pivot
            //BE CAREFUL! 这里的index和nextIndex的值要严格和HTML的DOM中的section一一对应
            hideNodes4NoSearchSec(nextIndex);
            switch (index) {
                case 5:
                    //MarkLine.destroy();
                    break;
                case 3:
                    MapOpt.leave();
            }
        },
        afterLoad: function (anchorLink, index) {
            //console.log('Inside afterLoad() ======');
            //console.log('Inside afterLoad() ======, anchorLink = ' + anchorLink + ', index = ' + index);
            //↓如果当前section不是搜索界面/首页，则隐藏全局搜索框、侧边栏和Pivot
            hideNodes4NoSearchSec(index);
            var data = MySessionStorage.get('data');
            switch (index) {
                case 1:
                    break;
                case 2:
                    List.show(data);
                    break;
                case 3:
                    MapOpt.load();
                    MyMap.show(data);
                    break;
                case 4:
                    //MarkPoint.init();
                    MySessionStorage.set('currentPage', 'globe-point');
                    GlobePoint.show();
                    break;
                case 5:
                    //MarkLine.init();
                    GlobeLine.show();
                    break;
                case 6:
                    break;
            }
        },
        afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {
            //console.log('Inside afterSlideLoad() ======');
            //console.log('Inside afterSlideLoad() ======, anchorLink = ' + anchorLink + ', index = ' + index + ', slideAnchor = ' + slideAnchor + ', slideIndex = ' + slideAnchor);
            //$('.fp-slidesNav a').tooltip('hide');//隐藏slide的tooltip
        },
        onSlideLeave: function (anchorLink, index, slideIndex, direction, nextSlideIndex) {
            //console.log('Inside onSlideLeave() ======, anchorLink = ' + anchorLink + ', index = ' + index + ', slideIndex = ' + slideIndex + ', nextSlideIndex = ' + nextSlideIndex);
            //console.log('Inside onSlideLeave() ======');
        }
    });
});
var GlobeLine = {
    show: function () {
        Sidebar.hide();
        iLine.window.starts();
    }
};
var GlobePoint = {
    show: function () {
        Sidebar.hide();
        iPoint.window.starts();
    }
};
