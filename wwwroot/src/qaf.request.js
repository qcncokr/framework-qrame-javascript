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
            if ($object.isNullOrUndefined(callback) == true) {
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
            if ($object.isNullOrUndefined(callback) == true) {
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
            if ($object.isNullOrUndefined(callback) == true) {
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
                    param += key + '=' + $r.params[key] + '&';
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
            return encodeURI(param.substring(0, param.length - 1));
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
            if ($object.isNullOrUndefined(expires) == true) {
                expires = new Date((new Date()).getTime() + (1000 * 60 * 60 * 24));
            }

            if ($object.isNullOrUndefined(path) == true) {
                path = '/';
            }

            document.cookie = id + '=' + encodeURI(val) + ((expires) ? ';expires=' + expires.toGMTString() : '') + ((path) ? ';path=' + path : '') + ((domain) ? ';domain=' + domain : '') + ((secure) ? ';secure' : '');
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