/// <reference path='../qaf.core.js' />
/// <reference path='../qaf.webform.js' />
/// <reference path='../qaf.browser.js' />

/// <summary>
/// UI에서 Form내의 컨트롤들을 대상으로 데이터 바인딩과 데이터 추출을 위한 확장입니다.
/// </summary>
(function ($webform) {
    'use strict';
    if (!$webform) {
        $webform = new baseCore();
    }

    var document = globalThis.document;

    $webform.extend({
        /// <summary>
        /// Form내의 컨트롤 항목을 XML로 유지하기 위한 DOMDocument객체입니다.
        /// </summary>
        xmlFormData: null,

        /// <summary>
        /// Form내의 컨트롤 항목을 Text로 유지하기 위한 json객체입니다.
        /// </summary>
        jsonFormData: null,

        getUpdateData: function (cssSelector) {
            /// <summary>
            /// Form 내의 모든 컨트롤 데이터를 Json 객체로 반환합니다.
            /// </summary>
            /// <returns type='JSON Object' />
            var result = {};
            result.pageUrl = $r.url();

            var els = [];
            if (cssSelector) {
                els = $l.querySelectorAll(cssSelector + " *[bindingID]");
            }
            else {
                els = $l.querySelectorAll("input[type='text'], input[type='button'], input[type='checkbox'], input[type='hidden'], button, select, textarea");
            }

            var el = null;
            var bindingID = null;
            for (var i = 0; i < els.length; i++) {
                el = els[i];
                bindingID = el.getAttribute('bindingID');
                if (bindingID) {
                    $w.updateValue(el, bindingID);
                }
            }

            els = $l.querySelectorAll('input[type="radio"]');
            el = null;
            var eids = [];
            var eid = '';

            for (var i = 0; i < els.length; i++) {
                el = els[i];
                bindingID = el.getAttribute('bindingID');

                if (bindingID) {
                    eids.push(bindingID);
                }
            }

            eids = $array.distinct(eids);

            for (var i = 0; i < eids.length; i++) {
                eid = eids[i];
                if ($radio) {
                    result[eid] = $radio.getValue(eid);
                }
                else {
                    var radioButtons = document.getElementsByName(eid);
                    for (var j = 0; j < radioButtons.length; j++) {
                        if (radioButtons[j].checked) {
                            result[eid] = radioButtons[j].value
                            break;
                        }
                    }
                }
            }

            return result;
        },

        updateValue: function (el, bindingID) {
            /// <summary>
            /// element의 값을 JSON Object에 업데이트합니다. 라디오 버튼은  구현하면 안됩니다.
            /// </summary>
            /// <param name='el' type='HTML Element'>bindingID 속성을 가지고 있는 HTML Element입니다.</param>
            /// <param name='bindingID' type='String'>바인딩 ID입니다.</param>
            /// <returns type='this' />
            el = $ref.isString(el) == true ? $l.get(el) : el;
            switch (el.type.toLowerCase()) {
                case 'checkbox':
                    result[bindingID] = el.checked;
                    break;
                case 'text':
                    result[bindingID] = el.value;
                    break;
                default:
                    result[bindingID] = el.value;
                    break;
            }

            return this;
        },

        initializeForm: function (el, cssSelector) {
            /// <summary>
            /// UI에서 'input', 'select', 'textarea' HTML Element들의 값을 초기화합니다.
            /// </summary>
            /// <param name='el' type='HTML Element'>Form초기화후 포커스를 지정할 element입니다.</param>
            /// <returns type='this' />
            el = $ref.isString(el) == true ? $l.get(el) : el;
            var bl = null;
            var els = [];

            if (cssSelector) {
                els = $l.querySelectorAll(cssSelector + ' *[bindingID]');
            }
            else {
                els = $l.querySelectorAll('*[bindingID]');
            }

            for (var i = 0; i < els.length; i++) {
                bl = els[i];
                $w.initializeValue(bl);
            }

            if (el) {
                el.focus();
            }

            return this;
        },

        initializeValue: function (el) {
            /// <summary>
            /// element의 값을 초기화합니다.
            /// </summary>
            /// <param name='el' type='HTML Element'>초기화할 값 속성을 가지고 있는 HTML Element입니다.</param>
            /// <returns type='this' />
            el = $ref.isString(el) == true ? $l.get(el) : el;
            switch (el.type.toLowerCase()) {
                case 'radio':
                    el.checked = false;
                    break;
                case 'checkbox':
                    el.checked = false;
                    break;
                case 'text':
                    el.value = '';
                    break;
                default:
                    el.value = '';
                    break;
            }

            return this;
        },

        formBinding: function (jsonObject, cssSelector) {
            /// <summary>
            /// Form 태그내의 모든 컨트롤들의 값을 바인딩합니다.
            /// </summary>
            /// <param name='jsonObject' type='JSON Object'>Form 컨트롤에 바인딩 하기 위한 데이터 객체입니다.</param>
            /// <returns type='this' />
            var val = '';
            var els = null;
            for (var colID in jsonObject) {
                if (cssSelector) {
                    els = $l.querySelectorAll(cssSelector + ' *[bindingID=' + colID + ']');
                }
                else {
                    els = $l.querySelectorAll('*[bindingID=' + colID + ']');
                }
                if (els.length > 0) {
                    val = jsonObject[colID];

                    if (els.length > 1) {
                        for (var i = 0; i < els.length; i++) {
                            $w.bindingValue(els[i], val);
                        }
                    }
                    else {
                        $w.bindingValue(els[0], val);
                    }
                }
            }

            return this;
        },

        bindingValue: function (el, val) {
            /// <summary>
            /// 컨트롤의 값을 데이터 바인딩합니다.
            /// </summary>
            /// <param name='el' type='HTML Element'>데이터 바인딩을 하기 위한 HTML Element입니다.</param>
            /// <param name='val' type='String'>바인딩에 지정할 값입니다.</param>
            /// <returns type='this' />
            el = $ref.isString(el) == true ? $l.get(el) : el;
            switch (el.type.toLowerCase()) {
                case 'checkbox':
                    el.checked = val;
                    break;
                case 'radio':
                    el.checked = val;
                    break;
                case 'text':
                    el.value = val;
                    break;
                case 'select':
                    el.value = val;
                    break;
                default:
                    el.value = val;
                    break;
            }

            return this;
        }
    });
})(globalThis.$webform);