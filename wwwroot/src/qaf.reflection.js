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
                if ($string.isNullOrEmpty(val) == true) {
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

            if ($object.isNullOrUndefined(isNested) == true) {
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