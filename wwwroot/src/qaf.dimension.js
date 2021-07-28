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
            if ($object.isNullOrUndefined(text) == true) {
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