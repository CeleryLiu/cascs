/**
 * @author lyp
 * @date 2016-03-24
 * @module name
 * @description 看世界
 */
$(function () {
    $('.nav-right a').fontFlex(16, 24, 60);//字体自适应
    var galleries = $('.ad-gallery').adGallery();
    $('#switch-effect').change(function () {
        galleries[0].settings.effect = $(this).val();
        return false;
    });
    $('#toggle-slideshow').click(function () {
        galleries[0].slideshow.toggle();
        return false;
    });
    $('#toggle-description').click(function () {
        if (!galleries[0].settings.description_wrapper) {
            galleries[0].settings.description_wrapper = $('#descriptions');
        } else {
            galleries[0].settings.description_wrapper = false;
        }
        return false;
    });
    $('.hide-control').click(function () {
        console.log('aaa');
        $('.active-image-wrapper').animate({
            //opacity: '0.5',
            width: '0'
        }, 'slow', function () {
            $('#active_image').hide();
            $('.show-control').show();
        });
    });

    $('.show-control').click(function () {
        $('.active-image-wrapper').animate({
            //opacity: '0.5',
            width: '90%'
        }, 'slow', function () {
            $('#active_image').show('slow');
            $('.show-control').hide();
        });
    });
});