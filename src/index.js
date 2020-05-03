var THEME_DARK = 'night'
var THEME_LIGHT = 'day'
var THEMES = [
  THEME_LIGHT,
  THEME_DARK,
]

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

function toggleTheme() {
  var body = document.getElementById('body')
  if (!hasClass(body, THEME_DARK)) {
    body.className = THEME_DARK
    setCookie('theme', THEME_DARK, 999999)
  } else {
    body.className = THEME_LIGHT
    setCookie('theme', THEME_LIGHT, 999999)
  }
}

function hasClass(element, className) {
  return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1
}

function isThemeValid(theme) {
  return theme && theme.length && THEMES.includes(theme)
}
