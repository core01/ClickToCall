/**
 * Created by Roman Sadoyan on 29.03.16.
 */
$(document).ready(function () {
    var md = new MobileDetect(window.navigator.userAgent);
    if (md.mobile()) {
        $('#ClickToCall').css('display', 'block');
    }
});
