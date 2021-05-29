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