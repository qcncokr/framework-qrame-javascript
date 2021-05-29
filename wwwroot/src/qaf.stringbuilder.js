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