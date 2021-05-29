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