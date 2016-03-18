/**
 * Created by lyp on 2016/2/21.
 * !!IMPORTANT never use fonts of bootstrap, which do not compatible with the fullpagejs
 */
var currentPage = 1;
var onOfflineLoaded = function () {
    var offInterval = setInterval(function () {
        if (aOffline.window.AnalysisOffline) {
            aOffline.window.AnalysisOffline.init();
            clearInterval(offInterval);
        }
    }, 500);
};
var initFullpage = function () {
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
        if ($.inArray(sectionIdx, hideIdxList) == -1) {
            /*GlobalSearch.hide();
             Sidebar.hide();
             Pivot.hide();
             ResultOverview.hide();*/
            if (!GlobalSearch.isHidden()) {
                GlobalSearch.hide();
            }
            if (!Sidebar.isHidden()) {
                Sidebar.hide();
                SearchTip.hide();
            }
            if (!Pivot.isHidden()) {
                Pivot.hide();
            }
            if (!ResultOverview.isHidden()) {
                ResultOverview.hide();
            }
        } else {
            /*GlobalSearch.show();
             Sidebar.show();
             Pivot.show();
             ResultOverview.show();*/
            if (GlobalSearch.isHidden()) {
                GlobalSearch.show();
            }
            if (Sidebar.isHidden()) {
                Sidebar.show();
                SearchTip.show();
            }
            if (Pivot.isHidden()) {
                Pivot.show();
            }
            if (ResultOverview.isHidden()) {
                ResultOverview.show();
            }
        }
        if (sectionIdx == 3) {
            $('#tool_wrapper').show();
        } else {
            $('#tool_wrapper').hide();
        }
        $.fn.fullpage.reBuild();
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
        //recordHistory: false,

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
        normalScrollElements: '#mapHolder,#list_wrapper,#sidebar,.advs-wrapper,#search_tips', //avoid the auto scroll when scrolling over map
        normalScrollElementTouchThreshold: 3,
        scrollOverflow: true,

        //↓events
        afterRender: function () {  //initialize here
            //console.log('fullPage.afterRender()');
            //(init-1)add slides nav tips
            //addTooltip4Slides(Constant.SLIDE_NAV_TOOLTIPS);
            //(init-3)updates the DOM structure to fit the new window
            $.fn.fullpage.reBuild();
        },
        afterResize: function () {
            //console.log('fullPage.afterResize()');
            $.fn.fullpage.reBuild();
        },
        onLeave: function (index, nextIndex, direction) {
            //console.log('fullPage.onLeave(), index:' + index + ', nextIndex = ' + nextIndex + ', direction = ' + direction);
            switch (index) {
                case 3:
                    ArcMap.onLeave();
                    break;
                case 5:
                    iLine.window.destroy();
                    clearTimeout(iLine.window.timeout);
                    break;
                default:
                    break;
            }
        },
        afterLoad: function (anchorLink, index) {
            //console.log('fullPage.afterLoad() ======, anchorLink: ' + anchorLink + ', index: ' + index);
            toggleFixedElement(index);//↓如果此section不是搜索界面/或是首页，则隐藏全局搜索框、侧边栏和Pivot

            currentPage = index;
            var data = Session.get('data');
            switch (index) {
                case 1:
                    break;
                case 2:
                    List.onLoad();
                    if (data) {
                        GlobalSearch.setValue(JSON.parse(data['q'])['wd']);
                        List.onSearchSucceed(data);
                    }
                    UserSearchHistory.init();
                    break;
                case 3:
                    ArcMap.onLoad();
                    if (data) {
                        GlobalSearch.setValue(JSON.parse(data['q'])['wd']);
                        ArcMap.onSearchSucceed(data);
                    }
                    UserSearchHistory.init();
                    break;
                case 4:
                    //Sidebar.hide();
                    break;
                case 5:
                    //Sidebar.hide();
                    var lineInterval = setInterval(function () {
                        if (iLine.window) {
                            iLine.window.starts();
                            clearInterval(lineInterval);
                        }
                    }, 500);
                    break;
                case 6:
                    break;
                case 7:
                    // 或者在iframe中添加onload="onOfflineAnalysisLode(this)"
                    /*  var offInterval = setInterval(function () {
                     if (aOffline.window.AnalysisOffline) {
                     aOffline.window.AnalysisOffline.init();
                     clearInterval(offInterval);
                     }
                     }, 500);*/
                    break;
            }
            $.fn.fullpage.reBuild();
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
};
$(function () {
        Pace.ignore(function () {
            ArcMap.initFeatureSets();
            ArcMap.init();
        });
        //$('#lineSe').append(iframe); // add it to wherever you need it in the document
        InputSuggest.init();
        SearchTip.init();
        HomeSearch.listen();
        GlobalSearch.listen();
        AdvSearch.listen();
        User.listenerStarts();
        initFullpage();//full page js
    }
);