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
                if ($object.isNullOrUndefined(childrenID) == true) {
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

            if ($object.isNullOrUndefined(childrenID) == true) {
                childrenID = 'items';
            }

            var items = data[childrenID];
            if (data && items) {
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
                if ($object.isNullOrUndefined(childrenID) == true) {
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
            if ($object.isNullOrUndefined(childrenID) == true) {
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

            if ($object.isNullOrUndefined(childrenID) == true) {
                childrenID = 'items';
            }

            var items = data[childrenID];
            if (data && items) {
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