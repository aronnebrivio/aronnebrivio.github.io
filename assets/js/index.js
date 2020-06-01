var THEME_DARK="night",THEME_LIGHT="day",THEMES=[THEME_LIGHT,THEME_DARK];function setCookie(e,t,n){var a=new Date;a.setDate(a.getDate()+n);var o=escape(t)+(null==n?"":"; expires="+a.toUTCString());document.cookie=e+"="+o}function getCookie(e){for(var t,n,a=document.cookie.split(";"),o=0;o<a.length;o++)if(t=a[o].substr(0,a[o].indexOf("=")),n=a[o].substr(a[o].indexOf("=")+1),(t=t.replace(/^\s+|\s+$/g,""))===e)return unescape(n)}function toggleTheme(){var e=document.getElementById("body"),t=hasClass(e,THEME_DARK)?THEME_LIGHT:THEME_DARK;setCookie("theme",e.className=t,999999),setToggleThemeTitle(t)}function hasClass(e,t){return-1<(" "+e.className+" ").indexOf(" "+t+" ")}function isThemeValid(e){return e&&e.length&&THEMES.includes(e)}function navigateTo(e){var t=document.getElementById(e);zenscroll.to(t);var n=document.querySelectorAll(".nav-item");return Array.prototype.forEach.call(n,function(e){e.className=e.className.replace(/\bactive\b/,"")}),hasClass(document.getElementById("top-menu"),"opened")&&toggleMobileMenu(),!1}function setToggleThemeTitle(e){var t='"Alexa, turn the lights ';t+=e===THEME_DARK?'on"':'off"';var n=document.getElementById("theme-toggle"),a=document.getElementById("mobile-theme-toggle");n.title=t,a.innerHTML=t}function toggleMobileMenu(){var e=document.getElementById("top-menu"),t=document.getElementById("screen-dimmer");hasClass(e,"opened")?(e.className="",t.className="hidden"):(e.className="opened",t.className="")}var theme=isThemeValid(theme=getCookie("theme"))?theme:THEME_DARK;setToggleThemeTitle(document.getElementById("body").className=theme),navigateTo("home");var mainHeader=document.getElementById("main-header");new MenuSpy(mainHeader,{menuItemSelector:'a[href^="#"]',activeClass:"active",threshold:10,enableLocationHash:!1,callback:null});