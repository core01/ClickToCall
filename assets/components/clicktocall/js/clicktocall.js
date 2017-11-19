/**
 * Created by Roman Sadoyan on 29.03.16.
 */
document.addEventListener('DOMContentLoaded', function () {
  var md = new MobileDetect(window.navigator.userAgent)
  if (md.mobile()) {
    document.querySelector('#ClickToCall').style.display = 'block'
  }
})
