/**
 * Created by Roman Sadoyan on 29.03.16.
 */
$(document).ready(function () {
    console.log('START');
    var md = new MobileDetect(window.navigator.userAgent);
    if (md.mobile()) {
        console.log('Mobile');
        $('#ClickToCall').css('display', 'block');
    } else {
        console.log('ne mobile');
    }
});
