/**
 * Created by lyp on 2016/2/21.
 * !!IMPORTANT never use fonts of bootstrap, which do not compatible with the fullpagejs
 */
var currentPage = 1;
var data;
window.onpopstate = function (event) {
    console.log(event, event.state);
    //Use false as the second argument below
    // - state will already be on the stack when going Back/Forwards
    createView(event.state, false);
};
$(function () {
    history.pushState({contentId: 1, title: 'Welcome to CASCS'}, 'Welcome to CASCS', '');
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
        if (sectionIdx == 3) {
            $('#tool_wrapper').show();
        } else {
            $('#tool_wrapper').hide();
        }
    };

    // starts --------------
    // ArcGis feature set
    ArcMap.initFeatureSets();
    //full page js
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
            ArcMap.init();
            //User.listenerStarts();

            //(init-3)updates the DOM structure to fit the new window
            $.fn.fullpage.reBuild();
        },
        afterResize: function () {
            //console.log('fullPage.afterResize()');
        },
        onLeave: function (index, nextIndex, direction) {
            //console.log('fullPage.onLeave(), index:' + index + ', nextIndex = ' + nextIndex + ', direction = ' + direction);
            switch (index) {
                case 3:
                    ArcMap.onLeave();
                    break;
                case 5:
                    iLine.window.destroy();
                    break;
                default:
                    break;
            }
        },
        afterLoad: function (anchorLink, index) {
            //console.log('fullPage.afterLoad() ======, anchorLink: ' + anchorLink + ', index: ' + index);
            toggleFixedElement(index);//↓如果此section不是搜索界面/或是首页，则隐藏全局搜索框、侧边栏和Pivot
            currentPage = index;
            switch (index) {
                case 1:
                    break;
                case 2:
                    $(Sidebar._WRAPPER_SEL).addClass('list');
                    List.render(data);
                    break;
                case 3:
                    ArcMap.onLoad();
                    ArcMap.render(data);
                    break;
                case 4:
                    Sidebar.hide();
                    iPoint.window.starts();
                    break;
                case 5:
                    Sidebar.hide();
                    iLine.window.starts();
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
