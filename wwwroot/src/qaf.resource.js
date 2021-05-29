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