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