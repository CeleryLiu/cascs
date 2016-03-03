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
    var toggleFixedElement = function (sectionIdx) {
        var hideIdxList = Constant.NO_SEARCH_SECTION_IDX;
        if ($.inArray(sectionIdx, hideIdxList) > -1) {
            if (!GlobalSearch.isHidden()) {
                GlobalSearch.hide();
            }
            if (!Sidebar.isHidden()) {
                Sidebar.hide();
            }
            if (!Pivot.isHidden()) {
                Pivot.hide();
            }
            if (!ResultOverview.isHidden()) {
                ResultOverview.hide();
            }
        } else {
            if (GlobalSearch.isHidden()) {
                GlobalSearch.show();
            }
            if (Sidebar.isHidden()) {
                Sidebar.show();
            }
            if (Pivot.isHidden()) {
                Pivot.show();
            }
            if (ResultOverview.isHidden()) {
                ResultOverview.show();
            }
        }
    };
    var getCurrentPageId = function () {
        //body.class="fp-viewing-sectionAnchor-slideAnchor"
        var classStr = $('body').attr('class');
        var secAndSliAnchor = classStr.substring(classStr.indexOf('fp-viewing-'));
        if (secAndSliAnchor.indexOf(' ') != -1) {
            secAndSliAnchor = secAndSliAnchor.substring(0, classStr.indexOf(' '));
        }
        console.log(secAndSliAnchor);
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
        autoScrolling: true,
        normalScrollElements: '#mapHolder,#list-wrapper,#sidebar', //avoid the auto scroll when scrolling over map
        normalScrollElementTouchThreshold: 3,
        scrollOverflow: true,

        //↓events
        afterRender: function () {  //initialize here
            console.log('fullPage.afterRender()');
            //(init-1)add slides nav tips
            //addTooltip4Slides(Constant.SLIDE_NAV_TOOLTIPS);
            //(init-2)custom initialize
            InputSuggest.init();
            HomeSearch.listen();
            GlobalSearch.listen();
            //User.listenerStarts();
            ArcMap.init();
            //mainInit();
            //initMap();

            //(init-3)updates the DOM structure to fit the new window
            $.fn.fullpage.reBuild();
        },
        afterResize: function () {
            //console.log('fullPage.afterResize()');
        },
        onLeave: function (index, nextIndex, direction) {
            //console.log('fullPage.onLeave(), index:' + index + ', nextIndex = ' + nextIndex + ', direction = ' + direction);
            switch (index) {
                case 5:
                    //MarkLine.destroy();
                    break;
                case 3:
                    ArcMap.onLeave();
                    break;
            }
        },
        afterLoad: function (anchorLink, index) {
            //console.log('fullPage.afterLoad() ======, anchorLink: ' + anchorLink + ', index: ' + index);
            //↓如果当前section不是搜索界面/首页，则隐藏全局搜索框、侧边栏和Pivot
            //toggleFixedElement(index);
            //var data = MySessionStorage.get('data');
            toggleFixedElement(index);//↓如果此section不是搜索界面/或是首页，则隐藏全局搜索框、侧边栏和Pivot

            switch (index) {
                case 1:
                    break;
                case 2:
                    //List.show(data);
                    //$(Sidebar._WRAPPER_SEL).addClass('list');
                    break;
                case 3:
                    ArcMap.onLoad();
                    //MyMap.show(data);
                    break;
                case 4:
                    //MarkPoint.init();
                    //MySessionStorage.set('currentPage', 'globe-point');
                    //GlobePoint.show();
                    break;
                case 5:
                    //MarkLine.init();
                    //GlobeLine.show();
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
