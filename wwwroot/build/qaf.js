/*!
QCN Application Framework Javascript Library v1.2.0
http://www.qcn.co.kr

Copyright 2020, QCN
*/
/// <summary>
/// 객체 지향 개발을 위한 코어기능을 제공합니다.
/// </summary>

/// var depth1 = $object || new baseCore();
/// 
/// depth1.method = function()
/// {
///     alert('depth1');
/// }
/// 
/// depth1.method();
/// 
/// var depth2 = depth1.extend({
///     method: function()
///     {
///         this.base();
///         alert('depth2');
///     }
/// });
/// 
/// depth2.method();

var getGlobal = function () {
    if (typeof globalThis !== 'undefined') return globalThis;
    if (typeof self !== 'undefined') return self;
    if (typeof window !== 'undefined') return window;
    if (typeof global !== 'undefined') return global;
    if (typeof this !== 'undefined') return this;
    throw new Error('전역 객체를 찾을 수 없습니다');
};

var agent = 'userAgent';
var isIE = false;
var globalThis = getGlobal();
globalThis.isNodejs = false;
if (globalThis.process && typeof module === 'object') {
    globalThis.isNodejs = true;
}
else {
    agent = navigator.userAgent.toLowerCase();
    isIE = (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1);

    if (window) {
        if (isIE == true && !window.Promise) {
            !function (t, e) { "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.ES6Promise = e() }(this, function () { "use strict"; function t(t) { var e = typeof t; return null !== t && ("object" === e || "function" === e) } function e(t) { return "function" == typeof t } function n(t) { W = t } function r(t) { z = t } function o() { return function () { return process.nextTick(a) } } function i() { return "undefined" != typeof U ? function () { U(a) } : c() } function s() { var t = 0, e = new H(a), n = document.createTextNode(""); return e.observe(n, { characterData: !0 }), function () { n.data = t = ++t % 2 } } function u() { var t = new MessageChannel; return t.port1.onmessage = a, function () { return t.port2.postMessage(0) } } function c() { var t = setTimeout; return function () { return t(a, 1) } } function a() { for (var t = 0; t < N; t += 2) { var e = Q[t], n = Q[t + 1]; e(n), Q[t] = void 0, Q[t + 1] = void 0 } N = 0 } function f() { try { var t = Function("return this")().require("vertx"); return U = t.runOnLoop || t.runOnContext, i() } catch (e) { return c() } } function l(t, e) { var n = this, r = new this.constructor(v); void 0 === r[V] && x(r); var o = n._state; if (o) { var i = arguments[o - 1]; z(function () { return T(o, r, i, n._result) }) } else j(n, r, t, e); return r } function h(t) { var e = this; if (t && "object" == typeof t && t.constructor === e) return t; var n = new e(v); return w(n, t), n } function v() { } function p() { return new TypeError("You cannot resolve a promise with itself") } function d() { return new TypeError("A promises callback cannot return that same promise.") } function _(t, e, n, r) { try { t.call(e, n, r) } catch (o) { return o } } function y(t, e, n) { z(function (t) { var r = !1, o = _(n, e, function (n) { r || (r = !0, e !== n ? w(t, n) : A(t, n)) }, function (e) { r || (r = !0, S(t, e)) }, "Settle: " + (t._label || " unknown promise")); !r && o && (r = !0, S(t, o)) }, t) } function m(t, e) { e._state === Z ? A(t, e._result) : e._state === $ ? S(t, e._result) : j(e, void 0, function (e) { return w(t, e) }, function (e) { return S(t, e) }) } function b(t, n, r) { n.constructor === t.constructor && r === l && n.constructor.resolve === h ? m(t, n) : void 0 === r ? A(t, n) : e(r) ? y(t, n, r) : A(t, n) } function w(e, n) { if (e === n) S(e, p()); else if (t(n)) { var r = void 0; try { r = n.then } catch (o) { return void S(e, o) } b(e, n, r) } else A(e, n) } function g(t) { t._onerror && t._onerror(t._result), E(t) } function A(t, e) { t._state === X && (t._result = e, t._state = Z, 0 !== t._subscribers.length && z(E, t)) } function S(t, e) { t._state === X && (t._state = $, t._result = e, z(g, t)) } function j(t, e, n, r) { var o = t._subscribers, i = o.length; t._onerror = null, o[i] = e, o[i + Z] = n, o[i + $] = r, 0 === i && t._state && z(E, t) } function E(t) { var e = t._subscribers, n = t._state; if (0 !== e.length) { for (var r = void 0, o = void 0, i = t._result, s = 0; s < e.length; s += 3)r = e[s], o = e[s + n], r ? T(n, r, o, i) : o(i); t._subscribers.length = 0 } } function T(t, n, r, o) { var i = e(r), s = void 0, u = void 0, c = !0; if (i) { try { s = r(o) } catch (a) { c = !1, u = a } if (n === s) return void S(n, d()) } else s = o; n._state !== X || (i && c ? w(n, s) : c === !1 ? S(n, u) : t === Z ? A(n, s) : t === $ && S(n, s)) } function M(t, e) { try { e(function (e) { w(t, e) }, function (e) { S(t, e) }) } catch (n) { S(t, n) } } function P() { return tt++ } function x(t) { t[V] = tt++, t._state = void 0, t._result = void 0, t._subscribers = [] } function C() { return new Error("Array Methods must be provided an Array") } function O(t) { return new et(this, t).promise } function k(t) { var e = this; return new e(L(t) ? function (n, r) { for (var o = t.length, i = 0; i < o; i++)e.resolve(t[i]).then(n, r) } : function (t, e) { return e(new TypeError("You must pass an array to race.")) }) } function F(t) { var e = this, n = new e(v); return S(n, t), n } function Y() { throw new TypeError("You must pass a resolver function as the first argument to the promise constructor") } function q() { throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.") } function D() { var t = void 0; if ("undefined" != typeof global) t = global; else if ("undefined" != typeof self) t = self; else try { t = Function("return this")() } catch (e) { throw new Error("polyfill failed because global object is unavailable in this environment") } var n = t.Promise; if (n) { var r = null; try { r = Object.prototype.toString.call(n.resolve()) } catch (e) { } if ("[object Promise]" === r && !n.cast) return } t.Promise = nt } var K = void 0; K = Array.isArray ? Array.isArray : function (t) { return "[object Array]" === Object.prototype.toString.call(t) }; var L = K, N = 0, U = void 0, W = void 0, z = function (t, e) { Q[N] = t, Q[N + 1] = e, N += 2, 2 === N && (W ? W(a) : R()) }, B = "undefined" != typeof window ? window : void 0, G = B || {}, H = G.MutationObserver || G.WebKitMutationObserver, I = "undefined" == typeof self && "undefined" != typeof process && "[object process]" === {}.toString.call(process), J = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel, Q = new Array(1e3), R = void 0; R = I ? o() : H ? s() : J ? u() : void 0 === B && "function" == typeof require ? f() : c(); var V = Math.random().toString(36).substring(2), X = void 0, Z = 1, $ = 2, tt = 0, et = function () { function t(t, e) { this._instanceConstructor = t, this.promise = new t(v), this.promise[V] || x(this.promise), L(e) ? (this.length = e.length, this._remaining = e.length, this._result = new Array(this.length), 0 === this.length ? A(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(e), 0 === this._remaining && A(this.promise, this._result))) : S(this.promise, C()) } return t.prototype._enumerate = function (t) { for (var e = 0; this._state === X && e < t.length; e++)this._eachEntry(t[e], e) }, t.prototype._eachEntry = function (t, e) { var n = this._instanceConstructor, r = n.resolve; if (r === h) { var o = void 0, i = void 0, s = !1; try { o = t.then } catch (u) { s = !0, i = u } if (o === l && t._state !== X) this._settledAt(t._state, e, t._result); else if ("function" != typeof o) this._remaining--, this._result[e] = t; else if (n === nt) { var c = new n(v); s ? S(c, i) : b(c, t, o), this._willSettleAt(c, e) } else this._willSettleAt(new n(function (e) { return e(t) }), e) } else this._willSettleAt(r(t), e) }, t.prototype._settledAt = function (t, e, n) { var r = this.promise; r._state === X && (this._remaining--, t === $ ? S(r, n) : this._result[e] = n), 0 === this._remaining && A(r, this._result) }, t.prototype._willSettleAt = function (t, e) { var n = this; j(t, void 0, function (t) { return n._settledAt(Z, e, t) }, function (t) { return n._settledAt($, e, t) }) }, t }(), nt = function () { function t(e) { this[V] = P(), this._result = this._state = void 0, this._subscribers = [], v !== e && ("function" != typeof e && Y(), this instanceof t ? M(this, e) : q()) } return t.prototype["catch"] = function (t) { return this.then(null, t) }, t.prototype["finally"] = function (t) { var n = this, r = n.constructor; return e(t) ? n.then(function (e) { return r.resolve(t()).then(function () { return e }) }, function (e) { return r.resolve(t()).then(function () { throw e }) }) : n.then(t, t) }, t }(); return nt.prototype.then = l, nt.all = O, nt.race = k, nt.resolve = h, nt.reject = F, nt._setScheduler = n, nt._setAsap = r, nt._asap = z, nt.polyfill = D, nt.Promise = nt, nt });
            ES6Promise.polyfill();
        }
    }
}

/// <summary>
/// QAF 개발을 위한 기본 객체를 생성합니다.
/// </summary>
var qaf = qaf || function () { };
globalThis.qaf = qaf;

/// <summary>
/// 기본 객체를 생성합니다.
/// </summary>
var baseCore = function () { };

baseCore.extend = function (newType, staticType) {
    /// <summary>
    /// 지정된 요소에 여러 스타일 속성을 적용합니다.
    /// </summary>

    /// var depth2 = depth1.extend({
    ///     method: function()
    ///     {
    ///         this.base();
    ///         alert('depth2');
    ///     }
    /// });

    /// <param name='newType' type='Object'>staticType의 기능을 확장할 객체의 인스턴스입니다.</param>
    /// <param name='staticType' type='Object'>함수와 속성으로 구성된 배열입니다.</param>
    /// <returns type='Object' />

    var extend = baseCore.prototype.extend;

    baseCore.prototyping = true;
    var prototype = new this;

    extend.call(prototype, newType);

    prototype.base = function () {
    };

    delete baseCore.prototyping;

    var constructor = prototype.constructor;
    var object = prototype.constructor = function () {
        if (!baseCore.prototyping) {
            if (this.constructing || this.constructor == object) {
                this.constructing = true;
                constructor.apply(this, arguments);

                delete this.constructing;
            }
            else if (arguments[0] != null) {
                return (arguments[0].extend || extend).call(arguments[0], prototype);
            }
        }
    };

    object.ancestor = this;
    object.extend = this.extend;
    object.each = this.each;
    object.implement = this.implement;
    object.prototype = prototype;
    object.toString = this.toString;
    object.valueOf = function (type) {
        return (type == 'object') ? object : constructor.valueOf();
    }

    extend.call(object, staticType);

    if (typeof object.init == 'function') {
        object.init();
    }

    return object;
};

baseCore.prototype = {
    extend: function (source, val) {
        /// <summary>
        /// baseCore에 extend prototype을 적용합니다.
        /// &#10;&#10;
        /// example :&#10;
        /// &#10;extend.call(prototype, newType);
        /// </summary>
        /// <param name='source' type='Object'>객체의 인스턴스입니다.</param>
        /// <param name='val' type='Object'>확장 기능입니다.</param>
        /// <returns type='Object' />

        if (arguments.length > 1) {
            var ancestor = this[source];
            if (ancestor && (typeof val == 'function') && (!ancestor.valueOf || ancestor.valueOf() != val.valueOf()) && /\bbase\b/.test(val)) {
                var method = val.valueOf();

                val = function () {
                    var previous = this.base || baseCore.prototype.base;
                    this.base = ancestor;
                    var returnValue = method.apply(this, arguments);
                    this.base = previous;
                    return returnValue;
                };

                val.valueOf = function (type) {
                    return (type == 'object') ? val : method;
                };

                val.toString = baseCore.toString;
            }
            this[source] = val;
        }
        else if (source) {
            var extend = baseCore.prototype.extend;

            if (!baseCore.prototyping && typeof this != 'function') {
                extend = this.extend || extend;
            }
            var prototype = { toSource: null }
            var hidden = ['constructor', 'toString', 'valueOf', 'concreate'];
            var i = baseCore.prototyping ? 0 : 1;
            while (key = hidden[i++]) {
                if (source[key] != prototype[key]) {
                    extend.call(this, key, source[key]);
                }
            }

            for (var key in source) {
                if (!prototype[key]) {
                    extend.call(this, key, source[key]);
                }
            }

            var concreate = source['concreate'];
            if (concreate) {
                concreate(source);
            }
        }
        return this;
    }
};

baseCore = baseCore.extend(
    {
        /// <summary>
        /// baseCore에 core 기능을 확장합니다.
        /// </summary>
        constructor: function () {
            /// <summary>
            /// 현재 객체의 prototype 정보를 복사합니다.
            /// &#10;&#10;
            /// example :&#10;        
            /// &#10;var els = $object || new baseCore();
            /// &#10;alert(els.constructor === baseCore);
            /// </summary>
            this.extend(arguments[0]);
        },

        concreate: function () {
            /// <summary>
            /// 기본 생성자입니다.
            /// </summary>
        }
    },
    {
        ancestor: Object,

        version: '1.0',

        each: function (els, func, props) {
            /// <summary>
            /// 지정된 HtmlElement요소 목록에서 각 요소를 this 참조에 할당하여 지정된 함수를 호출합니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;baseCore.each(els, function(p1, p2, p3) { this.val = p2; }, ['p1', 'p2', 'p3']);
            /// </summary>
            /// <param name='els' type='Array'>this 참조에 할당하여 지정된 함수를 호출할 HtmlElement 목록입니다.</param>
            /// <param name='func' type='Function'>this 참조에 요소를 할당하여 수행할 함수입니다.</param>
            /// <param name='props' type='Array'>함수의 매개변수 목록입니다.</param>

            if (func == undefined || func.length == 0) {
                return;
            }

            for (var key in els) {
                if (typeof els[key] === 'object') {
                    func.apply(els[key], props);
                }
            }
        },

        implement: function () {
            /// <summary>
            /// 현재 객체의 prototype 정보에 지정된 arguments의 prototype 정보를 확장합니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;baseCore.implement(extendObject1, extendObject2);
            /// </summary>
            /// <returns type='Type'></returns>
            for (var i = 0, len = arguments.length; i < len; i++) {
                if (typeof arguments[i] === 'function') {
                    arguments[i](this.prototype);
                }
                else {
                    this.prototype.extend(arguments[i]);
                }
            }
            return this;
        },

        toString: function () {
            /// <summary>
            /// 현재 객체의 정보를 문자열로 반환합니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;baseCore.toString();
            /// </summary>
            /// <returns type='String'></returns>
            return String(this.valueOf());
        }
    });

// http://javascript.crockford.com/memory/leak.html
// JScript Memory Leaks
function purge(d) {
    var a = d.attributes, i, l, n;
    if (a) {
        for (i = a.length - 1; i >= 0; i -= 1) {
            n = a[i].name;
            if (typeof d[n] === 'function') {
                d[n] = null;
            }
        }
    }
    a = d.childNodes;
    if (a) {
        l = a.length;
        for (i = 0; i < l; i += 1) {
            purge(d.childNodes[i]);
        }
    }
}
/// <reference path='qaf.core.js' />

/// $exception.add('CustomException', errorHandler, 'Custom Exception 처리입니다.', 0);
/// 
/// try
/// {
///     alert('error!!!' // ApplicationException 호출
///     throw e; // CustomException 호출
/// }
/// catch(e)
/// {
///     if(e instanceof TypeError)
///     {
///     }
///     else if(e instanceof RangeError)
///     {
///     }
///     else if(e instanceof SyntaxError)
///     {
///     }
///     else
///     {
///     }
/// 
///     $exception.actionHandler('CustomException', e);
/// }
/// 
/// function errorHandler(exception)
/// {
///     alert(exception.message + ' ' + this.message);
/// }

/// <summary>
/// Javascript 개발시 일관적인 예외처리 기능을 제공하는 모듈입니다.
/// </summary>
(function (window) {
    'use strict';
    var $exception = $exception || new baseCore();

    $exception.extend({
        version: '1.0',

        /// <summary>
        /// 예외 처리기 정보를 모아놓을 배열입니다.
        /// </summary>
        exceptions: [],

        add: function (id, func, message) {
            /// <summary>
            /// 예외 처리기를 추가합니다.
            /// </summary>
            /// <param name='id' type='String'>추가할 예외 처리기 목록에 사용할 식별자입니다.</param>
            /// <param name='func' type='Function'>예외 발생시 호출할 함수입니다.</param>
            /// <param name='message' type='String'>예외 발생시 출력할 메시지입니다.</param>
            /// <returns type='this' />
            var errorInfo = [];
            errorInfo['message'] = message;
            errorInfo['id'] = id;
            errorInfo['func'] = func;

            this.exceptions[id] = errorInfo;
            return this;
        },

        remove: function (id) {
            /// <summary>
            /// 예외 처리기를 삭제합니다.
            /// </summary>
            /// <param name='id' type='String'>삭제할 예외 처리기에 식별자입니다.</param>
            /// <returns type='this' />
            this.exceptions[id] = null;
            return this;
        },

        actionHandler: function (id, exception) {
            /// <summary>
            /// 지정된 예외 처리기를 수행합니다.
            /// </summary>
            /// <param name='id' type='String'>예외 처리기 식별자입니다.</param>
            /// <param name='exception' type='Error'>예외 발생 객체입니다.</param>
            /// <returns type='this' />
            this.exceptions[id].func(exception);
            return this;
        },

        exceptionHandler: function () {
            /// <summary>
            /// 예외 처리기 정보를 반환합니다.
            /// </summary>
            /// <returns type='this' />
            return this.exceptions[id].func;
        }
    });

    (function () {
        function applicationException(message, url) {
            alert(message + url);
            return true;
        };

        $exception.add('ApplicationException', applicationException, 'Exception Templete Message.', '99999');

        /// <summary>
        /// 브라우저의 onerror 이벤트에 Application Exception 예외 처리 함수를 연결합니다.
        /// </summary>
        //window.onerror = applicationException;
    })();
    window.$exception = window.$e = qaf.$e = window.$exception || $exception;
})(globalThis);
/// <reference path='qaf.core.js' />

/// <summary>
/// 다국어 처리를 위한 문자열 리소스를 관리하는 모듈입니다. 
/// lang 폴더의 언어권별 리소스를 이용하여 확장합니다.
/// </summary>
(function (context) {
    'use strict';
    var $resource = $resource || new baseCore();

    $resource.extend({
        version: '1.0',
        localeID: 'ko-KR',

        add: function (id, val) {
            /// <summary>
            /// 다국어 문자열 리소스를 추가합니다. 중복되는 키가 있을 경우 덮어씁니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;$res.add('addResource1: '테스트 리소스!');
            /// &#10;alert($res.addResource1); // 테스트 리소스!
            /// </summary>
            /// <param name='id' type='String'>다국어 문자열 리소스 키입니다.</param>
            /// <param name='val' type='Object'>다국어 문자열 값입니다.</param>
            /// <returns type='this' />
            this[id] = val;
            return this;
        },

        remove: function (id) {
            /// <summary>
            /// 다국어 문자열 리소스를 삭제합니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;$res.remove('addResource1');
            /// &#10;alert($res.addResource1); // undefined
            /// </summary>
            /// <param name='id' type='String'>다국어 문자열 리소스 키입니다.</param>
            /// <returns type='this' />
            this[id] = undefined;
            return this;
        }
    });
    context.$resource = context.$res = qaf.$res = context.$resource || $resource;
})(globalThis);
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
/// <reference path='qaf.core.js' />

/// <summary>
/// HTML 요소의 시각적인 제어 기능을 제공
/// </summary>
(function (window) {
    'use strict';
    var $manipulation = $manipulation || new baseCore();
    var document = window.document;

    $manipulation.extend({
        version: "1.0",

        body: function () {
            return document;
        },

        documentElement: function () {
            return document.documentElement;
        },

        childNodes: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.childNodes;
        },

        firstChild: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.firstChild;
        },

        lastChild: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.lastChild;
        },

        nextSibling: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.nextSibling;
        },

        previousSibling: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.previousSibling;
        },

        siblings: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return [].slice.call(parent.children).filter(function (child) {
                return child !== el;
            });
        },

        parentNode: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.parentNode;
        },

        innerText: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.innerText;
        },

        nodeName: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.nodeName;
        },

        nodeType: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.nodeType;
        },

        nodeValue: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.nodeValue;
        },

        className: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.className;
        },

        removeAttribute: function (el, prop) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.removeAttribute(prop);
        },

        getAttribute: function (el, prop) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.getAttribute(prop);
        },

        setAttribute: function (el, prop, val) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.setAttribute(prop, val);
        },

        appendChild: function (el, node) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.appendChild(node);
        },

        cloneNode: function (el, isClone) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.cloneNode(isClone);
        },

        createElement: function (tagName) {
            return document.createElement(tagName);
        },

        createTextNode: function (data) {
            return document.createTextNode(data);
        },

        innerHTML: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.innerHTML;
        },

        outerHTML: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.outerHTML;
        },

        setStyle: function (el, prop, val) {
            /// <summary>
            /// 지정된 요소에 스타일 속성을 적용합니다.
            /// </summary>
            /// <param name='el' type='Element'>스타일 속성을 적용할 HTML 요소입니다.</param>
            /// <param name='prop' type='String'>스타일 속성의 키입니다.</param>
            /// <param name='val' type='String'>스타일 속성의 값입니다.</param>
            /// <returns type='Type'></returns>
            el = $ref.isString(el) == true ? $l.get(el) : el;
            el.style[prop] = val;
            return this;
        },

        addCssText: function (el, cssText) {
            /// <summary>
            /// 지정된 요소에 여러 스타일 속성을 텍스트로 적용합니다. 이 함수를 지원하지 않는 브라우저에서는 무시됩니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;$w.addCssText(el, 'background:red;width:200px;height:200px;');
            /// </summary>
            /// <param name='el' type='Element'>스타일 속성을 적용할 HTML 요소입니다.</param>
            /// <param name='objects' type='Array'>스타일 속성의 키와 값으로 구성된 배열입니다.</param>
            /// <returns type='Type'></returns>
            el = $ref.isString(el) == true ? $l.get(el) : el;
            if (el.style.cssText != undefined) {
                el.style.cssText = cssText;
            }
            return this;
        },

        addStyle: function (el, objects) {
            /// <summary>
            /// 지정된 요소에 여러 스타일 속성을 적용합니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;$w.addStyle(el, { backgroundColor:'blue', color:'white', border:'2px solid red' });
            /// </summary>
            /// <param name='el' type='Element'>스타일 속성을 적용할 HTML 요소입니다.</param>
            /// <param name='objects' type='Array'>스타일 속성의 키와 값으로 구성된 배열입니다.</param>
            /// <returns type='Type'></returns>
            el = $ref.isString(el) == true ? $l.get(el) : el;
            for (var prop in objects) {
                this.setStyle(el, prop, objects[prop]);
            }
            return this;
        },

        getStyle: function (el, prop) {
            /// <summary>
            /// 지정된 요소에 스타일 속성을 가져옵니다.
            /// </summary>
            /// <param name='el' type='Element'>스타일 속성을 가져올 HTML 요소입니다.</param>
            /// <param name='prop' type='String'>스타일 속성의 키입니다.</param>
            /// <returns type='Type'></returns>
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.style[prop];
        },

        hasHidden: function (el) {
            /// <summary>
            /// 지정된 요소가 화면상에 표시중인지 확인합니다.
            /// </summary>
            /// <param name='el' type='Element'>화면상에 표시중인지 확인할 HTML 요소입니다.</param>
            /// <returns type='Type'></returns>
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return (el == null || el.offsetParent == null || window.getComputedStyle(el)['display'] == 'none');
        },

        getComputedStyle: function (el, prop) {
            /// <summary>
            /// 지정된 요소에 계산된 스타일 속성을 가져옵니다.
            /// </summary>
            /// <param name='el' type='Element'>스타일 속성을 가져올 HTML 요소입니다.</param>
            /// <param name='prop' type='String'>스타일 속성의 키입니다.</param>
            /// <returns type='Type'></returns>
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return window.getComputedStyle(el)[prop];
        },

        addClass: function (el, css) {
            /// <summary>
            /// 지정된 요소에 스타일 클래스 명을 추가합니다.
            /// </summary>
            /// <param name='el' type='Element'>스타일 클래스를 지정할 HTML 요소입니다.</param>
            /// <param name='css' type='String'>스타일 클래스 명입니다.</param>
            /// <returns type='Type'></returns>
            el = $ref.isString(el) == true ? $l.get(el) : el;
            if (this.hasClass(el, css) == false) {
                if (el.classList && el.classList.add) {
                    el.classList.add(css);
                }
                else {
                    el.className = (el.className + ' ' + css).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                }
            }
            return this;
        },

        hasClass: function (el, css) {
            /// <summary>
            /// 지정된 요소에 스타일 클래스 명이 존재하는지 검사합니다.
            /// </summary>
            /// <param name='el' type='Element'>스타일 클래스 명이 존재하는지 검사할 HTML 요소입니다.</param>
            /// <param name='css' type='String'>스타일 클래스 명입니다.</param>
            /// <returns type='Boolean' />
            var result = false;
            el = $ref.isString(el) == true ? $l.get(el) : el;
            if (el) {
                if (el.classList && el.classList.contains) {
                    result = el.classList.contains(css);
                }
                else {
                    result = $m.getClassRegEx(css).test(el.className);
                }
            }

            return result;
        },

        toggleClass: function (el, css) {
            /// <summary>
            /// 지정된 요소에 스타일 클래스를 토글합니다.
            /// </summary>
            /// <param name='el' type='Element'>스타일 클래스 명이 존재하는지 검사할 HTML 요소입니다.</param>
            /// <param name='css' type='String'>스타일 클래스 명입니다.</param>
            /// <returns type='Type'></returns>
            el = $ref.isString(el) == true ? $l.get(el) : el;
            if (el) {
                if (el.classList && el.classList.toggle) {
                    el.classList.toggle(css);
                }
            }

            return this;
        },

        removeClass: function (el, css) {
            /// <summary>
            /// 지정된 요소에 스타일 클래스를 삭제합니다.
            /// </summary>
            /// <param name='el' type='Element'>스타일 클래스를 삭제할 HTML 요소입니다.</param>
            /// <param name='css' type='String'>스타일 클래스 명입니다.</param>
            /// <returns type='Type'></returns>
            el = $ref.isString(el) == true ? $l.get(el) : el;
            if (el) {
                if (css === undefined) {
                    el.className = '';
                }
                else {
                    if (el.classList && el.classList.remove) {
                        el.classList.remove(css);
                    }
                    else {
                        var re = $m.getClassRegEx(css);
                        el.className = el.className.replace(re, '');
                        re = null;
                    }

                }
            }

            return this;
        },

        append: function (el, tag, eid, styles, html) {
            /// <summary>
            ///  지정된 요소에 HTML 요소를 추가합니다.
            /// </summary>
            /// <param name='el' type='Element'>자식 태그를 추가할 HTML 요소입니다.</param>
            /// <param name='tag' type='String'>HTML 태그 명입니다.</param>
            /// <param name='eid' type='String'>HTML 요소의 고유 식별자입니다.</param>
            /// <param name='styles' type='String'>HTML 요소에 적용할 스타일입니다.</param>
            /// <param name='html' type='String'>innerHTML에 적용할 HTML입니다.</param>
            /// <returns type='Type'></returns>
            el = $ref.isString(el) == true ? $l.get(el) : el;
            var cl = document.createElement(tag);

            if (eid) {
                cl.id = eid;
            }

            if (styles) {
                this.addStyle(cl, styles);
            }

            if (html) {
                this.innerHTML(html);
            }

            el.appendChild(cl);
            return cl;
        },

        prepend: function (el, baseEl) {
            /// <summary>
            ///  지정된 요소 앞에 HTML 요소를 추가합니다.
            /// </summary>
            /// <param name='el' type='Element'>추가할 HTML 요소입니다.</param>
            /// <param name='baseEl' type='Element'>포함할 HTML 요소입니다.</param>
            /// <returns type='Type'></returns>
            el = $ref.isString(el) == true ? $l.get(el) : el;
            baseEl.insertBefore(el, baseEl.firstChild);
        },

        copy: function (el) {
            /// <summary>
            ///  지정된 HTML 요소를 복사하여 반환합니다.
            /// </summary>
            /// <param name='el' type='Element'>자식 태그를 복사할 HTML 요소입니다.</param>
            /// <returns type='Type'></returns>
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.cloneNode(true);
        },

        empty: function (el) {
            /// <summary>
            ///  지정된 HTML 요소의 자식 요소들을 삭제합니다.
            /// </summary>
            /// <param name='el' type='Element'>자식 태그를 삭제할 HTML 요소입니다.</param>
            /// <returns type='Type'></returns>
            el = $ref.isString(el) == true ? $l.get(el) : el;
            if (el) {
                while (el.firstChild) {
                    purge(el.firstChild);

                    el.removeChild(node.firstChild);
                }

            }

            return this;
        },

        remove: function (el) {
            /// <summary>
            ///  지정된 요소를 부모 요소에서 삭제합니다.
            /// </summary>
            /// <param name='el' type='Element'>부모 요소에서 삭제할 HTML 요소입니다.</param>
            /// <returns type='Type'></returns>
            el = $ref.isString(el) == true ? $l.get(el) : el;
            if (el) {
                purge(el);

                if (el.parentNode) {
                    el.parentNode.removeChild(el);
                }
            }

            return this;
        },

        hasChild: function (el) {
            /// <summary>
            ///  지정된 HTML 요소를 삭제합니다.
            /// </summary>
            /// <param name='el' type='Element'>자식 태그를 삭제할 HTML 요소입니다.</param>
            /// <returns type='Boolean'></returns>
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.hasChildNodes();
        },

        addControlStyles: function (els, css) {
            /// <summary>
            /// 컨트롤들의 css을 추가합니다.
            /// </summary>
            /// <param name='els' type='Element'>css을 추가 할 HTML 요소입니다.</param>
            /// <param name='css' type='String'>Style 클래스 명입니다.</param>
            /// <returns type='Type'></returns>
            if (!css) {
                return;
            }

            var el = null;
            for (var i = 0; i < els.length; i++) {
                el = els[i];

                if (el != null) {
                    if (this.hasClass(el, css) == false) {
                        this.addClass(el, css);
                    }
                }
            }

            return this;
        },

        removeControlStyles: function (els, css) {
            /// <summary>
            /// 컨트롤들의 css을 삭제합니다.
            /// </summary>
            /// <param name='els' type='Element'>css을 추가 할 HTML 요소입니다.</param>
            /// <param name='css' type='String'>Style 클래스 명입니다.</param>
            /// <returns type='Type'></returns>
            if (!css) {
                return;
            }

            var el = null;

            for (var i = 0; i < els.length; i++) {
                el = els[i];

                if (el != null) {
                    if (this.hasClass(el, css) == true) {
                        this.removeClass(el, css);
                    }
                }
            }

            return this;
        },

        removeNode: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            if (el) {
                el.parentNode.removeChild(el);
            }
        },

        insertAfter: function (item, target) {
            var parent = target.parentNode;
            if (target.nextElementSibling) {
                parent.insertBefore(item, target.nextElementSibling);
            } else {
                parent.appendChild(item);
            }
        },

        hide: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            if (el) {
                el.style.display = 'none';
            }
        },

        hideAll: function (array) {
            for (var i = 0; i < array.length; i++) {
                this.hide(array[i]);
            }
        },

        show: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            if (el) {
                el.style.display = 'block';
            }
        },

        showAll: function (array) {
            for (var i = 0; i < array.length; i++) {
                this.show(array[i]);
            }
        },

        toggle: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            if (window.getComputedStyle(el).display === 'block') {
                this.hide(el);
                return;
            }

            this.show(el);
        },

        parent: function (el, id) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            var parent = el.parentElement;
            while (parent && parent.tagName != 'BODY') {
                if (parent.id == id) {
                    return parent;
                }

                parent = parent.parentElement;
            }

            return null;
        },

        //data : { tag, id, className, attributes : { key : value }, data : { key : value } }
        create: function (data) {
            var el = document.createElement(data.tag);
            if (data.id) {
                el.id = data.id;
            }

            if (data.className) {
                el.className = data.className;
            }

            if (data.style) {
                for (var prop in data.style) {
                    el.style[prop] = data.style[prop];
                }
            }

            if (data.attributes) {
                for (var prop in data.attributes) {
                    el.setAttribute(prop, data.attributes[prop]);
                }
            }

            if (data.data) {
                el.dataset = el.dataset ? result.dataset : {};
                for (var prop in data.data) {
                    el.dataset[prop] = data.data[prop];
                }
            }

            if (data.html) {
                el.innerHTML = data.html;
            }

            return el;
        },

        div: function (data) {
            if (!data) {
                data = new Object();
            }

            data.tag = 'div';
            return this.create(data);
        },

        label: function (data) {
            if (!data) {
                data = new Object();
            }

            data.tag = 'label';
            return this.create(data);
        },

        textField: function (data) {
            if (!data) {
                data = new Object();
            }

            data.tag = 'input';
            if (!data.attributes)
                data.attributes = new Object();

            data.attributes.type = 'text';

            return this.create(data);
        },

        checkbox: function (data) {
            if (!data) {
                data = new Object();
            }

            data.tag = 'input';
            if (!data.attributes)
                data.attributes = new Object();

            data.attributes.type = 'checkbox';

            return this.create(data);
        },

        each: function (array, handler) {
            for (var i = 0; i < array.length; i++) {
                handler(array[i], i);
            }
        },

        setActive: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            el.classList.add('active');
        },

        setUnactive: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            el.classList.remove('active');
        },

        select: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            el.selected = true;
            el.setAttribute('selected', 'selected');
        },

        deselect: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            el.selected = false;
            el.removeAttribute('selected');
        },

        check: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            el.checked = true;
        },

        uncheck: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            el.checked = false;
        },

        click: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            if (el.fireEvent) {
                el.fireEvent('onclick');
            } else {
                var evObj = document.createEvent('Events');
                evObj.initEvent('click', true, false);
                el.dispatchEvent(evObj);
            }
        },

        getClassRegEx: function (css) {
            /// <summary>
            /// 지정된 요소에 스타일 클래스를 검사하기 위한 정규식입니다.
            /// </summary>
            /// <param name='css' type='String'>스타일 클래스 명입니다.</param>
            return new RegExp('(^|\\s)' + css + '(\\s|$)');
        },
    });
    window.$manipulation = window.$m = qaf.$m = window.$manipulation || $manipulation;
})(globalThis);
/// <reference path='qaf.core.js' />
/// <reference path='qaf.library.js' />

/// <summary>
/// HTML 요소의 Dimension 관련 기능을 관리하는 모듈입니다.
/// </summary>
(function (window) {
    'use strict';
    var $dimension = $dimension || new baseCore();
    var document = window.document;

    $dimension.extend({
        /// <summary>
        /// $dimension의 릴리즈 버전입니다.
        /// </summary>
        version: '1.0',

        getDocumentSize: function (el) {
            /// <summary>
            /// html 문서의 사이즈를 반환합니다.
            /// </summary>
            /// <returns type='Json Object' />
            el = ($ref.isString(el) == true ? $l.get(el) : el) || window;
            var result =
            {
                width: el.scrollMaxX ? el.innerWidth + el.scrollMaxX : document.documentElement.scrollWidth || document.body.scrollWidth || 0,
                height: el.scrollMaxY ? el.innerHeight + el.scrollMaxY : document.documentElement.scrollHeight || document.body.scrollHeight || 0,
                fullWidth: Math.max(
                    document.body.scrollWidth, document.documentElement.scrollWidth,
                    document.body.offsetWidth, document.documentElement.offsetWidth,
                    document.body.clientWidth, document.documentElement.clientWidth
                ),
                fullHeight: Math.max(
                    document.body.scrollHeight, document.documentElement.scrollHeight,
                    document.body.offsetHeight, document.documentElement.offsetHeight,
                    document.body.clientHeight, document.documentElement.clientHeight
                )
            }

            return result;
        },

        getWindowSize: function (el) {
            /// <summary>
            /// window 객체의 사이즈를 반환합니다.
            /// </summary>
            /// <returns type='Json Object' />
            el = ($ref.isString(el) == true ? $l.get(el) : el) || window;
            var result =
            {
                width: el.innerWidth ? el.innerWidth : document.documentElement.clientWidth || document.body.clientWidth || 0,
                height: el.innerHeight ? el.innerHeight : document.documentElement.clientHeight || document.body.clientHeight || 0
            };

            return result;
        },


        getScrollPosition: function (el) {
            /// <summary>
            /// element 또는 window 객체의 현재 scroll 위치를 반환합니다
            /// </summary>
            /// <returns type='Json Object' />
            el = ($ref.isString(el) == true ? $l.get(el) : el) || window;

            var result =
            {
                left: el.pageXOffset || el.scrollLeft || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
                top: el.pageYOffset || el.scrollTop || document.documentElement.scrollTop || document.body.scrollTop || 0
            };

            return result;
        },

        getMousePosition: function (e) {
            /// <summary>
            /// 마우스의 현재 위치와 이벤트가 발생한 해당 엘리먼트와 마우스의 상대적인 x, y 위치를 반환합니다.
            /// </summary>
            /// <param name='e' type='Event Object'>이벤트 객체입니다.</param>
            /// <returns type='Json Object' />
            e = e || window.event || top.window.event;
            var scroll = $d.getScrollSize();
            var result =
            {
                x: e.pageX || e.clientX + scroll.x || 0,
                y: e.pageY || e.clientY + scroll.y || 0,
                relativeX: e.layerX || e.offsetX || 0,
                relativeY: e.layerY || e.offsetY || 0
            };

            return result;
        },

        offset: function (el) {
            /// <summary>
            /// 현재 HTML Element의 offset 값을 조회합니다.
            /// </summary>
            el = $ref.isString(el) == true ? $l.get(el) : el;
            var rect = el.getBoundingClientRect();
            var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return {
                top: rect.top + scrollTop,
                left: rect.left + scrollLeft
            }
        },

        offsetLeft: function (el) {
            /// <summary>
            /// 지정된 HTML 요소의 상대적인 left 위치를 반환합니다.
            /// </summary>
            /// <param name='el' type='HTML Element'>상대적인 left 위치를 반환할 HTML Element입니다.</param>
            /// <returns type='Integer' />
            var result = 0;
            el = $ref.isString(el) == true ? $l.get(el) : el;
            while (typeof el !== 'undefined' && el && el.parentNode !== window) {
                if (el.offsetLeft) {
                    result += el.offsetLeft;
                }
                el = el.parentNode;
            }

            return result;
        },

        parentOffsetLeft: function (el) {
            /// <summary>
            /// 지정된 HTML 요소의 부모 요소와의 상대적인 left 위치를 반환합니다.
            /// </summary>
            /// <param name='el' type='HTML Element'>상대적인 left 위치를 반환할 HTML Element입니다.</param>
            /// <returns type='Integer' />
            el = $ref.isString(el) == true ? $l.get(el) : el;
            el = el || top.document.documentElement || top.document.body;
            return el.parentNode === el.offsetParent ? el.offsetLeft : ($d.offsetLeft(el) - $d.offsetLeft(el.parentNode));
        },

        offsetTop: function (el) {
            /// <summary>
            /// 지정된 HTML 요소의 상대적인 top 위치를 반환합니다.
            /// </summary>
            /// <param name='el' type='HTML Element'>상대적인 top 위치를 반환할 HTML Element입니다.</param>
            /// <returns type='Integer' />
            var result = 0;

            el = $ref.isString(el) == true ? $l.get(el) : el;
            while (typeof el !== 'undefined' && el && el.parentNode !== window) {
                if (el.offsetTop) {
                    result += el.offsetTop;
                }
                el = el.parentNode;
            }

            return result;
        },

        parentOffsetTop: function (el) {
            /// <summary>
            /// 지정된 HTML 요소의 부모 요소와의 상대적인 top 위치를 반환합니다.
            /// </summary>
            /// <param name='el' type='HTML Element'>상대적인 top 위치를 반환할 HTML Element입니다.</param>
            /// <returns type='Integer' />
            el = $ref.isString(el) == true ? $l.get(el) : el;
            el = el || top.document.documentElement || top.document.body;
            return el.parentNode === el.offsetParent ? el.offsetTop : ($d.offsetTop(el) - $d.offsetTop(el.parentNode));
        },

        getBounds: function (el) {
            /// <summary>
            /// 지정된 HTML 요소의 위치와 부모 요소와의 상대적인 위치를 반환합니다.
            /// </summary>
            /// <param name='el' type='HTML Element'>위치 정보를 반환할 HTML Element입니다.</param>
            /// <returns type='Json Object' />
            el = $ref.isString(el) == true ? $l.get(el) : el;
            var top = $d.offsetTop(el);
            var left = $d.offsetLeft(el);
            var bottom = top + el.offsetHeight;
            var right = left + el.offsetWidth;

            var result =
            {
                top: top,
                left: top,
                parentTop: $d.parentOffsetTop(el),
                parentLeft: $d.parentOffsetLeft(el),
                bottom: bottom,
                right: right,
                center:
                {
                    x: left + (right - left) / 2,
                    y: top + (bottom - top) / 2
                }
            };

            return result;
        },

        getCenter: function (el) {
            /// <summary>
            /// 지정된 HTML 요소의 위치와 부모 요소와의 상대적인 위치를 반환합니다.
            /// </summary>
            /// <param name='el' type='HTML Element'>위치 정보를 반환할 HTML Element입니다.</param>
            /// <returns type='Json Object' />
            el = $ref.isString(el) == true ? $l.get(el) : el;
            var top = $d.offsetTop(el);
            var left = $d.offsetLeft(el);
            var bottom = top + el.offsetHeight;
            var right = left + el.offsetWidth;

            var result =
            {
                x: left + (right - left) / 2,
                y: top + (bottom - top) / 2
            };

            return result;
        },

        getPosition: function (el, center) {
            /// <summary>
            /// 지정된 요소의 위치값을 반환합니다.
            /// </summary>
            /// <param name='el' type='Element'>위치값을 반환할 HTML 요소입니다.</param>
            /// <param name='center' type='Boolean'>HTML 요소의 가운데 정렬 좌표값을 반환하는 여부값입니다. 기본값은 false입니다.</param>
            el = $ref.isString(el) == true ? $l.get(el) : el;
            var result =
            {
                top: $d.offsetTop(el),
                left: $d.offsetLeft(el)
            };

            var pl = el.offsetParent;

            while (pl) {
                result.left += $d.offsetLeft(pl);
                result.top += $d.offsetTop(pl);
                pl = pl.offsetParent;
            }

            if (center) {
                result.left += el.offsetWidth / 2;
                result.top += el.offsetHeight / 2;
            }

            return result;
        },

        getSize: function (el) {
            /// <summary>
            /// 지정된 요소의 크기값을 반환합니다.
            /// </summary>
            /// <param name='el' type='Element'>크기값을 반환할 HTML 요소입니다.</param>
            el = $ref.isString(el) == true ? $l.get(el) : el;
            var styles = window.getComputedStyle(el);
            var result =
            {
                width: el.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight),
                height: el.clientHeight - parseFloat(styles.paddingTop) - parseFloat(styles.paddingBottom),
                clientWidth: el.clientWidth,
                clientHeight: el.clientHeight,
                offsetWidth: el.offsetWidth,
                offsetHeight: el.offsetHeight,
                marginWidth: el.offsetWidth + parseFloat(styles.marginLeft) + parseFloat(styles.marginRight),
                marginHeight: el.offsetHeight + parseFloat(styles.marginTop) + parseFloat(styles.marginBottom),
            };

            return result;
        },

        measureWidth: function (text, fontSize) {
            var el = document.createElement('div');

            el.style.position = 'absolute';
            el.style.visibility = 'hidden';
            el.style.whiteSpace = 'nowrap';
            el.style.left = '-9999px';

            if (fontSize) {
                el.style.fontSize = fontSize;
            }
            el.innerText = text;

            document.body.appendChild(el);
            var width = window.getComputedStyle(el).width;
            document.body.removeChild(el);
            return width;
        },

        measureHeight: function (text, width, fontSize) {
            var el = document.createElement('div');

            el.style.position = 'absolute';
            el.style.visibility = 'hidden';
            el.style.width = width;
            el.style.left = '-9999px';

            if (fontSize) {
                el.style.fontSize = fontSize;
            }
            el.innerText = text;

            document.body.appendChild(el);
            var height = window.getComputedStyle(el).height;
            document.body.removeChild(el);
            return height;
        },

        measureSize: function (text, fontSize) {
            if (text == null || text == undefined) {
                return null;
            }

            var width = $d.measureWidth(text, fontSize);
            return {
                width: width,
                height: $d.measureHeight(text, width, fontSize)
            };
        }
    });
    window.$dimension = window.$d = qaf.$d = window.$dimension || $dimension;
})(globalThis);
/// <reference path='qaf.core.js' />

/// <summary>
/// Javascript 개발 리플렉션 기능을 제공하는 모듈입니다.
/// </summary>
(function (context) {
    'use strict';
    var $reflection = $reflection || new baseCore();

    $reflection.extend({
        version: '1.0',

        getType: function (val) {
            /// <summary>
            /// 지정된 매개변수의 타입정보를 반환합니다.
            /// </summary>
            /// <param name='val' type='Object'>타입정보를 반환할 객체입니다.</param>
            /// <returns type='String' />
            var result = typeof val;
            if (result == 'object') {
                if (val) {
                    if (val instanceof Array || (!(val instanceof Object) && (Object.prototype.toString.call((val)) == '[object Array]') || typeof val.length == 'number' && typeof val.splice != 'undefined' && typeof val.propertyIsEnumerable != 'undefined' && !val.propertyIsEnumerable('splice'))) {
                        return 'array';
                    }

                    if (!(val instanceof Object) && (Object.prototype.toString.call((val)) == '[object Function]' || typeof val.call != 'undefined' && typeof val.propertyIsEnumerable != 'undefined' && !val.propertyIsEnumerable('call'))) {
                        return 'function';
                    }
                }
                else {
                    return 'null';
                }
            }
            else if (result == 'function' && typeof val.call == 'undefined') {
                return 'object';
            }

            return result;
        },

        defaultValue: function (type, isPrimitive) {
            /// <summary>
            /// javascript data type의 기본 초기값을 반환합니다
            /// </summary>
            /// <param name='type' type='String'>javascript data type</param>
            /// <returns type='Object' />
            if (typeof type !== 'string') {
                return '';
            }

            if (isPrimitive && isPrimitive == true) {
                switch (type) {
                    case 'boolean': return false;
                    case 'function': return function () { };
                    case 'null': return null;
                    case 'number': return 0;
                    case 'object': return {};
                    case 'string': return '';
                    case 'symbol': return Symbol();
                    case 'undefined': return void 0;
                }

                try {
                    var ctor = typeof this[type] === 'function' ? this[type] : eval(type);

                    return new ctor;
                } catch (e) {
                    return {};
                }
            }
            else {
                switch (type) {
                    case 'bool':
                    case 'boolean':
                        return false;
                    case 'int':
                    case 'number':
                        return 0;
                    default: return '';
                }
            }
        },

        isDefined: function (val) {
            /// <summary>
            /// 지정된 매개변수가 undefined 인지 확인합니다.
            /// </summary>
            /// <param name='val' type='Object'>undefined 인지 확인할 값입니다.</param>
            /// <returns type='Boolean' />
            return val !== undefined;
        },

        isNull: function (val) {
            /// <summary>
            /// 지정된 매개변수가 null 인지 확인합니다.
            /// </summary>
            /// <param name='val' type='Object'>null 인지 확인할 값입니다.</param>
            /// <returns type='Boolean' />
            return val === null;
        },

        isArray: function (val) {
            /// <summary>
            /// 지정된 매개변수가 배열 인지 확인합니다.
            /// </summary>
            /// <param name='val' type='Object'>배열 인지 확인할 값입니다.</param>
            /// <returns type='Boolean' />
            return this.getType(val) == 'array';
        },

        isDate: function (val) {
            /// <summary>
            /// 지정된 매개변수가 날짜 인지 확인합니다.
            /// </summary>
            /// <param name='val' type='Object'>날짜 인지 확인할 값입니다.</param>
            /// <returns type='Boolean' />
            var result = false;
            try {
                if (val == null || val == '') {
                    result = true;
                }
                else if (typeof val == 'string') {
                    if (val.includes('T') == true) {
                        var date = val.parseISOString();
                        result = typeof date.getFullYear == 'function';
                    }
                    else if ($date.isDate(val) == true) {
                        result = true;
                    }
                }
            } catch (e) {
            }

            return result;
        },

        isString: function (val) {
            /// <summary>
            /// 지정된 매개변수가 문자열 인지 확인합니다.
            /// </summary>
            /// <param name='val' type='Object'>문자열 인지 확인할 값입니다.</param>
            /// <returns type='Boolean' />
            return typeof val == 'string';
        },

        isNumber: function (val) {
            /// <summary>
            /// 지정된 매개변수가 숫자 인지 확인합니다.
            /// </summary>
            /// <param name='val' type='Object'>숫자 인지 확인할 값입니다.</param>
            /// <returns type='Boolean' />
            return typeof val == 'number';
        },

        isFunction: function (val) {
            /// <summary>
            /// 지정된 매개변수가 함수 인지 확인합니다.
            /// </summary>
            /// <param name='val' type='Object'>함수 인지 확인할 값입니다.</param>
            /// <returns type='Boolean' />
            return this.getType(val) == 'function';
        },

        isObject: function (val) {
            /// <summary>
            /// 지정된 매개변수가 객체 인지 확인합니다.
            /// </summary>
            /// <param name='val' type='Object'>객체 인지 확인할 값입니다.</param>
            /// <returns type='Boolean' />
            return typeof val == 'object';
        },

        isObjectEmpty: function (val) {
            if (typeof val == 'object') {
                for (var key in val) {
                    if (val.hasOwnProperty(key) == true) {
                        return false;
                    }
                }
            }
            return true;
        },

        isBoolean: function (val) {
            /// <summary>
            /// 지정된 매개변수가 boolean 인지 확인합니다.
            /// </summary>
            return typeof val == 'boolean';
        },

        isEmpty: function (val) {
            /// <summary>
            /// 지정된 매개변수가 empty 인지 확인합니다.
            /// </summary>
            /// isEmpty([]); // true
            /// isEmpty({}); // true
            /// isEmpty(''); // true
            /// isEmpty([1, 2]); // false
            /// isEmpty({ a: 1, b: 2 }); // false
            /// isEmpty('text'); // false
            /// isEmpty(123); // true - 컬렉션 타입이 아니면 무조건 true
            /// isEmpty(true); // true - 컬렉션 타입이 아니면 무조건 true
            /// <param name='val' type='Object'>boolean 인지 확인할 값입니다.</param>
            /// <returns type='Boolean' />
            return val == null || !(Object.keys(val) || val).length;
        },

        clone: function (val, isNested) {
            /// <summary>
            /// 지정된 객체의 사본을 반환합니다.
            /// </summary>
            /// <param name='val' type='Object'>사본을 만들 객체입니다.</param>
            /// <returns type='Object' />
            var result = null;

            if (isNested == null || isNested == undefined) {
                isNested = true;
            }

            if (this.isArray(val) == true) {
                result = JSON.parse(JSON.stringify(val));
            }
            else if (this.isObject(val) == true) {
                if (val) {
                    var types = [Number, String, Boolean], result;
                    types.forEach(function (type) {
                        if (val instanceof type) {
                            result = type(val);
                        }
                    });

                    if (isNested == true && Object.prototype.toString.call(val) === '[object Array]') {
                        result = [];
                        val.forEach(function (child, index, array) {
                            result[index] = this.clone(child);
                        });
                    }
                    else if (typeof val == 'object') {
                        if (val.nodeType && typeof val.cloneNode == 'function') {
                            result = val.cloneNode(true);
                        }
                        else if (!val.prototype) {
                            result = {};
                            for (var i in val) {
                                result[i] = this.clone(val[i]);
                            }
                        }
                        else {
                            if (val.constructor) {
                                result = new val.constructor();
                            }
                            else {
                                result = val;
                            }
                        }
                    }
                    else {
                        result = val;
                    }
                }
                else {
                    result = val;
                }
            }
            else if (this.isFunction(val) == true) {
                result = val.clone();
            }
            else {
                result = val;
            }

            return result;
        },

        cloneNode: function (val) {
            /// <summary>
            /// 지정된 객체의 사본을 반환합니다.
            /// </summary>
            /// <param name='val' type='Object'>사본을 만들 객체입니다.</param>
            /// <returns type='Object' />
            return val.cloneNode(true);
        },

        method: function (obj, funcName, func) {
            /// <summary>
            /// 지정된 객체에 메서드를 동적으로 추가합니다.
            /// </summary>
            /// <param name='el' type='Object'>메서드를 동적으로 추가할 객체입니다.</param>
            /// <param name='funcName' type='String'>메서드 명입니다.</param>
            /// <param name='func' type='Function'>Function 객체입니다.</param>
            /// <returns type='this' />
            obj.prototype[funcName] = func;
            return this;
        },

        extend: function (to, from, overwrite) {
            /// <summary>
            /// val 객체의 모든 prototype 정보를 toObject객체에 복사합니다.
            /// </summary>
            /// <param name='toObject' type='Object'>prototype 정보를 전달 받을 객체입니다.</param>
            /// <param name='val' type='Object'>prototype 정보를 전달할 객체입니다.</param>
            /// <returns type='this' />
            var prop, hasProp;
            for (prop in from) {
                hasProp = to[prop] !== undefined;
                if (hasProp && typeof from[prop] === 'object' && from[prop] !== null && from[prop].nodeName === undefined) {
                    if ($ref.isDate(from[prop])) {
                        if (overwrite) {
                            to[prop] = new Date(from[prop].getTime());
                        }
                    }
                    else if ($ref.isArray(from[prop])) {
                        if (overwrite) {
                            to[prop] = from[prop].slice(0);
                        }
                    } else {
                        to[prop] = $ref.extend({}, from[prop], overwrite);
                    }
                } else if (overwrite || !hasProp) {
                    to[prop] = from[prop];
                }
            }
            return to;
        },

        getCommentObject: function (funcString) {
            /*
            var pattern = /(<.*>?).*(\/ *>|<\/.*>)/gm;
            var xml = comment.match(pattern);
            XMLObjectifier.xmlToJSON($w.xmlParser("<comment>" + xml.join('') + "</comment>"))
      
            myJsonObject=xml2json.parser(myXML);
            */
        }
    });

    context.$reflection = context.$ref = qaf.$reflection = context.$reflection || $reflection;
})(globalThis);
/// <reference path='qaf.core.js' />

/// <summary>
/// 문자열에 대한 암/복호화, BASE64, UTF8 인코딩과 디코딩 기능을 제공하는 모듈입니다.
/// </summary>
(function (context) {
    'use strict';
    var $crytography = $crytography || new baseCore();

    $crytography.extend({
        version: '1.0',

        base64Encode: function (val) {
            /// <summary>
            /// 지정된 문자열을 BASE64 인코딩을 수행후 반환합니다.
            /// </summary>
            /// <param name='val' type='String'>BASE64 인코딩을 수행할 문자열입니다.</param>
            /// <returns type='String' />
            if (isNodejs == true) {
                return Buffer.from(val).toString('base64');
            }
            else {
                return btoa(encodeURIComponent(val).replace(/%([0-9A-F]{2})/g, function (match, p1) {
                    return String.fromCharCode(parseInt(p1, 16));
                }));
            }

            return null;
        },

        base64Decode: function (val) {
            /// <summary>
            /// BASE64 인코딩이 적용중인 지정된 문자열을 BASE64 디코딩을 수행후 반환합니다.
            /// </summary>
            /// <param name='val' type='String'>BASE64 디코딩을 수행할 된 문자열입니다.</param>
            /// <returns type='String' />
            if (isNodejs == true) {
                return Buffer.from(val, 'base64').toString();
            }
            else {
                return decodeURIComponent(atob(val).split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
            }

            return null;
        },

        utf8Encode: function (unicodeString) {
            /// <summary>
            /// 지정된 문자열을 UTF8 인코딩을 수행후 반환합니다.
            /// </summary>
            /// <param name='val' type='String'>UTF8 인코딩을 수행할 문자열입니다.</param>
            /// <returns type='String' />
            if (typeof unicodeString != 'string') {
                throw new TypeError('parameter ‘unicodeString’ is not a string');
            }

            var utf8String = unicodeString.replace(/[\u0080-\u07ff]/g, function (c) {
                var cc = c.charCodeAt(0);
                return String.fromCharCode(0xc0 | cc >> 6, 0x80 | cc & 0x3f);
            }).replace(/[\u0800-\uffff]/g,
                function (c) {
                    var cc = c.charCodeAt(0);
                    return String.fromCharCode(0xe0 | cc >> 12, 0x80 | cc >> 6 & 0x3F, 0x80 | cc & 0x3f);
                });
            return utf8String;
        },

        utf8Decode: function (utf8String) {
            /// <summary>
            /// UTF8 인코딩이 적용중인 지정된 문자열을 UTF8 디코딩을 수행후 반환합니다.
            /// </summary>
            /// <param name='val' type='String'>UTF8 디코딩을 수행할 문자열입니다.</param>
            /// <returns type='String' />
            if (typeof utf8String != 'string') {
                throw new TypeError('parameter ‘utf8String’ is not a string');
            }

            var unicodeString = utf8String.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,
                function (c) {
                    var cc = (c.charCodeAt(0) & 0x0f) << 12 | (c.charCodeAt(1) & 0x3f) << 6 | c.charCodeAt(2) & 0x3f;
                    return String.fromCharCode(cc);
                }).replace(/[\u00c0-\u00df][\u0080-\u00bf]/g,
                    function (c) {
                        var cc = (c.charCodeAt(0) & 0x1f) << 6 | c.charCodeAt(1) & 0x3f;
                        return String.fromCharCode(cc);
                    });
            return unicodeString;
        },

        encrypt: function (content, passcode) {
            var result = []; var passLen = passcode.length;
            for (var i = 0; i < content.length; i++) {
                var passOffset = i % passLen;
                var calAscii = (content.charCodeAt(i) + passcode.charCodeAt(passOffset));
                result.push(calAscii);
            }
            return JSON.stringify(result);
        },

        decrypt: function (content, passcode) {
            var result = []; var str = '';
            var codesArr = JSON.parse(content); var passLen = passcode.length;
            for (var i = 0; i < codesArr.length; i++) {
                var passOffset = i % passLen;
                var calAscii = (codesArr[i] - passcode.charCodeAt(passOffset));
                result.push(calAscii);
            }
            for (var i = 0; i < result.length; i++) {
                var ch = String.fromCharCode(result[i]); str += ch;
            }
            return str;
        },

        LZString: (function () {
            var f = String.fromCharCode;
            var keyStrBase64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            var keyStrUriSafe = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$';
            var baseReverseDic = {};

            function getBaseValue(alphabet, character) {
                if (!baseReverseDic[alphabet]) {
                    baseReverseDic[alphabet] = {};
                    for (var i = 0; i < alphabet.length; i++) {
                        baseReverseDic[alphabet][alphabet.charAt(i)] = i;
                    }
                }
                return baseReverseDic[alphabet][character];
            }

            var LZString = {
                compressToBase64: function (input) {
                    if (input == null) return '';
                    var res = LZString._compress(input, 6, function (a) { return keyStrBase64.charAt(a); });
                    switch (res.length % 4) {
                        default:
                        case 0: return res;
                        case 1: return res + '===';
                        case 2: return res + '==';
                        case 3: return res + '=';
                    }
                },

                decompressFromBase64: function (input) {
                    if (input == null) return '';
                    if (input == '') return null;
                    return LZString._decompress(input.length, 32, function (index) { return getBaseValue(keyStrBase64, input.charAt(index)); });
                },

                compressToUTF16: function (input) {
                    if (input == null) return '';
                    return LZString._compress(input, 15, function (a) { return f(a + 32); }) + ' ';
                },

                decompressFromUTF16: function (compressed) {
                    if (compressed == null) return '';
                    if (compressed == '') return null;
                    return LZString._decompress(compressed.length, 16384, function (index) { return compressed.charCodeAt(index) - 32; });
                },

                compressToUint8Array: function (uncompressed) {
                    var compressed = LZString.compress(uncompressed);
                    var buf = new Uint8Array(compressed.length * 2);

                    for (var i = 0, TotalLen = compressed.length; i < TotalLen; i++) {
                        var current_value = compressed.charCodeAt(i);
                        buf[i * 2] = current_value >>> 8;
                        buf[i * 2 + 1] = current_value % 256;
                    }
                    return buf;
                },

                decompressFromUint8Array: function (compressed) {
                    if (compressed === null || compressed === undefined) {
                        return LZString.decompress(compressed);
                    } else {
                        var buf = new Array(compressed.length / 2);
                        for (var i = 0, TotalLen = buf.length; i < TotalLen; i++) {
                            buf[i] = compressed[i * 2] * 256 + compressed[i * 2 + 1];
                        }

                        var result = [];
                        buf.forEach(function (c) {
                            result.push(f(c));
                        });
                        return LZString.decompress(result.join(''));

                    }

                },

                compressToEncodedURIComponent: function (input) {
                    if (input == null) return '';
                    return LZString._compress(input, 6, function (a) { return keyStrUriSafe.charAt(a); });
                },

                decompressFromEncodedURIComponent: function (input) {
                    if (input == null) return '';
                    if (input == '') return null;
                    input = input.replace(/ /g, '+');
                    return LZString._decompress(input.length, 32, function (index) { return getBaseValue(keyStrUriSafe, input.charAt(index)); });
                },

                compress: function (uncompressed) {
                    return LZString._compress(uncompressed, 16, function (a) { return f(a); });
                },

                _compress: function (uncompressed, bitsPerChar, getCharFromInt) {
                    if (uncompressed == null) return '';
                    var i, value,
                        context_dictionary = {},
                        context_dictionaryToCreate = {},
                        context_c = '',
                        context_wc = '',
                        context_w = '',
                        context_enlargeIn = 2,
                        context_dictSize = 3,
                        context_numBits = 2,
                        context_data = [],
                        context_data_val = 0,
                        context_data_position = 0,
                        ii;

                    for (ii = 0; ii < uncompressed.length; ii += 1) {
                        context_c = uncompressed.charAt(ii);
                        if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
                            context_dictionary[context_c] = context_dictSize++;
                            context_dictionaryToCreate[context_c] = true;
                        }

                        context_wc = context_w + context_c;
                        if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) {
                            context_w = context_wc;
                        } else {
                            if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                                if (context_w.charCodeAt(0) < 256) {
                                    for (i = 0; i < context_numBits; i++) {
                                        context_data_val = (context_data_val << 1);
                                        if (context_data_position == bitsPerChar - 1) {
                                            context_data_position = 0;
                                            context_data.push(getCharFromInt(context_data_val));
                                            context_data_val = 0;
                                        } else {
                                            context_data_position++;
                                        }
                                    }
                                    value = context_w.charCodeAt(0);
                                    for (i = 0; i < 8; i++) {
                                        context_data_val = (context_data_val << 1) | (value & 1);
                                        if (context_data_position == bitsPerChar - 1) {
                                            context_data_position = 0;
                                            context_data.push(getCharFromInt(context_data_val));
                                            context_data_val = 0;
                                        } else {
                                            context_data_position++;
                                        }
                                        value = value >> 1;
                                    }
                                } else {
                                    value = 1;
                                    for (i = 0; i < context_numBits; i++) {
                                        context_data_val = (context_data_val << 1) | value;
                                        if (context_data_position == bitsPerChar - 1) {
                                            context_data_position = 0;
                                            context_data.push(getCharFromInt(context_data_val));
                                            context_data_val = 0;
                                        } else {
                                            context_data_position++;
                                        }
                                        value = 0;
                                    }
                                    value = context_w.charCodeAt(0);
                                    for (i = 0; i < 16; i++) {
                                        context_data_val = (context_data_val << 1) | (value & 1);
                                        if (context_data_position == bitsPerChar - 1) {
                                            context_data_position = 0;
                                            context_data.push(getCharFromInt(context_data_val));
                                            context_data_val = 0;
                                        } else {
                                            context_data_position++;
                                        }
                                        value = value >> 1;
                                    }
                                }
                                context_enlargeIn--;
                                if (context_enlargeIn == 0) {
                                    context_enlargeIn = Math.pow(2, context_numBits);
                                    context_numBits++;
                                }
                                delete context_dictionaryToCreate[context_w];
                            } else {
                                value = context_dictionary[context_w];
                                for (i = 0; i < context_numBits; i++) {
                                    context_data_val = (context_data_val << 1) | (value & 1);
                                    if (context_data_position == bitsPerChar - 1) {
                                        context_data_position = 0;
                                        context_data.push(getCharFromInt(context_data_val));
                                        context_data_val = 0;
                                    } else {
                                        context_data_position++;
                                    }
                                    value = value >> 1;
                                }


                            }
                            context_enlargeIn--;
                            if (context_enlargeIn == 0) {
                                context_enlargeIn = Math.pow(2, context_numBits);
                                context_numBits++;
                            }

                            context_dictionary[context_wc] = context_dictSize++;
                            context_w = String(context_c);
                        }
                    }

                    if (context_w !== '') {
                        if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                            if (context_w.charCodeAt(0) < 256) {
                                for (i = 0; i < context_numBits; i++) {
                                    context_data_val = (context_data_val << 1);
                                    if (context_data_position == bitsPerChar - 1) {
                                        context_data_position = 0;
                                        context_data.push(getCharFromInt(context_data_val));
                                        context_data_val = 0;
                                    } else {
                                        context_data_position++;
                                    }
                                }
                                value = context_w.charCodeAt(0);
                                for (i = 0; i < 8; i++) {
                                    context_data_val = (context_data_val << 1) | (value & 1);
                                    if (context_data_position == bitsPerChar - 1) {
                                        context_data_position = 0;
                                        context_data.push(getCharFromInt(context_data_val));
                                        context_data_val = 0;
                                    } else {
                                        context_data_position++;
                                    }
                                    value = value >> 1;
                                }
                            } else {
                                value = 1;
                                for (i = 0; i < context_numBits; i++) {
                                    context_data_val = (context_data_val << 1) | value;
                                    if (context_data_position == bitsPerChar - 1) {
                                        context_data_position = 0;
                                        context_data.push(getCharFromInt(context_data_val));
                                        context_data_val = 0;
                                    } else {
                                        context_data_position++;
                                    }
                                    value = 0;
                                }
                                value = context_w.charCodeAt(0);
                                for (i = 0; i < 16; i++) {
                                    context_data_val = (context_data_val << 1) | (value & 1);
                                    if (context_data_position == bitsPerChar - 1) {
                                        context_data_position = 0;
                                        context_data.push(getCharFromInt(context_data_val));
                                        context_data_val = 0;
                                    } else {
                                        context_data_position++;
                                    }
                                    value = value >> 1;
                                }
                            }
                            context_enlargeIn--;
                            if (context_enlargeIn == 0) {
                                context_enlargeIn = Math.pow(2, context_numBits);
                                context_numBits++;
                            }
                            delete context_dictionaryToCreate[context_w];
                        } else {
                            value = context_dictionary[context_w];
                            for (i = 0; i < context_numBits; i++) {
                                context_data_val = (context_data_val << 1) | (value & 1);
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else {
                                    context_data_position++;
                                }
                                value = value >> 1;
                            }


                        }
                        context_enlargeIn--;
                        if (context_enlargeIn == 0) {
                            context_enlargeIn = Math.pow(2, context_numBits);
                            context_numBits++;
                        }
                    }

                    value = 2;
                    for (i = 0; i < context_numBits; i++) {
                        context_data_val = (context_data_val << 1) | (value & 1);
                        if (context_data_position == bitsPerChar - 1) {
                            context_data_position = 0;
                            context_data.push(getCharFromInt(context_data_val));
                            context_data_val = 0;
                        } else {
                            context_data_position++;
                        }
                        value = value >> 1;
                    }

                    while (true) {
                        context_data_val = (context_data_val << 1);
                        if (context_data_position == bitsPerChar - 1) {
                            context_data.push(getCharFromInt(context_data_val));
                            break;
                        }
                        else context_data_position++;
                    }
                    return context_data.join('');
                },

                decompress: function (compressed) {
                    if (compressed == null) return '';
                    if (compressed == '') return null;
                    return LZString._decompress(compressed.length, 32768, function (index) { return compressed.charCodeAt(index); });
                },

                _decompress: function (length, resetValue, getNextValue) {
                    var dictionary = [],
                        next,
                        enlargeIn = 4,
                        dictSize = 4,
                        numBits = 3,
                        entry = '',
                        result = [],
                        i,
                        w,
                        bits, resb, maxpower, power,
                        c,
                        data = { val: getNextValue(0), position: resetValue, index: 1 };

                    for (i = 0; i < 3; i += 1) {
                        dictionary[i] = i;
                    }

                    bits = 0;
                    maxpower = Math.pow(2, 2);
                    power = 1;
                    while (power != maxpower) {
                        resb = data.val & data.position;
                        data.position >>= 1;
                        if (data.position == 0) {
                            data.position = resetValue;
                            data.val = getNextValue(data.index++);
                        }
                        bits |= (resb > 0 ? 1 : 0) * power;
                        power <<= 1;
                    }

                    switch (next = bits) {
                        case 0:
                            bits = 0;
                            maxpower = Math.pow(2, 8);
                            power = 1;
                            while (power != maxpower) {
                                resb = data.val & data.position;
                                data.position >>= 1;
                                if (data.position == 0) {
                                    data.position = resetValue;
                                    data.val = getNextValue(data.index++);
                                }
                                bits |= (resb > 0 ? 1 : 0) * power;
                                power <<= 1;
                            }
                            c = f(bits);
                            break;
                        case 1:
                            bits = 0;
                            maxpower = Math.pow(2, 16);
                            power = 1;
                            while (power != maxpower) {
                                resb = data.val & data.position;
                                data.position >>= 1;
                                if (data.position == 0) {
                                    data.position = resetValue;
                                    data.val = getNextValue(data.index++);
                                }
                                bits |= (resb > 0 ? 1 : 0) * power;
                                power <<= 1;
                            }
                            c = f(bits);
                            break;
                        case 2:
                            return '';
                    }
                    dictionary[3] = c;
                    w = c;
                    result.push(c);
                    while (true) {
                        if (data.index > length) {
                            return '';
                        }

                        bits = 0;
                        maxpower = Math.pow(2, numBits);
                        power = 1;
                        while (power != maxpower) {
                            resb = data.val & data.position;
                            data.position >>= 1;
                            if (data.position == 0) {
                                data.position = resetValue;
                                data.val = getNextValue(data.index++);
                            }
                            bits |= (resb > 0 ? 1 : 0) * power;
                            power <<= 1;
                        }

                        switch (c = bits) {
                            case 0:
                                bits = 0;
                                maxpower = Math.pow(2, 8);
                                power = 1;
                                while (power != maxpower) {
                                    resb = data.val & data.position;
                                    data.position >>= 1;
                                    if (data.position == 0) {
                                        data.position = resetValue;
                                        data.val = getNextValue(data.index++);
                                    }
                                    bits |= (resb > 0 ? 1 : 0) * power;
                                    power <<= 1;
                                }

                                dictionary[dictSize++] = f(bits);
                                c = dictSize - 1;
                                enlargeIn--;
                                break;
                            case 1:
                                bits = 0;
                                maxpower = Math.pow(2, 16);
                                power = 1;
                                while (power != maxpower) {
                                    resb = data.val & data.position;
                                    data.position >>= 1;
                                    if (data.position == 0) {
                                        data.position = resetValue;
                                        data.val = getNextValue(data.index++);
                                    }
                                    bits |= (resb > 0 ? 1 : 0) * power;
                                    power <<= 1;
                                }
                                dictionary[dictSize++] = f(bits);
                                c = dictSize - 1;
                                enlargeIn--;
                                break;
                            case 2:
                                return result.join('');
                        }

                        if (enlargeIn == 0) {
                            enlargeIn = Math.pow(2, numBits);
                            numBits++;
                        }

                        if (dictionary[c]) {
                            entry = dictionary[c];
                        } else {
                            if (c === dictSize) {
                                entry = w + w.charAt(0);
                            } else {
                                return null;
                            }
                        }
                        result.push(entry);

                        dictionary[dictSize++] = w + entry.charAt(0);
                        enlargeIn--;

                        w = entry;

                        if (enlargeIn == 0) {
                            enlargeIn = Math.pow(2, numBits);
                            numBits++;
                        }

                    }
                }
            };
            return LZString;
        })()
    });
    context.$crytography = context.$c = qaf.$c = context.$crytography || $crytography;
})(globalThis);
/// <reference path='qaf.core.js' />

/// <summary>
/// .NET Framework의 StringBuilder와 동일한 기능을 구현합니다.
/// </summary>
(function (context) {
    'use strict';

    var $stringbuilder = $stringbuilder || new baseCore();

    $stringbuilder.extend({
        version: '1.0',

        /// <summary>
        /// 문자열 데이터를 관리할 배열 객체입니다.
        /// </summary>
        datas: [],

        append: function (val) {
            /// <summary>
            /// 문자열 데이터를 추가니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;$sb.append('test1');
            /// </summary>
            /// <returns type='String'></returns>
            this.datas.push(val);
        },

        appendFormat: function (pattern) {
            /// <summary>
            /// 포맷 문자열 데이터를 추가합니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;$sb.appendFormat('Hello {0}!!! {1}', 'World', 'Bye');
            /// </summary>
            /// <returns type='String[]'></returns>
            var vals = this.convertToArray(arguments).slice(1);
            this.datas[this.datas.length] = pattern.replace(/\{(\d+)\}/g, function (pattern, index) {
                return vals[index].toString();
            });
        },

        convertToArray: function () {
            /// <summary>
            /// 포맷 문자열 데이터처리를 위해 arguments를 배열 처리합니다.
            /// </summary>
            /// <returns type='Object[]'></returns>
            if (!arguments) {
                return [];
            }

            if (arguments.toArray) {
                return arguments.toArray();
            }

            var args = arguments[0];
            var len = args.length
            var results = new Array(len);

            while (len--) {
                results[len] = args[len];
            }

            return results;
        },

        clear: function () {
            /// <summary>
            /// 문자열 데이터를 삭제합니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;$sb.append('test1');
            /// &#10;$sb.appendFormat('Hello {0}!!! {1}', 'World', 'Bye');
            /// &#10;$sb.clear();
            /// </summary>
            this.datas = [];
        },

        toString: function () {
            /// <summary>
            /// 문자열 데이터를 출력합니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;$sb.append('test1');
            /// &#10;$sb.append('test2');
            /// &#10;$sb.appendFormat('Hello {0}!!! {1}', 'World', 'Bye');
            /// &#10;alert($sb.toString());
            /// </summary>
            return this.datas.join('');
        }
    });
    context.$stringbuilder = context.$sb = qaf.$sb = context.$stringbuilder || $stringbuilder;
})(globalThis);
/// <reference path='qaf.core.js' />
/// <reference path='qaf.library.js' />

/// <summary>
/// 화면내에서 키보드 이벤트 핸들러를 제공하는 모듈입니다.
/// </summary>
(function (window) {
    'use strict';
    var $keyboard = $keyboard || new baseCore();

    $keyboard.extend({
        version: '1.0',

        /// <summary>
        /// W3C 키보드 코드 값입니다.
        /// </summary>
        keyCodes: {
            'backspace': 8,
            'tab': 9,
            'enter': 13,
            'shift': 16,
            'control': 17,
            'alt': 18,
            'capslock': 20,
            'escape': 27,
            'space': 32,
            'pageup': 33,
            'pagedown': 34,
            'end': 35,
            'home': 36,
            'left': 37,
            'up': 38,
            'right': 39,
            'down': 40,
            'delete': 46,
            'semicolon': 186,
            'colon': 186,
            'equal': 187,
            'plus': 187,
            'comma': 188,
            'less': 188,
            'minus': 189,
            'underscore': 189,
            'period': 190,
            'greater': 190,
            'slash': 191,
            'questionmark': 191,
            'backtick': 192,
            'tilde': 192,
            'openingsquarebracket': 219,
            'openingcurlybracket': 219,
            'backslash': 220,
            'pipe': 220,
            'closingsquarebracket': 221,
            'closingcurlybracket': 221,
            'singlequote': 222,
            'doublequote': 222,
            'clear': 12,
            'meta': 91,
            'contextmenu': 93,
            'numpad0': 96,
            'numpad1': 97,
            'numpad2': 98,
            'numpad3': 99,
            'numpad4': 100,
            'numpad5': 101,
            'numpad6': 102,
            'numpad7': 103,
            'numpad8': 104,
            'numpad9': 105,
            'multiply': 106,
            'add': 107,
            'subtract': 109,
            'decimal': 110,
            'divide': 111,
            '0': 48,
            '1': 49,
            '2': 50,
            '3': 51,
            '4': 52,
            '5': 53,
            '6': 54,
            '7': 55,
            '8': 56,
            '9': 57,
            'a': 65,
            'b': 66,
            'c': 67,
            'd': 68,
            'e': 69,
            'f': 70,
            'g': 71,
            'h': 72,
            'i': 73,
            'j': 74,
            'k': 75,
            'l': 76,
            'm': 77,
            'n': 78,
            'o': 79,
            'p': 80,
            'q': 81,
            'r': 82,
            's': 83,
            't': 84,
            'u': 85,
            'v': 86,
            'w': 87,
            'x': 88,
            'y': 89,
            'z': 90,
            'f1': 112,
            'f2': 113,
            'f3': 114,
            'f4': 115,
            'f5': 116,
            'f6': 117,
            'f7': 118,
            'f8': 119,
            'f9': 120,
            'f10': 121,
            'f11': 122,
            'f12': 123
        },

        /// <summary>
        /// 키보드 이벤트 핸들러를 제공할 html 참조입니다.
        /// </summary>
        keyboardEL: null,

        setElement: function (el) {
            /// <summary>
            /// 키보드 이벤트 핸들러를 제공할 HTML Element를 지정합니다.
            /// </summary>
            /// <param name='el' domElement='true'>HTML Element입니다.</param>
            /// <returns type='this' />
            this.keyboardEL = window.keyboardEL = el;
            keyboardEL.keyObject = [];
            keyboardEL.keyObject['keydown'] = [];
            keyboardEL.keyObject['keyup'] = [];
            keyboardEL.keyObject['keypress'] = [];

            function handler(evt) {
                var eventType = evt.type;
                var keyCode = evt.keyCode;
                window.keyboardEvent = arguments[0];
                window.documentEvent = evt;

                if (keyboardEL.keyObject[eventType][keyCode] != null) {
                    var val = keyboardEL.keyObject[eventType][keyCode](evt);
                    if (val === false) {
                        evt.returnValue = false;
                        evt.cancel = true;
                        if (evt.preventDefault) {
                            evt.preventDefault();
                        }

                        if (evt.stopPropagation) {
                            evt.stopPropagation();
                        }
                        return false;
                    }
                }
            };

            $l.addEvent(keyboardEL, 'keypress', handler);
            $l.addEvent(keyboardEL, 'keydown', handler);
            $l.addEvent(keyboardEL, 'keyup', handler);
            return this;
        },

        addKeyDown: function (keyCode, func) {
            /// <summary>
            /// keydown 이벤트 핸들러를 추가합니다.
            /// </summary>
            /// <param name='keyCode' type='String'>키보드 입력 KeyCode값 입니다.</param>
            /// <param name='func' type='Function'>KeyCode의 키보드 이벤트 발생시 호출할 함수입니다.</param>
            /// <returns type='this' />
            keyboardEL.keyObject['keydown'][keyCode] = func;
            return this;
        },

        removeKeyDown: function (keyCode) {
            /// <summary>
            /// keydown 이벤트 핸들러를 제거합니다.
            /// </summary>
            /// <param name='keyCode' type='String'>키보드 입력 KeyCode값 입니다.</param>
            /// <returns type='this' />
            keyboardEL.keyObject['keydown'][keyCode] = null;
            return this;
        },

        addKeyUp: function (keyCode, func) {
            /// <summary>
            /// keyup 이벤트 핸들러를 추가합니다.
            /// </summary>
            /// <param name='keyCode' type='String'>키보드 입력 KeyCode값 입니다.</param>
            /// <param name='func' type='Function'>KeyCode의 키보드 이벤트 발생시 호출할 함수입니다.</param>
            /// <returns type='this' />
            keyboardEL.keyObject['keyup'][keyCode] = func;
            return this;
        },

        removeKeyUp: function (keyCode) {
            /// <summary>
            /// keyup 이벤트 핸들러를 제거합니다.
            /// </summary>
            /// <param name='keyCode' type='String'>키보드 입력 KeyCode값 입니다.</param>
            /// <returns type='this' />
            keyboardEL.keyObject['keyup'][keyCode] = null;
            return this;
        },

        addKeyPress: function (keyCode, func) {
            /// <summary>
            /// keypress 이벤트 핸들러를 추가합니다.
            /// </summary>
            /// <param name='keyCode' type='String'>키보드 입력 KeyCode값 입니다.</param>
            /// <param name='func' type='Function'>KeyCode의 키보드 이벤트 발생시 호출할 함수입니다.</param>
            /// <returns type='this' />
            keyboardEL.keyObject['keypress'][keyCode] = func;
            return this;
        },

        removeKeyPress: function (keyCode) {
            /// <summary>
            /// keypress 이벤트 핸들러를 제거합니다.
            /// </summary>
            /// <param name='keyCode' type='String'>키보드 입력 KeyCode값 입니다.</param>
            /// <returns type='this' />
            keyboardEL.keyObject['keypress'][keyCode] = null;
            return this;
        }
    });
    window.$keyboard = window.$k = qaf.$k = window.$keyboard || $keyboard;
})(globalThis);
/// <reference path='qaf.core.js' />
/// <reference path='qaf.library.js' />

/// 허용 값
/// 	IN
/// 	NOT IN
/// 	==
/// 	!=
/// 	<
/// 	>
/// 	<=
/// 	>=
/// 허용 타입
/// 	Number
/// 	Text
/// 		Text length
/// 		Only lowercase
/// 		Only uppercase
/// 	Date
/// 	Time

/// <summary>
/// 화면내에서 유효성 검사기능을 제공하는 모듈입니다.
/// </summary>
(function (window) {
    'use strict';
    var $validation = $validation || new baseCore();
    var document = window.document;

    $validation.extend({
        version: '1.0',

        /// <summary>
        /// 전체 유효성 검사 핸들러를 제공할 html 참조입니다.
        /// </summary>
        element: null,

        /// <summary>
        /// 전체 유효성 검사(validateForm)시 검증 예외가 발생하면 다음 유효성 검사를 수행할지 결정합니다.
        /// </summary>
        isContinue: true,

        /// <summary>
        /// 유효성 검사가 실패할 경우 반환할 메시지 배열입니다.
        /// </summary>
        invalidMessages: [],

        /// <summary>
        /// 유효성 검사 정보를 모아놓을 배열입니다.
        /// </summary>
        validations: [],

        setElement: function (el) {
            /// <summary>
            /// 유효성 검사 핸들러를 제공할 HTML Element를 지정합니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;$v.setElement($l.get('Text1'));
            /// </summary>
            /// <param name='el' domElement='true'>HTML Element입니다.</param>
            /// <returns type='Type'></returns>
            this.element = el;
            if (!this.validations[el.id]) {
                if (!el.validObject) {
                    this.clear();
                }

                this.validations[el.id] = el;
            }

            return this;
        },

        required: function (el, invalidMessage) {
            /// <summary>
            /// Required 유효성 검사기를 추가합니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;$v.required($l.get('Text1'), 'Required 검사가 실패했습니다.');
            /// &#10;alert($v.validateForm());
            /// </summary>
            /// <param name='el' domElement='true'>HTML Element입니다.</param>
            /// <param name='invalidMessage' type='String'>유효성 검사가 실패할 경우 반환할 메시지입니다.</param>
            /// <returns type='Type'></returns>
            this.setElement(el);
            this.addRequired(true, invalidMessage);
            return this;
        },

        addRequired: function (isRequired, invalidMessage) {
            /// <summary>
            /// Required 유효성 검사기를 추가합니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;$v.addRequired(true, 'Required 검사가 실패했습니다.');
            /// </summary>
            /// <param name='isRequired' type='Boolean'>필수 입력 여부입니다.</param>
            /// <param name='invalidMessage' type='String'>유효성 검사가 실패할 경우 반환할 메시지입니다.</param>
            /// <returns type='Type'></returns>
            this.element.required = isRequired;
            this.element.invalidMessage = invalidMessage;
            return this;
        },

        addPattern: function (id, val) {
            /// <summary>
            /// Pattern 유효성 검사기를 추가합니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;$v.addPattern('NumberFormat', { 'expr': /[0-9]/, 'invalidMessage': 'Pattern 검사가 실패했습니다.' });
            /// </summary>
            /// <param name='id' type='String'>Pattern 유효성 검사기의 식별자입니다.</param>
            /// <param name='val' type='Object'>Pattern 유효성 검사기 매개변수로 사용될 json 입니다. 예) { 'expr': /[0-9]/g, 'invalidMessage': '유효성 검사가 실패할 경우 반환할 메시지입니다.' }</param>
            /// <returns type='Type'></returns>
            if (this.element.validObject) {
                this.element.validObject['pattern'][id] = val;
            }
            return this;
        },

        addRange: function (id, val) {
            /// <summary>
            /// Range 유효성 검사기를 추가합니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;$v.addRange('OverFlowCheck', { 'min': 0, 'max': 100, 'minOperator': '<', 'maxOperator': '>', 'invalidMessage': 'Range 검사가 실패했습니다.' });
            /// </summary>
            /// <param name='id' type='String'>Pattern 유효성 검사기의 식별자입니다.</param>
            /// <param name='val' type='Object'>Range 유효성 검사기 매개변수로 사용될 json 입니다. 예) { 'min': 0, 'max': 100, 'minOperator': '<', 'maxOperator': '>', 'invalidMessage': '유효성 검사가 실패할 경우 반환할 메시지입니다.' }</param>
            /// <returns type='Type'></returns>
            if (this.element.validObject) {
                this.element.validObject['range'][id] = val;
            }
            return this;
        },

        addCustom: function (id, val) {
            /// <summary>
            /// Custom 유효성 검사기를 추가합니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;$v.addCustom('CustomVaild', { 'func': 'customVaildation', 'functionParam1': 'ok', 'invalidMessage': 'Custom 검사가 실패했습니다.' });
            /// </summary>
            /// <param name='id' type='String'>Pattern 유효성 검사기의 식별자입니다.</param>
            /// <param name='val' type='Object'>Custom 유효성 검사기 매개변수로 사용될 json 입니다. 예) { 'func': 'FunctionName', 'invalidMessage': '유효성 검사가 실패할 경우 반환할 메시지입니다.', 'functionParam1': '' }</param>
            /// <returns type='Type'></returns>
            if (this.element.validObject) {
                this.element.validObject['custom'][id] = val;
            }
            return this;
        },

        remove: function (id) {
            /// <summary>
            /// 지정된 식별자의 유효성 검사기를 삭제합니다.
            /// </summary>
            /// <param name='id' type='String'>Pattern 유효성 검사기의 식별자입니다.</param>
            /// <returns type='Type'></returns>
            this.element.validObject['pattern'][id] = null;
            this.element.validObject['range'][id] = null;
            this.element.validObject['custom'][id] = null;
            return this;
        },

        clear: function () {
            /// <summary>
            /// 유효성 검사기를 초기화합니다.
            /// </summary>
            /// <returns type='Type'></returns>
            this.element.validObject = [];
            this.element.validObject['pattern'] = [];
            this.element.validObject['range'] = [];
            this.element.validObject['custom'] = [];
            this.element.required = false;
            this.element.invalidMessage = '';
            this.invalidMessages = [];
            return this;
        },

        validateControl: function (el) {
            /// <summary>
            /// HTML Element에 선언된 유효성 검사기를 실행합니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;$v.validateControl($l.get('Text1'))
            /// </summary>
            /// <param name='el' domElement='true'>HTML Element입니다.</param>
            /// <returns type='Type'></returns>
            if (this.element !== el) {
                this.element = el;
            }

            var isValidate = true;
            var result = false;

            if (el.required) {
                if (el.value.length > 0) {
                    result = true;
                }
                else {
                    result = false;
                    isValidate = false;
                    this.invalidMessages[this.invalidMessages.length.toString()] = el.invalidMessage;

                    if (this.isContinue == false) {
                        return isValidate;
                    }
                }
            }

            for (var valid in el.validObject) {
                if (valid === 'pattern') {
                    var pattern = null;
                    var expr = null;

                    for (var validType in el.validObject[valid]) {
                        var pattern = el.validObject[valid][validType];
                        var expr = pattern.expr;
                        result = expr.test(el.value);

                        if (result == false) {
                            isValidate = false;
                            this.invalidMessages[this.invalidMessages.length.toString()] = pattern.invalidMessage;

                            if (this.isContinue == false) {
                                break;
                            }
                        }
                    }
                }
                else if (valid === 'range') {
                    var range = null;
                    var min = null;
                    var max = null;
                    var minOperator = null;
                    var maxOperator = null;

                    for (var validType in el.validObject[valid]) {
                        range = el.validObject[valid][validType];
                        min = range.min;
                        max = range.max;
                        minOperator = range.minOperator;
                        maxOperator = range.maxOperator;

                        try {
                            result = eval(min.toString() + ' ' + minOperator.toString() + ' ' + el.value + '&&' + max.toString() + ' ' + maxOperator.toString() + ' ' + el.value);
                        } catch (error) {
                            $l.eventLog('$v.validateControl', 'elID: "{0}" 유효성 range 검사 오류 '.format(el.id) + error.message, 'Warning');
                        }

                        if (result == false) {
                            isValidate = false;
                            this.invalidMessages[this.invalidMessages.length.toString()] = range.invalidMessage;

                            if (this.isContinue == false) {
                                break;
                            }
                        }
                    }
                }
                else if (valid === 'custom') {
                    var custom = null;
                    var func = null;
                    var parameters = null;

                    for (var validType in el.validObject[valid]) {
                        custom = el.validObject[valid][validType];
                        func = custom.func;
                        parameters = [];

                        for (var parameterName in custom) {
                            if (parameterName !== 'func') {
                                parameters[parameterName] = custom[parameterName];
                            }
                        }

                        try {
                            if ($this) {
                                result = eval('window[$w.pageScript]["' + func + '"]').call(parameters, custom);
                            }
                            else {
                                result = eval(func).call(parameters, custom);
                            }
                        } catch (error) {
                            $l.eventLog('$v.validateControl', 'elID: "{0}" 유효성 custom 검사 오류 '.format(el.id) + error.message, 'Warning');
                        }

                        if (result == false) {
                            isValidate = false;
                            this.invalidMessages[this.invalidMessages.length.toString()] = custom.invalidMessage;

                            if (this.isContinue == false) {
                                break;
                            }
                        }
                    }
                }
            }

            return isValidate;
        },

        validateControls: function (els) {
            /// <summary>
            /// HTML Element에 선언된 유효성 검사기를 실행합니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;$v.validateControls($l.get('Text1', 'Text2', 'Text3'))
            /// </summary>
            /// <param name='el' domElement='true' optional='true'>HTML Element입니다.</param>
            /// <returns type='Type'></returns>
            var isValidate = true;
            var result = true;
            var el = null;

            if (els.type) {
                el = els;
                isValidate = this.validateControl(el);
            }
            else if (els.length) {
                for (var i = 0, len = els.length; i < len; i++) {
                    el = els[i];
                    result = this.validateControl(el);

                    if (result == false) {
                        isValidate = false;
                    }
                }
            }

            return isValidate;
        },

        validateForm: function () {
            /// <summary>
            /// HTML Form 선언된 모든 컨트롤의 유효성 검사기를 실행합니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;$v.validateForm()
            /// </summary>
            /// <returns type='Boolean'></returns>
            var isValidate = true;
            var result = false;
            for (var eid in this.validations) {
                result = this.validateControl(this.validations[eid]);

                if (result == false) {
                    isValidate = false;
                }
            }

            return isValidate;
        },

        toInvalidMessages: function () {
            /// <summary>
            /// 유효성 검사에 적용된 모든 컨트롤의 검사 메시지를 반환합니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;alert($v.toInvalidMessages());
            /// </summary>
            /// <returns type='Array'></returns>
            var result = '';

            for (var i = 0; i < this.invalidMessages.length; i++) {
                result += this.invalidMessages[i] + '\r\n';
            }

            this.invalidMessages = [];
            return result;
        },

        init: function () {
            /// <summary>
            /// HTML Form 선언된 모든 컨트롤의 유효성 검사기를 초기화합니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;$v.init();
            /// </summary>
            var el = null;
            for (var eid in this.validations) {
                this.element = this.validations[eid];
                this.clear();
            }

            this.validations = [];
        },

        valueType: new function () {
            /// <summary>
            /// 유효성 검사 결과에 대한 타입을 관리합니다.
            /// </summary>
            this.valid = 0;
            this.valueMissing = 1;
            this.typeMismatch = 2;
            this.patternMismatch = 3;
            this.tooLong = 4;
            this.rangeUnderflow = 5;
            this.rangeOverflow = 6;
            this.stepMismatch = 7;
        },

        validType: new function () {
            /// <summary>
            /// 유효성 검사 타입 목록입니다.
            /// </summary>
            this.required = 0;
            this.pattern = 1;
            this.range = 2;
            this.custom = 3;
        },

        regexs: new function () {
            /// <summary>
            /// 기본 제공 정규식 패턴 목록입니다.
            /// </summary>
            /* 정규식에서 자주 사용하는 기호 나 서식
            작성	의미
            A +	1 개 이상의 A (가능한 한 길게)
            A *	0 개 이상의 A (가능한 한 길게)
            A +?	1 개 이상의 A (가능한 한 짧게)
            A *?	0 개 이상의 A (가능한 한 짧게)
            A?	0 또는 1 개의 A
            A {3}	3 개의 A
            A {3,}	3 개 이상의 A
            A {3,5}	3 ~ 5 개의 A
            A | B	A 또는 B
            ABC | DEF	ABC 또는 DEF
            [ABC]	A, B, C 중 한 문자
            [AC]	A ~ C 중 한 문자
            [^ ABC]	A, B, C 이외의 어느 한 문자
            .	단일 문자
            . +	임의의 1 이상의 문자
            ^ A	A로 시작하는 문자열
            A $	A로 끝나는 문자열
            A. + B	"A (임의의 문자열) B"(가능한 한 길게)
            A. +? B	"A (임의의 문자열) B"(가능한 한 짧게)
            A [^ \ /] + B	"A ("/ "를 포함하지 않는 문자열) B"
            */
            this.alphabet = /^[a-zA-Z]*$/;
            this.juminNo = /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))-?[1-4][0-9]{6}$/;
            this.numeric = /^-?[0-9]*(\.[0-9]+)?$/;
            this.email = /^([a-z0-9_\.\-\+]+)@([\da-z\.\-]+)\.([a-z\.]{2,6})$/i;
            this.url = /^(https?:\/\/)?[\da-z\.\-]+\.[a-z\.]{2,6}[#&+_\?\/\w \.\-=]*$/i;
            this.ipAddress = /^(?:\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b|null)$/;
            this.date = /^\d{4}-\d{2}-\d{2}$/;
            this.mobilePhone = /^01([0|1|6|7|8|9])(\d{7,8})/;
            this.seoulPhone = /^02(\d{7,8})/;
            this.areaPhone = /^0([0|3|4|5|6|7|8|])([0|1|2|3|4|5|])(\d{7,8})/;
            this.onesPhone = /^050([2|5])(\d{7,8})/;
            this.float = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i;
            this.isoDate = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;
        }
    });
    window.$validation = window.$v = qaf.$v = window.$validation || $validation;
})(globalThis);
/// <reference path='qaf.core.js' />

/// <summary>
/// Javascript 확장 기능을 제공하는 모듈입니다.
/// </summary>
(function (context) {
    'use strict';
    /// <summary>
    /// Array 확장 모듈입니다.
    /// </summary>
    qaf.lib = qaf.lib || new baseCore();
    var $date = $date || new baseCore();
    var $array = $array || new baseCore();
    var $string = $string || new baseCore();
    var $number = $number || new baseCore();
    var $object = $object || new baseCore();

    (function () {
        var UID = {
            current: 0,
            getNew: function () {
                this.current++;
                return this.current;
            }
        };

        if (isNodejs == false) {
            HTMLElement.prototype.pseudoStyle = function (element, prop, value) {
                var $that = this;
                var sheetID = 'pseudoStyles';
                var head = document.head || document.getElementsByTagName('head')[0];
                var sheet = document.getElementById(sheetID) || document.createElement('style');
                sheet.id = sheetID;
                var className = 'pseudoStyle' + UID.getNew();

                $that.className += ' ' + className;

                sheet.innerHTML += ' .' + className + ':' + element + '{' + prop + ':' + value + '}';
                head.appendChild(sheet);
                return this;
            };
        }

        if (!Function.prototype.clone) {
            Function.prototype.clone = function () {
                /// <summary>
                /// Function 객체를 복사합니다.
                /// </summary>
                var that = this;
                var result = function T() { return that.apply(this, arguments); };
                for (var key in this) {
                    result[key] = this[key];
                }

                return result;
            };
        }

        if (!Object.assign) {
            Object.assign = function clone(obj) {
                if (obj === null || typeof (obj) !== 'object')
                    return obj;

                var copy = obj.constructor();

                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr)) {
                        copy[attr] = obj[attr];
                    }
                }

                return copy;
            }
        }

        if (!Object.entries) {
            Object.entries = function (obj) {
                var ownProps = Object.keys(obj),
                    i = ownProps.length,
                    resArray = new Array(i);
                while (i--)
                    resArray[i] = [ownProps[i], obj[ownProps[i]]];

                return resArray;
            }
        }

        if (!String.prototype.trim) {
            String.prototype.trim = function () {
                /// <summary>
                /// 문자열 값에서 왼쪽, 오른쪽 공백을 제거합니다.
                /// </summary>
                /// <returns type='String' />
                var val = this.replace(/^\s+/, '');
                for (var i = val.length - 1; i > 0; i--) {
                    if (/\S/.test(val.charAt(i))) {
                        val = val.substring(0, i + 1);
                        break;
                    }
                }

                return val;
            };
        }

        if (!String.prototype.includes) {
            String.prototype.includes = function (val) {
                /// <summary>
                /// 문자열 값에서 지정된 값이 있는지 검증합니다.
                /// </summary>
                /// <param name='val' type='String'>문자열내에 포함하고 있는 단어인지 검증하기 위한 값입니다.</param>
                /// <returns type='Boolean' />
                return this.indexOf(val) !== -1;
            };
        }

        if (!String.prototype.format) {
            String.prototype.format = function () {
                /// <summary>
                /// String 프로토타입에 $resource를 위한 문자열 포맷 함수를 제공합니다.
                /// &#10;&#10;
                /// example :&#10;
                /// &#10;alert($resource.notDateBetween.format('조건1', '조건2')); // ''조건1'의 완료날짜보다 '조건2'의 시작날짜가 더 최근 일 수 없습니다.'
                /// </summary>
                /// <param name='formats' parameterArray='true' optional='true' mayBeNull='true'>문자열 포맷을 적용할 메시지입니다.</param>
                /// <returns type='String' />
                var val = this;
                for (var i = 0, len = arguments.length; i < len; i++) {
                    var exp = new RegExp('\{' + i.toString() + '+?\}', 'g');
                    val = val.replace(exp, arguments[i]);
                }

                return val;
            };
        }

        if (!String.prototype.parseISOString) {
            String.prototype.parseISOString = function () {
                var val = this;
                var result = null;

                if (val && val.includes('T') == true) {
                    var date = val.split(/\D+/);
                    result = new Date(Date.UTC(date[0], --date[1], date[2], date[3], date[4], date[5], date[6]));
                }

                return result;
            }
        }

        if (!Array.prototype.includes) {
            Object.defineProperty(Array.prototype, 'includes', {
                value: function (searchElement, fromIndex) {
                    if (this == null) {
                        throw new TypeError('"this" is null or not defined');
                    }

                    var o = Object(this);
                    var len = o.length >>> 0;
                    if (len === 0) {
                        return false;
                    }

                    var n = fromIndex | 0;
                    var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

                    function sameValueZero(x, y) {
                        return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
                    }

                    while (k < len) {
                        if (sameValueZero(o[k], searchElement)) {
                            return true;
                        }
                        k++;
                    }
                    return false;
                }
            });
        }

        if (!Array.prototype.filter) {
            Array.prototype.filter = function (func, thisArg) {
                'use strict';
                if (!((typeof func === 'Function' || typeof func === 'function') && this))
                    throw new TypeError();

                var len = this.length >>> 0,
                    res = new Array(len),
                    t = this, c = 0, i = -1;
                if (thisArg === undefined) {
                    while (++i !== len) {
                        if (i in this) {
                            if (func(t[i], i, t)) {
                                res[c++] = t[i];
                            }
                        }
                    }
                }
                else {
                    while (++i !== len) {
                        if (i in this) {
                            if (func.call(thisArg, t[i], i, t)) {
                                res[c++] = t[i];
                            }
                        }
                    }
                }

                res.length = c;
                return res;
            };
        }

        if (!Array.prototype.map) {
            Array.prototype.map = function (callback, thisArg) {
                var T, A, k;

                if (this == null) {
                    throw new TypeError(' this is null or not defined');
                }

                var O = Object(this);
                var len = O.length >>> 0;
                if (typeof callback !== 'function') {
                    throw new TypeError(callback + ' is not a function');
                }

                if (arguments.length > 1) {
                    T = thisArg;
                }

                A = new Array(len);
                k = 0;
                while (k < len) {
                    var kValue, mappedValue;

                    if (k in O) {
                        kValue = O[k];
                        mappedValue = callback.call(T, kValue, k, O);
                        A[k] = mappedValue;
                    }
                    k++;
                }

                return A;
            };
        }

        if (!Date.prototype.toISOString) {
            Date.prototype.toISOString = function () {
                var date = this;

                function pad(n) { return (n < 10 ? '0' : '') + n }
                function padd(n) { return (n < 100 ? '0' : '') + pad(n) }

                return date.getUTCFullYear() + '-' +
                    pad(date.getUTCMonth() + 1) + '-' +
                    pad(date.getUTCDate()) +
                    'T' + pad(date.getUTCHours()) + ':' +
                    pad(date.getUTCMinutes()) + ':' +
                    pad(date.getUTCSeconds()) + '.' +
                    padd(date.getMilliseconds()) + 'Z';
            }
        }

        if (isNodejs == true) {
        }
        else {
            if (!Element.prototype.matches) {
                Element.prototype.matches = Element.prototype.msMatchesSelector ||
                    Element.prototype.webkitMatchesSelector;
            }

            if (!Element.prototype.closest) {
                Element.prototype.closest = function (s) {
                    var el = this;

                    do {
                        if (el.matches(s)) return el;
                        el = el.parentElement || el.parentNode;
                    } while (el !== null && el.nodeType === 1);
                    return null;
                };
            }
        }
    })();

    $date.extend({
        version: '1.0',
        interval: {
            yyyy: { units: 1000 * 60 * 60 * 24 * 365, measure: 'year' },
            m: { units: 1000 * 60 * 60 * 24 * 30, measure: 'month' },
            d: { units: 1000 * 60 * 60 * 24, measure: 'day' },
            q: { units: (1000 * 60 * 60 * 24 * 30) * 3, measure: 'quarter' },
            h: { units: 60000 * 60, measure: 'hour' },
            n: { units: 60000, measure: 'minute' },
            s: { units: 1000, measure: 'second' },
        },
        minutes: 60000,

        toUTC: function (date) {
            /// <summary>
            /// UTC(Universal Time Coordinated) 날짜와 시간 문자열을 Date Object로 반환합니다. UTC 문자열이 아닐 경우 null을 반환합니다.
            /// </summary>
            /// <param name='date' type='String'>UTC(Universal Time Coordinated) 날짜와 시간 문자열입니다.</param>
            /// <returns type='Date' />
            if (typeof date === 'string') {
                var expr = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(date);
                if (expr) {
                    return new Date(Date.UTC(+expr[1], +expr[2] - 1, +expr[3], +expr[4], +expr[5], +expr[6]));
                }
            }
            return null;
        },

        clear: function (date, isTimeOnly) {
            /// <summary>
            /// Date Object를 초기화합니다.
            /// </summary>
            /// <param name='date' type='Date'>Date Object입니다.</param>
            /// <param name='isTimeOnly' type='Boolean'>시간(시, 분, 초, 밀리초) 값만 초기화 할지 여부입니다. 기본값은 false입니다.</param>
            /// <returns type='Date' />
            date.setYear(0);
            date.setMonth(0);
            date.setDate(0);

            if (isTimeOnly === true) {
                date.setHours(0);
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(0);
            }

            return date;
        },

        now: function (date) {
            /// <summary>
            /// Date Object를 현재 시간으로 초기화합니다.
            /// </summary>
            /// <param name='date' type='Date'>Date Object입니다.</param>
            /// <returns type='Date' />
            date = new Date();
            return date;
        },

        clone: function (date) {
            /// <summary>
            /// Date Object 사본을 반환합니다.
            /// </summary>
            /// <param name='date' type='Date'>Date Object입니다.</param>
            /// <returns type='Date' />
            return new Date(date.getTime());
        },

        isBetween: function (date, start, end) {
            /// <summary>
            /// Date Object이 지정된 시작일자와 종료일자 사이에 포함되는지 확인합니다.
            /// </summary>
            /// <param name='date' type='Date'>Date Object입니다.</param>
            /// <param name='start' type='Date'>Date Object 입니다.</param>
            /// <param name='end' type='Date'>Date Object 입니다.</param>
            /// <returns type='Boolean' />
            return date.getTime() >= start.getTime() && date.getTime() <= end.getTime();
        },

        equals: function (date, targetDate) {
            /// <summary>
            /// Date Object가 지정된 Date객체와 같은지 확인합니다.
            /// </summary>
            /// <param name='date' type='Date'>Date Object입니다.</param>
            /// <param name='targetDate' type='Date'>Date Object 입니다. date 객체가 null 이거나 undefined 일경우 오늘 날짜를 기준으로 확인합니다.</param>
            /// <returns type='Boolean' />
            return date.toDateString() == (targetDate || new Date()).toDateString();
        },

        isToday: function (date) {
            /// <summary>
            /// Date Object가 오늘날짜인지 확인합니다.
            /// </summary>
            /// <param name='date' type='Date'>Date Object입니다.</param>
            /// <returns type='Boolean' />
            return $date.equals(date, new Date());
        },

        toString: function (date, format) {
            /// <summary>
            /// Date Object에 현재 날짜값을 문자열로 반환합니다. 지정된 포맷값에 맞는 결과가 없을 경우 getDate()의 결과를 반환합니다.
            /// </summary>
            /// <param name='date' type='Date'>Date Object입니다.</param>
            /// <param name='format' type='String'>날짜값을 반환하기 위한 포맷값입니다.(d, t, a)</param>
            /// <returns type='String' />
            var result = '';
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate().toString().length == 1 ? '0' + date.getDate().toString() : date.getDate().toString();
            var hours = date.getHours().toString().length == 1 ? '0' + date.getHours().toString() : date.getHours().toString();
            var minutes = date.getMinutes().toString().length == 1 ? '0' + date.getMinutes().toString() : date.getMinutes().toString();
            var seconds = date.getSeconds().toString().length == 1 ? '0' + date.getSeconds().toString() : date.getSeconds().toString();
            var milliseconds = date.getMilliseconds().toString();

            month = month.toString().length == 1 ? '0' + month.toString() : month.toString();

            if (format == 'd') {
                result = year.toString().concat('-', month, '-', day);
            }
            else if (format == 't') {
                result = hours.toString().concat(':', minutes, ':', seconds);
            }
            else if (format == 'a') {
                result = year.toString().concat('-', month, '-', day, ' ', hours, ':', minutes, ':', seconds);
            }
            else if (format == 'f') {
                result = year.toString().concat(month, day, hours, minutes, seconds, milliseconds);
            }
            else {
                result = date.getDate();
            }

            return result;
        },

        addHour: function (date, val) {
            /// <summary>
            /// Date Object에 '시'값을 변경합니다.
            /// </summary>
            /// <param name='date' type='Date'>Date Object입니다.</param>
            /// <param name='val' type='Number'>시 값을 변경하기 위한 정수값입니다.</param>
            /// <returns type='Date' />
            return new Date(date.setTime(date.getTime() + (val * 60 * 60 * 1000)));
        },

        addDay: function (date, val) {
            /// <summary>
            /// Date Object에 '일'값을 변경합니다.
            /// </summary>
            /// <param name='date' type='Date'>Date Object입니다.</param>
            /// <param name='val' type='Number'>일 값을 변경하기 위한 정수값입니다.</param>
            /// <returns type='Date' />
            return new Date(date.setDate(date.getDate() + val));
        },

        addWeek: function (date, val) {
            /// <summary>
            /// Date Object에 '주'값을 변경합니다.
            /// </summary>
            /// <param name='date' type='Date'>Date Object입니다.</param>
            /// <param name='val' type='Number'>주 값을 변경하기 위한 정수값입니다.</param>
            /// <returns type='Date' />
            return new Date(date.setDate(date.getDate() + (val * 7)));
        },

        addMonth: function (date, val) {
            /// <summary>
            /// Date Object에 '월'값을 변경합니다.
            /// </summary>
            /// <param name='date' type='Date'>Date Object입니다.</param>
            /// <param name='val' type='Number'>월 값을 변경하기 위한 정수값입니다.</param>
            /// <returns type='Date' />
            return new Date(date.setMonth(date.getMonth() + val));
        },

        addYear: function (date, val) {
            /// <summary>
            /// Date Object에 '년'값을 변경합니다.
            /// </summary>
            /// <param name='date' type='Date'>Date Object입니다.</param>
            /// <param name='val' type='Number'>년 값을 변경하기 위한 정수값입니다.</param>
            /// <returns type='Date' />
            return new Date(date.setFullYear(date.getFullYear() + val));
        },

        getFirstDate: function (date) {
            /// <summary>
            /// Date Object에서 '일'값을 첫번째 일로 변경합니다.
            /// </summary>
            /// <param name='date' type='Date'>Date Object입니다.</param>
            /// <returns type='Date' />
            return new Date(date.setDate(1));
        },

        getLastDate: function (date) {
            /// <summary>
            /// Date Object에서 '일'값을 해당 월의 마지막 일로 변경합니다.
            /// </summary>
            /// <param name='date' type='Date'>Date Object입니다.</param>
            /// <returns type='Date' />
            date = $date.addMonth(date, 1);
            return $date.addDay(new Date(date.setDate(1)), -1);
        },

        diff: function (itv, start, end) {
            /// <summary>
            /// Date Object에서 지정된 Date Object값을 비교하여 interval값을 계산합니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;var date1 = new Date();
            /// &#10;var date2 = new Date();
            /// &#10;date2 = date2.addDay(3);
            /// &#10;alert($date.diff('h', date1, date2));
            /// </summary>
            /// <param name='itv' type='String'>interval값을 계산하기위한 포맷값(yyyy, m, d, q, h, n, s)입니다.</param>
            /// <param name='fromDate' type='Date'>월 값을 변경하기 위한 정수값입니다.</param>
            /// <param name='end' type='Date'>월 값을 변경하기 위한 정수값입니다.</param>
            /// <returns type='Number' />
            if ($ref.isString(start) == true) {
                start = new Date(start);
            }

            if ($ref.isString(end) == true) {
                end = new Date(end);
            }

            var period1 = this.toString(start, 'd');
            var splitDate1 = period1.split('-');
            var periodYear1 = splitDate1[0];
            var periodMonth1 = splitDate1[1] - 1;
            var periodDay1 = splitDate1[2];

            var period2 = this.toString(end, 'd');
            var splitDate2 = period2.split('-');
            var periodYear2 = splitDate2[0];
            var periodMonth2 = splitDate2[1] - 1;
            var periodDay2 = splitDate2[2];

            var do1 = new Date(periodYear1, periodMonth1, periodDay1);
            do1.setHours(0);
            do1.setMinutes(0);
            do1.setSeconds(0);
            var period1Time = do1.getTime();

            var do2 = new Date(periodYear2, periodMonth2, periodDay2);
            do2.setHours(0);
            do2.setMinutes(0);
            do2.setSeconds(0);
            var period2Time = do2.getTime();
            var adjust = null;

            if (do2 > do1) {
                adjust = (do2.getTimezoneOffset() - do1.getTimezoneOffset()) * $date.minutes;
            }
            else {
                adjust = (do1.getTimezoneOffset() - do2.getTimezoneOffset()) * $date.minutes;
            }

            if (typeof $date.interval[itv] != 'undefined') {
                var diff = Math.ceil(period2Time - period1Time) - adjust;
                var timeDiff = Math.floor(diff / $date.interval[itv].units);

                return parseInt(timeDiff);
            }
            else {
                return -1;
            }
        },

        toTicks: function (date) {
            /// <summary>
            /// Date Object에서 시간을 나타내는 ticks 단위 값을 반환합니다.
            /// </summary>
            /// <param name='date' type='Date'>Date Object입니다.</param>
            /// <returns type='Number' />
            return ((date.getTime() * 10000) + 621355968000000000);
        },

        isDate: function (val) {
            /// <summary>
            /// 문자열이 Date 객체로 표현될 수 있는지 검증합니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;alert($date.isDate('2012-12-31')); // true
            /// &#10;alert($date.isDate('2012-12-31T00:00:00')); // true
            /// &#10;alert($date.isDate('2012-12-32')); // false
            /// </summary>
            /// <param name='val' type='String'>일자 값을 표현하는 문자열입니다.</param>
            /// <returns type='Boolean' />
            var result = false;
            var scratch = null;

            scratch = new Date(val);
            if (scratch.toString() == 'NaN' || scratch.toString() == 'Invalid Date') {
                if ($b.isSafari == true && $b.isChrome == false) {
                    var parts = val.match(/(\d+)/g);
                    scratch = new Date(parts[0], parts[1] - 1, parts[2]);
                    if (scratch.toString() == 'NaN' || scratch.toString() == 'Invalid Date') {
                        result = false;
                    }
                    else {
                        result = true;
                    }
                }
                else {
                    result = false;
                }
            }
            else {
                result = true;
            }

            return result;
        },

        isISOString: function (val) {
            var date = new Date(val);
            return !Number.isNaN(date.valueOf()) && date.toISOString() === val;
        }
    });
    context.$date = qaf.lib.$date = $date;

    $string.extend({
        version: '1.0',

        toDate: function (val) {
            /// <summary>
            /// ticks값을 Date객체로 반환합니다.
            /// </summary>
            /// <param name='ticks' type='String'>ticks값을 표현하는 문자열입니다.</param>
            return new Date((val - 621355968000000000) / 10000);
        },

        br: function (val) {
            /// <summary>
            /// String 프로토타입에 캐리지 리턴 문자값을 br 태그값으로 변환하여 반환합니다.
            /// </summary>
            /// <param name='val' type='String'>문자열 값입니다.</param>
            /// <returns type='String' />
            return val.replace(/(\r\n|\r|\n)/g, '<br />');
        },

        isBusinessNo: function (val) {
            var result = false;
            var valueMap = val.replace(/-/gi, '').split('').map(function (item) {
                return parseInt(item, 10);
            });

            if (valueMap.length === 10) {
                try {
                    var multiply = [1, 3, 7, 1, 3, 7, 1, 3, 5];
                    var checkSum = 0;

                    for (var i = 0; i < multiply.length; ++i) {
                        checkSum += multiply[i] * valueMap[i];
                    }

                    checkSum += parseInt((multiply[8] * valueMap[8]) / 10, 10);
                    result = Math.floor(valueMap[9]) === ((10 - (checkSum % 10)) % 10);
                } catch (e) {
                    result = false;
                }
            }

            return result;
        },

        isNullOrEmpty: function (val) {
            /// <summary>
            /// 문자열 값에서 지정된 값이 비어 있는지 검증합니다.
            /// </summary>
            /// <param name='val' type='String'>비어있는지 검증하기 위한 값입니다.</param>
            /// <returns type='Boolean' />
            if (val === undefined || val === null || val === '') {
                return true;
            }
            else {
                return false;
            }
        },

        sanitizeHTML: function (val) {
            /// <summary>
            /// 문자열 값중에 Html Symbol값을 Html Number, Html Name으로 변환하여 가져옵니다. 참조(http://www.ascii.cl/htmlcodes.htm)
            /// </summary>
            /// <param name='val' type='String'>문자열 값입니다.</param>
            /// <returns type='String' />
            var element = document.createElement('div');
            element.innerText = val;
            return element.innerHTML;
        },

        toHtmlChar: function (val) {
            /// <summary>
            /// 문자열 값중에 Html Symbol값을 Html Number, Html Name으로 변환하여 가져옵니다. 참조(http://www.ascii.cl/htmlcodes.htm)
            /// </summary>
            /// <param name='val' type='String'>문자열 값입니다.</param>
            /// <returns type='String' />
            return val.replace(/&/g, '&amp;').replace(/\'/g, '&quot;').replace(/\'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        },

        toCharHtml: function (val) {
            /// <summary>
            /// 문자열 값중에 Html Number, Html Name값을 Html Symbol으로 변환하여 가져옵니다. 참조(http://www.ascii.cl/htmlcodes.htm)
            /// </summary>
            /// <param name='val' type='String'>문자열 값입니다.</param>
            /// <returns type='String' />
            return val.replace(/&amp;/g, '&').replace(/&quot;/g, '\'').replace(/&#39;/g, '\'').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
        },

        toAscii: function (val) {
            /// <summary>
            /// 문자열 값에서 Ascii 문자열을 반환합니다
            /// </summary>
            /// <param name='val' type='String'>문자열 값입니다.</param>
            /// <returns type='Boolean' />
            return (val.trim().replace(/[^0-9a-zA-Z\value]/g, ''));
        },

        isAscii: function (val) {
            /// <summary>
            /// 문자열 값이 Ascii 코드로 구성되어 있는지 확인합니다.
            /// </summary>
            /// <param name='val' type='String'>문자열 값입니다.</param>
            /// <returns type='Boolean' />
            return /^[\x00-\x7F]*$/.test(val);
        },


        length: function (val) {
            /// <summary>
            /// 문자열 길이를 가져옵니다. 아스키 코드 문자셋 이외의 문자는 2byte로 계산합니다.
            /// </summary>
            /// <param name='val' type='String'>문자열 값입니다.</param>
            /// <returns type='Number' />
            var result = 0;

            for (var i = 0, len = val.length; i < len; i++) {
                if (val.charCodeAt(i) > 127) {
                    result += 2;
                }
                else {
                    result++;
                }
            }

            return result;
        },

        substring: function (val, len) {
            var currentLength = 0;
            if (len == null || len == undefined) {
                len = val.length;
            }

            for (var i = 0; i < val.length; i++) {
                if (val.charCodeAt(i) > 127) {
                    currentLength += 2;
                }
                else {
                    currentLength += 1;
                }

                if (currentLength > len) {
                    return val.substring(0, i);
                }
            }

            return val;
        },

        split: function (val, len) {
            var i = 0;
            var result = [];
            while (i < val.length) {
                var substr = $string.substring(val, len);
                if (substr) {
                    result.push(substr);
                    val = val.replace(substr, '');
                }
                else {
                    break;
                }
            }

            return result;
        },

        isNumber: function (num, opt) {
            /// <summary>
            /// 지정된 매개변수가 숫자 인지 확인합니다.
            /// </summary>
            /// <param name='val' type='Object'>숫자 인지 확인할 값입니다.</param>
            /// <returns type='Boolean' />
            num = String(num).replace(/^\s+|\s+$/g, "");

            if (typeof opt == "undefined" || opt == "1") {
                var regex = /^[+\-]?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+){1}(\.[0-9]+)?$/g;
            } else if (opt == "2") {
                var regex = /^(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+){1}(\.[0-9]+)?$/g;
            } else if (opt == "3") {
                var regex = /^[0-9]+(\.[0-9]+)?$/g;
            } else {
                var regex = /^[0-9]$/g;
            }

            if (regex.test(num)) {
                num = num.replace(/,/g, "");
                return isNaN(num) ? false : true;
            } else {
                return false;
            }
        },

        capitalize: function (val) {
            /// <summary>
            /// 문자열 값중에서 영문 단어의 첫 글자를 대문자로 변환합니다.
            /// </summary>
            /// <param name='val' type='String'>문자열 값입니다.</param>
            /// <returns type='String' />
            return val.replace(/\b([a-z])/g, function (val) {
                return val.toUpperCase()
            });
        },

        toJSON: function (val, option) {
            /// <summary>
            /// JSON 객체의 데이터 배열을 CSV 문자열로 변환합니다
            /// </summary>
            /// <code>toJSON('col1;col2\na;b\nc;d', ';');</code>
            /// <param name='data' type='Array'>JSON 객체의 데이터 배열입니다</param>
            /// <param name='delimiter' type='String'>CSV 구분자입니다</param>
            /// <returns type='String' />
            option = option || {};
            var delimeter = option.delimeter || ',';
            var newline = option.newline || '\n';
            var meta = option.meta || {};
            var i, row, lines = val.split(RegExp('{0}'.format(newline), 'g'));
            var headers = lines[0].split(delimeter);
            for (i = 0; i < headers.length; i++) {
                headers[i] = headers[i].replace(/(^[\s"]+|[\s"]+$)/g, '');
            }
            var result = [];
            var lineLength = lines.length;
            var headerLength = headers.length;
            if ($ref.isEmpty(meta) == true) {
                for (i = 1; i < lineLength; i++) {
                    row = lines[i].split(delimeter);
                    var item = {};
                    for (var j = 0; j < headerLength; j++) {
                        item[headers[j]] = $string.toDynamic(row[j]);
                    }
                    result.push(item);
                }
            }
            else {
                for (i = 1; i < lineLength; i++) {
                    row = lines[i].split(delimeter);
                    var item = {};
                    for (var j = 0; j < headerLength; j++) {
                        var columnName = headers[j];
                        item[columnName] = $string.toParseType(row[j], meta[columnName]);
                    }
                    result.push(item);
                }
            }
            return result;
        },

        toParameterObject: function (parameters) {
            return (parameters.match(/([^?:;]+)(:([^;]*))/g) || []).reduce(function (a, v) {
                return a[v.slice(0, v.indexOf(':')).replace('@', '')] = v.slice(v.indexOf(':') + 1), a;
            }, {});
        },

        toNumber: function (val) {
            /// <summary>
            /// 통화(콤마) 서식이 적용 문자열 값을 숫자로 반환합니다.
            /// </summary>
            /// <param name='val' type='String'>문자열 값입니다.</param>
            /// <returns type='Number' />
            var result = 0;
            try {
                result = parseFloat((val == null || val == undefined ? 0 : val) === 0 || val === '' ? '0' : val.toString().replace(/,/g, ''));
            } catch (error) {
                console.log(error);
            }

            return result;
        },

        toBoolean: function (val) {
            /// <summary>
            /// 통화(콤마) 서식이 적용 문자열 값을 Boolean으로 반환합니다.
            /// </summary>
            /// <param name='val' type='String'>문자열 값입니다.</param>
            /// <returns type='Number' />

            return (val === 'true' || val === 'True' || val === 'TRUE' || val === 'Y' || val == '1');
        },

        toDynamic: function (val, emptyIsNull) {
            /// <summary>
            /// 동적으로 문자열의 값을 javascript 타입 값으로 반환합니다.
            /// </summary>
            /// <param name='val' type='String'>문자열 값입니다.</param>
            /// <returns type='Object' />
            var result;

            if (emptyIsNull == undefined) {
                emptyIsNull = false;
            }

            if (emptyIsNull == true && val === '') {
                result = null;
            }
            else {
                if (val === 'true' || val === 'True' || val === 'TRUE') {
                    result = true;
                }
                else if (val === 'false' || val === 'False' || val === 'FALSE') {
                    result = false;
                }
                else if ($validation.regexs.float.test(val)) {
                    result = $string.toNumber(val);
                }
                else if ($validation.regexs.isoDate.test(val)) {
                    result = new Date(val);
                }
                else {
                    result = val;
                }
            }

            return result;
        },

        toParseType: function (val, metaType, emptyIsNull) {
            /// <summary>
            /// 동적으로 문자열의 값을 javascript 타입 값으로 반환합니다.
            /// </summary>
            /// <param name='val' type='String'>문자열 값입니다.</param>
            /// <returns type='Object' />
            var result;

            if (emptyIsNull == undefined) {
                emptyIsNull = false;
            }

            if (emptyIsNull == true && val === '') {
                result = null;
            }
            else {
                switch (metaType) {
                    case 'string':
                        result = val;
                        break;
                    case 'bool':
                        result = $string.toBoolean(val);
                        break;
                    case 'number':
                    case 'int':
                        result = val == null || val == undefined ? null : $string.isNumber(val) == true ? $string.toNumber(val) : null;
                        break;
                    case 'date':
                        if ($validation.regexs.isoDate.test(val)) {
                            result = new Date(val);
                        }
                        break;
                    default:
                        result = val;
                        break;
                }
            }

            return result;
        },

        toNumberString: function (val) {
            /// <summary>
            /// 통화(콤마) 서식을 제거한 후 문자열 값 반환합니다.
            /// </summary>
            /// <param name='val' type='String'>문자열 값입니다.</param>
            /// <returns type='String' />
            return val.replace(/,/g, '');
        },

        toCurrency: function (val, localeID, options) {
            /// <summary>
            /// 문자열 값이 숫자로 구성 되었을 경우 통화(콤마) 서식을 적용하여 문자열로 반환합니다. 숫자가 아닐경우 원본 문자열을 반환합니다.
            /// </summary>
            /// <param name='val' type='String'>문자열 값입니다.</param>
            /// <returns type='String' />
            var result = null;
            if (qaf.lib.$string.isNumber(val) == false) {
                return result;
            }

            if (localeID == null || localeID == undefined) {
                var x = val.toString().split('.');
                var x1 = x[0];

                var x2 = x.length > 1 ? '.' + x[1] : '';
                var expr = /(\d+)(\d{3})/;

                while (expr.test(x1)) {
                    x1 = x1.replace(expr, '$1' + ',' + '$2');
                }

                result = x1 + x2;
            }
            else {
                // https://ko.wikipedia.org/wiki/ISO_4217
                var formatOptions = $w.argumentsExtend({
                    style: 'currency',
                    currency: 'KRW'
                }, options);

                result = Intl.NumberFormat(localeID, formatOptions).format(val);
            }

            return result;
        },

        digits: function (val, length, fix) {
            /// <summary>
            /// 문자열 값의 길이가 지정된 길이 만큼 되지않으면 지정된 문자로 길이만큼 채워 반환합니다.
            /// </summary>
            /// <param name='val' type='String'>문자열 값입니다.</param>
            /// <param name='length' type='String'>문자열 값의 최대 길이입니다.</param>
            /// <param name='fix' type='String'>최대 길이 대신 표현할 문자입니다.</param>
            /// <returns type='String' />
            var fix = fix || '0';
            var digit = '';

            if (this.length < length) {
                for (var i = 0; i < length - val.length; i++) {
                    digit += fix;
                }
            }

            return digit + val;
        },

        toClipboard: function (val) {
            /// <summary>
            /// 문자열값을 클립보드에 복사합니다
            /// qaf.lib.$string.toClipboard('문자열')
            /// </summary>
            /// <param name='val' type='String'>클립보드에 복사하는 문자열입니다</param>
            /// <returns type='Object' />
            if (isNodejs == true) {
            }
            else {
                var el = document.createElement('textarea');
                el.value = val;
                el.setAttribute('readonly', '');
                el.style.position = 'absolute';
                el.style.left = '-9999px';
                document.body.appendChild(el);
                var selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
                el.select();
                document.execCommand('copy');
                document.body.removeChild(el);

                if (selected) {
                    document.getSelection().removeAllRanges();
                    document.getSelection().addRange(selected);
                }
            }
        }
    });
    context.$string = qaf.lib.$string = $string;

    $array.extend({
        version: '1.0',

        distinct: function (arr) {
            /// <summary>
            /// Array Object의 중복 데이터를 제거한 새로운 배열을 반환합니다.
            /// </summary>
            /// <param name='arr' type='Array'>Array Object 입니다.</param>
            var derived = [];
            for (var i = 0, len = arr.length; i < len; i++) {
                if (this.contains(derived, arr[i]) == false) {
                    derived.push(arr[i])
                }
            }

            return derived;
        },

        sort: function (arr, order) {
            /// <summary>
            /// Array Object의 데이터를 버블 소트로 정렬합니다.
            /// </summary>
            /// <param name='arr' type='Array'>Array Object 입니다.</param>
            /// <param name='order' type='Boolean'>true이면 정순으로, false면 역순으로 정렬합니다. 기본값은 true입니다.</param>
            var temp = null;

            if (order) {
                order = true;
            }

            if (order == true) {
                for (var i = 0, ilen = arr.length; i < ilen; i++) {
                    for (var j = 0, jlen = arr.length; j < jlen; j++) {
                        if (arr[i] < arr[j]) {
                            temp = arr[i];
                            arr[i] = arr[j];
                            arr[j] = temp;
                        }
                    }
                }
            }
            else {
                for (var i = 0, ilen = arr.length; i < ilen; i++) {
                    for (var j = 0, jlen = arr.length; j < jlen; j++) {
                        if (arr[i] > arr[j]) {
                            temp = arr[i];
                            arr[i] = arr[j];
                            arr[j] = temp;
                        }
                    }
                }
            }

            temp = null;
        },

        objectSort: function (objectArr, prop, order) {
            /// <summary>
            /// 객체 Array Object의 데이터를 버블 소트로 정렬합니다.
            /// </summary>
            /// <param name='arr' type='Array'>객체 Array Object 입니다.</param>
            /// <param name='prop' type='String'>정렬 기준으로 사용 하려고 하는 속성명입니다.</param>
            /// <param name='order' type='Boolean'>true이면 정순으로, false면 역순으로 정렬합니다. 기본값은 true입니다.</param>
            if (order == null || order == undefined) {
                order = true;
            }

            if (order == true) {
                objectArr.sort(
                    function (v1, v2) {
                        var prop1 = v1[prop];
                        var prop2 = v2[prop];

                        if (prop1 < prop2) {
                            return -1;
                        }

                        if (prop1 > prop2) {
                            return 1;
                        }

                        return 0;
                    }
                );
            }
            else {
                objectArr.sort(
                    function (v1, v2) {
                        var prop1 = v1[prop];
                        var prop2 = v2[prop];

                        if (prop1 < prop2) {
                            return 1;
                        }

                        if (prop1 > prop2) {
                            return -1;
                        }

                        return 0;
                    }
                );
            }
        },

        shuffle: function (arr) {
            /// <summary>
            /// Array Object의 데이터를 랜덤하게 섞습니다.
            /// </summary>
            /// <param name='arr' type='Array'>Array Object 입니다.</param>
            var i = arr.length, j;
            var temp = null;
            while (i--) {
                j = Math.floor((i + 1) * Math.random());
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        },

        lastIndexOf: function (arr, val) {
            var i = arr.length;
            while (i--) {
                if (arr[i] === val) {
                    return i;
                }
            }

            return -1;
        },

        clear: function (arr) {
            /// <summary>
            /// Array Object의 데이터를 초기화합니다.
            /// </summary>
            /// <param name='arr' type='Array'>Array Object 입니다.</param>
            arr.length = 0;
        },

        add: function (arr, val) {
            /// <summary>
            /// Array Object의 데이터를 추가합니다.
            /// </summary>
            /// <param name='val' type='Object'>Array에 추가 할 Object 입니다.</param>
            arr.push(val);
        },

        addAt: function (arr, index, val) {
            /// <summary>
            /// Array Object의 데이터를 추가합니다.
            /// </summary>
            /// <param name='index' type='Integer'>추가하려는 아이템의 Array index 입니다. 총 배열 수보다 지정된 index가 넘을 경우 무시됩니다.</param>
            /// <param name='val' type='Object'>Array에 추가 할 Object 입니다.</param>
            if (arr.length - 1 <= index) {
                arr.splice(index, 0, val);
            }
        },

        remove: function (arr) {
            /// <summary>
            /// Array Object의 마지막 데이터를 삭제합니다.
            /// </summary>
            arr.pop();
        },

        removeAt: function (arr, index) {
            /// <summary>
            /// Array Object의 데이터를 삭제합니다.
            /// </summary>
            /// <param name='index' type='Integer'>삭제하려는 아이템의 Array index 입니다. 지정된 index의 아이템이 없을 경우 무시됩니다.</param>
            if (index <= (arr.length - 1)) {
                arr.splice(index, 1);
            }
        },

        removeID: function (arr, id, val) {
            /// <summary>
            /// Array Object의 데이터를 삭제합니다.
            /// </summary>
            /// <param name='id' type='String'>삭제하려는 아이템의 식별자 입니다</param>
            /// <param name='val' type='String'>삭제하려는 아이템 식별자의 값 입니다</param>
            var itemToFind = arr.find(function (item) { return item[id] == val })
            var idx = arr.indexOf(itemToFind)
            if (idx > -1) {
                arr.splice(idx, 1)
            }
        },

        contains: function (arr, val) {
            /// <summary>
            /// Array Object에 지정된 파라메터의 값이 존재하는지 확인합니다.
            /// </summary>
            /// <param name='arr' type='Array'>Array Object 입니다.</param>
            /// <param name='val' type='String'>파라메터의 값이 존재하는지 확인할 값 입니다.</param>
            /// <returns type='Boolean' />
            for (var i = 0, len = arr.length; i < len; i++) {
                if (arr[i] === val) {
                    return true;
                }
            }

            return false;
        },

        addProp: function (arr, prop, val) {
            /// <summary>
            /// Array Object에 serviceClient 함수 파라메터를 구성합니다.
            /// </summary>
            /// <param name='arr' type='Array'>Array Object 입니다.</param>
            /// <param name='prop' type='String'>prop 식별자입니다.</param>
            /// <param name='val' type='String'>값 입니다.</param>
            arr.push({ 'prop': prop, 'val': val });
        },

        union: function (sourceArray, targetArray) {
            /// <summary>
            /// Array number에 합집합 결과를 반환합니다
            /// </summary>
            /// <param name='sourceArray' type='Array'>합집합 기준 Array</param>
            /// <param name='targetArray' type='String'>병합 대상 Array</param>
            /// <param name='val' type='Array'>결과 Array</param>
            var result = [];
            var temp = {}
            for (var i = 0; i < sourceArray.length; i++) {
                temp[sourceArray[i]] = 1;
            }

            for (var i = 0; i < targetArray.length; i++) {
                temp[targetArray[i]] = 1;

            }

            for (var k in temp) {
                result.push(k)
            };
            return result;
        },

        difference: function (sourceArray, targetArray) {
            /// <summary>
            /// Array number에 차집합 결과를 반환합니다
            /// </summary>
            /// <param name='sourceArray' type='Array'>차집합 기준 Array</param>
            /// <param name='targetArray' type='String'>병합 대상 Array</param>
            /// <param name='val' type='Array'>결과 Array</param>
            return sourceArray.filter(function (x) {
                return !targetArray.includes(x);
            });
        },

        intersection: function (sourceArray, targetArray) {
            /// <summary>
            /// Array number에 교집합 결과를 반환합니다
            /// </summary>
            /// <param name='sourceArray' type='Array'>교집합 기준 Array</param>
            /// <param name='targetArray' type='String'>병합 대상 Array</param>
            /// <param name='val' type='Array'>결과 Array</param>
            return sourceArray.filter(function (x) {
                return targetArray.includes(x);
            });
        },

        symmetryDifference: function (sourceArray, targetArray) {
            /// <summary>
            /// Array number에 대칭차 결과를 반환합니다
            /// </summary>
            /// <param name='sourceArray' type='Array'>대칭차 기준 Array</param>
            /// <param name='targetArray' type='String'>병합 대상 Array</param>
            /// <param name='val' type='Array'>결과 Array</param>
            return sourceArray.filter(function (x) {
                return !targetArray.includes(x);
            }).concat(targetArray.filter(function (x) {
                return !sourceArray.includes(x);
            }));
        },

        getValue: function (items, parameterName, defaultValue, parameterProperty, valueProperty) {
            var result = null;

            if (items && items.length > 0) {
                var parseParameter = null;
                if (parameterProperty) {
                    parseParameter = items.find(function (item) { return item[parameterProperty] == parameterName; });
                }
                else {
                    parseParameter = items.find(function (item) { return item.ParameterName == parameterName; });
                }

                if (parseParameter) {
                    if (valueProperty) {
                        result = parseParameter[valueProperty];
                    }
                    else {
                        result = parseParameter.Value;
                    }
                }
                else {
                    if (defaultValue === undefined) {
                        result = '';
                    }
                    else {
                        result = defaultValue;
                    }
                }
            }

            return result;
        }
    });
    context.$array = qaf.lib.$array = $array;

    $number.extend({
        version: '1.0',

        duration: function (ms) {
            if (ms < 0) ms = -ms;
            var time = {
                year: 0,
                week: 0,
                day: Math.floor(ms / 86400000),
                hour: Math.floor(ms / 3600000) % 24,
                minute: Math.floor(ms / 60000) % 60,
                second: Math.floor(ms / 1000) % 60,
                millisecond: Math.floor(ms) % 1000
            };

            if (time.day > 365) {
                time.year = time.day % 365;
                time.day = Math.floor(time.day / 365);
            }

            if (time.day > 7) {
                time.week = time.day % 7;
                time.day = Math.floor(time.day / 7);
            }

            return time;
        },

        toByte: function (num, precision, addSpace) {
            /// <summary>
            /// 숫자값을 바이트 표기법으로 반환합니다
            /// </summary>
            /// qaf.lib.$number.toByte(123456789, 3, false)
            /// <param name='num' type='Number'>Number Object 입니다.</param>
            /// <param name='precision' type='Number'>표현 자리수입니다. 기본값 3자리</param>
            /// <param name='addSpace' type='Boolean'>표기법 사이에 공백을 추가합니다</param>
            /// <returns type='String' />
            if (precision === void 0) {
                precision = 3;
            }

            if (addSpace === void 0) {
                addSpace = true;
            }

            var units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            if (Math.abs(num) < 1) return num + (addSpace ? ' ' : '') + units[0];
            var exponent = Math.min(Math.floor(Math.log10(num < 0 ? -num : num) / 3), units.length - 1);
            var n = Number(((num < 0 ? -num : num) / Math.pow(1024, exponent)).toPrecision(precision));
            return (num < 0 ? '-' : '') + n + (addSpace ? ' ' : '') + units[exponent];
        },

        isRange: function (num, low, high) {
            /// <summary>
            /// 숫자값이 지정된 범위내에 있는 값인지 확인합니다.
            /// </summary>
            /// <param name='num' type='Number'>Number Object 입니다.</param>
            /// <returns type='Boolean' />
            return num >= low && num <= high;
        },

        limit: function (num, low, high) {
            /// <summary>
            /// 숫자값을 지정된 범위내에 있는 값으로 조정합니다.
            /// </summary>
            /// <param name='num' type='Number'>Number Object 입니다.</param>
            /// <returns type='Boolean' />
            return num < low ? low : (num > high ? high : num);
        },

        limitAbove: function (num, high) {
            /// <summary>
            /// 숫자값을 지정된 상한 범위내에 있는 값으로 조정합니다.
            /// </summary>
            /// <param name='num' type='Number'>Number Object 입니다.</param>
            /// <returns type='Number' />
            return Math.min(high, num);
        },

        limitBelow: function (num, low) {
            /// <summary>
            /// 숫자값을 지정된 하한 범위내에 있는 값으로 조정합니다.
            /// </summary>
            /// <param name='num' type='Number'>Number Object 입니다.</param>
            /// <returns type='Number' />
            return Math.max(low, this);
        },

        mod: function (num, val) {
            /// <summary>
            /// 숫자값에서 지정된 값으로 나누고 난 후의 나머지값을 반환합니다.
            /// </summary>
            /// <param name='num' type='Number'>Number Object 입니다.</param>
            /// <returns type='Number' />
            return num >= 0 ? num % val : (num % val + Math.abs(val)) % val;
        },

        percent: function (num, val, precision) {
            /// <summary>
            /// 숫자값이 지정된 값을 기준으로 100%중 몇 %인지 반환합니다. precision(기본값 0)값에 따라 소수점 반올림 자리수를 지정합니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;alert(10.9.percent(100.5, 1)); // 10
            /// &#10;alert(10.9.percent(100.5, 1)); // 10.9
            /// </summary>
            /// <param name='num' type='Number'>Number Object 입니다.</param>
            /// <param name='val' type='Number'>퍼센트를 계산하기 위한 기준값입니다.</param>
            /// <param name='precision' type='Number'>기준값이 100%중에 차지하는 비율(%)입니다.</param>
            /// <returns type='Number' />
            var precision = precision || 0;
            var result = Math.pow(10, precision);

            return Math.round((num * 100 / val) * result) / result;
        }
    });
    context.$number = qaf.lib.$number = $number;

    $object.extend({
        version: '1.0',

        toCSV: function (obj, opt) {
            /// <summary>
            /// JSON 객체의 데이터 배열을 CSV 문자열로 변환합니다
            /// </summary>
            /// <code>toCSV([{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }], ['a', 'b'], ';');</code>
            /// <param name='arr' type='Array'>JSON 객체의 데이터 배열입니다</param>
            /// <param name='columns' type='Array'>변환할 CSV 컬럼ID의 데이터 배열입니다</param>
            /// <param name='delimiter' type='String'>CSV 구분자입니다</param>
            /// <returns type='String' />
            if (typeof obj !== 'object') return null;
            opt = opt || {};
            var scopechar = opt.scopechar || '/';
            var delimeter = opt.delimeter || ',';
            var newline = opt.newline || '\n';
            if (Array.isArray(obj) === false) obj = [obj];
            var curs, name, i, key, queue, values = [], rows = [], headers = {}, headersArr = [];
            for (i = 0; i < obj.length; i++) {
                queue = [obj[i], ''];
                rows[i] = {};
                while (queue.length > 0) {
                    name = queue.pop();
                    curs = queue.pop();
                    if (curs !== null && typeof curs === 'object') {
                        for (key in curs) {
                            if (curs.hasOwnProperty(key)) {
                                queue.push(curs[key]);
                                queue.push(name + (name ? scopechar : '') + key);
                            }
                        }
                    } else {
                        if (headers[name] === undefined) headers[name] = true;
                        rows[i][name] = curs;
                    }
                }
                values[i] = [];
            }

            for (key in headers) {
                if (headers.hasOwnProperty(key)) {
                    headersArr.push(key);
                    for (i = 0; i < obj.length; i++) {
                        values[i].push(rows[i][key] === undefined
                            ? ''
                            : rows[i][key]);
                    }
                }
            }
            for (i = 0; i < obj.length; i++) {
                values[i] = values[i].join(delimeter);
            }
            return headersArr.join(delimeter) + newline + values.join(newline);
        },

        toParameterString: function (jsonObject) {
            return jsonObject ? Object.entries(jsonObject).reduce(function (queryString, _ref, index) {
                var key = _ref[0],
                    val = _ref[1];
                if (key.indexOf('@') == -1) {
                    queryString += typeof val === 'string' ? '@' + key + ":" + val + ';' : '';
                }
                return queryString;
            }, '') : '';
        }
    });
    context.$object = qaf.lib.$object = $object;
})(globalThis);
/// <reference path='qaf.core.js' />

/// <summary>
/// 업무 화면에 적합한 범용적인 기능을 제공하는 모듈입니다.
/// </summary>
(function (context) {
    'use strict';
    var $library = $library || new baseCore();
    var document = null;
    if (isNodejs == true) {
    }
    else {
        document = window.document;

        (function () {
            if (typeof context.CustomEvent !== 'function') {
                var CustomEvent = function (event, params) {
                    params = params || { bubbles: false, cancelable: false, detail: undefined };
                    var evt = document.createEvent('CustomEvent');
                    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                    return evt;
                }

                CustomEvent.prototype = context.Event.prototype;
                context.CustomEvent = CustomEvent;
            }

            context['events'] = function () {
                /// <summary>
                /// onevent에서 적용된 모든 이벤트 핸들러를 관리하는 전역 객체입니다. 
                /// 메모리 누수 방지를 위해 context.unload 이벤트시 연결되어진 모든 이벤트 핸들러를 자동으로 제거합니다.
                /// </summary>
                var items = [];

                return {
                    items: items,
                    add: function (el, eventName, handler) {
                        items.push(arguments);
                    },
                    remove: function (el, eventName, handler) {
                        var i = items.indexOf(arguments);
                        if (i > -1) {
                            delete items[i];
                        }
                    },
                    flush: function () {
                        var i, item;
                        for (i = items.length - 1; i >= 0; i = i - 1) {
                            item = items[i];
                            if (item[0].removeEventListener) {
                                item[0].removeEventListener(item[1], item[2], item[3]);
                            }
                            if (item[1].substring(0, 2) != 'on') {
                                item[1] = 'on' + item[1];
                            }
                            if (item[0].detachEvent) {
                                item[0].detachEvent(item[1], item[2]);
                            }
                            item[0][item[1]] = null;
                        }

                        purge(document.body);
                    }
                }
            }();
        })();
    }

    $library.extend({
        version: '1.0',
        prefixs: ['webkit', 'moz', 'ms', 'o', ''],

        eventMap: {
            // 'mousedown': 'touchstart',
            // 'mouseup': 'touchend',
            // 'mousemove': 'touchmove'
        },

        guid: function () {
            /// <summary>
            /// 유일키 식별자 GUID 문자열을 생성합니다.
            /// </summary>
            /// $l.guid()
            /// <returns type='String' />
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },

        uuid: function () {
            /// <summary>
            /// 유일키 식별자 UUID 문자열을 생성합니다
            /// </summary>
            /// $l.uuid()
            /// <returns type='String' />
            return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
                return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
            });
        },

        stringToArrayBuffer: function (value, isTwoByte) {
            var bufferCount = 1;
            if (isTwoByte && isTwoByte === true) {
                bufferCount = 2;
            }

            var result = new ArrayBuffer(value.length * bufferCount);
            var bufView = new Uint8Array(result);
            for (var i = 0, strLen = value.length; i < strLen; i++) {
                bufView[i] = value.charCodeAt(i);
            }
            return result;
        },

        arrayBufferToString: function (buffer) {
            var arrayBuffer = new Uint8Array(buffer);
            var s = String.fromCharCode.apply(null, arrayBuffer);
            return decodeURIComponent(s);
        },

        random: function (len) {
            /// <summary>
            /// 지정한 자리수 만큼의 랜덤 문자열을 생성합니다. 기본 8자리입니다.
            /// </summary>
            /// <param name='len' type='Number'></param>
            /// <returns type='String' />
            var len = len || 8;
            var val = '';

            while (val.length < len) {
                val += Math.random().toString(36).substr(2);
            }

            return val.substr(0, len);
        },

        execPrefixFunc: function (el, func) {
            /// <summary>
            /// HTML5 API에서 각 벤더사에 지정된 html 객체에 이벤트 핸들러를 실행합니다.
            /// </summary>
            /// <param name='el' domElement='true' optional='true'>이벤트 핸들러를 설정할 HTML Element입니다.</param>
            /// <param name='func' type='Function'>이벤트 발생시 처리할 함수 객체입니다.</param>
            var prefixs = $l.prefixs;
            var i = 0, m, t;
            while (i < prefixs.length && !el[m]) {
                m = func;
                if (prefixs[i] == '') {
                    m = m.substr(0, 1).toLowerCase() + m.substr(1);
                }
                m = prefixs[i] + m;
                t = typeof el[m];
                if (t != 'undefined') {
                    prefixs = [prefixs[i]];
                    return (t == 'function' ? el[m]() : el[m]);
                }
                i++;
            }
        },

        dispatchClick: function (el, options) {
            /// <summary>
            /// html 객체에 마우스 클릭 이벤트 핸들러를 실행합니다.
            /// </summary>
            /// <param name='el' domElement='true' optional='true'>이벤트 핸들러를 설정할 HTML Element입니다.</param>
            try {
                el = $ref.isString(el) == true ? $l.get(el) : el;
                options = $w.argumentsExtend({
                    canBubble: true,
                    cancelable: true,
                    view: window,
                    detail: 0,
                    screenX: 0,
                    screenY: 0,
                    clientX: 80,
                    clientY: 20,
                    ctrlKey: false,
                    altKey: false,
                    shiftKey: false,
                    metaKey: false,
                    button: 0,
                    relatedTarget: null
                }, options);

                var evt = document.createEvent('MouseEvents');

                // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/initMouseEvent
                evt.initMouseEvent('click', options.canBubble, options.cancelable, options.view, options.detail, options.screenX, options.screenY, options.clientX, options.clientY, options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, options.relatedTarget);
                el.dispatchEvent(evt);
            } catch (error) {
                $l.eventLog('$l.dispatchClick', error, 'Warning');
            }
        },

        addEvent: function (el, type, func) {
            /// <summary>
            /// 지정된 html 객체에 이벤트 핸들러를 설정합니다.
            /// </summary>
            /// <param name='el' domElement='true' optional='true'>이벤트 핸들러를 설정할 HTML Element입니다.</param>
            /// <param name='type' type='String'>'on' 접두어는 사용하지 않는, 이벤트 명입니다. 참고 : http://www.w3schools.com/html5/html5_ref_eventattributes.asp</param>
            /// <param name='func' type='Function'>이벤트 발생시 처리할 함수 객체입니다.</param>
            el = $ref.isString(el) == true ? $l.get(el) : el;

            if (func && $reflection.isFunction(func) == true) {
                if (el.addEventListener) {
                    el.addEventListener(type, func, false);
                }
                else if (el.attachEvent) {
                    el.attachEvent('on' + type, func);
                }
                else {
                    el['on' + type] = el['e' + type + func];
                }

                events.add(el, type, func);

                if ($reflection.isString(type) == true && type.toLowerCase() === 'resize') {
                    func();
                }
            }
        },

        /// <summary>
        /// 지정된 html 객체에 이벤트 핸들러를 설정합니다.
        /// </summary>
        ///	<param name='target' type='Object'>이벤트 핸들러를 설정할 Html Element입니다.</param>
        ///	<param name='type' type='String'>이벤트 명입니다.</param>
        ///	<param name='fn' type='Function'>이벤트 핸들러 함수 객체입니다.</param>
        addLive: function (target, type, fn) {
            $library.addEvent(context || document, type, function (e) {
                var found, el = e.target || e.srcElement;
                while (el && !(found = el.id == target.id)) {
                    el = el.parentElement;
                }

                if (found) {
                    fn.call(el, e);
                }
            });

            return target;
        },

        removeEvent: function (el, type, func) {
            /// <summary>
            /// 지정된 html 객체에 이벤트 핸들러를 제거합니다.
            /// </summary>
            /// <param name='el' domElement='true' optional='true'>이벤트 핸들러를 설정할 HTML Element입니다.</param>
            /// <param name='type' type='String'>'on' 접두어는 사용하지 않는, 이벤트 명입니다. 참고 : http://www.w3schools.com/html5/html5_ref_eventattributes.asp</param>
            /// <param name='func' type='Function'>이벤트 발생시 처리할 함수 객체입니다.</param>
            if (func && $reflection.isFunction(func) == true) {
                el = $ref.isString(el) == true ? $l.get(el) : el;
                if (el.removeEventListener) {
                    el.removeEventListener(type, func, false);
                }
                else if (el.detachEvent) {
                    el.detachEvent('on' + type, func);
                }
                else {
                    el['on' + type] = null;
                }

                events.remove(el, type, func);
            }
        },

        hasEvent: function (el, type) {
            /// <summary>
            /// 지정된 html 객체에 이벤트 핸들러가 있는지 확인합니다.
            /// </summary>
            /// <param name='el' domElement='true' optional='true'>이벤트 핸들러를 설정할 HTML Element입니다.</param>
            /// <param name='type' type='String'>'on' 접두어는 사용하지 않는, 이벤트 명입니다. 참고 : http://www.w3schools.com/html5/html5_ref_eventattributes.asp</param>
            var item = null;
            var result = false;
            el = $ref.isString(el) == true ? $l.get(el) : el;
            for (var i = 0, len = events.items.length; i < len; i++) {
                item = events.items[i];

                if (item && item[0] instanceof context.constructor || item[0] instanceof document.constructor) {
                    if (item[1] == type) {
                        result = true;
                        break;
                    }
                }
                else {
                    if (item && item[0].id) {
                        if (item[0].id == el.id && item[1] == type) {
                            result = true;
                            break;
                        }
                    }
                }
            }

            return result;
        },

        trigger: function (el, type, value) {
            /// <summary>
            /// 지정된 html 객체에 선언된 이벤트 핸들러를 실행합니다.
            /// </summary>
            /// <param name='el' domElement='true' optional='true'>이벤트 핸들러를 설정할 HTML Element입니다.</param>
            /// <param name='type' type='String'>'on' 접두어는 사용하지 않는, 이벤트 명입니다. 참고 : http://www.w3schools.com/html5/html5_ref_eventattributes.asp</param>
            var item = null;
            var action = null;
            el = $ref.isString(el) == true ? $l.get(el) : el;

            for (var i = 0, len = events.items.length; i < len; i++) {
                item = events.items[i];

                if (item[0] instanceof context.constructor || item[0] instanceof document.constructor) {
                    if (item[1] == type) {
                        action = item[2];
                        break;
                    }
                }
                else {
                    if (item[0].id) {
                        if (item[0].id == el.id && item[1] == type) {
                            action = item[2];
                            break;
                        }
                    }
                }
            }

            if (action) {
                if (value) {
                    action.call(el, value);
                }
                else {
                    action.call(el);
                }
            }

            return this;
        },

        /// <summary>
        /// 지정된 html 객체에 이벤트 핸들러를 실행합니다.
        /// </summary>
        ///	<param name='el' type='Object'>이벤트 핸들러를 설정할 Html Element입니다.</param>
        ///	<param name='type' type='String'>이벤트 명입니다.</param>
        triggerEvent: function (el, type, customData) {
            el = $ref.isString(el) == true ? $l.get(el) : el;

            if (context.CustomEvent) {
                if (customData) {
                    el.dispatchEvent(new CustomEvent(type, { detail: customData }));
                }
                else {
                    el.dispatchEvent(new CustomEvent(type));
                }
            }
            else if (document.createEvent) {
                var evt = document.createEvent('HTMLEvents');
                evt.initEvent(type, false, true);

                if (customData) {
                    el.dispatchEvent(evt, customData);
                }
                else {
                    el.dispatchEvent(evt);
                }
            }
            else if (el.fireEvent) {
                var evt = document.createEventObject();
                evt.eventType = type;
                if (customData) {
                    el.fireEvent('on' + evt.eventType, customData);
                }
                else {
                    el.fireEvent('on' + evt.eventType);
                }
            }

            return el;
        },

        addBind: function (query, type, func) {
            /// <summary>
            /// querySelector 조건에 맞는 모든 html 객체에 이벤트 핸들러를 설정합니다.
            /// </summary>
            /// <param name='query' type='String'>이벤트 핸들러를 설정할 querySelector입니다.</param>
            /// <param name='type' type='String'>'on' 접두어는 사용하지 않는, 이벤트 명입니다. 참고 : http://www.w3schools.com/html5/html5_ref_eventattributes.asp</param>
            /// <param name='func' type='Function'>이벤트 발생시 처리할 함수 객체입니다.</param>
            if (func && $reflection.isFunction(func) == true) {
                var items = document.querySelectorAll(query);
                var length = items.length;
                for (var i = 0; i < length; i++) {
                    var el = items[i];
                    $l.addEvent(el, type, func);
                }
            }
        },

        createEventHub: function () {
            /// <summary>
            /// pub/sub 이벤트 허브를 제공하는 객체를 생성합니다
            /// </summary>
            /// var hub = $l.createEventHub();
            /// hub.on('message', function () {
            ///     return console.log('Message event fired' + arguments[0].data);
            /// });
            /// hub.emit('message', {data: 'helloworld'});
            /// <returns type='Object'></returns>
            return {
                hub: Object.create(null),
                emit: function emit(event, data) {
                    (this.hub[event] || []).forEach(function (handler) {
                        return handler(data);
                    });
                },
                on: function on(event, handler) {
                    if (!this.hub[event]) this.hub[event] = [];
                    this.hub[event].push(handler);
                },
                off: function off(event, handler) {
                    var i = (this.hub[event] || []).findIndex(function (h) {
                        return h === handler;
                    });
                    if (i > -1) this.hub[event].splice(i, 1);
                    if (this.hub[event].length === 0) delete this.hub[event];
                }
            };
        },

        get: function () {
            /// <summary>
            /// document.getElementById 함수의 확장으로 다수의 HTML Element를 조회합니다.
            /// </summary>
            /// <param name='el' type='String' optional='true' mayBeNull='true'>HTML Element 식별자 컬렉션입니다.</param>
            /// <returns type='HTML Elements' domElement='true'></returns>
            var result = [];
            var find = null;
            var eid = '';

            for (var i = 0, len = arguments.length; i < len; i++) {
                eid = arguments[i];

                if ($reflection.isString(eid) == true) {
                    find = document.getElementById(eid);
                }

                result.push(find);
            }

            if (result.length == 1) {
                return find;
            }
            else {
                return result;
            }
        },

        /// <summary>
        /// document.querySelector 함수의 확장으로 다수의 Html Element를 조회합니다.
        /// </summary>
        ///	<param name='params arguments' type='Object'>Html Element 식별자입니다.</param>
        querySelector: function () {
            /// <summary>
            /// document.querySelector 함수의 확장으로 다수의 HTML Element를 조회합니다.
            /// </summary>
            /// <param name='arguments' type='String' optional='true'>querySelector 식입니다.</param>
            /// <returns type='HTML Elements' domElement='true'></returns>
            var result = [];
            var find = null;
            var query = '';

            for (var i = 0, len = arguments.length; i < len; i++) {
                query = arguments[i];

                if (typeof query == 'string') {
                    find = document.querySelector(query);
                }

                result.push(find);
            }

            if (result.length == 1) {
                return find;
            }
            else {
                return result;
            }
        },

        getName: function () {
            /// <summary>
            /// document.getElementsByTagName 함수의 확장으로 다수의 HTML Element를 조회합니다.
            /// </summary>
            /// <param name='arguments' type='String' optional='true'>HTML Element 태그명입니다.</param>
            /// <returns type='HTML Elements' domElement='true'></returns>
            var result = [];
            var els = [];
            var tag = '';

            for (var i = 0, len = arguments.length; i < len; i++) {
                tag = arguments[i];

                if (typeof tag == 'string') {
                    els = document.getElementsByTagName(tag);
                }

                for (var find in els) {
                    if (typeof els[find] == 'object') {
                        result.push(els[find]);
                    }
                }
            }

            if (result.length == 1) {
                return els;
            }
            else {
                return result;
            }
        },

        querySelectorAll: function () {
            /// <summary>
            /// document.querySelectorAll 함수의 확장으로 다수의 HTML Element를 조회합니다.
            /// </summary>
            /// <param name='arguments' type='String' optional='true'>querySelector 식입니다.</param>
            /// <returns type='HTML Elements' domElement='true'></returns>
            var result = [];
            var els = [];
            var query = '';

            for (var i = 0, len = arguments.length; i < len; i++) {
                query = arguments[i];

                if (typeof query == 'string') {
                    els = document.querySelectorAll(query);
                }

                for (var find in els) {
                    if (typeof els[find] == 'object') {
                        result.push(els[find]);
                    }
                }
            }

            query = null;

            if (result.length == 1) {
                return els;
            }
            else {
                return result;
            }
        },

        /// <summary>
        /// document.getElementById 함수의 확장으로 다수의 Html Element를 조회합니다.
        /// </summary>
        ///	<param name='params arguments' type='Object'>Html Element 식별자입니다.</param>
        getElementsById: function () {
            var result = [];
            var find = null;
            var el = '';

            for (var i = 0; i < arguments.length; i++) {
                el = arguments[i];

                if (typeof el == 'string') {
                    find = document.getElementById(el);
                }

                if (arguments.length == 1) {
                    return find;
                }

                result.push(find);
            }

            return result;
        },

        /// <summary>
        /// document.getElementsByClassName 함수의 확장으로 다수의 Html Element를 조회합니다.
        /// </summary>
        ///	<param name='params arguments' type='Object'>Html Element 식별자입니다.</param>
        getElementsByClassName: function () {
            var result = [];
            var find = null;
            var el = '';

            for (var i = 0; i < arguments.length; i++) {
                el = arguments[i];

                if (typeof el == 'string') {
                    find = document.getElementsByClassName(el);
                }

                if (arguments.length == 1) {
                    return find;
                }

                for (var i = 0; i < find.length; i++) {
                    result.push(find[i]);
                }
            }

            return result;
        },

        /// <summary>
        /// document.getElementsByTagName 함수의 확장으로 다수의 Html Element를 조회합니다.
        /// </summary>
        ///	<param name='params arguments' type='Object'>Html Element 식별자입니다.</param>
        getElementsByTagName: function () {
            var result = [];
            var elements = [];
            var el = '';

            for (var i = 0; i < arguments.length; i++) {
                el = arguments[i];

                if (typeof el == 'string') {
                    elements = document.getElementsByTagName(el);
                }

                if (arguments.length == 1) {
                    return elements;
                }

                for (var find in elements) {
                    if (typeof elements[find] == 'object') {
                        result.push(elements[find]);
                    }
                }
            }
            return result;
        },

        /// <summary>
        /// 객체의 사본을 반환합니다.
        /// </summary>
        ///	<returns type='Object' />
        clone: function (target) {
            function T() { }
            T.prototype = target;
            return new T;
        },

        /// <summary>
        /// 객체에 메서드를 동적으로 추가합니다.
        /// </summary>
        ///	<returns type='Object' />
        method: function (target, id, fn) {
            target.prototype[id] = fn;
            return this;
        },

        /// <summary>
        /// 열거자 텍스트를 반환합니다
        /// </summary>
        ///	<returns type='Object' />
        toEnumText: function (enumObject, value) {
            var text = null;
            for (var k in enumObject) {
                if (enumObject[k] == value) {
                    text = k;
                    break;
                }
            }
            return text;
        },

        /// <summary>
        /// JSON 객체를 pretty한 문자열로 반환합니다
        /// </summary>
        ///	<returns type='Object' />
        prettyJSON: function (json, isHtml) {
            if (isHtml === true) {
                if (typeof json != 'string') {
                    json = JSON.stringify(json, undefined, 2);
                }
                json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                    var cls = 'number';
                    if (/^"/.test(match)) {
                        if (/:$/.test(match)) {
                            cls = 'key';
                        } else {
                            cls = 'string';
                        }
                    } else if (/true|false/.test(match)) {
                        cls = 'boolean';
                    } else if (/null/.test(match)) {
                        cls = 'null';
                    }
                    return '<span class="' + cls + '">' + match + '</span>';
                });
            }
            else {
                return JSON.stringify(json, null, 2);
            }
        },

        prettyTSD: function (tsd, isString) {
            var result = null;
            isString = isString == undefined ? false : isString;
            try {
                var RES_DAT = tsd.split('＾');
                if (RES_DAT.length > 1) {
                    var meta = $string.toParameterObject(RES_DAT[0]);
                    result = $string.toJSON(RES_DAT[1], { delimeter: '｜', newline: '↵', meta: meta });
                }
                else {
                    result = $string.toJSON(RES_DAT[0], { delimeter: '｜', newline: '↵' });
                }
            } catch (error) {
                result = error;
            }

            return isString == true ? result : $l.prettyJSON(result);
        },

        text2Json: function (data, delimiter, newLine) {
            // $l.text2Json('AAA,BBB,CCC\n111,222,333\n444,555,666')
            if (delimiter == undefined) {
                delimiter = ',';
            }

            if (newLine == undefined) {
                newLine = '\n';
            }

            var titles = data.slice(0, data.indexOf(newLine)).split(delimiter);
            return data
                .slice(data.indexOf(newLine) + 1)
                .split(newLine)
                .map(function (v) {
                    var values = v.split(delimiter);
                    return titles.reduce(function (obj, title, index) {
                        return (obj[title] = values[index]), obj;
                    }, {});
                });
        },

        json2Text: function (arr, columns, delimiter, newLine) {
            // $l.json2Text($l.text2Json('AAA,BBB,CCC\n111,222,333\n444,555,666'), ['AAA','BBB','CCC'])
            function _toConsumableArray(arr) {
                return (
                    _arrayWithoutHoles(arr) ||
                    _iterableToArray(arr) ||
                    _unsupportedIterableToArray(arr) ||
                    _nonIterableSpread()
                );
            }

            function _nonIterableSpread() {
                throw new TypeError('유효하지 않은 데이터 타입');
            }

            function _unsupportedIterableToArray(o, minLen) {
                if (!o) return;
                if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
                var n = Object.prototype.toString.call(o).slice(8, -1);
                if (n === 'Object' && o.constructor) n = o.constructor.name;
                if (n === 'Map' || n === 'Set') return Array.from(o);
                if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                    return _arrayLikeToArray(o, minLen);
            }

            function _iterableToArray(iter) {
                if (typeof Symbol !== 'undefined' && Symbol.iterator in Object(iter))
                    return Array.from(iter);
            }

            function _arrayWithoutHoles(arr) {
                if (Array.isArray(arr)) return _arrayLikeToArray(arr);
            }

            function _arrayLikeToArray(arr, len) {
                if (len == null || len > arr.length) len = arr.length;
                for (var i = 0, arr2 = new Array(len); i < len; i++) {
                    arr2[i] = arr[i];
                }
                return arr2;
            }

            if (delimiter == delimiter) {
                delimiter = ',';
            }

            if (newLine == undefined) {
                newLine = '\n';
            }

            return [columns.join(delimiter)]
                .concat(
                    _toConsumableArray(
                        arr.map(function (obj) {
                            return columns.reduce(function (acc, key) {
                                return ''
                                    .concat(acc)
                                    .concat(!acc.length ? '' : delimiter, '"')
                                    .concat(!obj[key] ? '' : obj[key], '"');
                            }, '');
                        })
                    )
                )
                .join(newLine);
        },

        nested2Flat: function (data, itemID, parentItemID, childrenID) {
            var result = [];

            if (data) {
                if (childrenID == null || childrenID == undefined) {
                    childrenID = 'items';
                }

                var root = $ref.clone(data, false);
                delete root[childrenID];
                root[parentItemID] = null;
                result.push(root);

                $l.parseNested2Flat(data, result, itemID, parentItemID, childrenID);
            }
            else {
                $l.eventLog('$l.nested2Flat', '필수 데이터 확인 필요', 'Warning');
            }

            return result;
        },

        parseNested2Flat: function (data, newData, itemID, parentItemID, childrenID) {
            var result = null;

            var items = data[childrenID];
            if (data && items) {
                if (childrenID == null || childrenID == undefined) {
                    childrenID = 'items';
                }

                for (var i = 0; i < items.length; i++) {
                    var item = items[i];

                    var cloneItem = $ref.clone(item, false);
                    delete cloneItem[childrenID];
                    cloneItem[parentItemID] = data[itemID];

                    newData.push(cloneItem);

                    if (item[childrenID] && item[childrenID].length > 0) {
                        $l.parseNested2Flat(item, newData, itemID, parentItemID, childrenID);
                    }
                }
            }

            return result;
        },

        flat2Nested: function (data, itemID, parentItemID, childrenID) {
            var result = null;

            if (data && itemID && parentItemID) {
                if (childrenID == null || childrenID == undefined) {
                    childrenID = 'items';
                }

                var root = data.find(function (item) { return item[parentItemID] == null });
                var json = $l.parseFlat2Nested(data, root, [], itemID, parentItemID, childrenID);
                root[childrenID] = json[childrenID];
                result = root;
            }
            else {
                $l.eventLog('$l.flat2Nested', '필수 데이터 확인 필요', 'Warning');
            }

            return result;
        },

        parseFlat2Nested: function (data, root, newData, itemID, parentItemID, childrenID) {
            if (childrenID == null || childrenID == undefined) {
                childrenID = 'items';
            }

            var child = data.filter(function (item) { return item[parentItemID] == root[itemID] });
            if (child.length > 0) {
                if (!newData[childrenID]) {
                    newData[childrenID] = [];
                }
                for (var i = 0; i < child.length; i++) {
                    newData[childrenID].push($ref.clone(child[i]));
                    $l.parseFlat2Nested(data, child[i], newData[childrenID][i], itemID, parentItemID, childrenID);
                }
            }
            return newData;
        },

        findNestedByID: function (data, findID, itemID, childrenID) {
            var result = null;

            var items = data[childrenID];
            if (data && items) {
                if (childrenID == null || childrenID == undefined) {
                    childrenID = 'items';
                }

                if (data[itemID] == findID) {
                    result = data;

                    return result;
                }

                for (var i = 0; i < items.length; i++) {
                    var item = items[i];

                    if (item[itemID] == findID) {
                        result = item;

                        return result;
                    }
                    else if (item[childrenID] && item[childrenID].length > 0) {
                        result = $l.findNestedByID(item, findID, itemID, childrenID);

                        if (result) {
                            return result;
                        }
                    }
                }
            }

            return result;
        },

        /// <summary>
        /// fromObject객체의 모든 prototype 정보를 toObject객체에 복사합니다.
        /// </summary>
        ///	<param name='toObject' type='Object'>Html Element 식별자입니다.</param>
        ///	<param name='fromObject' type='Object'>Html Element 식별자입니다.</param>
        extend: function (toObject, fromObject) {
            if (arguments[2]) {
                for (var i = 2, len = arguments.length; i < len; i++) {
                    toObject.prototype[arguments[i]] = fromObject.prototype[arguments[i]];
                }
            }
            else {
                for (var fn in fromObject.prototype) {
                    if (!toObject.prototype[fn]) {
                        toObject.prototype[fn] = fromObject.prototype[fn];
                    }
                }
            }
            return this;
        },

        logLevel: new function () {
            /// <summary>
            /// 로그 구분
            /// </summary>
            this.Verbose = 0;
            this.Debug = 1;
            this.Information = 2;
            this.Warning = 3;
            this.Error = 4;
            this.Fatal = 5;
        },

        start: (new Date()).getTime(),
        eventLogTimer: null,
        eventLogCount: 0,
        eventLog: function (event, data, logLevel) {
            var message = typeof data == 'object' ? data.message : data;
            var stack = typeof data == 'object' ? data.stack : data;
            if (logLevel) {
                if (qaf.$reflection.isString(logLevel) == true) {
                    logLevel = $l.logLevel[logLevel];
                }
            }
            else {
                logLevel = 0;
            }

            if (qaf.Config && qaf.Config.UIEventLogLevel) {
                if ($l.logLevel[qaf.Config.UIEventLogLevel] > logLevel) {
                    return;
                }
            }

            var logLevelText = $l.toEnumText($l.logLevel, logLevel);
            var now = (new Date()).getTime(),
                diff = now - $l.start,
                value, div, text;

            if (isNodejs == true) {
                value = $l.eventLogCount.toString() +
                    '@' + (diff / 1000).toString().format('0.000') +
                    ' [' + event + '] ' + (message === stack ? message : stack);

                switch (logLevelText) {
                    case 'Debug':
                        globalThis.$logger.debug(value);
                        break;
                    case 'Information':
                        globalThis.$logger.info(value);
                        break;
                    case 'Warning':
                        globalThis.$logger.warn(value);
                        break;
                    case 'Error':
                        globalThis.$logger.error(value);
                        break;
                    case 'Fatal':
                        globalThis.$logger.fatal(value);
                        break;
                    default:
                        globalThis.$logger.trace(value);
                        break;
                }
            }
            else {
                value = $l.eventLogCount.toString() +
                    '@' + (diff / 1000).toString().format('0.000') +
                    ' [' + logLevelText + '] ' +
                    '[' + event + '] ' + (message === stack ? message : stack);

                if (context.console) {
                    console.log(value);
                }
                else {
                    div = document.createElement('DIV');
                    text = document.createTextNode(value);

                    div.appendChild(text);

                    var eventlogs = document.getElementById('eventlogs');
                    if (eventlogs) {
                        eventlogs.appendChild(div);

                        clearTimeout($l.eventLogTimer);
                        $l.eventLogTimer = setTimeout(function () {
                            eventlogs.scrollTop = eventlogs.scrollHeight;
                        }, 10);
                    }
                    else {
                        document.body.appendChild(div);
                    }
                }

                if (context.bound) {
                    bound.browserEvent('browser', {
                        ID: 'EventLog',
                        Data: value
                    }, function (error, json) {
                        if (error) {
                            console.log('browser EventLog - {0}'.format(error));
                        }
                    });
                }
            }

            $l.eventLogCount++;
        },
        moduleEventLog: function (moduleID, event, data, logLevel) {
            var message = typeof data == 'object' ? data.message : data;
            var stack = typeof data == 'object' ? data.stack : data;
            if (logLevel) {
                if (qaf.$reflection.isString(logLevel) == true) {
                    logLevel = $l.logLevel[logLevel];
                }
            }
            else {
                logLevel = 0;
            }

            if (qaf.Config && qaf.Config.UIEventLogLevel) {
                if ($l.logLevel[qaf.Config.UIEventLogLevel] > logLevel) {
                    return;
                }
            }

            var logLevelText = $l.toEnumText($l.logLevel, logLevel);
            var now = (new Date()).getTime(),
                diff = now - $l.start,
                value;

            value = $l.eventLogCount.toString() +
                '@' + (diff / 1000).toString().format('0.000') +
                ' [' + event + '] ' + (message === stack ? message : stack);

            var moduleLibrary = qaf.getModuleLibrary(moduleID);
            if (moduleLibrary) {
                var logger = moduleLibrary.logger;
                switch (logLevelText) {
                    case 'Debug':
                        logger.debug(value);
                        break;
                    case 'Information':
                        logger.info(value);
                        break;
                    case 'Warning':
                        logger.warn(value);
                        break;
                    case 'Error':
                        logger.error(value);
                        break;
                    case 'Fatal':
                        logger.fatal(value);
                        break;
                    default:
                        logger.trace(value);
                        break;
                }
            }
            else {
                console.log('ModuleID 확인 필요 - {0}'.format(moduleID));
            }

            $l.eventLogCount++;
        }
    });

    context.$library = context.$l = qaf.$l = context.$library || $library;
    if (isNodejs == true) {
        delete $l.addEvent;
        delete $l.addLive;
        delete $l.removeEvent;
        delete $l.hasEvent;
        delete $l.trigger;
        delete $l.triggerEvent;
        delete $l.addBind;
        delete $l.get;
        delete $l.querySelector;
        delete $l.getName;
        delete $l.querySelectorAll;
        delete $l.getElementsById;
        delete $l.getElementsByClassName;
        delete $l.getElementsByTagName;
    }
    else {
        delete $l.moduleEventLog;

        context.onevent = $l.addEvent;
        context.bind = $l.addBind;
        context.trigger = $l.trigger;
        /*
        context.$traversing = context.$t = qaf.$t = context.$traversing || $traversing;
        context.get = $traversing.get;
        context.querySelector = $traversing.querySelector;
        context.getName = $traversing.getName;
        context.querySelectorAll = $traversing.querySelectorAll;
        */

        $l.addEvent(context, 'unload', events.flush);

        /*
        function orientation_changed ()
        {
            if ( is_portrait() )
            {
                //do something
            }
            else if ( is_landscape() )
            {
                // do something else
            }
            clearTimeout(context.t);
            delete context.t;
        }

        context.t = undefined;
        context.onorientationchange = function (event)
        {
            context.t = setTimeout('orientation_changed();', 250);
        }

        function is_landscape()
        {
            var uagent = navigator.userAgent.toLowerCase();
            if ( uagent.search('ipad') > -1 )
            {
                var r = ( context.orientation == 90 || context.orientation == -90 );
            }
            else
            {
                var r = ( screen.width > screen.height );
            }
            return r;
        }

        function is_portrait()
        {
            var uagent = navigator.userAgent.toLowerCase();
            if ( uagent.search('ipad') > -1 )
            {
                var r = ( context.orientation == 0 || context.orientation == 180 );
            }
            else
            {
                var r = ( screen.width < screen.height );
            }
            return r;
        }
        */
    }
})(globalThis);
/// <reference path='qaf.library.js' />
/// <reference path='qaf.browser.js' />

/// <summary>
/// 웹 서버에 요청을 보내기 위한 기능을 제공하는 모듈입니다.
/// </summary>
(function (context) {
    'use strict';
    var $request = $request || new baseCore();
    var document = null;
    if (isNodejs == true) {
    }
    else {
        document = window.document;
    }

    $request.extend({
        version: '1.0',

        /// <summary>
        /// get방식으로 웹 서버에 url요청을 보내기 위한 값을 관리하는 배열입니다.
        /// </summary>
        params: [],

        /// <summary>
        /// 요청 페이지의 url주소입니다.(기본값 현재 요청중인 주소)
        /// </summary>
        path: (isNodejs == true) ? '' : location.pathname,

        query: function (param, url) {
            /// <summary>
            /// 요청 페이지의 url주소에서 지정된 키로 값을 조회합니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;$r.params['p1'] = '1';
            /// &#10;$r.params['p2'] = '2';
            /// &#10;$r.params['p3'] = '3';
            /// &#10;alert($r.query('p2')); // 2
            /// </summary>
            /// <param name='param' type='String'>url주소에서 값을 조회할 키입니다.</param>
            /// <param name='url' type='String'>요청 페이지의 url주소입니다.</param>
            /// <returns type='String' />
            if (url === undefined) {
                url = location.href;
            }

            return function (url) {
                var url = url.split('?');
                var query = ((url.length == 1) ? url[0] : url[1]).split('&');
                var keyPair = null;

                for (var i = 0; i < query.length; i++) {
                    keyPair = query[i].split('=');
                    $r.params[keyPair[0]] = keyPair[1];
                }

                url = null;
                query = null;
                keyPair = null;

                return $r.params;
            }(url)[param];
        },

        toQueryString: function (jsonObject) {
            /// <summary>
            /// JSON 객체를 웹 서버에 url요청을 보내기 위한 GET방식의 주소를 반환합니다.
            /// &#10;alert($r.toQuery({ page: '1', size: '2kg', key: undefined }));
            /// </summary>
            /// <returns type='String' />
            return jsonObject ? Object.entries(jsonObject).reduce(function (queryString, _ref, index) {
                var key = _ref[0],
                    val = _ref[1];
                queryString += typeof val === 'string' ? '&' + key + "=" + val : '';
                return queryString;
            }, '') : '';
        },

        toUrlObject: function (url) {
            /// <summary>
            /// url에서 QueryString의 값을 JSON객체로 반환합니다
            /// &#10;alert($r.toUrlObject('http://url.com/page?name=Adam&surname=Smith));
            /// </summary>
            /// <returns type='Object' />
            return (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(function (a, v) {
                return a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a;
            }, {});
        },

        isCorsEnabled: function (url) {
            /// <summary>
            /// url에서 Cors의 여부를 확인합니다
            /// &#10;alert($r.isCorsEnabled('http://url.com/page?name=Adam&surname=Smith));
            /// </summary>
            /// <returns type='Boolean' />
            var xhr = new $w.xmlHttp();
            xhr.open('HEAD', url, false);
            try {
                xhr.send();
            } catch (e) { }
            return (xhr.status >= 200 && xhr.status <= 299);
        },

        createBlobUrl: (globalThis.URL && URL.createObjectURL && URL.createObjectURL.bind(URL)) || (globalThis.webkitURL && webkitURL.createObjectURL && webkitURL.createObjectURL.bind(webkitURL)) || globalThis.createObjectURL,
        revokeBlobUrl: (globalThis.URL && URL.revokeObjectURL && URL.revokeObjectURL.bind(URL)) || (globalThis.webkitURL && webkitURL.revokeObjectURL && webkitURL.revokeObjectURL.bind(webkitURL)) || globalThis.revokeObjectURL,

        blobToDataUri: function (blob, callback) {
            /// <summary>
            /// blob 정보에서 datauri를 반환합니다
            /// </summary>
            if (callback == null || callback == undefined) {
                $l.eventLog('$r.blobToDataUri', 'blob 결과 callback 확인 필요', 'Warning');
                return;
            }

            var reader = new FileReader();
            reader.onloadend = function () {
                var base64data = reader.result;
                callback(base64data);
            }
            reader.onerror = function () {
                $l.eventLog('$r.blobToDataUri', reader.error, 'Error');
                reader.abort();
            }
            reader.readAsDataURL(blob);
        },

        blobToDownload: function (blob, fileName) {
            /// <summary>
            /// blob 정보에서 파일 다운로드를 합니다
            /// </summary>
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(blob, fileName);
            } else {
                var blobUrl = $r.createBlobUrl(blob);
                var link = document.createElement('a');
                link.href = blobUrl;
                link.download = fileName;

                $l.dispatchClick(link);

                setTimeout(function () {
                    $r.revokeBlobUrl(blobUrl);
                    if (link.remove) {
                        link.remove();
                    }
                }, 100);
            }
        },

        blobUrlToData: function (url, callback) {
            /// <summary>
            /// blob url 정보에서 datauri를 반환합니다
            /// </summary>
            if (callback == null || callback == undefined) {
                $l.eventLog('$r.blobUrlToData', 'blob 결과 callback 확인 필요', 'Warning');
                return;
            }

            var xhr = new $w.xmlHttp();
            xhr.open('GET', url);
            xhr.responseType = 'blob';
            xhr.onload = function () {
                callback(xhr.response);
            }
            xhr.onerror = function () {
                $l.eventLog('$r.blobUrlToData', 'url: {0}, status: {1}'.format(url, xhr.statusText), 'Warning');
            }
            xhr.send();
        },

        blobUrlToDataUri: function (url, callback) {
            /// <summary>
            /// blob url 정보에서 datauri를 반환합니다
            /// </summary>
            if (callback == null || callback == undefined) {
                $l.eventLog('$r.blobUrlToDataUri', 'blob 결과 callback 확인 필요', 'Warning');
                return;
            }

            var xhr = new $w.xmlHttp();
            xhr.open('GET', url);
            xhr.responseType = 'blob';
            xhr.onload = function () {
                var reader = new FileReader();
                reader.onloadend = function () {
                    var base64data = reader.result;
                    setTimeout(function () {
                        $r.revokeBlobUrl(url);
                    }, 25);
                    callback(null, base64data);
                }
                reader.onerror = function () {
                    $l.eventLog('$r.blobUrlToDataUri', reader.error, 'Error');
                    reader.abort();
                    callback(reader.error.message, null);
                }
                reader.readAsDataURL(xhr.response);
            }
            xhr.onerror = function () {
                $l.eventLog('$r.blobUrlToDataUri', 'url: {0}, status: {1}'.format(url, xhr.statusText), 'Warning');
                callback('url: {0}, status: {1}'.format(url, xhr.statusText), null);
            }
            xhr.send();
        },

        url: function () {
            /// <summary>
            /// 웹 서버에 url요청을 보내기 위한 GET방식의 주소를 반환합니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;$r.params['p1'] = '1';
            /// &#10;$r.params['p2'] = '2';
            /// &#10;$r.params['p3'] = '3';
            /// &#10;alert($r.url()); // url?p1=1&p2=2&p3=3
            /// </summary>
            /// <returns type='String' />
            var url = $r.path.split('?');
            var param = '';

            param = $r.path + (($r.path.length > 0 && url.length > 1) ? '&' : '?');

            for (var key in this.params) {
                if (typeof ($r.params[key]) == 'string') {
                    param += escape(key) + '=' + escape($r.params[key]) + '&';
                }
            }

            if ($b) {
                if ($b.isIE == true) {
                    param += '&noCache=' + (new Date()).getTime();
                }
            }
            else {
                if (navigator.appName === 'Microsoft Internet Explorer') {
                    param += '&noCache=' + (new Date()).getTime();
                }
            }

            this.params = [];
            return param.substring(0, param.length - 1);
        },

        getCookie: function (id) {
            /// <summary>
            /// 브라우저의 쿠키 값을 조회합니다.
            /// </summary>
            /// <param name='id' type='String'>쿠키 값을 조회할 식별자입니다.</param>
            /// <returns type='String' />
            var matches = document.cookie.match(
                new RegExp(
                    '(?:^|; )' +
                    id.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
                    '=([^;]*)'
                )
            );
            return matches ? decodeURIComponent(matches[1]) : undefined;
        },

        setCookie: function (id, val, expires, path, domain, secure) {
            /// <summary>
            /// 브라우저의 쿠키 값을 설정합니다.
            /// </summary>
            /// <param name='id' type='String'>쿠키의 식별자입니다.</param>
            /// <param name='val' type='String'>쿠키의 값입니다.</param>
            /// <param name='expires' type='String' optional='true'>쿠키의 만료기간입니다.</param>
            /// <param name='path' type='String' optional='true'>쿠키의 적용 경로입니다.</param>
            /// <param name='domain' type='String' optional='true'>쿠키의 적용 도메인입니다.</param>
            /// <param name='secure' type='String' optional='true'>쿠키의 보안키입니다.</param>
            if (expires == null || expires == undefined) {
                expires = new Date((new Date()).getTime() + (1000 * 60 * 60 * 24));
            }

            if (path == null || path == undefined) {
                path = '/';
            }

            document.cookie = id + '=' + escape(val) + ((expires) ? ';expires=' + expires.toGMTString() : '') + ((path) ? ';path=' + path : '') + ((domain) ? ';domain=' + domain : '') + ((secure) ? ';secure' : '');
            return this;
        },

        deleteCookie: function (id, path, domain) {
            /// <summary>
            /// 브라우저의 쿠키 값을 삭제합니다.
            /// </summary>
            /// <param name='id' type='String'>쿠키의 키입니다.</param>
            /// <param name='path' type='String' optional='true'>쿠키의 적용 경로입니다.</param>
            /// <param name='domain' type='String' optional='true'>쿠키의 적용 도메인입니다.</param>
            if ($r.getCookie(id)) {
                document.cookie = id + '=' + ((path) ? ';path=' + path : '') + ((domain) ? ';domain=' + domain : '') + ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
            }
            return this;
        }
    });
    context.$request = context.$r = qaf.$r = context.$request || $request;
})(globalThis);
/// <reference path='qaf.core.js' />

/// <summary>
/// iframe 간의 커뮤니케이션 기능을 제공하는 모듈입니다.
/// </summary>
(function (qaf) {
    'use strict';
    if (qaf && !qaf.$channel) {
        qaf.$channel = (function () {
            var currentTransactionID = Math.floor(Math.random() * 1000001);
            var boundChannels = {};

            function addChannel(channelWindow, origin, scope, handler) {
                function hasWin(arr) {
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i].channelWindow === channelWindow) {
                            return true;
                        }
                    }
                    return false;
                }

                var exists = false;

                if (origin === '*') {
                    for (var k in boundChannels) {
                        if (!boundChannels.hasOwnProperty(k)) {
                            continue;
                        }

                        if (k === '*') {
                            continue;
                        }

                        if (typeof boundChannels[k][scope] === 'object') {
                            exists = hasWin(boundChannels[k][scope]);
                            if (exists) {
                                break;
                            }
                        }
                    }
                } else {
                    if ((boundChannels['*'] && boundChannels['*'][scope])) {
                        exists = hasWin(boundChannels['*'][scope]);
                    }
                    if (!exists && boundChannels[origin] && boundChannels[origin][scope]) {
                        exists = hasWin(boundChannels[origin][scope]);
                    }
                }

                if (exists) {
                    $l.eventLog('$channel.addChannel', 'origin: ' + origin + ', scope: ' + scope + '에 해당하는 채널이 이미 있습니다', 'Warning');
                    return;
                }

                if (typeof boundChannels[origin] != 'object') {
                    boundChannels[origin] = {};
                }

                if (typeof boundChannels[origin][scope] != 'object') {
                    boundChannels[origin][scope] = [];
                }

                boundChannels[origin][scope].push({
                    channelWindow: channelWindow,
                    handler: handler
                });
            }

            function removeChannel(channelWindow, origin, scope) {
                var arr = boundChannels[origin][scope];
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].channelWindow === channelWindow) {
                        arr.splice(i, 1);
                    }
                }
                if (boundChannels[origin][scope].length === 0) {
                    delete boundChannels[origin][scope];
                }
            }

            function isArray(obj) {
                if (Array.isArray) {
                    return Array.isArray(obj);
                }
                else {
                    return (obj.constructor.toString().indexOf('Array') != -1);
                }
            }

            var transactionMessages = {};

            var onPostMessage = function (evt) {
                try {
                    if (evt.data == null || evt.data == undefined || evt.data == '') {
                        return;
                    }

                    var parsedMessage = JSON.parse(evt.data);
                    if (typeof parsedMessage !== 'object' || parsedMessage === null) {
                        $l.eventLog('$channel.onPostMessage', 'postMessage data 확인 필요', 'Warning');
                        return;
                    }
                } catch (error) {
                    return;
                }

                var sourceWindow = evt.source;
                var channelOrigin = evt.origin;
                var channelScope = null;
                var messageID = null;
                var methodName = null;

                if (typeof parsedMessage.method === 'string') {
                    var ar = parsedMessage.method.split('::');
                    if (ar.length == 2) {
                        channelScope = ar[0];
                        methodName = ar[1];
                    } else {
                        methodName = parsedMessage.method;
                    }
                }

                if (typeof parsedMessage.id !== 'undefined') {
                    messageID = parsedMessage.id;
                }

                if (typeof methodName === 'string') {
                    var delivered = false;
                    if (boundChannels[channelOrigin] && boundChannels[channelOrigin][channelScope]) {
                        for (var j = 0; j < boundChannels[channelOrigin][channelScope].length; j++) {
                            if (boundChannels[channelOrigin][channelScope][j].channelWindow === sourceWindow) {
                                boundChannels[channelOrigin][channelScope][j].handler(channelOrigin, methodName, parsedMessage);
                                delivered = true;
                                break;
                            }
                        }
                    }

                    if (!delivered && boundChannels['*'] && boundChannels['*'][channelScope]) {
                        for (var j = 0; j < boundChannels['*'][channelScope].length; j++) {
                            if (boundChannels['*'][channelScope][j].channelWindow === sourceWindow) {
                                boundChannels['*'][channelScope][j].handler(channelOrigin, methodName, parsedMessage);
                                break;
                            }
                        }
                    }
                }
                else if (typeof messageID != 'undefined') {
                    if (transactionMessages[messageID]) {
                        transactionMessages[messageID](channelOrigin, methodName, parsedMessage);
                    }
                }
            };

            if (window.addEventListener) {
                window.addEventListener('message', onPostMessage, false);
            }
            else if (window.attachEvent) {
                window.attachEvent('onmessage', onPostMessage);
            }

            return {
                connect: function (options) {
                    var channelID = (function () {
                        var text = '';
                        var alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                        for (var i = 0; i < 5; i++) text += alpha.charAt(Math.floor(Math.random() * alpha.length));
                        return text;
                    })();

                    var debug = function (message) {
                        if (options.debugOutput) {
                            try {
                                if (typeof message !== 'string') {
                                    message = JSON.stringify(message);
                                }
                            }
                            catch (error) {
                            }

                            $l.eventLog('$channel.debug', 'channelID: ' + message, 'Information');
                        }
                    };

                    if (!window.postMessage) {
                        $l.eventLog('$channel.postMessage', 'postMessage를 지원하지 않는 브라우저', 'Error');
                        return;
                    }

                    if (!window.JSON || !window.JSON.stringify || !window.JSON.parse) {
                        $l.eventLog('$channel.JSON', 'JSON을 지원하지 않는 브라우저', 'Error');
                        return;
                    }

                    if (typeof options != 'object') {
                        $l.eventLog('$channel.options', '유효한 매개변수 없이 호출된 채널 빌드', 'Error');
                        return;
                    }

                    if (!options.window || !options.window.postMessage) {
                        $l.eventLog('$channel.window', '필수 매개변수 없이 호출된 채널 빌드', 'Error');
                        return;
                    }

                    if (window === options.window) {
                        $l.eventLog('$channel.window', '동일한 화면에서 거래되는 채널 생성은 허용되지 않음', 'Error');
                        return;
                    }

                    var validOrigin = false;
                    if (typeof options.origin === 'string') {
                        var oMatch;
                        if (options.origin === '*') {
                            validOrigin = true;
                        }
                        else if (null !== (oMatch = options.origin.match(/^https?:\/\/(?:[-a-zA-Z0-9_\.])+(?::\d+)?/))) {
                            options.origin = oMatch[0].toLowerCase();
                            validOrigin = true;
                        }
                    }

                    if (!validOrigin) {
                        $l.eventLog('$channel.origin', '유효한 origin 없이 호출된 채널 빌드', 'Error');
                        return;
                    }

                    if (typeof options.scope !== 'undefined') {
                        if (typeof options.scope !== 'string') {
                            $l.eventLog('$channel.scope', 'scope는 문자열이어야 함', 'Error');
                            return;
                        }

                        if (options.scope.split('::').length > 1) {
                            $l.eventLog('$channel.scope', 'scope에는 이중 콜론 ("::")이 포함될 수 없음', 'Error');
                            return;
                        }
                    }

                    var registrationMappingMethods = {};
                    var sendRequests = {};
                    var receivedRequests = {};
                    var ready = false;
                    var pendingQueue = [];

                    var createTransaction = function (id, origin, callbacks) {
                        var shouldDelayReturn = false;
                        var completed = false;

                        return {
                            origin: origin,
                            invoke: function (callbackName, v) {
                                if (!receivedRequests[id]) {
                                    $l.eventLog('$channel.invoke', '존재하지 않는 트랜잭션의 콜백 호출 시도: ' + id, 'Warning');
                                    return;
                                }

                                var valid = false;
                                for (var i = 0; i < callbacks.length; i++) {
                                    if (callbackName === callbacks[i]) {
                                        valid = true;
                                        break;
                                    }
                                }
                                if (!valid) {
                                    $l.eventLog('$channel.invoke', '존재하지 않는 콜백 호출 시도: ' + callbackName, 'Warning');
                                    return;
                                }

                                postMessage({ id: id, callback: callbackName, params: v });
                            },
                            error: function (error, message) {
                                completed = true;
                                if (!receivedRequests[id]) {
                                    $l.eventLog('$channel.error', '존재하지 않는 메시지의 호출 시도: ' + id, 'Warning');
                                    return;
                                }

                                delete receivedRequests[id];

                                postMessage({ id: id, error: error, message: message });
                            },
                            complete: function (v) {
                                completed = true;
                                if (!receivedRequests[id]) {
                                    $l.eventLog('$channel.complete', '존재하지 않는 메시지의 호출 시도: ' + id, 'Warning');
                                    return;
                                }

                                delete receivedRequests[id];
                                postMessage({ id: id, result: v });
                            },
                            delayReturn: function (delay) {
                                if (typeof delay === 'boolean') {
                                    shouldDelayReturn = (delay === true);
                                }
                                return shouldDelayReturn;
                            },
                            completed: function () {
                                return completed;
                            }
                        };
                    };

                    var setTransactionTimeout = function (transactionID, timeout, method) {
                        return window.setTimeout(function () {
                            if (sendRequests[transactionID]) {
                                var message = '"' + method + '" 타임아웃 (' + timeout + 'ms) ';
                                (1, sendRequests[transactionID].error)('timeout_error', message);
                                delete sendRequests[transactionID];
                                delete transactionMessages[transactionID];
                            }
                        }, timeout);
                    };

                    var onMessage = function (origin, method, data) {
                        if (typeof options.gotMessageObserver === 'function') {
                            try {
                                options.gotMessageObserver(origin, data);
                            } catch (error) {
                                debug('gotMessageObserver() 오류: ' + error.toString());
                            }
                        }

                        if (data.id && method) {
                            if (registrationMappingMethods[method]) {
                                var transaction = createTransaction(data.id, origin, data.callbacks ? data.callbacks : []);
                                receivedRequests[data.id] = {};
                                try {
                                    if (data.callbacks && isArray(data.callbacks) && data.callbacks.length > 0) {
                                        for (var i = 0; i < data.callbacks.length; i++) {
                                            var path = data.callbacks[i];
                                            var params = data.params;
                                            var pathItems = path.split('/');
                                            for (var j = 0; j < pathItems.length - 1; j++) {
                                                var cp = pathItems[j];
                                                if (typeof params[cp] !== 'object') {
                                                    params[cp] = {};
                                                }
                                                params = params[cp];
                                            }
                                            params[pathItems[pathItems.length - 1]] = (function () {
                                                var callbackName = path;
                                                return function (data) {
                                                    return transaction.invoke(callbackName, data);
                                                };
                                            })();
                                        }
                                    }
                                    var resp = registrationMappingMethods[method](transaction, data.params);
                                    if (!transaction.delayReturn() && !transaction.completed()) {
                                        transaction.complete(resp);
                                    }
                                } catch (e) {
                                    var error = 'runtime_error';
                                    var message = null;
                                    if (typeof e === 'string') {
                                        message = e;
                                    } else if (typeof e === 'object') {
                                        if (e && isArray(e) && e.length == 2) {
                                            error = e[0];
                                            message = e[1];
                                        }
                                        else if (typeof e.error === 'string') {
                                            error = e.error;
                                            if (!e.message) {
                                                message = '';
                                            }
                                            else if (typeof e.message === 'string') {
                                                message = e.message;
                                            }
                                            else {
                                                e = e.message;
                                            }
                                        }
                                    }

                                    if (message === null) {
                                        try {
                                            message = JSON.stringify(e);
                                            if (typeof (message) == 'undefined') {
                                                message = e.toString();
                                            }
                                        } catch (e2) {
                                            message = e.toString();
                                        }
                                    }

                                    transaction.error(error, message);
                                }
                            }
                        } else if (data.id && data.callback) {
                            if (!sendRequests[data.id] || !sendRequests[data.id].callbacks || !sendRequests[data.id].callbacks[data.callback]) {
                                debug('유효하지 않는 콜백, id:' + data.id + ' (' + data.callback + ')');
                            } else {
                                sendRequests[data.id].callbacks[data.callback](data.params);
                            }
                        } else if (data.id) {
                            if (!sendRequests[data.id]) {
                                debug('유효하지 않는 응답: ' + data.id);
                            } else {
                                if (data.error) {
                                    (1, sendRequests[data.id].error)(data.error, data.message);
                                } else {
                                    if (data.result !== undefined) {
                                        (1, sendRequests[data.id].success)(data.result);
                                    }
                                    else {
                                        (1, sendRequests[data.id].success)();
                                    }
                                }
                                delete sendRequests[data.id];
                                delete transactionMessages[data.id];
                            }
                        } else if (method) {
                            if (registrationMappingMethods[method]) {
                                registrationMappingMethods[method]({ origin: origin }, data.params);
                            }
                        }
                    };

                    addChannel(options.window, options.origin, ((typeof options.scope === 'string') ? options.scope : ''), onMessage);

                    var scopeMethod = function (data) {
                        if (typeof options.scope === 'string' && options.scope.length) data = [options.scope, data].join('::');
                        return data;
                    };

                    var postMessage = function (message, force) {
                        if (!message) {
                            $l.eventLog('$channel.postMessage', 'null 메시지로 postMessage 호출', 'Error');
                            return;
                        }

                        var verb = (ready ? 'post ' : 'queue ');
                        debug(verb + ' message: ' + JSON.stringify(message));
                        if (!force && !ready) {
                            pendingQueue.push(message);
                        } else {
                            if (typeof options.postMessageObserver === 'function') {
                                try {
                                    options.postMessageObserver(options.origin, message);
                                } catch (e) {
                                    debug('postMessageObserver() 확인 필요: ' + e.toString());
                                }
                            }

                            options.window.postMessage(JSON.stringify(message), options.origin);
                        }
                    };

                    var onReady = function (transaction, type) {
                        debug('ready message received');
                        if (ready) {
                            $l.eventLog('$channel.onReady', 'ready 메시지 확인 필요', 'Warning');
                            return;
                        }

                        if (type === 'T') {
                            channelID += '-R';
                        } else {
                            channelID += '-L';
                        }

                        boundMessage.unbind('__ready');
                        ready = true;
                        debug('ready message accepted');

                        if (type === 'T') {
                            boundMessage.notify({ method: '__ready', params: 'A' });
                        }

                        while (pendingQueue.length) {
                            postMessage(pendingQueue.pop());
                        }

                        if (typeof options.onReady === 'function') {
                            options.onReady(boundMessage);
                        }
                    };

                    var boundMessage = {
                        unbind: function (method) {
                            if (registrationMappingMethods[method]) {
                                if (!(delete registrationMappingMethods[method])) {
                                    $l.eventLog('$channel.unbind', 'registrationMappingMethods 삭제 확인 필요: ' + method, 'Warning');
                                    return;
                                }

                                return true;
                            }
                            return false;
                        },
                        bind: function (method, callback) {
                            if (!method || typeof method !== 'string') {
                                $l.eventLog('$channel.bind', 'method 매개변수 확인 필요', 'Warning');
                                return;
                            }

                            if (!callback || typeof callback !== 'function') {
                                $l.eventLog('$channel.bind', 'callback 매개변수 확인 필요', 'Warning');
                                return;
                            }

                            if (registrationMappingMethods[method]) {
                                $l.eventLog('$channel.bind', method + ' method 중복 확인 필요', 'Warning');
                                return;
                            }

                            registrationMappingMethods[method] = callback;
                            return this;
                        },
                        call: function (data) {
                            if (!data) {
                                $l.eventLog('$channel.call', '매개변수 확인 필요', 'Warning');
                                return;
                            }

                            if (!data.method || typeof data.method !== 'string') {
                                $l.eventLog('$channel.call', 'method 매개변수 확인 필요', 'Warning');
                                return;
                            }

                            if (!data.success || typeof data.success !== 'function') {
                                $l.eventLog('$channel.call', 'callback 매개변수 확인 필요', 'Warning');
                                return;
                            }

                            var callbacks = {};
                            var callbackNames = [];
                            var seen = [];

                            var pruneFunctions = function (path, params) {
                                if (seen.indexOf(params) >= 0) {
                                    $l.eventLog('$channel.pruneFunctions', 'recursive params 데이터 없음', 'Warning');
                                    return;
                                }
                                seen.push(params);

                                if (typeof params === 'object') {
                                    for (var k in params) {
                                        if (!params.hasOwnProperty(k)) {
                                            continue;
                                        }

                                        var np = path + (path.length ? '/' : '') + k;
                                        if (typeof params[k] === 'function') {
                                            callbacks[np] = params[k];
                                            callbackNames.push(np);
                                            delete params[k];
                                        } else if (typeof params[k] === 'object') {
                                            pruneFunctions(np, params[k]);
                                        }
                                    }
                                }
                            };
                            pruneFunctions('', data.params);

                            var message = { id: currentTransactionID, method: scopeMethod(data.method), params: data.params };
                            if (callbackNames.length) {
                                message.callbacks = callbackNames;
                            }

                            if (data.timeout) {
                                setTransactionTimeout(currentTransactionID, data.timeout, scopeMethod(data.method));
                            }

                            sendRequests[currentTransactionID] = { callbacks: callbacks, error: data.error, success: data.success };
                            transactionMessages[currentTransactionID] = onMessage;

                            currentTransactionID++;

                            postMessage(message);
                        },
                        notify: function (data) {
                            if (!data) {
                                throw 'missing arguments to notify function';
                                $l.eventLog('$channel.notify', 'notify params 데이터 없음', 'Warning');
                                return;
                            }

                            if (!data.method || typeof data.method !== 'string') {
                                $l.eventLog('$channel.notify', 'method 매개변수 확인 필요', 'Warning');
                                return;
                            }

                            postMessage({ method: scopeMethod(data.method), params: data.params });
                        },
                        destroy: function () {
                            removeChannel(options.window, options.origin, ((typeof options.scope === 'string') ? options.scope : ''));
                            if (window.removeEventListener) {
                                window.removeEventListener('message', onMessage, false);
                            }
                            else if (window.detachEvent) {
                                window.detachEvent('onmessage', onMessage);
                            }

                            ready = false;
                            registrationMappingMethods = {};
                            receivedRequests = {};
                            sendRequests = {};
                            options.origin = null;
                            pendingQueue = [];
                            channelID = '';
                            debug('채널 삭제');
                        }
                    };

                    boundMessage.bind('__ready', onReady);
                    setTimeout(function () {
                        postMessage({ method: scopeMethod('__ready'), params: 'T' }, true);
                    }, 0);

                    return boundMessage;
                }
            };
        })();
    }
})(qaf);
/// <reference path='qaf.core.js' />
/// <reference path='qaf.library.js' />

/// <summary>
/// 화면 모듈 구성에 적합한 공통기능을 제공하는 모듈입니다.
/// </summary>
(function (context) {
    'use strict';
    var $webform = $webform || new baseCore();
    var document = null;
    if (isNodejs == true) {
    }
    else {
        $webform.context = context;
        $webform.document = context.document;
        document = context.document;
    }

    $webform.extend({
        /// <summary>
        /// $webform의 릴리즈 버전입니다.
        /// </summary>
        version: '1.0',

        /// <summary>
        /// $webform의 기본 언어권 ID입니다.
        /// </summary>
        localeID: 'ko-KR',

        isPageLoad: false,
        transactionLoaderID: null,
        pageReadyTimeout: 60000,
        eventAddReady: (isNodejs == true) ? null : new CustomEvent('addready'),
        eventRemoveReady: (isNodejs == true) ? null : new CustomEvent('removeready'),
        mappingModule: true,
        moduleReadyIntervalID: null,
        remainingReadyIntervalID: null,
        remainingReadyCount: 0,

        /// <summary>
        /// UI Control의 기본 옵션입니다.
        /// </summary>
        defaultControlOptions: {
            value: '',
            text: '',
            dataType: 'string',
            bindingID: '',
            resourceKey: '',
            localeID: 'ko-KR',
            required: false,
            tooltip: ''
        },

        initializeFormScript: function (module) {
            /// <summary>
            /// QAF 화면 업무로직 자바스크립트 초기화
            /// </summary>
            /// <param name='module' type='Object'>QAF 화면 업무로직 자바스크립트</param>
            if ($l.get('moduleScript')) {
                $w.extend({ pageScript: $l.get('moduleScript').value });
            }

            var mod = context[$w.pageScript] || new baseCore();

            if (module) {
                mod.extend(module);
                mod.store = {};
                context[$w.pageScript] = mod;
                context['$this'] = mod;

                for (var control in qaf.uicontrols) {
                    mod[control] = qaf.uicontrols[control];
                }
            }
            else {
                $l.eventLog('$w.initializeFormScript', '화면 초기화 오류, module 객체가 없음', 'Information');
            }
        },

        setStorage: function (prop, val, isLocal, ttl) {
            /// <summary>
            /// localStorage, sessionStorage를 이용하여 데이터를 저장합니다.
            /// </summary>
            /// <param name='prop' type='String'>Storage에 데이터를 저장할 키입니다.</param>
            /// <param name='val' type='Object'>Storage에 데이터를 저장할 값입니다.</param>
            /// <param name='isLocal' type='Boolean'>저장소가 localStorage(기본), sessionStorage인지 구분합니다.</param>
            /// <returns type='Type'></returns>
            if (isLocal == undefined || isLocal == null) {
                isLocal = false;
            }

            if (isNodejs == true) {
                if (isLocal == true) {
                    localStorage.setItem(prop, JSON.stringify(val));
                }
                else {
                    if (ttl == undefined || ttl == null) {
                        ttl = 1200000;
                    }

                    var now = new Date();
                    var item = {
                        value: val,
                        expiry: now.getTime() + ttl,
                        ttl: ttl
                    };
                    localStorage.setItem(prop, JSON.stringify(item));
                }
            }
            else {
                if (isLocal == true) {
                    localStorage.setItem(prop, JSON.stringify(val));
                }
                else {
                    sessionStorage.setItem(prop, JSON.stringify(val));
                }
            }

            return this;
        },

        getStorage: function (prop, isLocal) {
            /// <summary>
            /// localStorage, sessionStorage를 이용하여 데이터를 조회합니다.
            /// </summary>
            /// <param name='prop' type='String'>Storage에 데이터를 조회할 키입니다.</param>
            /// <param name='isLocal' type='Boolean'>저장소가 localStorage(기본), sessionStorage인지 구분합니다.</param>
            /// <returns type='Type'></returns>
            var result = null;
            var val = null;

            if (isLocal == undefined || isLocal == null) {
                isLocal = false;
            }

            if (isNodejs == true) {
                if (isLocal == true) {
                    val = localStorage.getItem(prop);
                }
                else {
                    var itemStr = localStorage.getItem(prop)
                    if (!itemStr) {
                        return null;
                    }
                    var item = JSON.parse(itemStr)
                    var now = new Date()
                    if (now.getTime() > item.expiry) {
                        localStorage.removeItem(prop);
                        return null;
                    }

                    result = item.value;

                    var ttl = item.ttl;
                    var now = new Date();
                    var item = {
                        value: result,
                        expiry: now.getTime() + ttl,
                        ttl: ttl
                    };
                    localStorage.setItem(prop, JSON.stringify(item));
                }
            }
            else {
                if (isLocal == true) {
                    result = JSON.parse(localStorage.getItem(prop));
                }
                else {
                    result = JSON.parse(sessionStorage.getItem(prop));
                }
            }

            return result;
        },

        removeStorage: function (prop, isLocal) {
            /// <summary>
            /// localStorage, sessionStorage를 이용하여 데이터를 삭제합니다.
            /// </summary>
            /// <param name='prop' type='String'>Storage에 데이터를 조회할 키입니다.</param>
            /// <param name='isLocal' type='Boolean'>저장소가 localStorage(기본), sessionStorage인지 구분합니다.</param>
            /// <returns type='Type'></returns>
            if (isLocal == undefined || isLocal == null) {
                isLocal = false;
            }

            if (isNodejs == true) {
                localStorage.removeItem(prop);
            }
            else {
                if (isLocal == true) {
                    localStorage.removeItem(prop);
                }
                else {
                    sessionStorage.removeItem(prop);
                }
            }
        },

        storageLength: function (isLocal) {
            /// <summary>
            /// localStorage, sessionStorage를 이용하여 데이터 갯수를 반환합니다
            /// </summary>
            /// <param name='isLocal' type='Boolean'>저장소가 localStorage(기본), sessionStorage인지 구분합니다.</param>
            /// <returns type='Type'></returns>
            var result = 0;
            if (isLocal == undefined || isLocal == null) {
                isLocal = false;
            }

            if (isNodejs == true) {
                result = localStorage.length;
            }
            else {
                if (isLocal == true) {
                    result = localStorage.length;
                }
                else {
                    result = sessionStorage.length;
                }
            }

            return result;
        },

        storageKey: function (index, isLocal) {
            /// <summary>
            /// localStorage, sessionStorage를 이용하여 인덱스의 키를 조회합니다합니다.
            /// </summary>
            /// <param name='prop' type='String'>Storage에 데이터를 조회할 인덱스입니다.</param>
            /// <param name='isLocal' type='Boolean'>저장소가 localStorage(기본), sessionStorage인지 구분합니다.</param>
            /// <returns type='Type'></returns>
            var result = null;
            if (isLocal == undefined || isLocal == null) {
                isLocal = false;
            }

            if (isNodejs == true) {
                result = localStorage.key(index);
            }
            else {
                if (isLocal == true) {
                    result = localStorage.key(index);
                }
                else {
                    result = sessionStorage.key(index);
                }
            }

            return result;
        },

        createBlob: function (data, type) {
            /// <summary>
            /// Blob 객체를 생성합니다
            /// </summary>
            /// <param name='data' type='Object'>ArrayBuffer 또는 Blob 또는 DOMString</param>
            /// <param name='type' type='Object'>데이터에 대한 mimetype</param>
            try {
                return new Blob([data], { type: type });
            } catch (e) {
                var BlobBuilder = globalThis.BlobBuilder || globalThis.WebKitBlobBuilder || globalThis.MozBlobBuilder || globalThis.MSBlobBuilder;
                var builder = new BlobBuilder();
                builder.append(data.buffer || data);
                return builder.getBlob(type);
            }
        },

        dataUriToBlob: function (dataUri) {
            var result = null;

            try {
                var byteString = $c.base64Decode(dataUri.split(',')[1]);
                var mimeString = dataUri.split(',')[0].split(':')[1].split(';')[0];
                var ab = new ArrayBuffer(byteString.length);
                var ia = new Uint8Array(ab);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                result = new Blob([ab], { type: mimeString });
            } catch (error) {
                $l.eventLog('$w.dataUriToBlob', error, 'Warning');
            }
            return result;
        },

        dataUriToText: function (dataUri) {
            var result = null;

            try {
                result = {
                    value: $c.base64Decode(dataUri.split(',')[1]),
                    mime: dataUri.split(',')[0].split(':')[1].split(';')[0]
                };
            } catch (error) {
                $l.eventLog('$w.dataUriToText', error, 'Warning');
            }
            return result;
        },

        innerHTML: function (el, html) {
            /// <summary>
            /// innerHTML을 수행합니다.
            /// </summary>
            /// <param name='el' type='Element'>HTML 문자열을 삽입할 HTML 요소입니다.</param>
            /// <param name='html' type='Object'>HTML 문자열입니다.</param>
            el = $ref.isString(el) == true ? $l.get(el) : el;
            var cl = el.cloneNode(false);
            cl.innerHTML = html;
            el.parentNode.replaceChild(cl, el);
        },

        innerText: function (el, html) {
            /// <summary>
            /// innerText 수행합니다.
            /// </summary>
            /// <param name='el' type='Element'>문자열을 삽입할 HTML 요소입니다.</param>
            /// <param name='html' type='Object'>문자열입니다.</param>
            el = $ref.isString(el) == true ? $l.get(el) : el;
            var cl = el.cloneNode(false);
            cl.innerText = html;
            el.parentNode.replaceChild(cl, el);
        },

        activeControl: function () {
            /// <summary>
            /// 현재 이벤트 포커스가 있는 타입을 반환합니다.
            /// </summary>
            /// <returns type='Type'></returns>
            var result = null;
            var evt = event || context.event;
            if ($this) {
                if (evt) {
                    result = (evt && evt.target || evt.srcElement) || $this.focusControl || document.activeElement;
                }
                else {
                    result = $this.focusControl || document.activeElement;
                }
            }

            return result;
        },

        hasAutoFocus: function () {
            /// <summary>
            /// 웹 페이지 로드시 자동 포커스를 이동합니다.
            /// </summary>
            /// <returns type='Type'></returns>
            var el = document.createElement('input');
            return "autofocus" in el;
        },

        /// <summary>
        /// 마우스 이벤트를 생성합니다.
        /// </summary>
        /// <param name='name' type='String'>이벤트 식별자입니다.</param>
        /// <param name='e' type='Object'>이벤트가 발생한 객체 참조입니다.</param>
        /// <returns type='MouseEvents'></returns>
        createTouchEvent: function (name, e) {
            var events = document.createEvent('MouseEvents');

            events.initMouseEvent(
                name,
                e.bubbles,
                e.cancelable,
                e.view,
                e.detail,
                e.screenX,
                e.screenY,
                e.clientX,
                e.clientY,
                e.ctrlKey,
                e.altKey,
                e.shiftKey,
                e.metaKey,
                e.button,
                e.relatedTarget
            );

            return events;
        },

        contentLoaded: function () {
            /// <summary>
            /// DOMContentLoaded 또는 context.onload 이벤트 핸들러를 지정합니다.
            /// </summary>
            $l.addEvent(document, 'addready', function () {
                $w.remainingReadyCount++;
            });

            $l.addEvent(document, 'removeready', function () {
                $w.remainingReadyCount--;
            });

            for (var name in $l.eventMap) {
                $l.addEvent(document.body, name, function (e) {
                    var map = $l.eventMap;
                    var event = $w.createTouchEvent(map[e.type], e);
                    e.target.dispatchEvent(event);

                    var func = e.target['on' + map[e.type]];
                    if (typeof func === 'function') {
                        func(e);
                    }
                });
            }

            if ($l.get('moduleScript')) {
                $w.extend({ pageScript: $l.get('moduleScript').value });
            }
            else {
                var pathname = location.pathname;
                if (pathname.split('/').length > 0) {
                    var filename = pathname.split('/')[location.pathname.split('/').length - 1];
                    $w.extend({ pageScript: '$' + (filename.indexOf('.') > -1 ? filename.substring(0, filename.indexOf('.')) : filename) });
                }

                var input = document.createElement('input');
                input.id = 'moduleScript';
                input.type = 'text';
                input.style.display = 'none';
                input.value = $w.pageScript;
                document.body.appendChild(input);

                if (document.forms) {
                    for (var i = 0; i < document.forms.length; i++) {
                        $l.addEvent(document.forms[i], 'submit', function (e) {
                            var result = false;
                            var el = e.target || e.srcElement;
                            if ($this && $this.frameEvent) {
                                result = $this.frameEvent('beforeSubmit', {
                                    el: el,
                                    evt: e
                                });

                                if (result == null || result == undefined || $string.toBoolean(result) == false) {
                                    result = false;
                                }
                            }

                            if (result == false) {
                                e.returnValue = false;
                                e.cancel = true;
                                if (e.preventDefault) {
                                    e.preventDefault();
                                }

                                if (e.stopPropagation) {
                                    e.stopPropagation();
                                }
                                return false;
                            }
                        });
                    }
                }
            }

            var pageLoad = function () {
                var mod = context[$w.pageScript];
                if (mod && mod.pageLoad) {
                    mod.pageLoad();
                }

                if (context.domainPageLoad) {
                    domainPageLoad();
                }

                setTimeout(function () {
                    if (mod && mod.qafControls && (mod.tabOrderControls == null || mod.tabOrderControls == undefined || mod.tabOrderControls.length == 0)) {
                        var qafTagNames = [];
                        var qaf_tags = document.body.outerHTML.match(/<(qaf_).+?>/gi);
                        if (qaf_tags) {
                            var qafControlCount = qaf_tags.length;
                            for (var i = 0; i < qafControlCount; i++) {
                                var qaf_tag = qaf_tags[i];
                                var tagName = qaf_tag.substring(1, qaf_tag.indexOf(' ')).toUpperCase();
                                qafTagNames.push(tagName);
                            }
                        }

                        qafTagNames = $array.distinct(qafTagNames);
                        var findElements = document.querySelectorAll('input,select,textarea,button' + (qafTagNames.length > 0 ? ',' + qafTagNames.join(',') : ''));
                        var els = [];
                        var length = findElements.length;
                        for (var idx = 0; idx < length; idx++) {
                            var el = findElements[idx];
                            if (el && el.style && el.style.display == 'none' || el.type == 'hidden') {
                                if (el.id && el.tagName.toUpperCase() == 'SELECT' && (el.getAttribute('qaf-datafield') != null || el.getAttribute('qaf-datafield') != undefined)) {
                                    els.push(el);
                                }
                                else {
                                    continue;
                                }
                            }
                            else {
                                if (el.id && el.id.includes('btn_qafeditor_') == false && el.id.includes('chk_qafgrid_') == false && el.id.includes('_hidden') == false) {
                                    els.push(el);
                                }
                                else if (el.id && el.tagName.toUpperCase() == 'SELECT' && (el.getAttribute('qaf-datafield') != null || el.getAttribute('qaf-datafield') != undefined)) {
                                    els.push(el);
                                }
                                else if (el.id && el.tagName.includes('QAF_') == true) {
                                    els.push(el);
                                }
                            }
                        }

                        var items = [];
                        var i = 0;
                        length = els.length;
                        for (var idx = 0; idx < length; idx++) {
                            var el = els[idx];
                            if (el.id && el.id.includes('btn_qafeditor_') == false && el.id.includes('chk_qafgrid_') == false && el.id.includes('_hidden') == false) {
                                var elID = el.id;
                                var offset = $d.offset(el);
                                var baseID = el.getAttribute('baseID');
                                if (baseID) {
                                    elID = baseID;
                                }

                                var setting = mod.qafControls.find(function (item) { return item.id == elID });

                                if (setting) {
                                    if (setting.type == 'datepicker') {
                                        offset = $d.offset(el.parentElement);
                                    }
                                    else if (setting.type == 'colorpicker') {
                                        offset = $d.offset(el.parentElement.parentElement);
                                    }

                                    items.push({
                                        elID: el.id,
                                        tagName: el.tagName,
                                        formID: setting.formDataFieldID,
                                        type: setting.type,
                                        top: offset.top,
                                        left: offset.left
                                    });
                                }
                            }
                            else if (el.id && el.tagName.toUpperCase() == 'SELECT' && (el.getAttribute('qaf-datafield') != null || el.getAttribute('qaf-datafield') != undefined)) {
                                var offset = null;
                                if (el.getAttribute('multiple') === false) {
                                    var control = mod.$select.getControl(el.id);
                                    if (control) {
                                        offset = $d.offset(control.picker.select);
                                    }
                                }
                                else {
                                    var control = mod.$multiselect.getControl(el.id);
                                    if (control) {
                                        offset = $d.offset(control.picker.select);
                                    }
                                }

                                if (offset) {
                                    var setting = mod.qafControls.find(function (item) { return item.id == el.id });

                                    if (setting) {
                                        items.push({
                                            elID: el.id,
                                            tagName: el.tagName,
                                            formID: setting.formDataFieldID,
                                            type: setting.type,
                                            top: offset.top,
                                            left: offset.left
                                        });
                                    }
                                }
                            }
                            else if (el.id && el.tagName.includes('QAF_') == true) {
                                var elID = el.id.replace('_hidden', '');
                                var offset = null;
                                if (el.tagName == 'QAF_DATEPICKER') {
                                    // var offset = $d.offset(el);
                                }
                                else if (el.tagName == 'QAF_COLORPICKER') {
                                    // var offset = $d.offset(el);
                                }

                                if (offset) {
                                    var setting = mod.qafControls.find(function (item) { return item.id == elID });
                                    if (setting) {
                                        items.push({
                                            elID: elID,
                                            tagName: el.tagName,
                                            formID: setting.formDataFieldID,
                                            type: setting.type,
                                            top: offset.top,
                                            left: offset.left
                                        });
                                    }
                                }
                            }

                            i = i + 1;
                        }

                        mod.focusControl = null;
                        mod.tabOrderFocusID = null;
                        mod.tabOrderControls = items;

                        if (mod && mod.frameEvent) {
                            mod.frameEvent('tabOrderControls', mod.tabOrderControls);
                        }

                        if (mod.tabOrderControls.length > 0) {
                            if (mod.mappingModel) {
                                // html (html defined), tdlr (top > down > left > right), lrtd (left > right > top > down)
                                if ($string.isNullOrEmpty(mod.mappingModel.TapOrderFlow) == true) {
                                    mod.mappingModel.TapOrderFlow = 'html';
                                }

                                if (mod.mappingModel.TapOrderFlow == 'tdlr') {
                                    mod.tabOrderControls.sort(
                                        function (a, b) {
                                            if (a.top === b.top) {
                                                return a.left - b.left;
                                            }
                                            return a.top > b.top ? 1 : -1;
                                        });
                                }
                                else if (mod.mappingModel.TapOrderFlow == 'lrtd') {
                                    mod.tabOrderControls.sort(
                                        function (a, b) {
                                            if (a.left === b.left) {
                                                return a.top - b.top;
                                            }
                                            return a.left > b.left ? 1 : -1;
                                        });
                                }
                            }
                            else {
                                mod.tabOrderControls.sort(
                                    function (a, b) {
                                        if (a.top === b.top) {
                                            return a.left - b.left;
                                        }
                                        return a.top > b.top ? 1 : -1;
                                    });
                            }
                        }

                        var focusEL = $l.querySelector("[autofocus]")
                        if (focusEL && focusEL.id && focusEL.tagName) {
                            var tagName = focusEL.tagName.toUpperCase();
                            var tags = 'input,select,textarea,button'.toUpperCase().split(',');
                            if (tags.indexOf(tagName) > -1) {
                                mod.focusControl = focusEL;
                                mod.tabOrderFocusID = focusEL.id;
                                setTimeout(function () {
                                    focusEL.focus();
                                });
                            }
                            else if (tagName.indexOf('qaf_') > -1) {
                                // debugger;
                                // qaf_ 컨트롤에 autofocus 처리
                            }
                        }
                    }
                });
            }

            var pageFormInit = function () {
                var qafControlList = [];
                var qafControls = document.querySelectorAll('[qaf-datafield],[qaf-options],[qaf-events]');
                for (var i = 0; i < qafControls.length; i++) {
                    var qafControl = qafControls[i];
                    if (qafControl.tagName) {
                        var tagName = qafControl.tagName.toUpperCase();
                        var dataField = qafControl.getAttribute('qaf-datafield');
                        var elementID = qafControl.getAttribute('id');
                        var formDataField = qafControl.closest('form') ? qafControl.closest('form').getAttribute('qaf-datafield') : '';
                        var controlType = '';

                        var controlOptions = qafControl.getAttribute('qaf-options') || null;
                        if (controlOptions != null) {
                            try {
                                controlOptions = eval('(' + controlOptions + ')');
                            } catch (error) {
                                $l.eventLog('$w.contentLoaded', 'elID: "{0}" qaf-options 확인 필요 '.format(elementID) + error.message, 'Warning');
                            }
                        }
                        else {
                            controlOptions = {};
                        }

                        var controlModule = null;

                        if (tagName.indexOf('QAF_') > -1) {
                            var moduleName = tagName.substring(4).toLowerCase();
                            controlModule = qaf.uicontrols['$' + moduleName];
                            controlType = moduleName;
                        }
                        else {
                            switch (tagName) {
                                case 'BUTTON':
                                    controlModule = qaf.uicontrols.$button;
                                    controlType = 'button';
                                    break;
                                case 'INPUT':
                                    controlType = qafControl.getAttribute('type').toLowerCase();
                                    switch (controlType) {
                                        case 'hidden':
                                        case 'text':
                                        case 'password':
                                        case 'color':
                                        case 'email':
                                        case 'number':
                                        case 'search':
                                        case 'tel':
                                        case 'url':
                                            controlModule = qaf.uicontrols.$textbox;
                                            break;
                                        case 'submit':
                                        case 'reset':
                                        case 'button':
                                            controlModule = qaf.uicontrols.$button;
                                            break;
                                        case 'radio':
                                            controlModule = qaf.uicontrols.$radio;
                                            break;
                                        case 'checkbox':
                                            controlModule = qaf.uicontrols.$checkbox;
                                            break;
                                    }
                                    break;
                                case 'TEXTAREA':
                                    controlModule = qaf.uicontrols.$textarea;
                                    controlType = 'textarea';
                                    break;
                                case 'SELECT':
                                    if (qafControl.getAttribute('multiple') == null) {
                                        controlModule = qaf.uicontrols.$select;
                                        controlType = 'select';
                                    }
                                    else {
                                        controlModule = qaf.uicontrols.$multiselect;
                                        controlType = 'multiselect';
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }

                        $l.addEvent(qafControl.id, 'focus', function (evt) {
                            $this.focusControl = evt.target || evt.currentTarget || evt.srcElement;
                            if ($this.focusControl) {
                                $this.tabOrderFocusID = $this.focusControl.id;
                            }
                            else {
                                $this.tabOrderFocusID = null;
                            }
                        });

                        if (controlModule) {
                            if (controlModule.addModuleList) {
                                controlModule.addModuleList(qafControl, qafControlList, controlOptions, controlType);
                            }

                            controlModule.controlLoad(elementID, controlOptions);
                        }
                        else {
                            if (elementID) {
                                qafControlList.push({
                                    id: elementID,
                                    formDataFieldID: formDataField,
                                    field: dataField,
                                    module: null,
                                    type: controlType ? controlType : qafControl.tagName.toLowerCase()
                                });
                            }

                            if ($this && $this.controlLoad) {
                                $this.controlLoad(elementID, controlOptions);
                            }
                        }
                    }
                }

                var qafEventControls = document.querySelectorAll('[qaf-events]');
                for (var i = 0; i < qafEventControls.length; i++) {
                    var qafControl = qafEventControls[i];
                    var events = null;

                    try {
                        events = eval('(' + qafControl.getAttribute('qaf-events') + ')');
                    } catch (error) {
                        $l.eventLog('$w.contentLoaded', 'elID: "{0}" qaf-events 확인 필요 '.format(qafControl.id) + error.message, 'Warning');
                    }

                    if (events) {
                        var length = events.length;
                        for (var j = 0; j < length; j++) {
                            var event = events[j];

                            var func = $this[qafControl.id + '_' + event];
                            if (func) {
                                $l.addEvent(qafControl.id, event, func);
                            }
                        }
                    }
                }

                var qafOptionControls = document.querySelectorAll('[qaf-options]');
                for (var i = 0; i < qafOptionControls.length; i++) {
                    var qafControl = qafOptionControls[i];
                    var elID = qafControl.id.replace('_hidden', '');
                    var options = null;

                    try {
                        var el = $l.get(qafControl.id + '_hidden') || $l.get(qafControl.id);
                        options = eval('(' + el.getAttribute('qaf-options') + ')');
                    } catch (error) {
                        $l.eventLog('$w.contentLoaded', 'elID: "{0}" qaf-options 확인 필요'.format(qafControl.id) + error.message, 'Warning');
                    }

                    if (options && options.transactConfig && options.transactConfig.triggerEvent) {
                        if (qaf.$reflection.isString(options.transactConfig.triggerEvent) == true) {
                            $l.addEvent(elID, options.transactConfig.triggerEvent, function (transactConfig) {
                                var el = this;
                                if (transactConfig && (transactConfig.triggerEvent == null || transactConfig.triggerEvent == undefined)) {
                                    var options = eval('(' + el.getAttribute('qaf-options') + ')');
                                    transactConfig = options.transactConfig;
                                }
                                else {
                                    var options = eval('(' + el.getAttribute('qaf-options') + ')');
                                    if (options && options.transactConfig) {
                                        transactConfig = options.transactConfig;
                                    }
                                }

                                if (transactConfig) {
                                    $w.transactionAction(transactConfig);
                                }
                            });
                        }
                        else if (qaf.$reflection.isArray(options.transactConfig.triggerEvent) == true) {
                            var triggerFunction = function (transactConfig) {
                                var el = this;
                                if (transactConfig && (transactConfig.triggerEvent == null || transactConfig.triggerEvent == undefined)) {
                                    var options = eval('(' + el.getAttribute('qaf-options') + ')');
                                    transactConfig = options.transactConfig;
                                }
                                else {
                                    var options = eval('(' + el.getAttribute('qaf-options') + ')');
                                    if (options && options.transactConfig) {
                                        transactConfig = options.transactConfig;
                                    }
                                }

                                if (transactConfig) {
                                    $w.transactionAction(transactConfig);
                                }
                            };

                            for (var key in options.transactConfig.triggerEvent) {
                                var eventName = options.transactConfig.triggerEvent[key];
                                $l.addEvent(elID, eventName, triggerFunction);
                            }
                        }
                    }

                    if (options && options.triggerConfig && options.triggerConfig.triggerEvent) {
                        if (qaf.$reflection.isString(options.triggerConfig.triggerEvent) == true) {
                            $l.addEvent(elID, options.triggerConfig.triggerEvent, function (triggerConfig) {
                                var el = this;
                                if (triggerConfig && (triggerConfig.triggerEvent == null || triggerConfig.triggerEvent == undefined)) {
                                    var options = eval('(' + el.getAttribute('qaf-options') + ')');
                                    triggerConfig = options.triggerConfig;
                                }
                                else {
                                    var options = eval('(' + el.getAttribute('qaf-options') + ')');
                                    if (options && options.triggerConfig) {
                                        triggerConfig = options.triggerConfig;
                                    }
                                }

                                if (triggerConfig) {
                                    $w.triggerAction(triggerConfig);
                                }
                            });
                        }
                        else if (qaf.$reflection.isArray(options.triggerConfig.triggerEvent) == true) {
                            var triggerFunction = function (triggerConfig) {
                                var el = this;
                                if (triggerConfig && (triggerConfig.triggerEvent == null || triggerConfig.triggerEvent == undefined)) {
                                    var options = eval('(' + el.getAttribute('qaf-options') + ')');
                                    triggerConfig = options.triggerConfig;
                                }
                                else {
                                    var options = eval('(' + el.getAttribute('qaf-options') + ')');
                                    if (options && options.triggerConfig) {
                                        triggerConfig = options.triggerConfig;
                                    }
                                }

                                if (triggerConfig) {
                                    $w.triggerAction(triggerConfig);
                                }
                            };

                            for (var key in options.triggerConfig.triggerEvent) {
                                var eventName = options.triggerConfig.triggerEvent[key];
                                $l.addEvent(elID, eventName, triggerFunction);
                            }
                        }
                    }
                }

                var elem = document.createElement('input');
                elem.type = 'hidden';
                elem.id = 'qafControlList';
                elem.textContent = JSON.stringify(qafControlList);;
                document.body.appendChild(elem);

                if (document.body.style.display == 'none') {
                    document.body.style.display = 'block';
                }

                var mod = context[$w.pageScript];
                if (mod) {
                    mod.qafControls = qafControlList;
                }
                else {
                    context.qafControls = qafControlList;
                }

                $w.remainingReadyIntervalID = setInterval(function () {
                    if ($w.remainingReadyCount == 0) {
                        clearInterval($w.remainingReadyIntervalID);
                        $w.remainingReadyIntervalID = null;
                        pageLoad();
                        $w.isPageLoad = true;
                    }
                }, 25);

                setTimeout(function () {
                    if ($w.remainingReadyIntervalID != null) {
                        $w.remainingReadyCount = 0;
                    }
                }, $w.pageReadyTimeout);
            };

            if ($w.mappingModule == true) {
                $w.moduleReadyIntervalID = setInterval(function () {
                    var mod = context[$w.pageScript];
                    if (mod) {
                        clearInterval($w.moduleReadyIntervalID);
                        $w.moduleReadyIntervalID = null;

                        if (context.domainLibraryLoad) {
                            domainLibraryLoad();
                        }

                        if ($w.appInfo && $w.appInfo.mappingModel) {
                            var argArgs = $r.getCookie('qaf.iscache') == 'true' ? '' : '?bust=' + new Date().getTime();
                            var moduleJsonFile = $w.pageScript.replace('$', '') + '.json';
                            if (context.moduleJsonFile) {
                                moduleJsonFile = context.moduleJsonFile;
                            }

                            $w.loadJSON(moduleJsonFile + argArgs, mod, function (mod, json) {
                                mod.mappingModel = json;
                            }, pageFormInit, true);
                        }
                        else {
                            pageFormInit();
                        }
                    }
                }, 50);

                setTimeout(function () {
                    if ($w.moduleReadyIntervalID != null) {
                        clearInterval($w.moduleReadyIntervalID);
                        $w.moduleReadyIntervalID = null;
                        $l.eventLog('$w.contentLoaded', '"{0}" 모듈 확인 필요'.format($w.pageScript), 'Error');
                    }
                }, $w.pageReadyTimeout);
            }
            else {
                pageLoad();
                $w.isPageLoad = true;
            }
        },

        addReadyCount: function () {
            if ($w.eventAddReady && $w.isPageLoad == false) {
                document.dispatchEvent($w.eventAddReady);
            }
        },

        removeReadyCount: function () {
            if ($w.eventRemoveReady && $w.isPageLoad == false) {
                document.dispatchEvent($w.eventRemoveReady);
            }
        },

        createSelection: function (el, start, end) {
            /// <summary>
            /// 지정된 요소의 텍스트 영역을 선택합니다.
            /// </summary>
            /// <param name='el' type='Element'>텍스트 영역을 선택할 HTML 요소입니다.</param>
            /// <param name='start' type='Integer'>텍스트 영역의 시작 인덱스입니다.</param>
            /// <param name='end' type='Integer'>텍스트 영역의 끝 인덱스입니다.</param>
            el = $ref.isString(el) == true ? $l.get(el) : el;
            if (el.createTextRange) {
                var newend = end - start;
                var selRange = el.createTextRange();
                selRange.collapse(true);
                selRange.moveStart('character', start);
                selRange.moveEnd('character', newend);
                selRange.select();
                newend = null;
                selRange = null;
            }
            else if (el.setSelectionRange) {
                el.setSelectionRange(start, end);
            }

            el.focus();
        },

        argumentsExtend: function () {
            var extended = {};

            for (var key in arguments) {
                var argument = arguments[key];
                for (var prop in argument) {
                    if (Object.prototype.hasOwnProperty.call(argument, prop)) {
                        extended[prop] = argument[prop];
                    }
                }
            }

            return extended;
        },

        loadJSON: function (url, setting, success, callback, async, isForceCallback) {
            if (async == undefined || async == null) {
                async = true;
            }

            if (isForceCallback == undefined || isForceCallback == null) {
                isForceCallback = false;
            }

            var xhr = new XMLHttpRequest();
            if (async === true) {
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            if (success) {
                                success(setting, JSON.parse(xhr.responseText));
                            }

                            if (callback) {
                                callback();
                            }
                        }
                        else {
                            $l.eventLog('$w.loadJSON', 'async url: ' + url + ', status: ' + xhr.status.toString() + ', responseText: ' + xhr.responseText, 'Error');
                        }

                        if (xhr.status !== 200 && callback && isForceCallback == true) {
                            callback();
                        }
                    }
                };
                xhr.open('GET', url, true);
                xhr.send();
            }
            else {
                xhr.open('GET', url, false);
                xhr.send();

                if (xhr.status === 200) {
                    if (success) {
                        success(setting, JSON.parse(xhr.responseText));
                    }

                    if (callback) {
                        callback();
                    }
                }
                else {
                    $l.eventLog('$w.loadJSON', 'sync url: ' + url + ', status: ' + xhr.status.toString() + ', responseText: ' + xhr.responseText, 'Error');
                }

                if (callback && isForceCallback == true) {
                    callback();
                }
            }
        },

        getTriggerOptions: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return JSON.parse(el.getAttribute('triggerOptions'));
        },

        triggerAction: function (triggerConfig) {
            if ($this) {
                var isContinue = true;

                var defaultParams = {
                    args: [],
                    options: {}
                };

                triggerConfig.params = $w.argumentsExtend(defaultParams, triggerConfig.params);

                if ($this.beforeTrigger) {
                    isContinue = $this.beforeTrigger(triggerConfig.triggerID, triggerConfig.action, triggerConfig.params);
                }

                if (isContinue == null || isContinue == undefined || isContinue == true) {
                    var el = $l.get(triggerConfig.triggerID);
                    var triggerResult = null;
                    var trigger = null;

                    // $로 시작하면 uicontrol 컨트롤 메서드, 아니면 화면 컨트롤 이벤트명
                    if (triggerConfig.action.indexOf('$') > -1) {
                        trigger = $this;
                        var currings = triggerConfig.action.split('.');
                        if (currings.length > 0) {
                            for (var i = 0; i < currings.length; i++) {
                                var curring = currings[i];
                                if (trigger) {
                                    trigger = trigger[curring];
                                }
                                else {
                                    trigger = context[curring];
                                }
                            }
                        }
                        else {
                            trigger = context[triggerConfig.action];
                        }
                    }
                    else {
                        trigger = $this[triggerConfig.triggerID + '_' + triggerConfig.action];
                    }

                    if (trigger) {
                        el.setAttribute('triggerOptions', JSON.stringify(triggerConfig.params.options));

                        if (triggerConfig.action.indexOf('$') > -1) {
                            $array.addAt(triggerConfig.params.args, 0, triggerConfig.triggerID);
                        }

                        triggerResult = trigger.apply(el, triggerConfig.params.args);
                        if ($this.afterTrigger) {
                            $this.afterTrigger(null, triggerConfig.action, {
                                elID: triggerConfig.triggerID,
                                result: triggerResult
                            });
                        }
                    }
                    else {
                        if ($this.afterTrigger) {
                            $this.afterTrigger('{0} trigger 확인 필요'.format(triggerConfig.action), triggerConfig.action, null);
                        }
                    }
                }
                else {
                    if ($this.afterTrigger) {
                        $this.afterTrigger('beforeTrigger continue false', triggerConfig.action, null);
                    }
                }
            }
        },

        transactionAction: function (transactConfig) {
            if ($this && $this.mappingModel) {
                if ($w.progressMessage) {
                    $w.progressMessage($res.progress);
                }

                try {
                    if ($this.mappingModel.Transactions == null || $this.mappingModel.Transactions == undefined) {
                        $this.mappingModel.Transactions = [];
                    }

                    var isContinue = true;

                    if ($this.beforeTransaction) {
                        isContinue = $this.beforeTransaction(transactConfig);
                    }

                    if (isContinue == null || isContinue == undefined || isContinue == true) {
                        var transactions = $this.mappingModel.Transactions;
                        for (var i = 0; i < transactions.length; i++) {
                            if (transactConfig.functionID == transactions[i].FunctionID) {
                                transactions.splice(i, 1);
                                break;
                            }
                        }

                        var qafControlList = $this.qafControls;
                        var transactionObject = {};
                        transactionObject.FunctionID = transactConfig.functionID;
                        transactionObject.Inputs = [];
                        transactionObject.Outputs = [];

                        if (transactConfig.inputs) {
                            var inputs = transactConfig.inputs;
                            var inputsLength = inputs.length;
                            for (var i = 0; i < inputsLength; i++) {
                                var inputConfig = inputs[i];
                                var input = {
                                    RequestType: inputConfig.type,
                                    DataFieldID: inputConfig.dataFieldID ? inputConfig.dataFieldID : document.forms.length > 0 ? document.forms[0].getAttribute('qaf-datafield') : '',
                                    Items: {}
                                };

                                var qafControlConfigs = null;
                                if (inputConfig.type == 'Row') {
                                    var qafControlConfigs = qafControlList.filter(function (item) {
                                        return item.formDataFieldID == input.DataFieldID && ['grid', 'chart', 'chartjs'].indexOf(item.type) == -1;
                                    });

                                    if (qafControlConfigs && qafControlConfigs.length > 0) {
                                        for (var k = 0; k < qafControlConfigs.length; k++) {
                                            var qafControlConfig = qafControlConfigs[k];

                                            var el = $l.get(qafControlConfig.id + '_hidden') || $l.get(qafControlConfig.id);
                                            var options = el.getAttribute('qaf-options');
                                            if (options == null) {
                                                continue;
                                            }

                                            var qafOptions = null;

                                            try {
                                                qafOptions = JSON.parse(options);
                                            } catch (e) {
                                                qafOptions = eval('(' + options + ')');
                                            }

                                            if (qafOptions == null || qafControlConfig.field == '') {
                                                continue;
                                            }

                                            var isBelong = false;
                                            if (qafOptions.belongID) {
                                                if (qaf.$reflection.isString(qafOptions.belongID) == true) {
                                                    isBelong = transactConfig.functionID == qafOptions.belongID;
                                                }
                                                else if (qaf.$reflection.isArray(qafOptions.belongID) == true) {
                                                    isBelong = qafOptions.belongID.indexOf(transactConfig.functionID) > -1;
                                                }
                                            }

                                            if (isBelong == true) {
                                                input.Items[qafControlConfig.field] = {
                                                    FieldID: qafControlConfig.field,
                                                    DataType: qafOptions.dataType
                                                };
                                            }
                                        }
                                    }
                                    else {
                                        var qafControlConfigs = qafControlList.filter(function (item) {
                                            return item.field == input.DataFieldID && item.type == 'grid';
                                        });

                                        if (qafControlConfigs && qafControlConfigs.length > 0) {
                                            for (var k = 0; k < qafControlConfigs.length; k++) {
                                                var qafControlConfig = qafControlConfigs[k];

                                                var el = $l.get(qafControlConfig.id + '_hidden') || $l.get(qafControlConfig.id);
                                                var qafOptions = JSON.parse(el.getAttribute('qaf-options'));

                                                if (qafOptions == null) {
                                                    continue;
                                                }

                                                for (var l = 0; l < qafOptions.columns.length; l++) {
                                                    var column = qafOptions.columns[l];
                                                    var dataType = 'string'
                                                    switch (column.columnType) {
                                                        case 'checkbox':
                                                            dataType = 'bool';
                                                            break;
                                                        case 'numeric':
                                                            dataType = 'int';
                                                            break;
                                                        // case 'date':
                                                        //     dataType = 'date';
                                                        //     break;
                                                    }

                                                    var isBelong = false;
                                                    if (column.data == 'Flag') {
                                                        isBelong = true;
                                                    }
                                                    else if (column.belongID) {
                                                        if (qaf.$reflection.isString(column.belongID) == true) {
                                                            isBelong = transactConfig.functionID == column.belongID;
                                                        }
                                                        else if (qaf.$reflection.isArray(column.belongID) == true) {
                                                            isBelong = column.belongID.indexOf(transactConfig.functionID) > -1;
                                                        }
                                                    }

                                                    if (isBelong == true) {
                                                        input.Items[column.data] = {
                                                            FieldID: column.data,
                                                            DataType: dataType
                                                        };
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            if ($this.$data && $this.$data.storeList.length > 0) {
                                                for (var k = 0; k < $this.$data.storeList.length; k++) {
                                                    var store = $this.$data.storeList[k];
                                                    if (store.storeType == 'Form' && store.dataSourceID == input.DataFieldID) {
                                                        for (var l = 0; l < store.columns.length; l++) {
                                                            var column = store.columns[l];
                                                            var isBelong = false;
                                                            if (qaf.$reflection.isString(column.belongID) == true) {
                                                                isBelong = transactConfig.functionID == column.belongID;
                                                            }
                                                            else if (qaf.$reflection.isArray(column.belongID) == true) {
                                                                isBelong = column.belongID.indexOf(transactConfig.functionID) > -1;
                                                            }

                                                            if (isBelong == true) {
                                                                input.Items[column.data] = {
                                                                    FieldID: column.data,
                                                                    DataType: column.dataType
                                                                };
                                                            }
                                                        }

                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                else if (inputConfig.type == 'List') {
                                    var qafControlConfigs = qafControlList.filter(function (item) {
                                        return item.field == input.DataFieldID && item.type == 'grid';
                                    });

                                    if (qafControlConfigs && qafControlConfigs.length == 1) {
                                        var qafControlConfig = qafControlConfigs[0];

                                        var el = $l.get(qafControlConfig.id + '_hidden') || $l.get(qafControlConfig.id);
                                        var qafOptions = JSON.parse(el.getAttribute('qaf-options'));

                                        if (qafOptions == null) {
                                            continue;
                                        }

                                        for (var k = 0; k < qafOptions.columns.length; k++) {
                                            var column = qafOptions.columns[k];
                                            var dataType = 'string'
                                            switch (column.columnType) {
                                                case 'checkbox':
                                                    dataType = 'bool';
                                                    break;
                                                case 'numeric':
                                                    dataType = 'int';
                                                    break;
                                                // case 'date':
                                                //     dataType = 'date';
                                                //     break;
                                            }

                                            var isBelong = false;
                                            if (column.data == 'Flag') {
                                                isBelong = true;
                                            }
                                            else if (column.belongID) {
                                                if (qaf.$reflection.isString(column.belongID) == true) {
                                                    isBelong = transactConfig.functionID == column.belongID;
                                                }
                                                else if (qaf.$reflection.isArray(column.belongID) == true) {
                                                    isBelong = column.belongID.indexOf(transactConfig.functionID) > -1;
                                                }
                                            }

                                            if (isBelong == true) {
                                                input.Items[column.data] = {
                                                    FieldID: column.data,
                                                    DataType: dataType
                                                };
                                            }
                                        }
                                    }
                                    else {
                                        var isMapping = false;
                                        if ($this.$data && $this.$data.storeList.length > 0) {
                                            for (var k = 0; k < $this.$data.storeList.length; k++) {
                                                var store = $this.$data.storeList[k];
                                                if (store.storeType == 'Grid' && store.dataSourceID == input.DataFieldID) {
                                                    isMapping = true;
                                                    for (var l = 0; l < store.columns.length; l++) {
                                                        var column = store.columns[l];
                                                        var isBelong = false;
                                                        if (qaf.$reflection.isString(column.belongID) == true) {
                                                            isBelong = transactConfig.functionID == column.belongID;
                                                        }
                                                        else if (qaf.$reflection.isArray(column.belongID) == true) {
                                                            isBelong = column.belongID.indexOf(transactConfig.functionID) > -1;
                                                        }

                                                        if (isBelong == true) {
                                                            input.Items[column.data] = {
                                                                FieldID: column.data,
                                                                DataType: column.dataType
                                                            };
                                                        }
                                                    }

                                                    break;
                                                }
                                            }
                                        }

                                        if (isMapping == false) {
                                            $l.eventLog('$w.transactionAction', '{0} 컬럼 ID 중복 또는 존재여부 확인 필요'.format(input.DataFieldID), 'Warning');
                                        }
                                    }
                                }

                                transactionObject.Inputs.push(input);
                            }
                        }

                        if (transactConfig.outputs) {
                            var outputs = transactConfig.outputs;
                            var outputsLength = outputs.length;
                            var qafControls = $this.qafControls;
                            for (var i = 0; i < outputsLength; i++) {
                                var outputConfig = outputs[i];
                                var output = {
                                    ResponseType: outputConfig.type,
                                    DataFieldID: outputConfig.dataFieldID ? outputConfig.dataFieldID : '',
                                    Items: {}
                                };

                                var qafControlConfigs = null;
                                if (outputConfig.type == 'Form') {
                                    var qafControlConfigs = qafControlList.filter(function (item) {
                                        return item.formDataFieldID == output.DataFieldID && ['grid', 'chart', 'chartjs'].indexOf(item.type) == -1;
                                    });

                                    if (qafControlConfigs && qafControlConfigs.length > 0) {
                                        for (var k = 0; k < qafControlConfigs.length; k++) {
                                            var qafControlConfig = qafControlConfigs[k];

                                            var el = $l.get(qafControlConfig.id + '_hidden') || $l.get(qafControlConfig.id);
                                            var options = el.getAttribute('qaf-options');
                                            if (options == null) {
                                                continue;
                                            }

                                            var qafOptions = null;

                                            try {
                                                qafOptions = JSON.parse(options);
                                            } catch (e) {
                                                qafOptions = eval('(' + options + ')');
                                            }

                                            if (qafOptions == null || qafControlConfig.field == '') {
                                                continue;
                                            }

                                            output.Items[qafControlConfig.field] = {
                                                FieldID: qafControlConfig.field,
                                                DataType: qafOptions.dataType
                                            };

                                            if (outputConfig.clear == true) {
                                                if (qafControls && qafControls.length == 1) {
                                                    var bindingControlInfos = qafControls.filter(function (item) {
                                                        return item.field == outputConfig.dataFieldID;
                                                    });

                                                    if (bindingControlInfos.length == 1) {
                                                        var controlInfo = bindingControlInfos[0];
                                                        if (controlInfo.module == null) {
                                                            continue;
                                                        }

                                                        var controlID = controlInfo.id;
                                                        var controlField = controlInfo.field;
                                                        var controlModule = null;
                                                        var currings = controlInfo.module.split('.');
                                                        if (currings.length > 0) {
                                                            for (var l = 0; l < currings.length; l++) {
                                                                var curring = currings[l];
                                                                if (controlModule) {
                                                                    controlModule = controlModule[curring];
                                                                }
                                                                else {
                                                                    controlModule = context[curring];
                                                                }
                                                            }
                                                        }
                                                        else {
                                                            controlModule = context[controlInfo.module];
                                                        }

                                                        if (controlModule.clear) {
                                                            controlModule.clear(controlID);
                                                        }
                                                    }
                                                    else {
                                                        $l.eventLog('$w.transactionAction', '{0} DataFieldID 중복 또는 존재여부 확인 필요'.format(outputConfig.dataFieldID), 'Warning');
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        if ($this.$data && $this.$data.storeList.length > 0) {
                                            for (var k = 0; k < $this.$data.storeList.length; k++) {
                                                var store = $this.$data.storeList[k];
                                                if (store.storeType == 'Form' && store.dataSourceID == output.DataFieldID) {
                                                    for (var l = 0; l < store.columns.length; l++) {
                                                        var column = store.columns[l];

                                                        output.Items[column.data] = {
                                                            FieldID: column.data,
                                                            DataType: column.dataType
                                                        };
                                                    }

                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                                else if (outputConfig.type == 'Grid') {
                                    var qafControlConfigs = qafControlList.filter(function (item) {
                                        return item.field == output.DataFieldID && item.type == 'grid';
                                    });

                                    if (qafControlConfigs && qafControlConfigs.length == 1) {
                                        var qafControlConfig = qafControlConfigs[0];

                                        var el = $l.get(qafControlConfig.id + '_hidden') || $l.get(qafControlConfig.id);
                                        var qafOptions = JSON.parse(el.getAttribute('qaf-options'));

                                        if (qafOptions == null) {
                                            continue;
                                        }

                                        for (var k = 0; k < qafOptions.columns.length; k++) {
                                            var column = qafOptions.columns[k];
                                            var dataType = 'string'
                                            switch (column.type) {
                                                case 'checkbox':
                                                    dataType = 'bool';
                                                    break;
                                                case 'numeric':
                                                    dataType = 'int';
                                                    break;
                                                // case 'date':
                                                //     dataType = 'date';
                                                //     break;
                                            }

                                            output.Items[column.data] = {
                                                FieldID: column.data,
                                                DataType: dataType
                                            };
                                        }

                                        if (outputConfig.clear == true) {
                                            if (qafControls && qafControls.length > 0) {
                                                var bindingControlInfos = qafControls.filter(function (item) {
                                                    return item.field == output.DataFieldID;
                                                });

                                                var controlInfo = bindingControlInfos[0];
                                                var controlModule = null;
                                                var currings = controlInfo.module.split('.');
                                                if (currings.length > 0) {
                                                    for (var i = 0; i < currings.length; i++) {
                                                        var curring = currings[i];
                                                        if (controlModule) {
                                                            controlModule = controlModule[curring];
                                                        }
                                                        else {
                                                            controlModule = context[curring];
                                                        }
                                                    }
                                                }
                                                else {
                                                    controlModule = context[controlInfo.module];
                                                }

                                                if (controlModule.clear) {
                                                    controlModule.clear(controlInfo.id);
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        qafControlConfigs = qafControlList.filter(function (item) {
                                            return item.field == output.DataFieldID && ['chart', 'chartjs'].indexOf(item.type) > -1;
                                        });

                                        if (qafControlConfigs && qafControlConfigs.length == 1) {
                                            var qafControlConfig = qafControlConfigs[0];

                                            var el = $l.get(qafControlConfig.id + '_hidden') || $l.get(qafControlConfig.id);
                                            var qafOptions = JSON.parse(el.getAttribute('qaf-options'));

                                            if (qafOptions == null) {
                                                continue;
                                            }

                                            for (var k = 0; k < qafOptions.series.length; k++) {
                                                var column = qafOptions.series[k];
                                                output.Items[column.columnID] = {
                                                    FieldID: column.columnID,
                                                    DataType: column.dataType ? column.dataType : 'string'
                                                };
                                            }

                                            if (outputConfig.clear == true) {
                                                if (qafControls && qafControls.length == 1) {
                                                    var bindingControlInfos = qafControls.filter(function (item) {
                                                        return item.field == outputConfig.dataFieldID;
                                                    });

                                                    if (bindingControlInfos.length == 1) {
                                                        var controlInfo = bindingControlInfos[0];
                                                        if (controlInfo.module == null) {
                                                            continue;
                                                        }

                                                        var controlID = controlInfo.id;
                                                        var controlField = controlInfo.field;
                                                        var controlModule = null;
                                                        var currings = controlInfo.module.split('.');
                                                        if (currings.length > 0) {
                                                            for (var l = 0; l < currings.length; l++) {
                                                                var curring = currings[l];
                                                                if (controlModule) {
                                                                    controlModule = controlModule[curring];
                                                                }
                                                                else {
                                                                    controlModule = context[curring];
                                                                }
                                                            }
                                                        }
                                                        else {
                                                            controlModule = context[controlInfo.module];
                                                        }

                                                        if (controlModule.clear) {
                                                            controlModule.clear(controlID);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            var isMapping = false;
                                            if ($this.$data && $this.$data.storeList.length > 0) {
                                                for (var k = 0; k < $this.$data.storeList.length; k++) {
                                                    var store = $this.$data.storeList[k];
                                                    if (store.storeType == 'Grid' && store.dataSourceID == output.DataFieldID) {
                                                        isMapping = true;

                                                        for (var l = 0; l < store.columns.length; l++) {
                                                            var column = store.columns[l];

                                                            output.Items[column.data] = {
                                                                FieldID: column.data,
                                                                DataType: column.dataType
                                                            };
                                                        }

                                                        break;
                                                    }
                                                }
                                            }

                                            if (isMapping == false) {
                                                $l.eventLog('$w.transactionAction', '{0} DataFieldID 중복 또는 존재여부 확인 필요'.format(output.DataFieldID), 'Warning');
                                            }
                                        }
                                    }
                                }

                                transactionObject.Outputs.push(output);
                            }
                        }

                        $this.mappingModel.Transactions.push(transactionObject);
                        $w.transaction(transactConfig.functionID, function (responseObject, addtionalData) {
                            var error = null;
                            if (responseObject && responseObject.ErrorText.length > 0) {
                                error = responseObject.ErrorText[0];
                                $l.eventLog('$w.transaction.callback', error, 'Error');
                            }

                            var callbackResult = null;
                            if (transactConfig.callback && $ref.isFunction(transactConfig.callback) == true) {
                                callbackResult = transactConfig.callback(error, responseObject, addtionalData);
                            }

                            if (callbackResult == null || callbackResult === true) {
                                if ($this.afterTransaction) {
                                    $this.afterTransaction(null, transactConfig.functionID, responseObject, addtionalData);
                                }
                            }
                            else if (callbackResult === false) {
                                if ($this.afterTransaction) {
                                    $this.afterTransaction('callbackResult continue false', transactConfig.functionID, null, null);
                                }
                            }

                            if (transactConfig.callback && $ref.isArray(transactConfig.callback) == true) {
                                setTimeout(function () {
                                    var eventData = {
                                        error: error,
                                        responseObject: responseObject,
                                        addtionalData: addtionalData
                                    }
                                    $l.trigger(transactConfig.callback[0], transactConfig.callback[1], eventData);
                                });
                            }
                        }, transactConfig.triggerMessage);
                    }
                    else {
                        if ($w.closeProgressMessage) {
                            $w.closeProgressMessage();
                        }

                        if ($this.afterTransaction) {
                            $this.afterTransaction('beforeTransaction continue false', transactConfig.functionID, null, null);
                        }
                    }
                } catch (error) {
                    $l.eventLog('$w.transactionAction', error, 'Error');

                    if ($w.closeProgressMessage) {
                        $w.closeProgressMessage();
                    }
                }
            }
        },

        transactionDirect: function (directObject, callback) {
            /*
            var directObject = {
                ProgramID: 'SVU',
                BusinessID: 'ZZW',
                SystemID: 'BP01',
                TransactionID: 'ZZA010',
                FunctionID: 'L01',
                DataTransactionInterface: 'Row|Form',
                TransactionResult: true,
                InputObjects: [
                    { prop: 'ApplicationID', val: '' },
                    { prop: 'ProjectID', val: '' },
                    { prop: 'TransactionID', val: '' }
                ]
            };

            $w.transactionDirect(directObject, function (responseData, addtionalData) {
                debugger;
            });
            */
            directObject.TransactionResult = (directObject.TransactionResult == null || directObject.TransactionResult == undefined) ? true : directObject.TransactionResult === true;
            var transactionObject = $w.transactionObject(directObject.FunctionID, 'Json');

            transactionObject.ProgramID = directObject.ProgramID;
            transactionObject.BusinessID = directObject.BusinessID;
            transactionObject.SystemID = directObject.SystemID;
            transactionObject.TransactionID = directObject.TransactionID;
            transactionObject.DataTransactionInterface = directObject.DataTransactionInterface || 'Row|Form';
            transactionObject.TransactionResult = (directObject.TransactionResult == null || directObject.TransactionResult == undefined) ? true : directObject.TransactionResult === true;

            if (isNodejs == true) {
                transactionObject.ScreenID = directObject.ScreenID || directObject.TransactionID;
            }
            else {
                transactionObject.ScreenID = $w.pageScript.replace('$', '');
            }

            transactionObject.Inputs.push(directObject.InputObjects);
            transactionObject.InputsItemCount.push(1);

            $w.executeTransaction(directObject, transactionObject, function (responseData, addtionalData) {
                if (callback) {
                    callback(responseData, addtionalData);
                }
            });
        },

        transaction: function (functionID, callback, message) {
            try {
                if ($w.domainTransactionLoaderStart) {
                    $w.domainTransactionLoaderStart();
                }

                if (message) {
                    if ($w.progressMessage) {
                        $w.progressMessage(message);
                    }
                }

                var responseObject = {
                    ErrorText: [],
                    OutputStat: []
                };

                if ($this && $this.mappingModel && $this.mappingModel.Transactions) {
                    var transactions = $this.mappingModel.Transactions.filter(function (item) {
                        return item.FunctionID == functionID;
                    });

                    if (transactions.length == 1) {
                        var transaction = transactions[0];
                        var transactionObject = $w.transactionObject(transaction.FunctionID, 'Json');

                        transactionObject.ProgramID = $this.mappingModel.ProgramID;
                        transactionObject.BusinessID = $this.mappingModel.BusinessID;
                        transactionObject.SystemID = $this.mappingModel.SystemID;
                        transactionObject.TransactionID = $this.mappingModel.TransactionID;
                        transactionObject.ScreenID = $w.pageScript.replace('$', '');

                        // qafControls 컨트롤 목록
                        var qafControls = context[$w.pageScript]['qafControls'];

                        // Input Mapping
                        var inputLength = transaction.Inputs.length;
                        for (var inputIndex = 0; inputIndex < inputLength; inputIndex++) {
                            var inputMapping = transaction.Inputs[inputIndex];
                            var inputObjects = [];

                            if (inputMapping.RequestType == 'Row') {
                                var bindingControlInfos = qafControls.filter(function (item) {
                                    return item.field == inputMapping.DataFieldID;
                                });

                                if (bindingControlInfos.length == 1) {
                                    var controlInfo = bindingControlInfos[0];

                                    if (['grid', 'chart'].indexOf(controlInfo.type) > -1) {
                                        var dataFieldID = inputMapping.DataFieldID; // qaf-datafield

                                        var controlValue = '';
                                        if (qafControls && qafControls.length > 0) {
                                            bindingControlInfos = qafControls.filter(function (item) {
                                                return item.field == dataFieldID;
                                            });

                                            if (bindingControlInfos.length == 1) {
                                                var controlInfo = bindingControlInfos[0];
                                                var controlModule = null;
                                                var currings = controlInfo.module.split('.');
                                                if (currings.length > 0) {
                                                    for (var i = 0; i < currings.length; i++) {
                                                        var curring = currings[i];
                                                        if (controlModule) {
                                                            controlModule = controlModule[curring];
                                                        }
                                                        else {
                                                            controlModule = context[curring];
                                                        }
                                                    }
                                                }
                                                else {
                                                    controlModule = context[controlInfo.module];
                                                }

                                                var el = $l.get(controlInfo.id + '_hidden') || $l.get(controlInfo.id);
                                                var qafOptions = JSON.parse(el.getAttribute('qaf-options'));

                                                for (var k = 0; k < qafOptions.columns.length; k++) {
                                                    var column = qafOptions.columns[k];
                                                    if (column.validators && $validation.transactionValidate) {
                                                        column.controlText = qafOptions.controlText || '';
                                                        var isValidate = $validation.transactionValidate(controlModule, controlInfo, column, inputMapping.RequestType);

                                                        if (isValidate == false) {
                                                            if ($this.afterTransaction) {
                                                                $this.afterTransaction('validators continue false', functionID, column, null);
                                                            }

                                                            if ($w.domainTransactionLoaderEnd) {
                                                                $w.domainTransactionLoaderEnd();
                                                            }

                                                            return false;
                                                        }
                                                    }
                                                }

                                                inputObjects = controlModule.getValue(controlInfo.id, 'Row', inputMapping.Items)[0];
                                            }
                                            else {
                                                $l.eventLog('$w.transaction', '"{0}" Row List Input Mapping 확인 필요'.format(dataFieldID), 'Warning');
                                            }
                                        }
                                    }
                                    else {
                                        for (var key in inputMapping.Items) {
                                            var meta = inputMapping.Items[key];
                                            var dataFieldID = key; // qaf-datafield
                                            var fieldID = meta.FieldID; // DbColumnID
                                            var dataType = meta.DataType;
                                            var serviceObject = { prop: fieldID, val: '' };

                                            var controlValue = '';
                                            if (qafControls.length > 0) {
                                                bindingControlInfos = qafControls.filter(function (item) {
                                                    return item.field == dataFieldID && item.formDataFieldID == inputMapping.DataFieldID;
                                                });

                                                if (bindingControlInfos.length == 1) {
                                                    var controlInfo = bindingControlInfos[0];
                                                    var controlModule = null;
                                                    var currings = controlInfo.module.split('.');
                                                    if (currings.length > 0) {
                                                        for (var i = 0; i < currings.length; i++) {
                                                            var curring = currings[i];
                                                            if (controlModule) {
                                                                controlModule = controlModule[curring];
                                                            }
                                                            else {
                                                                controlModule = context[curring];
                                                            }
                                                        }
                                                    }
                                                    else {
                                                        controlModule = context[controlInfo.module];
                                                    }

                                                    var el = $l.get(controlInfo.id + '_hidden') || $l.get(controlInfo.id);
                                                    var qafOptions = JSON.parse(el.getAttribute('qaf-options'));

                                                    if (qafOptions.validators && $validation.transactionValidate) {
                                                        var isValidate = $validation.transactionValidate(controlModule, controlInfo, qafOptions, inputMapping.RequestType);

                                                        if (isValidate == false) {
                                                            if ($this.afterTransaction) {
                                                                $this.afterTransaction('validators continue false', functionID, qafOptions, null);
                                                            }

                                                            if ($w.domainTransactionLoaderEnd) {
                                                                $w.domainTransactionLoaderEnd();
                                                            }

                                                            return false;
                                                        }
                                                    }

                                                    controlValue = controlModule.getValue(controlInfo.id, meta);

                                                    if (!controlValue && dataType == 'int') {
                                                        controlValue = 0;
                                                    }
                                                }
                                                else {
                                                    $l.eventLog('$w.transaction', '"{0}" Row Control Input Mapping 확인 필요'.format(dataFieldID), 'Warning');
                                                }
                                            }

                                            serviceObject.val = controlValue;
                                            inputObjects.push(serviceObject);
                                        }
                                    }
                                }
                                else {
                                    if ($this.$data && $this.$data.storeList.length > 0) {
                                        for (var key in inputMapping.Items) {
                                            var isMapping = false;
                                            var meta = inputMapping.Items[key];
                                            var dataFieldID = key; // qaf-datafield
                                            var fieldID = meta.FieldID; // DbColumnID
                                            var dataType = meta.DataType;
                                            var serviceObject = { prop: fieldID, val: '' };

                                            var controlValue = '';
                                            for (var k = 0; k < $this.$data.storeList.length; k++) {
                                                var store = $this.$data.storeList[k];
                                                if (store.storeType == 'Form' && store.dataSourceID == inputMapping.DataFieldID) {
                                                    isMapping = true;
                                                    bindingControlInfos = store.columns.filter(function (item) {
                                                        return item.data == dataFieldID;
                                                    });

                                                    if (bindingControlInfos.length == 1) {
                                                        var controlInfo = bindingControlInfos[0];
                                                        controlValue = $this.store[store.dataSourceID][controlInfo.data];

                                                        if (!controlValue && dataType == 'int') {
                                                            controlValue = 0;
                                                        }

                                                        if (controlValue == null || controlValue == undefined) {
                                                            controlValue = '';
                                                        }
                                                    }
                                                    else {
                                                        $l.eventLog('$w.transaction', '"{0}" Row Input Mapping 확인 필요'.format(dataFieldID), 'Warning');
                                                    }

                                                    break;
                                                }
                                            }

                                            if (isMapping == true) {
                                                serviceObject.val = controlValue;
                                                inputObjects.push(serviceObject);
                                            }
                                            else {
                                                $l.eventLog('$w.transaction', '{0} Row 컨트롤 ID 중복 또는 존재여부 확인 필요'.format(inputMapping.DataFieldID), 'Warning');
                                            }
                                        }
                                    }
                                }

                                transactionObject.Inputs.push(inputObjects); // transactionObject.Inputs.push($reflection.clone(inputObjects));
                                transactionObject.InputsItemCount.push(1);
                            }
                            else if (inputMapping.RequestType == 'List') {
                                var dataFieldID = inputMapping.DataFieldID; // qaf-datafield

                                var controlValue = '';
                                if (qafControls && qafControls.length > 0) {
                                    var bindingControlInfos = qafControls.filter(function (item) {
                                        return item.field == dataFieldID;
                                    });

                                    if (bindingControlInfos.length == 1) {
                                        var controlInfo = bindingControlInfos[0];
                                        var controlModule = null;
                                        var currings = controlInfo.module.split('.');
                                        if (currings.length > 0) {
                                            for (var i = 0; i < currings.length; i++) {
                                                var curring = currings[i];
                                                if (controlModule) {
                                                    controlModule = controlModule[curring];
                                                }
                                                else {
                                                    controlModule = context[curring];
                                                }
                                            }
                                        }
                                        else {
                                            controlModule = context[controlInfo.module];
                                        }

                                        var el = $l.get(controlInfo.id + '_hidden') || $l.get(controlInfo.id);
                                        var qafOptions = JSON.parse(el.getAttribute('qaf-options'));

                                        for (var k = 0; k < qafOptions.columns.length; k++) {
                                            var column = qafOptions.columns[k];
                                            column.controlText = qafOptions.controlText || '';
                                            if (column.validators && $validation.transactionValidate) {
                                                var isValidate = $validation.transactionValidate(controlModule, controlInfo, column, inputMapping.RequestType);

                                                if (isValidate == false) {
                                                    if ($this.afterTransaction) {
                                                        $this.afterTransaction('validators continue false', functionID, column, null);
                                                    }

                                                    if ($w.domainTransactionLoaderEnd) {
                                                        $w.domainTransactionLoaderEnd();
                                                    }

                                                    return false;
                                                }
                                            }
                                        }

                                        inputObjects = controlModule.getValue(controlInfo.id, 'List', inputMapping.Items);
                                    }
                                    else {
                                        var isMapping = false;
                                        if ($this.$data && $this.$data.storeList.length > 0) {
                                            for (var k = 0; k < $this.$data.storeList.length; k++) {
                                                var store = $this.$data.storeList[k];
                                                if (store.storeType == 'Grid' && store.dataSourceID == dataFieldID) {
                                                    isMapping = true;
                                                    var bindingInfo = $this.$data.bindingList.find(function (item) {
                                                        return (item.dataSourceID == store.dataSourceID && item.controlType == 'grid');
                                                    });

                                                    if (bindingInfo) {
                                                        inputObjects = $this.store[store.dataSourceID][bindingInfo.dataFieldID];
                                                    }
                                                    else {
                                                        var controlValue = [];
                                                        var items = $this.store[store.dataSourceID];
                                                        var length = items.length;
                                                        for (var i = 0; i < length; i++) {
                                                            var item = items[i];

                                                            var row = [];
                                                            for (var key in item) {
                                                                var serviceObject = { prop: key, val: item[key] };
                                                                row.push(serviceObject);
                                                            }
                                                            controlValue.push(row);
                                                        }

                                                        inputObjects = controlValue;
                                                    }

                                                    break;
                                                }
                                            }
                                        }

                                        if (isMapping == false) {
                                            $l.eventLog('$w.transaction', '"{0}" List Input Mapping 확인 필요'.format(dataFieldID), 'Warning');
                                        }
                                    }
                                }

                                for (var key in inputObjects) {
                                    transactionObject.Inputs.push(inputObjects[key]);
                                }
                                transactionObject.InputsItemCount.push(inputObjects.length);
                            }
                        }

                        $w.executeTransaction($this.mappingModel, transactionObject, function (responseData, addtionalData) {
                            var errorText = '';
                            var isDynamicOutput = false;
                            for (var i = 0; i < transaction.Outputs.length; i++) {
                                if (transaction.Outputs[i].ResponseType == 'Dynamic') {
                                    isDynamicOutput = true;
                                    break;
                                }
                            }

                            if (isDynamicOutput == true) {
                                responseObject.OutputStat.push({
                                    FieldID: 'Dynamic',
                                    Count: 1,
                                    DynamicData: responseData
                                });
                            }
                            else {
                                if (responseData.length == transaction.Outputs.length) {
                                    // qafControls 컨트롤 목록
                                    var qafControls = context[$w.pageScript]['qafControls'];

                                    // Output Mapping을 설정
                                    var outputLength = transaction.Outputs.length;
                                    for (var outputIndex = 0; outputIndex < outputLength; outputIndex++) {
                                        var outputMapping = transaction.Outputs[outputIndex];
                                        var RES_OUTPUT = responseData[outputIndex];
                                        var responseFieldID = RES_OUTPUT['RES_FIELD_ID'];
                                        var outputData = RES_OUTPUT['RES_DAT'];

                                        if (outputMapping.ResponseType == 'Form') {
                                            if (outputData.length) {
                                                responseObject.OutputStat.push({
                                                    FieldID: responseFieldID,
                                                    Count: 0
                                                });

                                                errorText = '"{0}" Form Output Mapping 확인 필요'.format(responseFieldID);
                                                responseObject.ErrorText.push(errorText);
                                                $l.eventLog('$w.transaction', errorText, 'Error');
                                            }
                                            else {
                                                if ($reflection.isObjectEmpty(outputData) == true) {
                                                    responseObject.OutputStat.push({
                                                        FieldID: responseFieldID,
                                                        Count: 0
                                                    });
                                                }
                                                else {
                                                    responseObject.OutputStat.push({
                                                        FieldID: responseFieldID,
                                                        Count: 1
                                                    });

                                                    for (var key in outputMapping.Items) {
                                                        var meta = outputMapping.Items[key];
                                                        var dataFieldID = key; // qaf-datafield
                                                        var fieldID = meta.FieldID; // DbColumnID

                                                        var controlValue = outputData[fieldID];
                                                        if (controlValue != undefined && qafControls && qafControls.length > 0) {
                                                            var bindingControlInfos = qafControls.filter(function (item) {
                                                                return item.field == dataFieldID && item.formDataFieldID == outputMapping.DataFieldID;
                                                            });

                                                            if (bindingControlInfos.length == 1) {
                                                                var controlInfo = bindingControlInfos[0];
                                                                var controlModule = null;
                                                                var currings = controlInfo.module.split('.');
                                                                if (currings.length > 0) {
                                                                    for (var i = 0; i < currings.length; i++) {
                                                                        var curring = currings[i];
                                                                        if (controlModule) {
                                                                            controlModule = controlModule[curring];
                                                                        }
                                                                        else {
                                                                            controlModule = context[curring];
                                                                        }
                                                                    }
                                                                }
                                                                else {
                                                                    controlModule = context[controlInfo.module];
                                                                }

                                                                controlModule.setValue(controlInfo.id, controlValue, meta);
                                                            }
                                                            else {
                                                                var isMapping = false;
                                                                if ($this.$data && $this.$data.storeList.length > 0) {
                                                                    for (var k = 0; k < $this.$data.storeList.length; k++) {
                                                                        var store = $this.$data.storeList[k];
                                                                        if (store.storeType == 'Form' && store.dataSourceID == outputMapping.DataFieldID) {
                                                                            isMapping = true;
                                                                            bindingControlInfos = store.columns.filter(function (item) {
                                                                                return item.data == dataFieldID;
                                                                            });

                                                                            if (bindingControlInfos.length == 1) {
                                                                                $this.store[store.dataSourceID][dataFieldID] = controlValue;
                                                                            }

                                                                            break;
                                                                        }
                                                                    }
                                                                }

                                                                if (isMapping == false) {
                                                                    errorText = '"{0}" Form Output Mapping 확인 필요'.format(dataFieldID);
                                                                    responseObject.ErrorText.push(errorText);
                                                                    $l.eventLog('$w.transaction', errorText, 'Error');
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        else if (outputMapping.ResponseType == 'Grid') {
                                            if (outputData.length && outputData.length > 0) {
                                                responseObject.OutputStat.push({
                                                    FieldID: responseFieldID,
                                                    Count: outputData.length
                                                });
                                                var dataFieldID = outputMapping.DataFieldID; // qaf-datafield
                                                if (qafControls && qafControls.length > 0) {
                                                    var bindingControlInfos = qafControls.filter(function (item) {
                                                        return item.field == dataFieldID;
                                                    });

                                                    if (bindingControlInfos.length == 1) {
                                                        var controlInfo = bindingControlInfos[0];
                                                        var controlModule = null;
                                                        var currings = controlInfo.module.split('.');
                                                        if (currings.length > 0) {
                                                            for (var i = 0; i < currings.length; i++) {
                                                                var curring = currings[i];
                                                                if (controlModule) {
                                                                    controlModule = controlModule[curring];
                                                                }
                                                                else {
                                                                    controlModule = context[curring];
                                                                }
                                                            }
                                                        }
                                                        else {
                                                            controlModule = context[controlInfo.module];
                                                        }

                                                        controlModule.setValue(controlInfo.id, outputData, outputMapping.Items);
                                                    }
                                                    else {
                                                        var isMapping = false;
                                                        if ($this.$data && $this.$data.storeList.length > 0) {
                                                            for (var k = 0; k < $this.$data.storeList.length; k++) {
                                                                var store = $this.$data.storeList[k];
                                                                if (store.storeType == 'Grid' && store.dataSourceID == outputMapping.DataFieldID) {
                                                                    isMapping = true;
                                                                    var bindingInfos = $this.$data.bindingList.filter(function (item) {
                                                                        return (item.dataSourceID == store.dataSourceID && item.controlType == 'grid');
                                                                    });

                                                                    var length = outputData.length;
                                                                    for (var i = 0; i < length; i++) {
                                                                        outputData[i].Flag = 'R';
                                                                    }

                                                                    if (bindingInfos.length > 0) {
                                                                        for (var binding_i = 0; binding_i < bindingInfos.length; binding_i++) {
                                                                            var bindingInfo = bindingInfos[binding_i];
                                                                            $this.store[store.dataSourceID][bindingInfo.dataFieldID] = outputData;
                                                                        }
                                                                    }
                                                                    else {
                                                                        $this.store[store.dataSourceID] = outputData;
                                                                    }
                                                                    break;
                                                                }
                                                            }
                                                        }

                                                        if (isMapping == false) {
                                                            errorText = '"{0}" Grid Output Mapping 확인 필요'.format(dataFieldID);
                                                            responseObject.ErrorText.push(errorText);
                                                            $l.eventLog('$w.transaction', errorText, 'Error');
                                                        }
                                                    }
                                                }
                                            }
                                            else {
                                                responseObject.OutputStat.push({
                                                    FieldID: responseFieldID,
                                                    Count: 0
                                                });
                                            }
                                        }
                                        else if (outputMapping.ResponseType == 'Chart') {
                                            if (outputData.length && outputData.length > 0) {
                                                responseObject.OutputStat.push({
                                                    FieldID: responseFieldID,
                                                    Count: outputData.length
                                                });
                                                var dataFieldID = outputMapping.DataFieldID; // qaf-datafield

                                                if (qafControls && qafControls.length > 0) {
                                                    var bindingControlInfos = qafControls.filter(function (item) {
                                                        return item.field == dataFieldID;
                                                    });

                                                    if (bindingControlInfos.length == 1) {
                                                        var controlInfo = bindingControlInfos[0];
                                                        var controlModule = null;
                                                        var currings = controlInfo.module.split('.');
                                                        if (currings.length > 0) {
                                                            for (var i = 0; i < currings.length; i++) {
                                                                var curring = currings[i];
                                                                if (controlModule) {
                                                                    controlModule = controlModule[curring];
                                                                }
                                                                else {
                                                                    controlModule = context[curring];
                                                                }
                                                            }
                                                        }
                                                        else {
                                                            controlModule = context[controlInfo.module];
                                                        }

                                                        controlModule.setValue(controlInfo.id, outputData, outputMapping.Items);
                                                    }
                                                    else {
                                                        errorText = '"{0}" Chart Output Mapping 확인 필요'.format(dataFieldID);
                                                        responseObject.ErrorText.push(errorText);
                                                        $l.eventLog('$w.transaction', errorText, 'Error');
                                                    }
                                                }
                                            }
                                            else {
                                                responseObject.OutputStat.push({
                                                    FieldID: responseFieldID,
                                                    Count: 0
                                                });
                                            }
                                        }
                                    }
                                }
                                else {
                                    errorText = '"{0}" 기능의 거래 응답 정의와 데이터 갯수가 다릅니다'.format(transaction.FunctionID);
                                    responseObject.ErrorText.push(errorText);
                                    $l.eventLog('$w.transaction', errorText, 'Error');
                                }
                            }

                            if (callback) {
                                callback(responseObject, addtionalData);
                            }

                            if ($w.domainTransactionLoaderEnd) {
                                $w.domainTransactionLoaderEnd();
                            }
                        });
                    }
                    else {
                        errorText = '"{0}" 거래 중복 또는 존재여부 확인 필요'.format(functionID);
                        responseObject.ErrorText.push(errorText);
                        $l.eventLog('$w.transaction', errorText, 'Error');

                        if (callback) {
                            callback(responseObject);
                        }

                        if ($w.domainTransactionLoaderEnd) {
                            $w.domainTransactionLoaderEnd();
                        }
                    }
                }
                else {
                    errorText = '화면 매핑 정의 데이터가 없습니다';
                    responseObject.ErrorText.push(errorText);
                    $l.eventLog('$w.transaction', errorText, 'Error');

                    if (callback) {
                        callback(responseObject);
                    }

                    if ($w.domainTransactionLoaderEnd) {
                        $w.domainTransactionLoaderEnd();
                    }
                }
            } catch (error) {
                $l.eventLog('$w.transaction', error, 'Error');

                if ($w.domainTransactionLoaderEnd) {
                    $w.domainTransactionLoaderEnd();
                }
            }
        },

        scrollToTop: function () {
            /// <summary>
            /// 화면 최상단으로 스크롤값을 조정합니다
            /// </summary>
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

            if (scrollTop > 0) {
                context.requestAnimationFrame($w.scrollToTop);
                context.scrollTo(0, scrollTop - scrollTop / 8);
            }
        },

        setFavicon: function (url) {
            var favicon = document.querySelector('link[rel="icon"]');

            if (favicon) {
                favicon.href = url;
            } else {
                var link = document.createElement('link');
                link.rel = 'icon';
                link.href = url;

                document.head.appendChild(link);
            }
        },

        fileDownload: function (url, fileName) {
            var downloadFileName = '';
            if (fileName) {
                downloadFileName = fileName;
            }
            else {
                var match = url.toString().match(/.*\/(.+?)\./);
                if (match && match.length > 1) {
                    downloadFileName = match[1];
                }
            }

            var link = document.createElement('a');
            link.setAttribute('href', url);
            link.setAttribute('download', downloadFileName);

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },

        sleep: function (ms) {
            return new Promise(function (resolve) {
                return setTimeout(resolve, ms);
            });
        }
    });

    if (qaf && !qaf.Config) {
        qaf.Config = {};
    }

    context.$webform = context.$w = qaf.$w = context.$webform || $webform;
    if (isNodejs == true) {
        var fs = require('fs');
        var path = require('path');

        if (process.env.QAF_CONFIG) {
            qaf.Config = JSON.parse(process.env.QAF_CONFIG);
        }
        else {
            var qafConfigPath = path.join(path.dirname(require.main.filename), 'qaf.config.json')
            if (fs.existsSync(qafConfigPath) == true) {
                qaf.Config = JSON.parse(fs.readFileSync(qafConfigPath, 'utf8'));

                process.env.QAF_LogMinimumLevel = qaf.Config.LogMinimumLevel;
                process.env.QAF_FileLogBasePath = qaf.Config.FileLogBasePath;
                process.env.QAF_LocalStoragePath = qaf.Config.LocalStoragePath;
            }
        }

        if (qaf.Config && $string.isNullOrEmpty(qaf.Config.DataSourceFilePath) == true) {
            qaf.Config.DataSourceFilePath = path.join(process.cwd(), 'BusinessContract/Database/DataSource.xml');
        }

        delete $w.isPageLoad;
        delete $w.pageReadyTimeout;
        delete $w.eventAddReady;
        delete $w.eventRemoveReady;
        delete $w.moduleReadyIntervalID;
        delete $w.remainingReadyIntervalID;
        delete $w.remainingReadyCount;
        delete $w.defaultControlOptions;
        delete $w.initializeFormScript;
        delete $w.innerHTML;
        delete $w.innerText;
        delete $w.activeControl;
        delete $w.hasAutoFocus;
        delete $w.createTouchEvent;
        delete $w.contentLoaded;
        delete $w.addReadyCount;
        delete $w.removeReadyCount;
        delete $w.createSelection;
        delete $w.getTriggerOptions;
        delete $w.triggerAction;
        delete $w.transactionAction;
        delete $w.transaction;
        delete $w.scrollToTop;
        delete $w.setFavicon;
        delete $w.fileDownload;
        delete $w.sleep;
    }
    else {
        if (context.CefSharp) {
            qaf.bindObjects = qaf.bindObjects || [];
            if (context.contextCreatedData) {
                qaf.Config = context.contextCreatedData.Config;
                var contextData = $webform.argumentsExtend(context.contextCreatedData, {});
                delete contextData.Config;

                qaf.ContextData = contextData;
            }

            if (CefSharp.IsObjectCached('bound') == true) {
                var object = {};
                object.BindID = 'bound';
                object.Success = true;
                object.TypeName = bound.toString();
                qaf.bindObjects.push(object);
            }
        }
        else {
            var pathname = location.pathname;
            if (pathname.split('/').length > 0) {
                var filename = pathname.split('/')[location.pathname.split('/').length - 1];
                $webform.extend({ pageScript: '$' + (filename.indexOf('.') > -1 ? filename.substring(0, filename.indexOf('.')) : filename) });
            }

            $l.addEvent(context, 'load', function () {
                var mod = context[$w.pageScript];
                if (mod && mod.windowLoad) {
                    mod.windowLoad();
                }
            });

            var urlArgs = $r.getCookie('qaf.iscache') == 'true' ? '' : '?bust=' + new Date().getTime();
            var isAsyncLoad = !$b.isIE;

            globalThis.isLoadConfig = false;
            if (window.qafConfig) {
                qaf.Config = $w.argumentsExtend(qafConfig, qaf.Config);
                window.qafConfig = undefined;

                globalThis.isLoadConfig = true;
                $webform.contentLoaded();
            }
            else {
                $webform.loadJSON('/' + (window.qafConfigName || 'qaf.config.json') + urlArgs, null, function (setting, json) {
                    qaf.Config = $w.argumentsExtend(json, qaf.Config);

                    globalThis.isLoadConfig = true;
                    $webform.contentLoaded();
                }, null, isAsyncLoad);
            }
        }
    }
})(globalThis);
/// <reference path='../qaf.core.js' />
/// <reference path='../qaf.webform.js' />

/// <summary>
/// 클라이언트에서 xml, ajax, 크로스 웹 사이트 요청을 위한 jsonp의 확장입니다.
/// </summary>
(function ($webform) {
    'use strict';
    if (!$webform) {
        $webform = new baseCore();
    }

    var document = null;
    if (isNodejs == true) {
    }
    else {
        document = window.document;
    }

    $webform.extend({
        method: 'POST',

        setServiceObjectHeader: function (jsonObject) {
            /// <summary>
            /// ServiceObject의 공통 헤더를 지정하도록 제안합니다.
            /// </summary>
            return this;
        },

        setServiceClientHeader: function (xhr) {
            /// <summary>
            /// ServiceClient의 공통 헤더를 지정합니다.
            /// </summary>
            var isContinue = true;
            xhr.setRequestHeader('User-CertKey', 'UUNOLkV4cGVydEFwcA=='); // 인증키 라이센스키

            try {
                return isContinue;
            }
            finally {
                isContinue = null;
            }
            return this;
        },

        xmlParser: function (xml) {
            /// <summary>
            /// 지정된 xml 문자열값으로 DOMDocument를 반환합니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;var parser = new $w.xmlParser(); 
            /// </summary>
            /// <param name='xml' type='String'>xml 문자열입니다.</param>
            /// <returns type='Object' />
            var parser = null;
            if (!globalThis.DOMParser) {
                var pids = ['Msxml2.DOMDocument.3.0', 'Msxml2.DOMDocument'];

                for (var i = 0; i < pids.length; i++) {
                    parser = new ActiveXObject(pids[i]);
                    parser.async = false;
                    parser.setProperty('SelectionLanguage', 'XPath');
                    if (parser.loadXML(xml) == true) {
                        break;
                    }
                }

                return parser;
            }
            else {
                parser = new globalThis.DOMParser();
                return parser.parseFromString(xml, 'text/xml');
            }
        },

        xmlHttp: function () {
            /// <summary>
            /// AJAX 통신을 위한 XMLHttpRequest를 반환합니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;var httpRequest = new $w.xmlHttp(); 
            /// </summary>
            /// <returns type='Object' />
            var httpRequest = null;
            if (!globalThis.XMLHttpRequest) {
                var pids = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP'];

                for (var i = 0; i < pids.length; i++) {
                    httpRequest = new ActiveXObject(pids[i]);
                    if (httpRequest) {
                        break;
                    }
                }

                return httpRequest;
            }
            else {
                httpRequest = new globalThis.XMLHttpRequest();
                return httpRequest;
            }
        },

        loadScript: function (url, scriptID) {
            /// <summary>
            /// Javascript를 동적으로 head에 로딩
            /// $w.loadScript('/Scripts/Site.js');
            /// </summary>
            /// <param name='url' type='String'>Javascript URL</param>
            /// <returns type='Object' />
            var head;
            var resourceID;
            if (document.getElementsByTagName('head')) {
                head = document.getElementsByTagName('head')[0];
            }
            else {
                document.documentElement.insertBefore(document.createElement('head'), document.documentElement.firstChild);
                head = document.getElementsByTagName('head')[0];
            }

            resourceID = scriptID || 'id_' + $l.random();

            var el = document.createElement('script');

            el.setAttribute('type', 'text/javascript');
            el.setAttribute('src', url + '&noCache=' + (new Date()).getTime());
            el.setAttribute('id', resourceID);

            head.insertBefore(el, head.firstChild);

            return this;
        },

        loadStyle: function (url, styleID) {
            /// <summary>
            /// StyleSheet를 동적으로 head에 로딩
            /// $w.loadStyle('/Css/Site.css');
            /// </summary>
            /// <param name='url' type='String'>StyleSheet URL</param>
            /// <returns type='Object' />
            var head;
            var resourceID;
            if (document.getElementsByTagName('head')) {
                head = document.getElementsByTagName('head')[0];
            }
            else {
                document.documentElement.insertBefore(document.createElement('head'), document.documentElement.firstChild);
                head = document.getElementsByTagName('head')[0];
            }

            resourceID = styleID || 'id_' + $l.random();

            var el = document.createElement('link');

            el.setAttribute('rel', 'stylesheet');
            el.setAttribute('type', 'text/css');
            el.setAttribute('href', url + '&noCache=' + (new Date()).getTime());
            el.setAttribute('id', resourceID);

            head.appendChild(el);

            return this;
        },

        loadText: function (url, callback) {
            /// <summary>
            /// Html, Json등 텍스트 파일 내용을 동적으로 반환
            /// $w.loadText('/Css/Site.css');
            /// </summary>
            /// <param name='url' type='String'>Html, Json등 URL</param>
            /// <returns type='Object' />
            url = url;

            var xhr = $w.xmlHttp();
            xhr.open('get', url + '&noCache=' + (new Date()).getTime(), true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status !== 200) {
                        if (xhr.status == 0) {
                            $l.eventLog('$w.loadText', 'X-Requested transfort error', 'Fatal');
                        }
                        else {
                            $l.eventLog('$w.loadText', 'response status - {0}'.format(xhr.statusText) + xhr.responseText, 'Error');
                        }
                        return;
                    }

                    if (callback) {
                        callback(xhr.responseText)
                    }
                }
            }
            xhr.send();
        },

        serviceObject: function (serviceID, returnType) {
            /// <summary>
            /// serviceClient 요청을 수행하기위한 기본 jsonObject를 반환합니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;var jsonObject = $w.serviceObject('LabelDictionaryInsert');
            /// &#10;jsonObject.NameValues.push({ 'prop': 'LabelID', 'val': $l.get('ddlPopLabelID').value });
            /// &#10;jsonObject.NameValues.push({ 'prop': 'LabelValue', 'val': $l.get('txtPopLabelName').value });
            /// &#10;jsonObject.NameValues.push({ 'prop': 'Tooltip', 'val': $l.get('txtPopLabelDicToolTip').value });
            /// </summary>
            /// <param name='functionID' type='String'>서비스 요청 식별자입니다.</param>
            /// <param name='returnType' type='Object'>요청 반환 타입입니다.</param>
            /// <returns type='Object' />
            var dataType = 'json';
            if (returnType) {
                dataType = returnType;
            }

            var jsonObject = {};
            jsonObject.RequestID = $l.guid();
            jsonObject.ReturnType = dataType;
            jsonObject.ServiceID = serviceID;
            jsonObject.NameValues = [];

            if (this.setServiceObjectHeader) {
                this.setServiceObjectHeader(jsonObject);
            }

            dataType = null;
            return jsonObject;
        },

        transactionObject: function (functionID, returnType) {
            /// <summary>
            /// serviceClient 요청을 수행하기위한 기본 jsonObject를 반환합니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;var jsonObject = $w.transactionObject('LabelDictionaryInsert');
            /// &#10;jsonObject.NameValues.push({ 'prop': 'LabelID', 'val': $l.get('ddlPopLabelID').value });
            /// &#10;jsonObject.NameValues.push({ 'prop': 'LabelValue', 'val': $l.get('txtPopLabelName').value });
            /// &#10;jsonObject.NameValues.push({ 'prop': 'Tooltip', 'val': $l.get('txtPopLabelDicToolTip').value });
            /// </summary>
            /// <param name='functionID' type='String'>서비스 요청 식별자입니다.</param>
            /// <param name='returnType' type='Object'>요청 반환 타입입니다.</param>
            /// <returns type='Object' />
            var dataType = 'Json';
            if (returnType) {
                dataType = returnType;
            }

            var jsonObject = {};
            jsonObject.ProgramID = '';
            jsonObject.BusinessID = '';
            jsonObject.SystemID = '';
            jsonObject.TransactionID = '';
            jsonObject.DataTransactionInterface = null;
            jsonObject.TransactionResult = true;
            jsonObject.FunctionID = functionID;
            jsonObject.ScreenID = '';
            jsonObject.RequestID = $l.guid();
            jsonObject.ReturnType = dataType;
            jsonObject.ResultAlias = [];
            jsonObject.InputsItemCount = [];
            jsonObject.Inputs = [];

            if (this.setServiceObjectHeader) {
                this.setServiceObjectHeader(jsonObject);
            }

            dataType = null;
            return jsonObject;
        },

        basicServiceClient: function (url, jsonObject, callback, async, token) {
            /// <summary>
            /// 기본 WCF 요청을 수행합니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;var jsonParam = '{'argument': 'WebServiceClick!'}';
            /// &#10;$webform.basicServiceClient('/ServiceClient/WebForm1.aspx/HelloWorld', jsonParam, HelloWorldCallback);
            /// &#10;$webform.basicServiceClient('/ServiceClient/WebService1.asmx/HelloWorld', jsonParam, HelloWorldCallback);
            /// &#10;$webform.basicServiceClient('/ServiceClient/Service1.svc/HelloWorld', jsonParam, HelloWorldCallback);
            /// &#10;
            /// &#10;function HelloWorldCallback(response)
            /// &#10;{
            /// &#10;    alert(response);
            /// &#10;}
            /// </summary>
            /// <param name='url' type='String'>서비스 요청 주소입니다.</param>
            /// <param name='props' type='Object'>요청 전달 매개변수입니다.</param>
            /// <param name='callback' type='Function'>서비스 요청을 비동기로 호출후 응답을 처리할 콜백 함수입니다. 동기로 호출시 콜백은 무시됩니다.</param>
            /// <param name='async' type='Boolean' mayBeNull='true'>서비스 요청을 동기, 비동기로 수행할 옵션입니다.(기본값 true)</param>
            /// <param name='token' type='String' mayBeNull='true'>서비스 요청시 보안 처리를 위해 요청 헤더에 토큰을 지정합니다.</param>
            /// <returns type='Object' />
            if (!jsonObject) {
                alert('서비스 호출에 필요한 jsonObject가 구성되지 않았습니다.');
                return;
            }

            var jsonString = JSON.stringify(jsonObject);

            var xhr = this.xmlHttp();

            xhr.open($webform.method, url, true);
            xhr.setRequestHeader('Accept-Language', this.localeID);
            xhr.setRequestHeader('Accept-Charset', 'UTF-8');
            //xhr.setRequestHeader('User-Agent', 'XmlHttpRequest');

            if (token !== undefined) {
                xhr.setRequestHeader('User-Token', token);
            }

            if (async !== undefined && xhr.async) {
                xhr.async = async;

                if (xhr.async == false) {
                    xhr.setRequestHeader('X-Requested-With', 'QAF ServiceClient');
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send(jsonString);

                    return xhr;
                }
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status !== 200) {
                        if (xhr.status == 0) {
                            $l.eventLog('$w.serviceClient', 'X-Requested transfort error', 'Fatal');
                        }
                        else {
                            $l.eventLog('$w.serviceClient', 'response status - {0}'.format(xhr.statusText) + xhr.responseText, 'Error');
                        }
                        return;
                    }

                    var contentType = 'text';
                    var errorText = '';
                    var functionID = '';

                    try {
                        var jsonObject = JSON.parse(xhr.responseText);
                        contentType = jsonObject.ReturnType;
                        functionID = jsonObject.FunctionID;
                        if (contentType === 'error') {
                            errorText = jsonObject.ExceptionText;
                        }
                    }
                    catch (e) {
                        contentType = 'error';
                        errorText = e.toString();
                        if (functionID.length == 0) {
                            functionID = 'Unknown FunctionID';
                        }
                    }

                    if (contentType.indexOf('text') > -1 || contentType.indexOf('json') > -1) {
                        if (callback) {
                            callback(xhr.responseText);
                        }
                    }
                    else if (contentType.indexOf('xml') > -1) {
                        if (callback) {
                            callback(xhr.responseXML);
                        }
                    }
                    else {
                        alert('FunctionID : ' + functionID + '\n' + errorText);
                    }
                }
            }
            xhr.setRequestHeader('X-Requested-With', 'QAF ServiceClient');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(jsonString);
        },

        serviceClient: function (url, jsonObject, callback, async, token) {
            /// <summary>
            /// 비즈니스 로직이 포함되어 있는 WCF 요청을 수행합니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;var jsonParam = '{'argument': 'WebServiceClick!'}';
            /// &#10;$webform.serviceClient('/ServiceClient/WebForm1.aspx/HelloWorld', jsonParam, HelloWorldCallback);
            /// &#10;$webform.serviceClient('/ServiceClient/WebService1.asmx/HelloWorld', jsonParam, HelloWorldCallback);
            /// &#10;$webform.serviceClient('/ServiceClient/Service1.svc/HelloWorld', jsonParam, HelloWorldCallback);
            /// &#10;
            /// &#10;function HelloWorldCallback(response)
            /// &#10;{
            /// &#10;    alert(response);
            /// &#10;}
            /// </summary>
            /// <param name='url' type='String'>서비스 요청 주소입니다.</param>
            /// <param name='props' type='Object'>요청 전달 매개변수입니다.</param>
            /// <param name='callback' type='Function'>서비스 요청을 비동기로 호출후 응답을 처리할 콜백 함수입니다. 동기로 호출시 콜백은 무시됩니다.</param>
            /// <param name='async' type='Boolean' mayBeNull='true'>서비스 요청을 동기, 비동기로 수행할 옵션입니다.(기본값 true)</param>
            /// <param name='token' type='String' mayBeNull='true'>서비스 요청시 보안 처리를 위해 요청 헤더에 토큰을 지정합니다.</param>
            /// <returns type='Object' />
            if (!jsonObject) {
                alert('서비스 호출에 필요한 거래정보가 구성되지 않았습니다.');
                return;
            }

            var jsonString = JSON.stringify(jsonObject);

            var xhr = this.xmlHttp();

            xhr.open($webform.method, url, true);
            xhr.setRequestHeader('Accept-Language', this.localeID);
            //xhr.setRequestHeader('User-Agent', 'XmlHttpRequest');

            if (this.setServiceClientHeader) {
                if (this.setServiceClientHeader(xhr) == false) {
                    return;
                }
            }

            if (token !== undefined) {
                xhr.setRequestHeader('User-Token', token);
            }

            if (async !== undefined && xhr.async) {
                xhr.async = async;

                if (xhr.async == false) {
                    xhr.setRequestHeader('X-Requested-With', 'QAF ServiceClient');
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send(jsonString);

                    return xhr;
                }
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status !== 200) {
                        if (xhr.status == 0) {
                            $l.eventLog('$w.serviceClient', 'X-Requested transfort error', 'Fatal');
                        }
                        else {
                            $l.eventLog('$w.serviceClient', 'response status - {0}'.format(xhr.statusText) + xhr.responseText, 'Error');
                        }
                        return;
                    }

                    try {
                        if ($w.clientTag && $w.clientTag == "ROQKFWKTLFGODZNJFL" && $w.serviceClientInterceptor) {
                            if ($w.serviceClientInterceptor(url, xhr) === false) {
                                return;
                            }
                        }
                    }
                    catch (e) {
                        // ajax 요청중에 웹 페이지가 close되었을 경우 return 처리입니다.
                        return;
                    }

                    var contentType = 'text';
                    var errorText = '';
                    var functionID = '';

                    try {
                        var jsonObject = JSON.parse(xhr.responseText);
                        contentType = jsonObject.ReturnType;
                        functionID = jsonObject.FunctionID;
                        if (contentType === 'error') {
                            errorText = jsonObject.ExceptionText;
                        }
                    }
                    catch (e) {
                        contentType = 'error';
                        errorText = e.toString();
                        if (functionID.length == 0) {
                            functionID = 'Unknown FunctionID';
                        }
                    }

                    if (contentType === 'warning') {
                        if ($this.serviceClientException) {
                            $this.serviceClientException(url, jsonObject, xhr);
                        }
                        else {
                            alert('FunctionID : ' + functionID + '\n' + jsonObject.Result);
                        }
                    }
                    else if (contentType.indexOf('text') > -1 || contentType.indexOf('json') > -1) {
                        if (callback) {
                            callback(jsonObject);
                        }
                    }
                    else if (contentType.indexOf('xml') > -1) {
                        if (callback) {
                            callback(xhr.responseXML);
                        }
                    }
                    else {
                        if ($w.serviceClientException) {
                            if ($w.serviceClientException(url, jsonObject, xhr) === false) {
                                alert('FunctionID : ' + functionID + '\n' + errorText);
                            }
                        }
                        else {
                            alert('FunctionID : ' + functionID + '\n' + errorText);
                        }

                        if ($this.serviceClientException) {
                            $this.serviceClientException(url, jsonObject, xhr);
                        }
                    }
                }
            }
            xhr.setRequestHeader('X-Requested-With', 'QAF ServiceClient');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(jsonString);
        },

        executeBindMethod: function (bindID, methodName, methodParameters, callback) {
            qaf.bindObjects = qaf.bindObjects || [];

            var result = null;
            var bindMessage = '';

            var isBindObject = false;
            var length = qaf.bindObjects.length;
            for (var i = 0; i < length; i++) {
                var bindObject = qaf.bindObjects[i];
                if (bindObject.BindID == bindID) {
                    isBindObject = bindObject.Success;
                    bindMessage = bindObject.Message;
                    break;
                }
            }

            if (isBindObject == true) {
                var bindObject = globalThis[bindID];

                if (bindObject[methodName]) {
                    var bindMethod = bindObject[methodName];
                    result = bindMethod(methodParameters, callback);
                }
                else {
                    $l.eventLog('qaf.bindObjects.{0} 메서드 정보 없음', '{1}'.format(bindID, methodName), 'Error');
                }
            }
            else {
                $l.eventLog('qaf.bindObjects 객체 정보 없음', '{0} - {1}'.format(bindID, bindMessage), 'Error');
            }

            return result;
        },

        executeTransaction: function (mappingModel, transactionObject, callback, async, token) {
            /// <summary>
            /// 비즈니스 로직이 포함되어 있는 WCF 요청을 수행합니다.
            /// </summary>
            /// <param name='url' type='String'>서비스 요청 주소입니다.</param>
            /// <param name='props' type='Object'>요청 전달 매개변수입니다.</param>
            /// <param name='callback' type='Function'>서비스 요청을 비동기로 호출후 응답을 처리할 콜백 함수입니다. 동기로 호출시 콜백은 무시됩니다.</param>
            /// <param name='async' type='Boolean' mayBeNull='true'>서비스 요청을 동기, 비동기로 수행할 옵션입니다.(기본값 true)</param>
            /// <param name='token' type='String' mayBeNull='true'>서비스 요청시 보안 처리를 위해 요청 헤더에 토큰을 지정합니다.</param>
            /// <returns type='Object' />
            if (!mappingModel || !transactionObject) {
                if (isNodejs == false) {
                    alert('서비스 호출에 필요한 거래 정보가 구성되지 않았습니다');
                }

                $l.eventLog('$w.executeTransaction', '서비스 호출에 필요한 거래 정보 확인 필요', 'Error');
                return;
            }

            var apiService = null;
            if (isNodejs == true) {
                var apiServices = $w.getStorage('apiServices', false);
                if (apiServices) {
                    apiService = apiServices[qaf.Config.Transaction.SystemID + qaf.Config.DomainServerType];
                    if ((apiServices.BearerToken == null || apiServices.BearerToken == undefined) && globalThis.bearerToken) {
                        apiServices.BearerToken = globalThis.bearerToken;
                        $w.setStorage('apiServices', apiServices, false);
                    }
                }
                else {
                    if (qaf.Config.DomainAPIServer != null) {
                        apiService = qaf.Config.DomainAPIServer;
                        apiServices = {};
                        if (token || globalThis.bearerToken) {
                            apiServices.BearerToken = token || globalThis.bearerToken;
                        }
                        apiServices[qaf.Config.Transaction.SystemID + qaf.Config.DomainServerType] = apiService;

                        $w.setStorage('apiServices', apiServices, false);
                        $l.eventLog('$w.executeTransaction', 'apiService 확인 필요 systemApi: {0}'.format(JSON.stringify(apiService)), 'Debug');
                    }
                    else {
                        $l.eventLog('$w.executeTransaction', '서비스 호출에 필요한 BP 정보가 구성되지 확인 필요', 'Error');
                    }
                }
            }
            else {
                if (location.href.indexOf('qaf://') > -1) {
                    transactionObject.SystemID = mappingModel.SystemID;
                    transactionObject.TransactionID = mappingModel.TransactionID;
                    transactionObject.ScreenID = mappingModel.ScreenID;
                    var methodResult = $w.executeBindMethod('bound', 'executeTransaction', transactionObject, function (responseText) {
                        if ($w.clientTag && $w.serviceClientInterceptor) {
                            if ($w.serviceClientInterceptor($w.clientTag, xhr) === false) {
                                return;
                            }
                        }

                        try {
                            var transactionResponse = JSON.parse(responseText);
                            if (transactionResponse.Acknowledge == 1) {
                                var jsonObject = [];

                                var mdo = transactionResponse.MDO;
                                if (transactionResponse.DAT.RES_OUTPUT != null && transactionResponse.DAT.RES_OUTPUT.length > 0) {
                                    var RES_TX_MAP_ID = transactionResponse.DAT.RES_TX_MAP_ID;
                                    var RES_OUTPUT = transactionResponse.DAT.RES_OUTPUT;
                                    var length = RES_OUTPUT.length;
                                    for (var i = 0; i < length; i++) {
                                        var item = RES_OUTPUT[i];
                                        jsonObject.push({
                                            RES_FIELD_ID: item.RES_FIELD_ID,
                                            RES_DAT: item.RES_DAT
                                        });
                                    }
                                }

                                if (callback) {
                                    var addtionalData = {};
                                    if (mdo.ADI_MSG) {
                                        for (var i = 0; i < mdo.ADI_MSG.length; i++) {
                                            var adiMsg = mdo.ADI_MSG[i];

                                            if (addtionalData[adiMsg.ADI_MSG_CD]) {
                                                if (isNaN(parseInt(addtionalData[adiMsg.ADI_MSG_CD])) == false) {
                                                    addtionalData[adiMsg.ADI_MSG_CD] = parseInt(addtionalData[adiMsg.ADI_MSG_CD]) + parseInt(adiMsg.ADI_MSG_TXT);
                                                }
                                                else {
                                                    $l.eventLog('$w.executeTransaction.addtionalData', '"{0}" 추가 데이터 중복 확인 필요'.format(adiMsg.ADI_MSG_CD), 'Warning');
                                                }
                                            }
                                            else {
                                                addtionalData[adiMsg.ADI_MSG_CD] = adiMsg.ADI_MSG_TXT;
                                            }
                                        }
                                    }

                                    callback(jsonObject, addtionalData);
                                }
                            }
                            else {
                                var errorText = transactionResponse.ExceptionText;
                                var errorMessage = '거래: {0}, 기능: {1} 수행중 예외가 발생하였습니다'.format(transactionObject.TransactionID, transactionObject.FunctionID);
                                if ($w.serviceClientException) {
                                    $w.serviceClientException('요청오류', errorMessage, errorText);
                                }

                                $l.eventLog('$w.executeTransaction', errorText, 'Error');

                                if ($this && $this.frameEvent) {
                                    $this.frameEvent('transactionException', {
                                        transactionID: transactionObject.TransactionID,
                                        functionID: transactionObject.FunctionID,
                                        errorText: errorText,
                                        errorMessage: errorMessage
                                    });
                                }
                            }
                        }
                        catch (error) {
                            var errorMessage = '거래: {0}, 기능: {1} 수행중 오류가 발생하였습니다'.format(transactionObject.TransactionID, transactionObject.FunctionID);
                            if ($w.serviceClientException) {
                                $w.serviceClientException('오류', errorMessage, error.stack);
                            }

                            $l.eventLog('$w.executeTransaction', error, 'Error');

                            if ($this && $this.frameEvent) {
                                $this.frameEvent('transactionError', {
                                    transactionID: transactionObject.TransactionID,
                                    functionID: transactionObject.FunctionID,
                                    errorText: error.message,
                                    errorMessage: errorMessage
                                });
                            }
                        }
                    });
                    return;
                }
            }

            var apiServices = $w.getStorage('apiServices', false);
            if (apiServices) {
                apiService = apiServices[qaf.Config.Transaction.SystemID + qaf.Config.DomainServerType];
            }

            if (apiService == null) {
                $l.eventLog('$w.executeTransaction', 'apiService 확인 필요', 'Fatal');
            }
            else {
                if (apiService.ExceptionText) {
                    $l.eventLog('$w.executeTransaction', 'apiService 확인 필요 SystemID: {0}, ServerType: {1}, Message: {2}'.format(mappingModel.SystemID, qaf.Config.DomainServerType, apiService.ExceptionText), 'Fatal');
                    return;
                }

                var url = '';
                if (apiService.Port && apiService.Port != '') {
                    url = '{0}://{1}:{2}{3}'.format(apiService.Protocol, apiService.IP, apiService.Port, apiService.Path);
                }
                else {
                    url = '{0}://{1}{2}'.format(apiService.Protocol, apiService.IP, apiService.Path);
                }

                var requestDateTime = $date.toString(new Date(), 'f');
                // -- 36바이트 = AppID 3자리 + ProjectID 3자리 + 거래ID 6자리 + 기능ID 3자리 + 환경ID 1자리 + Timestamp (yyyyMMddhhmmssfff) 17자리 + 버퍼 3바이트
                var requestID = ''.concat(mappingModel.ProgramID, mappingModel.BusinessID, transactionObject.TransactionID, transactionObject.FunctionID, qaf.Config.Transaction.RunningEnvironment, requestDateTime, $l.random(3)).toUpperCase();
                var globalID = '';
                if (apiService.RequestID) {
                    globalID = apiService.RequestID;
                }
                else {
                    globalID = requestID;
                }

                var transactionRequest = {
                    AccessTokenID: apiServices.BearerToken,
                    Action: 'REPLY',
                    ClientTag: ''.concat(qaf.Config.Transaction.SystemCode, "|", qaf.Config.Transaction.MachineName, "|", qaf.Config.Program.ProgramVersion),
                    LoadOptions: [],
                    RequestID: requestID,
                    Version: qaf.Config.Transaction.ProtocolVersion,
                    SH: {
                        CLNT_IPAD: apiService.ClientIP,
                        CLNT_MAC: '',
                        ENV_INF_DSCD: qaf.Config.Transaction.RunningEnvironment,
                        FST_TLM_REQ_DTM: apiService.CreateDateTime || requestDateTime,
                        FST_TMS_SYS_CD: qaf.Config.Transaction.SystemCode,
                        GLBL_ID: globalID,
                        GLBL_ID_PRG_SRNO: 1,
                        INTF_ID: qaf.Config.Transaction.SystemInterfaceID,
                        LANG_DSCD: qaf.Config.Program.LanguageID,
                        MD_KDCD: qaf.Config.Transaction.MachineTypeID,
                        TLM_ENCY_DSCD: qaf.Config.Transaction.DataEncryptionYN,
                        TLM_REQ_DTM: requestDateTime,
                    },
                    TH: {
                        BIZ_ID: mappingModel.BusinessID,
                        EXNK_DSCD: isNodejs == true ? 'AP' : navigator.connection == null ? '' : navigator.connection.effectiveType,
                        FUNC_CD: transactionObject.FunctionID,
                        DAT_FMT: qaf.Config.Transaction.DataFormat,
                        LQTY_DAT_PRC_DIS: 'N',
                        MSK_NTGT_TRN_YN: 'Y',
                        OPR_NO: isNodejs == true ? 'AP' : $w.SSO ? $w.SSO.UserID : '',
                        PGM_ID: mappingModel.ProgramID,
                        RLPE_SQCN: 1,
                        SMLT_TRN_DSCD: 'N',
                        TRM_BRNO: qaf.Config.Program.TerminalBranchCode,
                        TRN_CD: transactionObject.TransactionID,
                        TRN_SCRN_CD: transactionObject.ScreenID,
                        CRYPTO_DSCD: qaf.Config.Transaction.CryptoCode || 'P',
                        CRYPTO_KEY: qaf.Config.Transaction.CryptoCKey || ''
                    },
                    TCI: [],
                    DTI: null,
                    DAT: {
                        REQ_INPUT: [],
                        REQ_INPUTDATA: [],
                        REQ_INPUT_CNT: [],
                        REQ_TX_MAP_ID: ''
                    }
                };

                if (mappingModel.Transactions) {
                    var transactions = mappingModel.Transactions.filter(function (item) {
                        return item.FunctionID == transactionObject.FunctionID;
                    });

                    if (transactions.length == 1) {
                        var transaction = transactions[0];

                        var inputs = transaction.Inputs.map(function (item) { return item.RequestType; }).join(',');
                        var outputs = transaction.Outputs.map(function (item) { return item.ResponseType; }).join(',');
                        transactionRequest.DTI = '{0}|{1}'.format(inputs, outputs);
                    }
                }
                else if (transactionObject.DataTransactionInterface) {
                    transactionRequest.DTI = transactionObject.DataTransactionInterface;
                }

                if (transactionRequest.TH.DAT_FMT == 'J' || transactionRequest.TH.DAT_FMT == 'T') {
                }
                else {
                    $l.eventLog('$w.executeTransaction', 'TH.DAT_FMT 확인 필요: {0}'.format(transactionRequest.TH.DAT_FMT), 'Error');
                    throw new Error('TH.DAT_FMT 확인 필요: {0}'.format(transactionRequest.TH.DAT_FMT));
                }

                transactionRequest.DAT.REQ_INPUT_CNT = transactionObject.InputsItemCount;
                transactionRequest.DAT.REQ_INPUT = [];
                transactionRequest.DAT.REQ_INPUTDATA = [];
                var length = transactionObject.Inputs.length;

                for (var i = 0; i < length; i++) {
                    var inputs = transactionObject.Inputs[i];

                    var reqInputs = [];
                    for (var j = 0; j < inputs.length; j++) {
                        var item = inputs[j];

                        reqInputs.push({
                            REQ_FIELD_ID: item.prop,
                            REQ_FIELD_DAT: item.val
                        });
                    }

                    if (transactionRequest.TH.CRYPTO_DSCD == 'C') {
                        if (transactionRequest.TH.DAT_FMT == 'J') {
                            transactionRequest.DAT.REQ_INPUTDATA.push($c.LZString.compressToBase64(JSON.stringify(reqInputs)));
                        }
                        else {
                            transactionRequest.DAT.REQ_INPUTDATA.push($c.LZString.compressToBase64($object.toCSV(reqInputs, { delimeter: '｜', newline: '↵' })));
                        }
                    }
                    else {
                        if (transactionRequest.TH.DAT_FMT == 'J') {
                            transactionRequest.DAT.REQ_INPUT.push(reqInputs);
                        }
                        else {
                            transactionRequest.DAT.REQ_INPUTDATA.push($object.toCSV(reqInputs, { delimeter: '｜', newline: '↵' }));
                        }
                    }
                }

                var xhr = $w.xmlHttp();

                xhr.open($webform.method, url, true);
                xhr.setRequestHeader('Accept-Language', $w.localeID);
                //xhr.setRequestHeader('User-Agent', 'XmlHttpRequest');
                xhr.setRequestHeader('Server-SystemID', mappingModel.SystemID);
                xhr.setRequestHeader('Server-BusinessID', mappingModel.BusinessID);

                if ($w.setServiceClientHeader) {
                    if ($w.setServiceClientHeader(xhr) == false) {
                        return;
                    }
                }

                if (async !== undefined && xhr.async == true) {
                    xhr.async = async;

                    if (xhr.async == false) {
                        xhr.setRequestHeader('X-Requested-With', 'QAF ServiceClient');
                        // xhr.setRequestHeader('Content-Type', 'application/json');
                        xhr.setRequestHeader('Content-Type', 'qrame/json-transact');
                        xhr.send(transactionRequest);

                        return xhr;
                    }
                }

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status !== 200) {
                            if (xhr.status == 0) {
                                $l.eventLog('$w.executeTransaction', 'X-Requested transfort error', 'Fatal');
                            }
                            else {
                                $l.eventLog('$w.executeTransaction', 'response status - {0}'.format(xhr.statusText) + xhr.responseText, 'Error');
                            }

                            if ($w.domainTransactionLoaderEnd) {
                                $w.domainTransactionLoaderEnd();
                            }
                            return;
                        }

                        if ($w.clientTag && $w.serviceClientInterceptor) {
                            if ($w.serviceClientInterceptor($w.clientTag, xhr) === false) {
                                return;
                            }
                        }

                        try {
                            var transactionResponse = JSON.parse(xhr.responseText);
                            if (transactionObject.TransactionResult == true) {
                                if (transactionResponse.Acknowledge == 1) {
                                    var jsonObject = [];

                                    var mdo = transactionResponse.MDO;
                                    if (transactionResponse.DAT.RES_OUTPUT != null && transactionResponse.DAT.RES_OUTPUT.length > 0) {
                                        var RES_TX_MAP_ID = transactionResponse.DAT.RES_TX_MAP_ID;
                                        var RES_OUTPUT = transactionResponse.DAT.RES_OUTPUT;
                                        var length = RES_OUTPUT.length;
                                        for (var i = 0; i < length; i++) {
                                            var item = RES_OUTPUT[i];

                                            if (transactionResponse.TH.DAT_FMT == 'J') {
                                                if (transactionResponse.TH.CRYPTO_DSCD == 'C') {
                                                    jsonObject.push({
                                                        RES_FIELD_ID: item.RES_FIELD_ID,
                                                        RES_DAT: JSON.parse($c.LZString.decompressFromBase64(item.RES_DAT))
                                                    });
                                                }
                                                else {
                                                    jsonObject.push({
                                                        RES_FIELD_ID: item.RES_FIELD_ID,
                                                        RES_DAT: item.RES_DAT
                                                    });
                                                }
                                            }
                                            else {
                                                if (mappingModel.Transactions) {
                                                    var transaction = mappingModel.Transactions.find(function (item) {
                                                        return item.FunctionID == transactionObject.FunctionID;
                                                    });

                                                    if (transaction) {
                                                        var RES_DAT = null;
                                                        if ($ref.isEmpty(item.RES_DAT) == false) {
                                                            RES_DAT = transactionResponse.TH.CRYPTO_DSCD == 'C' ? $c.LZString.decompressFromBase64(item.RES_DAT).split('＾') : item.RES_DAT.split('＾');
                                                            var meta = $string.toParameterObject(RES_DAT[0]);
                                                            RES_DAT = $string.toJSON(RES_DAT[1], { delimeter: '｜', newline: '↵', meta: meta });

                                                            var outputMapping = transaction.Outputs[i];
                                                            if (outputMapping.ResponseType == 'Form') {
                                                                RES_DAT = RES_DAT[0];
                                                            }
                                                        }

                                                        jsonObject.push({
                                                            RES_FIELD_ID: item.RES_FIELD_ID,
                                                            RES_DAT: RES_DAT
                                                        });
                                                    }
                                                }
                                                else {
                                                    var RES_DAT = transactionResponse.TH.CRYPTO_DSCD == 'C' ? $c.LZString.decompressFromBase64(item.RES_DAT).split('＾') : item.RES_DAT.split('＾');
                                                    var meta = $string.toParameterObject(RES_DAT[0]);
                                                    RES_DAT = $string.toJSON(RES_DAT[1], { delimeter: '｜', newline: '↵', meta: meta });

                                                    jsonObject.push({
                                                        RES_FIELD_ID: item.RES_FIELD_ID,
                                                        RES_DAT: RES_DAT
                                                    });
                                                }
                                            }
                                        }
                                    }

                                    if (callback) {
                                        var addtionalData = {};
                                        if (mdo.ADI_MSG) {
                                            for (var i = 0; i < mdo.ADI_MSG.length; i++) {
                                                var adiMsg = mdo.ADI_MSG[i];

                                                if (addtionalData[adiMsg.ADI_MSG_CD]) {
                                                    if (isNaN(parseInt(addtionalData[adiMsg.ADI_MSG_CD])) == false) {
                                                        addtionalData[adiMsg.ADI_MSG_CD] = parseInt(addtionalData[adiMsg.ADI_MSG_CD]) + parseInt(adiMsg.ADI_MSG_TXT);
                                                    }
                                                    else {
                                                        $l.eventLog('$w.executeTransaction.addtionalData', '"{0}" 추가 데이터 중복 확인 필요'.format(adiMsg.ADI_MSG_CD));
                                                    }
                                                }
                                                else {
                                                    addtionalData[adiMsg.ADI_MSG_CD] = adiMsg.ADI_MSG_TXT;
                                                }
                                            }
                                        }

                                        try {
                                            callback(jsonObject, addtionalData);
                                        } catch (error) {
                                            $l.eventLog('$w.executeTransaction callback', error, 'Error');
                                        }
                                    }
                                }
                                else {
                                    var errorText = transactionResponse.ExceptionText;
                                    var errorMessage = '거래: {0}, 기능: {1} 수행중 예외가 발생하였습니다'.format(transactionRequest.TH.TRN_CD, transactionRequest.TH.FUNC_CD);
                                    if ($w.serviceClientException) {
                                        $w.serviceClientException('요청오류', errorMessage, errorText);
                                    }

                                    $l.eventLog('$w.executeTransaction', errorText, 'Warning');

                                    if (isNodejs == false) {
                                        if ($this && $this.frameEvent) {
                                            $this.frameEvent('transactionException', {
                                                transactionID: transactionRequest.TH.TRN_CD,
                                                functionID: transactionRequest.TH.FUNC_CD,
                                                errorText: errorText,
                                                errorMessage: errorMessage
                                            });
                                        }
                                    }
                                    else {
                                        if (callback) {
                                            try {
                                                callback([], null);
                                            } catch (error) {
                                                $l.eventLog('$w.executeTransaction callback', error, 'Error');
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                if (callback) {
                                    if (transactionResponse.Acknowledge == 1) {
                                        try {
                                            var mdo = transactionResponse.MDO;
                                            if (transactionResponse.DAT.RES_OUTPUT != null && transactionResponse.DAT.RES_OUTPUT.length > 0) {
                                                var RES_TX_MAP_ID = transactionResponse.DAT.RES_TX_MAP_ID;
                                                var RES_OUTPUT = transactionResponse.DAT.RES_OUTPUT;
                                                var length = RES_OUTPUT.length;
                                                for (var i = 0; i < length; i++) {
                                                    var item = RES_OUTPUT[i];
                                                    if (transactionResponse.TH.DAT_FMT == 'J') {
                                                        if (transactionResponse.TH.CRYPTO_DSCD == 'C') {
                                                            item.RES_DAT = JSON.parse($c.LZString.decompressFromBase64(item.RES_DAT));
                                                        }
                                                    }
                                                    else {
                                                        item.RES_DAT = transactionResponse.TH.CRYPTO_DSCD == 'C' ? $c.LZString.decompressFromBase64(item.RES_DAT) : item.RES_DAT;
                                                    }
                                                }
                                            }
                                        } catch (error) {
                                            $l.eventLog('$w.executeTransaction', error, 'Error');
                                        }
                                    }

                                    try {
                                        callback(transactionResponse);
                                    } catch (error) {
                                        $l.eventLog('$w.executeTransaction callback', error, 'Error');
                                    }
                                }
                            }
                        }
                        catch (error) {
                            var errorMessage = '거래: {0}, 기능: {1} 수행중 오류가 발생하였습니다'.format(transactionRequest.TH.TRN_CD, transactionRequest.TH.FUNC_CD);
                            if ($w.serviceClientException) {
                                $w.serviceClientException('오류', errorMessage, error.stack);
                            }

                            $l.eventLog('$w.executeTransaction', error, 'Error');

                            if (isNodejs == false) {
                                if ($this && $this.frameEvent) {
                                    $this.frameEvent('transactionError', {
                                        transactionID: transactionRequest.TH.TRN_CD,
                                        functionID: transactionRequest.TH.FUNC_CD,
                                        errorText: error.message,
                                        errorMessage: errorMessage
                                    });
                                }
                            }
                            else {
                                if (callback) {
                                    try {
                                        callback([], null);
                                    } catch (error) {
                                        $l.eventLog('$w.executeTransaction callback', error, 'Error');
                                    }
                                }
                            }
                        }

                        if ($w.domainTransactionLoaderEnd) {
                            $w.domainTransactionLoaderEnd();
                        }
                    }
                }
                xhr.setRequestHeader('X-Requested-With', 'QAF ServiceClient');
                // xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.setRequestHeader('Content-Type', 'qrame/json-transact');
                xhr.timeout = qaf.Config.TransactionTimeout;
                xhr.send(JSON.stringify(transactionRequest));
            }
        }
    });
})(qaf.$webform || qaf.$w);
/// <reference path='../qaf.core.js' />
/// <reference path='../qaf.webform.js' />
/// <reference path='../qaf.browser.js' />

/// <summary>
/// UI에서 Form내의 컨트롤들을 대상으로 데이터 바인딩과 데이터 추출을 위한 확장입니다.
/// </summary>
(function ($webform) {
    'use strict';
    if (!$webform) {
        $webform = new baseCore();
    }

    var document = globalThis.document;

    $webform.extend({
        /// <summary>
        /// Form내의 컨트롤 항목을 XML로 유지하기 위한 DOMDocument객체입니다.
        /// </summary>
        xmlFormData: null,

        /// <summary>
        /// Form내의 컨트롤 항목을 Text로 유지하기 위한 json객체입니다.
        /// </summary>
        jsonFormData: null,

        getUpdateData: function (cssSelector) {
            /// <summary>
            /// Form 내의 모든 컨트롤 데이터를 Json 객체로 반환합니다.
            /// </summary>
            /// <returns type='JSON Object' />
            var result = {};
            result.pageUrl = $r.url();

            var els = [];
            if (cssSelector) {
                els = $l.querySelectorAll(cssSelector + " *[bindingID]");
            }
            else {
                els = $l.querySelectorAll("input[type='text'], input[type='button'], input[type='checkbox'], input[type='hidden'], button, select, textarea");
            }

            var el = null;
            var bindingID = null;
            for (var i = 0; i < els.length; i++) {
                el = els[i];
                bindingID = el.getAttribute('bindingID');
                if (bindingID) {
                    $w.updateValue(el, bindingID);
                }
            }

            els = $l.querySelectorAll('input[type="radio"]');
            el = null;
            var eids = [];
            var eid = '';

            for (var i = 0; i < els.length; i++) {
                el = els[i];
                bindingID = el.getAttribute('bindingID');

                if (bindingID) {
                    eids.push(bindingID);
                }
            }

            eids = $array.distinct(eids);

            for (var i = 0; i < eids.length; i++) {
                eid = eids[i];
                if ($radio) {
                    result[eid] = $radio.getValue(eid);
                }
                else {
                    var radioButtons = document.getElementsByName(eid);
                    for (var j = 0; j < radioButtons.length; j++) {
                        if (radioButtons[j].checked) {
                            result[eid] = radioButtons[j].value
                            break;
                        }
                    }
                }
            }

            return result;
        },

        updateValue: function (el, bindingID) {
            /// <summary>
            /// element의 값을 JSON Object에 업데이트합니다. 라디오 버튼은  구현하면 안됩니다.
            /// </summary>
            /// <param name='el' type='HTML Element'>bindingID 속성을 가지고 있는 HTML Element입니다.</param>
            /// <param name='bindingID' type='String'>바인딩 ID입니다.</param>
            /// <returns type='this' />
            el = $ref.isString(el) == true ? $l.get(el) : el;
            switch (el.type.toLowerCase()) {
                case 'checkbox':
                    result[bindingID] = el.checked;
                    break;
                case 'text':
                    result[bindingID] = el.value;
                    break;
                default:
                    result[bindingID] = el.value;
                    break;
            }

            return this;
        },

        initializeForm: function (el, cssSelector) {
            /// <summary>
            /// UI에서 'input', 'select', 'textarea' HTML Element들의 값을 초기화합니다.
            /// </summary>
            /// <param name='el' type='HTML Element'>Form초기화후 포커스를 지정할 element입니다.</param>
            /// <returns type='this' />
            el = $ref.isString(el) == true ? $l.get(el) : el;
            var bl = null;
            var els = [];

            if (cssSelector) {
                els = $l.querySelectorAll(cssSelector + ' *[bindingID]');
            }
            else {
                els = $l.querySelectorAll('*[bindingID]');
            }

            for (var i = 0; i < els.length; i++) {
                bl = els[i];
                $w.initializeValue(bl);
            }

            if (el) {
                el.focus();
            }

            return this;
        },

        initializeValue: function (el) {
            /// <summary>
            /// element의 값을 초기화합니다.
            /// </summary>
            /// <param name='el' type='HTML Element'>초기화할 값 속성을 가지고 있는 HTML Element입니다.</param>
            /// <returns type='this' />
            el = $ref.isString(el) == true ? $l.get(el) : el;
            switch (el.type.toLowerCase()) {
                case 'radio':
                    el.checked = false;
                    break;
                case 'checkbox':
                    el.checked = false;
                    break;
                case 'text':
                    el.value = '';
                    break;
                default:
                    el.value = '';
                    break;
            }

            return this;
        },

        formBinding: function (jsonObject, cssSelector) {
            /// <summary>
            /// Form 태그내의 모든 컨트롤들의 값을 바인딩합니다.
            /// </summary>
            /// <param name='jsonObject' type='JSON Object'>Form 컨트롤에 바인딩 하기 위한 데이터 객체입니다.</param>
            /// <returns type='this' />
            var val = '';
            var els = null;
            for (var colID in jsonObject) {
                if (cssSelector) {
                    els = $l.querySelectorAll(cssSelector + ' *[bindingID=' + colID + ']');
                }
                else {
                    els = $l.querySelectorAll('*[bindingID=' + colID + ']');
                }
                if (els.length > 0) {
                    val = jsonObject[colID];

                    if (els.length > 1) {
                        for (var i = 0; i < els.length; i++) {
                            $w.bindingValue(els[i], val);
                        }
                    }
                    else {
                        $w.bindingValue(els[0], val);
                    }
                }
            }

            return this;
        },

        bindingValue: function (el, val) {
            /// <summary>
            /// 컨트롤의 값을 데이터 바인딩합니다.
            /// </summary>
            /// <param name='el' type='HTML Element'>데이터 바인딩을 하기 위한 HTML Element입니다.</param>
            /// <param name='val' type='String'>바인딩에 지정할 값입니다.</param>
            /// <returns type='this' />
            el = $ref.isString(el) == true ? $l.get(el) : el;
            switch (el.type.toLowerCase()) {
                case 'checkbox':
                    el.checked = val;
                    break;
                case 'radio':
                    el.checked = val;
                    break;
                case 'text':
                    el.value = val;
                    break;
                case 'select':
                    el.value = val;
                    break;
                default:
                    el.value = val;
                    break;
            }

            return this;
        }
    });
})(globalThis.$webform);
/// <summary>
/// 다국어 처리를 위한 문자열 리소스를 "한국어권" 언어에 맞게 변경합니다.
/// </summary>
(function ($res) {
    if (!$res) {
        throw new Error("$res 리소스 객체가 없습니다.");
    }
    $res.add('localeID', 'ko-KR');

    $res.add('progress', '진행 중입니다.');
    $res.add('appendTo', '신규 입력 상태입니다.');
    $res.add('appendPre', '화면 구성 중...');
    $res.add('retrieve', '정상적으로 조회되었습니다.');
    $res.add('retrieveException', '데이터를 조회하는 과정에서 문제가 발생하였습니다.');
    $res.add('retrievePre', '데이터 조회 중...');
    $res.add('save', '정상적으로 저장되었습니다.');
    $res.add('saveException', '데이터를 저장하는 과정에서 문제가 발생하였습니다.');
    $res.add('savePre', '저장 중...');
    $res.add('update', '정상적으로 수정되었습니다.');
    $res.add('updateException', '데이터를 수정하는 과정에서 문제가 발생하였습니다.');
    $res.add('updatePre', '수정 중...');
    $res.add('remove', '정상적으로 삭제되었습니다.');
    $res.add('removeException', '데이터를 삭제하는 과정에서 문제가 발생하였습니다.');
    $res.add('removePre', '삭제 중...');
    $res.add('copyAppend', '기존 데이터를 복사하여 입력 상태로 전환했습니다.');
    $res.add('userInfoNothing', '사용자 정보에 문제가 발생했습니다.');

    $res.add('isLogOut', '정말로 로그아웃 하시겠습니까?');
    $res.add('waiting', '잠시만 기다려주세요...');
    $res.add('notElemnet', '컨트롤이 발견되지 않았습니다. 쿼리나 HTML 디자인을 살펴보세요');
    $res.add('dualElemnet', '"{0}"의 아이디는 현재 페이지에서 중복된 이름 또는 아이디의 컨트롤로 발견되었습니다.');
    $res.add('requiredKeyData', '필수 입력 항목 오류');
    $res.add('requiredInsertData', '아래 항목은 필수 입력 항목입니다.');
    $res.add('errorMessage', '에러가 발생했습니다.');
    $res.add('serverErrorMessage', '서버에서 에러가 발생했습니다.');
    $res.add('initialComplete', '화면 구성 완료');
    $res.add('initialException', '화면 구성 실패');
    $res.add('isDateTimeInsert', '"{0}" 포맷의 날짜와 시간을 입력해야 합니다.');
    $res.add('isDateInsert', '"{0}" 포맷의 날짜를 입력해야 합니다.');
    $res.add('isTimeInsert', '"{0}" 포맷의 시간을 입력해야 합니다.');
    $res.add('isNumericInsert', '숫자를 입력해야 합니다.');
    $res.add('forceSave', '편집중인 데이터를 저장하시겠습니까?');
    $res.add('textMaxLength', '입력 가능한 "{0}"자리수를 넘었습니다');

    $res.add('create', '입력');
    $res.add('read', '조회');
    $res.add('find', '검색');
    $res.add('update', '수정');
    $res.add('delele', '삭제');
    $res.add('removeStatusNo', '삭제 가능한 상태가 아닙니다. 데이터를 조회한 후 삭제 해야 합니다.');
    $res.add('removeConfirm', '정말로 삭제 하시겠습니까?');
    $res.add('notData', '데이터가 없습니다.');
    $res.add('notCondData', '입력하신 조건에 맞는 데이터가 없습니다.');
    $res.add('notRetrieveCond', '조회에 필요한 항목이 입력되지 않았습니다.');
    $res.add('notDateBetween', '기간이 올바르게 설정되지 않았습니다.');
    $res.add('notDate', '정확한 날짜를 입력 하거나 선택해야 합니다.');
    $res.add('notFindCond', '검색에 필요한 문장을 입력해야 합니다. 정확한 검색을 위해 두글자 이상 입력해야 합니다.');
    $res.add('selectData', '데이터를 선택해야 합니다.');
    $res.add('selectAll', '전체');
    $res.add('saveExcel', '엑셀 다운로드 중입니다.');
    $res.add('saveExcelComplete', '엑셀 파일을 다운로드 했습니다.');
    $res.add('saveExcelFail', '엑셀 파일 다운로드를 실패 했습니다');
    $res.add('notSupportContent', '지원 하지 않는 컨텐츠 타입입니다.');
    $res.add('notLoginID', '로그인ID는 반드시 입력해야 합니다.');
    $res.add('notPassword', '비밀번호는 반드시 입력해야 합니다.');
    $res.add('notLogin', '아이디 또는 비밀번호가 잘못되었습니다.');
    $res.add('loginLockedOut', '로그인 인증이 지정된 횟수 이상 잘못 되어, "{0}" 계정을 잠김 상태로 변경되었습니다. 담당자에게 문의하세요.');
    $res.add('alreadyLogged', '입력 하신 계정은 이미 로그인 되어 있습니다. 계속 진행하시면 기존 로그인 계정은 로그아웃됩니다. 계속하시겠습니까?');
})(globalThis.$res || qaf.$resource);