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
  var i
  var x
  var y
  var cookies = document.cookie.split(';')

  for (i = 0; i < cookies.length; i++) {
    x = cookies[i].substr(0, cookies[i].indexOf('='))
    y = cookies[i].substr(cookies[i].indexOf('=') + 1)
    x = x.replace(/^\s+|\s+$/g, '')
    if (x === name) {
      return unescape(y)
    }
  }
}

function toggleTheme() {
  var body = document.getElementById('body')
  var theme = !hasClass(body, THEME_DARK) ? THEME_DARK : THEME_LIGHT
  body.className = theme
  setCookie('theme', theme, 999999)
  setToggleThemeTitle(theme)
}

function hasClass(element, className) {
  return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1
}

function isThemeValid(theme) {
  return theme && theme.length && THEMES.includes(theme)
}

function navigateTo(id) {
  var element = document.getElementById(id)
  zenscroll.to(element)

  var navItems = document.querySelectorAll('.nav-item')
  Array.prototype.forEach.call(navItems, function(item) {
    item.className = item.className.replace(/\bactive\b/, '')
  })

  var menu = document.getElementById('top-menu')
  if (hasClass(menu, 'opened')) {
    toggleMobileMenu()
  }

  return false
}

function setToggleThemeTitle(theme) {
  var title = '"Alexa, turn the lights '
  title += theme === THEME_DARK ? 'on"' : 'off"'

  var toggle = document.getElementById('theme-toggle')
  var mobileToggle = document.getElementById('mobile-theme-toggle')
  toggle.title = title
  mobileToggle.innerHTML = title
}

function toggleMobileMenu() {
  var menu = document.getElementById('top-menu')
  var dimmer = document.getElementById('screen-dimmer')

  if (hasClass(menu, 'opened')) {
    menu.className = ''
    dimmer.className = 'hidden'
  } else {
    menu.className = 'opened'
    dimmer.className = ''
  }
}

/* MAIN */
var theme = getCookie('theme')
theme = isThemeValid(theme) ? theme : THEME_DARK
document.getElementById('body').className = theme
setToggleThemeTitle(theme)

navigateTo('home')

var mainHeader = document.getElementById('main-header')
new MenuSpy(mainHeader, {
  menuItemSelector: 'a[href^="#"]',
  activeClass: 'active',
  threshold: 10,
  enableLocationHash: false,
  callback: null
})
