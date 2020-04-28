function setCookie(name, value, daysToLive) {
  var expirationDate = new Date()
  expirationDate.setDate(expirationDate.getDate() + daysToLive)
  var completeValue = escape(value) + ((daysToLive == null) ? '' : '; expires=' + expirationDate.toUTCString())
  document.cookie = name + '=' + completeValue
}

function getCookie(name) {
  var i, x, y, cookies = document.cookie.split(';')
  for (i = 0; i < cookies.length; i++) {
    x = cookies[i].substr(0, cookies[i].indexOf('='))
    y = cookies[i].substr(cookies[i].indexOf('=') + 1)
    x = x.replace(/^\s+|\s+$/g, '')
    if (x == name) {
      return unescape(y)
    }
  }
}

function toggleDarkMode() {
  var html = document.getElementById('html')
  if (!hasClass(html, 'night')) {
    html.className = 'night'
    setCookie('dark-mode', true, 999999)
  } else {
    html.className = 'day'
    setCookie('dark-mode', '', 999999)
  }
}

function hasClass(element, className) {
  return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1
}
