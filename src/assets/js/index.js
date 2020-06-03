var THEME_DARK = 'night'
var THEME_LIGHT = 'day'
var THEMES = [
  THEME_LIGHT,
  THEME_DARK,
]
var MANIFEST = {
  "name": "Aronne Brivio",
  "short_name": "~/aronnebrivio",
  "description": "Aronne Brivio front page and resume. Projects, experience and education.",
  "start_url": "index.html",
  "background_color": "#000000",
  "theme_color": "#000000",
  "display": "standalone",
  "orientation": "portrait",
  "icons": [{
    "src": "assets/images/logo-512x512.png",
    "type": "image/png",
    "sizes": "512x512"
  }]
}

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
  setManifest(theme)
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

function setManifest(theme) {
  if (theme === THEME_LIGHT) {
    MANIFEST.theme_color = '#ffffff'
    MANIFEST.background_color = '#ffffff'
  } else {
    MANIFEST.theme_color = '#2d2d2d'
    MANIFEST.background_color = '#2d2d2d'
  }

  var stringManifest = JSON.stringify(MANIFEST);
  var blob = new Blob([stringManifest], {
    type: 'application/json'
  });
  var manifestURL = URL.createObjectURL(blob);
  document.querySelector('#manifest-placeholder').setAttribute('href', manifestURL);
}

/* MAIN */
var theme = getCookie('theme')
theme = isThemeValid(theme) ? theme : THEME_DARK
document.getElementById('body').className = theme
setManifest(theme)
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

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('libs/sw.js')
}
