/// <reference path='qaf.core.js' />

/// <summary>
/// 브라우저 정보를 제공하는 모듈입니다.
/// </summary>
(function (window) {
    'use strict';
    var $browser = $browser || new baseCore();
    var document = window.document;

    $browser.extend({
        version: '1.0',

        /// <summary>
        /// 브라우저의 이름입니다.
        /// </summary>
        appName: navigator.appName,

        /// <summary>
        /// 브라우저의 코드명입니다.
        /// </summary>
        appCodeName: navigator.appCodeName,

        /// <summary>
        /// 브라우저의 메이저 버전 정보입니다.
        /// </summary>
        appMajorVersion: navigator.appVersion.substring(0, 4),

        /// <summary>
        /// 브라우저의 버전 정보입니다.
        /// </summary>
        appVersion: navigator.appVersion,

        /// <summary>
        /// 브라우저가 실행중인 플랫폼 정보입니다.
        /// </summary>
        platform: navigator.platform,

        /// <summary>
        /// 브라우저의 자바스크립트 실행여부입니다.
        /// </summary>
        javaEnabled: navigator.javaEnabled(),

        /// <summary>
        /// 클라이언트 모니터의 가로 해상도입니다.
        /// </summary>
        screenWidth: screen.width,

        /// <summary>
        /// 클라이언트 모니터의 세로 해상도입니다. 
        /// </summary>
        screenHeight: screen.height,

        /// <summary>
        /// 브라우저의 기본 언어권(LocaleID)입니다.
        /// </summary>
        language: (navigator.appName == 'Netscape') ? navigator.language : navigator.browserLanguage,

        /// <summary>
        /// Webkit을 지원하는 브라우저인지 확인합니다.
        /// </summary>
        isWebkit: navigator.userAgent.indexOf('AppleWebKit/') > -1,

        /// <summary>
        /// Gecko 기반의 브라우저인지 확인합니다.
        /// </summary>
        isGecko: navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') == -1,

        /// <summary>
        /// KHTML을 지원하는 브라우저인지 확인합니다.
        /// </summary>
        isKHTML: navigator.userAgent.indexOf('KHTML') != -1,

        /// <summary>
        /// Opera 브라우저인지 확인합니다.
        /// </summary>
        isPresto: navigator.appName == 'Opera',

        /// <summary>
        /// 맥킨토시 기반에서 구동중인지 확인합니다.
        /// </summary>
        isMac: navigator.appVersion.indexOf("Mac") != -1 || navigator.userAgent.indexOf('Macintosh') != -1,

        /// <summary>
        /// 리눅스 또는 유닉스 기반에서 구동중인지 확인합니다.
        /// </summary>
        isLinux: navigator.appVersion.indexOf("Linux") != -1 || navigator.appVersion.indexOf("X11") != -1,

        /// <summary>
        /// 윈도우 기반에서 구동중인지 확인합니다.
        /// </summary>
        isWin: navigator.appVersion.indexOf("Win") != -1 || navigator.userAgent.indexOf('Windows') != -1,

        /// <summary>
        /// Internet Explorer 6-11 브라우저인지 확인합니다.
        /// </summary>
        isIE: !!document.documentMode || (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1),

        /// <summary>
        /// Chrome 브라우저인지 확인합니다.
        /// </summary>
        isChrome: !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime),

        /// <summary>
        /// Edge 20+ 브라우저인지 확인합니다.
        /// </summary>
        isEdge: (!!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)) && (navigator.userAgent.indexOf("Edg") != -1),

        /// <summary>
        /// Firefox 브라우저인지 확인합니다.
        /// </summary>
        isFF: typeof InstallTrigger !== 'undefined' || navigator.userAgent.indexOf('Firefox') !== -1,

        /// <summary>
        /// Safari 브라우저인지 확인합니다.
        /// </summary>
        isSafari: /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification)),

        /// <summary>
        /// 현재 문서의 clientWidth 값을 조회합니다.
        /// </summary>
        windowWidth: function () {
            var ret = null;

            if (window.innerWidth) {
                ret = window.innerWidth;
            }
            else if (document.documentElement && document.documentElement.clientWidth) {
                ret = document.documentElement.clientWidth;
            }
            else if (document.body) {
                ret = document.body.offsetWidth;
            }

            return ret;
        },

        /// <summary>
        /// 현재 문서의 clientHeight 값을 조회합니다.
        /// </summary>
        windowHeight: function () {
            var ret = null;

            if (window.innerHeight) {
                ret = window.innerHeight;
            }
            else if (document.documentElement && document.documentElement.clientHeight) {
                ret = document.documentElement.clientHeight;
            }
            else if (document.body) {
                ret = document.body.clientHeight;
            }

            return ret;
        }
    });
    window.$browser = window.$b = qaf.$b = window.$browser || $browser;
})(globalThis);