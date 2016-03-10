/*
 * Created by lyp on 2016/2/23.
 * @description: input输入框提示模块
 * @author: lyp
 * @date: 2016-03-01
 */
var InputSuggest = {
    init: function () {
        //console.log('InputSuggest.init() ======');
        this.suggestCursorToggle();
        this.getSuggestions('.home-search-input', Constant.SUGGEST_URL);
        this.getSuggestions('#global_search_input', Constant.SUGGEST_URL);
        this.startRecommend();
    },
    getSuggestions: function (inputSelector, sourceURL) {
        var $input = $(inputSelector);
        var $form = $input.closest('form');
        var suggestions = function (sourceURL) {
            var bloodHound = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                //Prefetched data is fetched and processed on initialization. If the browser supports local storage,
                // the processed data will be cached there to prevent additional network requests on subsequent page loads.
                prefetch: {
                    url: Constant.LOCAL_SUGGEST_URL,
                    //url: dataSource,
                    limit: 10,
                    //ttl: 10000,//The time (in milliseconds) the prefetched data should be cached in local storage. Defaults to 86400000 (1 day).
                    filter: function (resp) {
                        if (resp[$input.attr('id')]) {
                            return $.map(resp[$input.attr('id')], function (item) {
                                return $.isArray(item) && item.length == 2 ? {
                                    title: item[0],
                                    desc: item[1],
                                    value: item[0]
                                } : {
                                    title: item,
                                    value: item
                                }
                            })
                        } else {
                            var suggestions = [];
                            for (var key in resp) {
                                suggestions = suggestions.concat(resp[key]);
                            }
                            return $.map(suggestions, function (item) {
                                return $.isArray(item) && item.length == 2 ? {
                                    title: item[0],
                                    desc: item[1],
                                    value: item[0]
                                } : {
                                    title: item,
                                    value: item
                                }
                            })
                        }
                    }
                },
                remote: {
                    url: sourceURL + '%QUERY',
                    filter: function (resp) {
                        return $.map(resp.data, function (item) {
                            return $.isArray(item) && item.length == 2 ? {
                                title: item[0],
                                desc: item[1],
                                value: item[0]
                            } : {
                                title: item,
                                value: item
                            }
                        })
                    },
                    wildcard: '%QUERY'
                }
            });
            // Initialize the Bloodhound suggestion engine
            bloodHound.initialize();
            return bloodHound.ttAdapter();
        };
        if ($input.length) {
            // Initialize Typeahead with Parameters
            $input.typeahead({hint: false, highlight: true, minLength: 1}, {
                display: "value",
                source: suggestions(sourceURL),
                limit: 10,
                templates: {
                    suggestion: function (data) {
                        var result = data.title;
                        if (data.desc) {
                            result += '<span class="muted pull-right">' + data.desc + '</span>'
                        }
                        return '<div>' + result + '</div>'
                    }
                }
            }).on("typeahead:selected", function (event, suggestion) {
                //console.log("suggestion", suggestion);
                $form.submit();
            }).on("keypress keydown keyup paste change", function (evt) {
                /*if (evt.keyCode == 13) {
                 $form.submit();
                 }*/
            }).filter(".home-search .flex-text").focus()
        }
    },
    suggestCursorToggle: function () {
        //修复typeahead.js的一个bug，参考：https://github.com/twitter/typeahead.js/issues/1195
        $('body').on("mouseover", ".tt-suggestion", function () {
            $('.tt-suggestion').removeClass('tt-cursor');
            $(this).addClass('tt-cursor');
        });
    },
    startRecommend: function () {
        var $input = $("input[role=combobox]");

        function recommendInput() {
            var url = Constant.RECOMMEND_URL;
            var dorks = [];
            var length = 0;

            function randomInput() {
                var recommend = "";
                var random = parseInt(Math.random() * length, 10);
                if ($input.val() == "") {
                    recommend = dorks[random];
                    $input.attr("placeholder", recommend)
                }
                setTimeout(function () {
                    randomInput()
                }, 3e3);
            }

            $.getJSON(url, {}, function (data) {
                dorks = data.data;
                length = data.data.length;
                randomInput()
            });
        }

        if ($input.length) {
            setTimeout(function () {
                recommendInput()
            }, 300);
        }
    }
};