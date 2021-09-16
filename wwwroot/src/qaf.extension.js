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
        },

        calcWeekOfMonth: function (year, month, weekStand) {
            var result = [];
            var date = new Date(year, month);

            // 월요일을 중심으로한 주차 구하기(일요일 0 월요일 1 ~ 토요일 6 )
            var firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1);
            var lastDay = new Date(date.getFullYear(), date.getMonth(), 0);
            var week = null;

            if ($object.isNullOrUndefined(weekStand) == true) {
                weekStand = 8; // 월요일 고정
            }

            var firstWeekEndDate = true;
            var thisMonthFirstWeek = firstDay.getDay();

            for (var num = 1; num <= 6; num++) {
                // 마지막월과 첫번째월이 다른경우 빠져나온다.
                if (lastDay.getMonth() != firstDay.getMonth()) {
                    break;
                }

                week = {};

                // 한주의 시작일은 월의 첫번째 월요일로 설정
                if (firstDay.getDay() <= 1) {
                    // 한주의 시작일이 일요일이라면 날짜값을 하루 더해준다.
                    if (firstDay.getDay() == 0) {
                        firstDay.setDate(firstDay.getDate() + 1);
                    }

                    week.weekStartDate = firstDay.getFullYear().toString() + '-' + $this.numberPad((firstDay.getMonth() + 1).toString(), 2) + '-' + $this.numberPad(firstDay.getDate().toString(), 2);
                }

                if (weekStand > thisMonthFirstWeek) {
                    if (firstWeekEndDate) {
                        if (weekStand - firstDay.getDay() == 1) {
                            firstDay.setDate(firstDay.getDate() + (weekStand - firstDay.getDay()) - 1);
                        }

                        if (weekStand - firstDay.getDay() > 1) {
                            firstDay.setDate(firstDay.getDate() + (weekStand - firstDay.getDay()) - 1);
                        }

                        firstWeekEndDate = false;
                    } else {
                        firstDay.setDate(firstDay.getDate() + 6);
                    }
                } else {
                    firstDay.setDate(firstDay.getDate() + (6 - firstDay.getDay()) + weekStand);
                }

                // 월요일로 지정한 데이터가 존재하는 경우에만 마지막 일의 데이터를 담는다.
                if (typeof week.weekStartDate !== 'undefined') {
                    week.weekEndDate = firstDay.getFullYear().toString() + '-' + $this.numberPad((firstDay.getMonth() + 1).toString(), 2) + '-' + $this.numberPad(firstDay.getDate().toString(), 2);
                    result.push(week);
                }

                firstDay.setDate(firstDay.getDate() + 1);
            }

            return result;
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
            if ($object.isNullOrUndefined(len) == true) {
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
                result = parseFloat(($object.isNullOrUndefined(val) == true ? 0 : val) === 0 || val === '' ? '0' : val.toString().replace(/,/g, ''));
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
                        result = $object.isNullOrUndefined(val) == true ? null : $string.isNumber(val) == true ? $string.toNumber(val) : null;
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

            if ($object.isNullOrUndefined(localeID) == true) {
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
            if ($object.isNullOrUndefined(order) == true) {
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
        },

        random: function (start, end) {
            /// <summary>
            /// 지정한 범위내 랜덤 숫자를 생성합니다. 기본 10자리입니다.
            /// </summary>
            /// <param name='len' type='Number'></param>
            /// <returns type='String' />
            if ($string.isNullOrEmpty(start) == true) {
                start = 0;
            }

            if ($string.isNullOrEmpty(end) == true) {
                end = 10;
            }

            return Math.floor((Math.random() * (end - start + 1)) + start);
        }
    });
    context.$number = qaf.lib.$number = $number;

    $object.extend({
        version: '1.0',

        isNullOrUndefined: function (val) {
            /// <summary>
            /// 값에서 지정된 값이 비어 있는지 검증합니다.
            /// </summary>
            /// <param name='val' type='String'>비어있는지 검증하기 위한 값입니다.</param>
            /// <returns type='Boolean' />
            if (val === undefined || val === null) {
                return true;
            }
            else {
                return false;
            }
        },

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