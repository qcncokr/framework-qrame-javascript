/// <reference path='qaf.core.js' />
/// <reference path='qaf.library.js' />

/// <summary>
/// 화면 모듈 구성에 적합한 공통기능을 제공하는 모듈입니다.
/// </summary>
(function (context) {
    'use strict';
    var $webform = $webform || new baseCore();
    var document = null;
    if (isNodejs == true) {
    }
    else {
        $webform.context = context;
        $webform.document = context.document;
        document = context.document;
    }

    $webform.extend({
        /// <summary>
        /// $webform의 릴리즈 버전입니다.
        /// </summary>
        version: '1.0',

        /// <summary>
        /// $webform의 기본 언어권 ID입니다.
        /// </summary>
        localeID: 'ko-KR',

        isPageLoad: false,
        transactionLoaderID: null,
        pageReadyTimeout: 60000,
        eventAddReady: (isNodejs == true) ? null : new CustomEvent('addready'),
        eventRemoveReady: (isNodejs == true) ? null : new CustomEvent('removeready'),
        mappingModule: true,
        moduleReadyIntervalID: null,
        remainingReadyIntervalID: null,
        remainingReadyCount: 0,

        /// <summary>
        /// UI Control의 기본 옵션입니다.
        /// </summary>
        defaultControlOptions: {
            value: '',
            text: '',
            dataType: 'string',
            bindingID: '',
            resourceKey: '',
            localeID: 'ko-KR',
            required: false,
            tooltip: ''
        },

        initializeFormScript: function (module) {
            /// <summary>
            /// QAF 화면 업무로직 자바스크립트 초기화
            /// </summary>
            /// <param name='module' type='Object'>QAF 화면 업무로직 자바스크립트</param>
            if ($l.get('moduleScript')) {
                $w.extend({ pageScript: $l.get('moduleScript').value });
            }

            var mod = context[$w.pageScript] || new baseCore();

            if (module) {
                mod.extend(module);
                mod.store = {};
                context[$w.pageScript] = mod;
                context['$this'] = mod;

                for (var control in qaf.uicontrols) {
                    mod[control] = qaf.uicontrols[control];
                }
            }
            else {
                $l.eventLog('$w.initializeFormScript', '화면 초기화 오류, module 객체가 없음', 'Information');
            }
        },

        setStorage: function (prop, val, isLocal, ttl) {
            /// <summary>
            /// localStorage, sessionStorage를 이용하여 데이터를 저장합니다.
            /// </summary>
            /// <param name='prop' type='String'>Storage에 데이터를 저장할 키입니다.</param>
            /// <param name='val' type='Object'>Storage에 데이터를 저장할 값입니다.</param>
            /// <param name='isLocal' type='Boolean'>저장소가 localStorage(기본), sessionStorage인지 구분합니다.</param>
            /// <returns type='Type'></returns>
            if (isLocal == undefined || isLocal == null) {
                isLocal = false;
            }

            if (isNodejs == true) {
                if (isLocal == true) {
                    localStorage.setItem(prop, JSON.stringify(val));
                }
                else {
                    if (ttl == undefined || ttl == null) {
                        ttl = 1200000;
                    }

                    var now = new Date();
                    var item = {
                        value: val,
                        expiry: now.getTime() + ttl,
                        ttl: ttl
                    };
                    localStorage.setItem(prop, JSON.stringify(item));
                }
            }
            else {
                if (isLocal == true) {
                    localStorage.setItem(prop, JSON.stringify(val));
                }
                else {
                    sessionStorage.setItem(prop, JSON.stringify(val));
                }
            }

            return this;
        },

        getStorage: function (prop, isLocal) {
            /// <summary>
            /// localStorage, sessionStorage를 이용하여 데이터를 조회합니다.
            /// </summary>
            /// <param name='prop' type='String'>Storage에 데이터를 조회할 키입니다.</param>
            /// <param name='isLocal' type='Boolean'>저장소가 localStorage(기본), sessionStorage인지 구분합니다.</param>
            /// <returns type='Type'></returns>
            var result = null;
            var val = null;

            if (isLocal == undefined || isLocal == null) {
                isLocal = false;
            }

            if (isNodejs == true) {
                if (isLocal == true) {
                    val = localStorage.getItem(prop);
                }
                else {
                    var itemStr = localStorage.getItem(prop)
                    if (!itemStr) {
                        return null;
                    }
                    var item = JSON.parse(itemStr)
                    var now = new Date()
                    if (now.getTime() > item.expiry) {
                        localStorage.removeItem(prop);
                        return null;
                    }

                    result = item.value;

                    var ttl = item.ttl;
                    var now = new Date();
                    var item = {
                        value: result,
                        expiry: now.getTime() + ttl,
                        ttl: ttl
                    };
                    localStorage.setItem(prop, JSON.stringify(item));
                }
            }
            else {
                if (isLocal == true) {
                    result = JSON.parse(localStorage.getItem(prop));
                }
                else {
                    result = JSON.parse(sessionStorage.getItem(prop));
                }
            }

            return result;
        },

        removeStorage: function (prop, isLocal) {
            /// <summary>
            /// localStorage, sessionStorage를 이용하여 데이터를 삭제합니다.
            /// </summary>
            /// <param name='prop' type='String'>Storage에 데이터를 조회할 키입니다.</param>
            /// <param name='isLocal' type='Boolean'>저장소가 localStorage(기본), sessionStorage인지 구분합니다.</param>
            /// <returns type='Type'></returns>
            if (isLocal == undefined || isLocal == null) {
                isLocal = false;
            }

            if (isNodejs == true) {
                localStorage.removeItem(prop);
            }
            else {
                if (isLocal == true) {
                    localStorage.removeItem(prop);
                }
                else {
                    sessionStorage.removeItem(prop);
                }
            }
        },

        storageLength: function (isLocal) {
            /// <summary>
            /// localStorage, sessionStorage를 이용하여 데이터 갯수를 반환합니다
            /// </summary>
            /// <param name='isLocal' type='Boolean'>저장소가 localStorage(기본), sessionStorage인지 구분합니다.</param>
            /// <returns type='Type'></returns>
            var result = 0;
            if (isLocal == undefined || isLocal == null) {
                isLocal = false;
            }

            if (isNodejs == true) {
                result = localStorage.length;
            }
            else {
                if (isLocal == true) {
                    result = localStorage.length;
                }
                else {
                    result = sessionStorage.length;
                }
            }

            return result;
        },

        storageKey: function (index, isLocal) {
            /// <summary>
            /// localStorage, sessionStorage를 이용하여 인덱스의 키를 조회합니다합니다.
            /// </summary>
            /// <param name='prop' type='String'>Storage에 데이터를 조회할 인덱스입니다.</param>
            /// <param name='isLocal' type='Boolean'>저장소가 localStorage(기본), sessionStorage인지 구분합니다.</param>
            /// <returns type='Type'></returns>
            var result = null;
            if (isLocal == undefined || isLocal == null) {
                isLocal = false;
            }

            if (isNodejs == true) {
                result = localStorage.key(index);
            }
            else {
                if (isLocal == true) {
                    result = localStorage.key(index);
                }
                else {
                    result = sessionStorage.key(index);
                }
            }

            return result;
        },

        createBlob: function (data, type) {
            /// <summary>
            /// Blob 객체를 생성합니다
            /// </summary>
            /// <param name='data' type='Object'>ArrayBuffer 또는 Blob 또는 DOMString</param>
            /// <param name='type' type='Object'>데이터에 대한 mimetype</param>
            try {
                return new Blob([data], { type: type });
            } catch (e) {
                var BlobBuilder = globalThis.BlobBuilder || globalThis.WebKitBlobBuilder || globalThis.MozBlobBuilder || globalThis.MSBlobBuilder;
                var builder = new BlobBuilder();
                builder.append(data.buffer || data);
                return builder.getBlob(type);
            }
        },

        dataUriToBlob: function (dataUri) {
            var result = null;

            try {
                var byteString = $c.base64Decode(dataUri.split(',')[1]);
                var mimeString = dataUri.split(',')[0].split(':')[1].split(';')[0];
                var ab = new ArrayBuffer(byteString.length);
                var ia = new Uint8Array(ab);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                result = new Blob([ab], { type: mimeString });
            } catch (error) {
                $l.eventLog('$w.dataUriToBlob', error, 'Warning');
            }
            return result;
        },

        dataUriToText: function (dataUri) {
            var result = null;

            try {
                result = {
                    value: $c.base64Decode(dataUri.split(',')[1]),
                    mime: dataUri.split(',')[0].split(':')[1].split(';')[0]
                };
            } catch (error) {
                $l.eventLog('$w.dataUriToText', error, 'Warning');
            }
            return result;
        },

        innerHTML: function (el, html) {
            /// <summary>
            /// innerHTML을 수행합니다.
            /// </summary>
            /// <param name='el' type='Element'>HTML 문자열을 삽입할 HTML 요소입니다.</param>
            /// <param name='html' type='Object'>HTML 문자열입니다.</param>
            el = $ref.isString(el) == true ? $l.get(el) : el;
            var cl = el.cloneNode(false);
            cl.innerHTML = html;
            el.parentNode.replaceChild(cl, el);
        },

        innerText: function (el, html) {
            /// <summary>
            /// innerText 수행합니다.
            /// </summary>
            /// <param name='el' type='Element'>문자열을 삽입할 HTML 요소입니다.</param>
            /// <param name='html' type='Object'>문자열입니다.</param>
            el = $ref.isString(el) == true ? $l.get(el) : el;
            var cl = el.cloneNode(false);
            cl.innerText = html;
            el.parentNode.replaceChild(cl, el);
        },

        activeControl: function () {
            /// <summary>
            /// 현재 이벤트 포커스가 있는 타입을 반환합니다.
            /// </summary>
            /// <returns type='Type'></returns>
            var result = null;
            var evt = event || context.event;
            if (globalThis.$this) {
                if (evt) {
                    result = (evt && evt.target || evt.srcElement) || $this.focusControl || document.activeElement;
                }
                else {
                    result = $this.focusControl || document.activeElement;
                }
            }

            return result;
        },

        hasAutoFocus: function () {
            /// <summary>
            /// 웹 페이지 로드시 자동 포커스를 이동합니다.
            /// </summary>
            /// <returns type='Type'></returns>
            var el = document.createElement('input');
            return "autofocus" in el;
        },

        /// <summary>
        /// 마우스 이벤트를 생성합니다.
        /// </summary>
        /// <param name='name' type='String'>이벤트 식별자입니다.</param>
        /// <param name='e' type='Object'>이벤트가 발생한 객체 참조입니다.</param>
        /// <returns type='MouseEvents'></returns>
        createTouchEvent: function (name, e) {
            var events = document.createEvent('MouseEvents');

            events.initMouseEvent(
                name,
                e.bubbles,
                e.cancelable,
                e.view,
                e.detail,
                e.screenX,
                e.screenY,
                e.clientX,
                e.clientY,
                e.ctrlKey,
                e.altKey,
                e.shiftKey,
                e.metaKey,
                e.button,
                e.relatedTarget
            );

            return events;
        },

        contentLoaded: function () {
            /// <summary>
            /// DOMContentLoaded 또는 context.onload 이벤트 핸들러를 지정합니다.
            /// </summary>
            $l.addEvent(document, 'addready', function () {
                $w.remainingReadyCount++;
            });

            $l.addEvent(document, 'removeready', function () {
                $w.remainingReadyCount--;
            });

            for (var name in $l.eventMap) {
                $l.addEvent(document.body, name, function (e) {
                    var map = $l.eventMap;
                    var event = $w.createTouchEvent(map[e.type], e);
                    e.target.dispatchEvent(event);

                    var func = e.target['on' + map[e.type]];
                    if (typeof func === 'function') {
                        func(e);
                    }
                });
            }

            if ($l.get('moduleScript')) {
                $w.extend({ pageScript: $l.get('moduleScript').value });
            }
            else {
                var pathname = location.pathname;
                if (pathname.split('/').length > 0) {
                    var filename = pathname.split('/')[location.pathname.split('/').length - 1];
                    $w.extend({ pageScript: '$' + (filename.indexOf('.') > -1 ? filename.substring(0, filename.indexOf('.')) : filename) });
                }

                var input = document.createElement('input');
                input.id = 'moduleScript';
                input.type = 'text';
                input.style.display = 'none';
                input.value = $w.pageScript;
                document.body.appendChild(input);

                if (document.forms) {
                    for (var i = 0; i < document.forms.length; i++) {
                        $l.addEvent(document.forms[i], 'submit', function (e) {
                            var result = false;
                            var el = e.target || e.srcElement;
                            if ($this && $this.frameEvent) {
                                result = $this.frameEvent('beforeSubmit', {
                                    el: el,
                                    evt: e
                                });

                                if ($object.isNullOrUndefined(result) == true || $string.toBoolean(result) == false) {
                                    result = false;
                                }
                            }

                            if (result == false) {
                                e.returnValue = false;
                                e.cancel = true;
                                if (e.preventDefault) {
                                    e.preventDefault();
                                }

                                if (e.stopPropagation) {
                                    e.stopPropagation();
                                }
                                return false;
                            }
                        });
                    }
                }
            }

            var pageLoad = function () {
                if ($object.isNullOrUndefined($w.SSO) == true) {
                    $w.SSO = $w.getSSOInfo() || {
                        TokenID: '',
                        UserID: '',
                        UserName: '',
                        BusinessTel: '',
                        BusinessEMail: '',
                        DepartmentID: '',
                        DepartmentName: '',
                        PositionID: '',
                        PositionName: '',
                        CompanyNo: '',
                        CompanyName: '',
                        Roles: []
                    };
                }

                var mod = context[$w.pageScript];
                if (mod && mod.pageLoad) {
                    mod.pageLoad();
                }

                if (context.domainPageLoad) {
                    domainPageLoad();
                }

                setTimeout(function () {
                    if (mod && mod.qafControls && ($object.isNullOrUndefined(mod.tabOrderControls) == true || mod.tabOrderControls.length == 0)) {
                        var qafTagNames = [];
                        var qaf_tags = document.body.outerHTML.match(/<(qaf_).+?>/gi);
                        if (qaf_tags) {
                            var qafControlCount = qaf_tags.length;
                            for (var i = 0; i < qafControlCount; i++) {
                                var qaf_tag = qaf_tags[i];
                                var tagName = qaf_tag.substring(1, qaf_tag.indexOf(' ')).toUpperCase();
                                qafTagNames.push(tagName);
                            }
                        }

                        qafTagNames = $array.distinct(qafTagNames);
                        var findElements = document.querySelectorAll('input,select,textarea,button' + (qafTagNames.length > 0 ? ',' + qafTagNames.join(',') : ''));
                        var els = [];
                        var length = findElements.length;
                        for (var idx = 0; idx < length; idx++) {
                            var el = findElements[idx];
                            if (el && el.style && el.style.display == 'none' || el.type == 'hidden') {
                                if (el.id && el.tagName.toUpperCase() == 'SELECT' && (el.getAttribute('qaf-datafield') != null || el.getAttribute('qaf-datafield') != undefined)) {
                                    els.push(el);
                                }
                                else {
                                    continue;
                                }
                            }
                            else {
                                if (el.id && el.id.includes('btn_qafeditor_') == false && el.id.includes('chk_qafgrid_') == false && el.id.includes('_hidden') == false) {
                                    els.push(el);
                                }
                                else if (el.id && el.tagName.toUpperCase() == 'SELECT' && (el.getAttribute('qaf-datafield') != null || el.getAttribute('qaf-datafield') != undefined)) {
                                    els.push(el);
                                }
                                else if (el.id && el.tagName.includes('QAF_') == true) {
                                    els.push(el);
                                }
                            }
                        }

                        var items = [];
                        var i = 0;
                        length = els.length;
                        for (var idx = 0; idx < length; idx++) {
                            var el = els[idx];
                            if (el.id && el.id.includes('btn_qafeditor_') == false && el.id.includes('chk_qafgrid_') == false && el.id.includes('_hidden') == false) {
                                var elID = el.id;
                                var offset = $d.offset(el);
                                var baseID = el.getAttribute('baseID');
                                if (baseID) {
                                    elID = baseID;
                                }

                                var setting = mod.qafControls.find(function (item) { return item.id == elID });

                                if (setting) {
                                    if (setting.type == 'datepicker') {
                                        offset = $d.offset(el.parentElement);
                                    }
                                    else if (setting.type == 'colorpicker') {
                                        offset = $d.offset(el.parentElement.parentElement);
                                    }

                                    items.push({
                                        elID: el.id,
                                        tagName: el.tagName,
                                        formID: setting.formDataFieldID,
                                        type: setting.type,
                                        top: offset.top,
                                        left: offset.left
                                    });
                                }
                            }
                            else if (el.id && el.tagName.toUpperCase() == 'SELECT' && (el.getAttribute('qaf-datafield') != null || el.getAttribute('qaf-datafield') != undefined)) {
                                var offset = null;
                                if (el.getAttribute('multiple') === false) {
                                    var control = mod.$select.getControl(el.id);
                                    if (control) {
                                        offset = $d.offset(control.picker.select);
                                    }
                                }
                                else {
                                    var control = mod.$multiselect.getControl(el.id);
                                    if (control) {
                                        offset = $d.offset(control.picker.select);
                                    }
                                }

                                if (offset) {
                                    var setting = mod.qafControls.find(function (item) { return item.id == el.id });

                                    if (setting) {
                                        items.push({
                                            elID: el.id,
                                            tagName: el.tagName,
                                            formID: setting.formDataFieldID,
                                            type: setting.type,
                                            top: offset.top,
                                            left: offset.left
                                        });
                                    }
                                }
                            }
                            else if (el.id && el.tagName.includes('QAF_') == true) {
                                var elID = el.id.replace('_hidden', '');
                                var offset = null;
                                if (el.tagName == 'QAF_DATEPICKER') {
                                    // var offset = $d.offset(el);
                                }
                                else if (el.tagName == 'QAF_COLORPICKER') {
                                    // var offset = $d.offset(el);
                                }

                                if (offset) {
                                    var setting = mod.qafControls.find(function (item) { return item.id == elID });
                                    if (setting) {
                                        items.push({
                                            elID: elID,
                                            tagName: el.tagName,
                                            formID: setting.formDataFieldID,
                                            type: setting.type,
                                            top: offset.top,
                                            left: offset.left
                                        });
                                    }
                                }
                            }

                            i = i + 1;
                        }

                        mod.focusControl = null;
                        mod.tabOrderFocusID = null;
                        mod.tabOrderControls = items;

                        if (mod && mod.frameEvent) {
                            mod.frameEvent('tabOrderControls', mod.tabOrderControls);
                        }

                        if (mod.tabOrderControls.length > 0) {
                            if (mod.mappingModel) {
                                // html (html defined), tdlr (top > down > left > right), lrtd (left > right > top > down)
                                if ($string.isNullOrEmpty(mod.mappingModel.TapOrderFlow) == true) {
                                    mod.mappingModel.TapOrderFlow = 'html';
                                }

                                if (mod.mappingModel.TapOrderFlow == 'tdlr') {
                                    mod.tabOrderControls.sort(
                                        function (a, b) {
                                            if (a.top === b.top) {
                                                return a.left - b.left;
                                            }
                                            return a.top > b.top ? 1 : -1;
                                        });
                                }
                                else if (mod.mappingModel.TapOrderFlow == 'lrtd') {
                                    mod.tabOrderControls.sort(
                                        function (a, b) {
                                            if (a.left === b.left) {
                                                return a.top - b.top;
                                            }
                                            return a.left > b.left ? 1 : -1;
                                        });
                                }
                            }
                            else {
                                mod.tabOrderControls.sort(
                                    function (a, b) {
                                        if (a.top === b.top) {
                                            return a.left - b.left;
                                        }
                                        return a.top > b.top ? 1 : -1;
                                    });
                            }
                        }

                        var focusEL = $l.querySelector("[autofocus]")
                        if (focusEL && focusEL.id && focusEL.tagName) {
                            var tagName = focusEL.tagName.toUpperCase();
                            var tags = 'input,select,textarea,button'.toUpperCase().split(',');
                            if (tags.indexOf(tagName) > -1) {
                                mod.focusControl = focusEL;
                                mod.tabOrderFocusID = focusEL.id;
                                setTimeout(function () {
                                    focusEL.focus();
                                });
                            }
                            else if (tagName.indexOf('qaf_') > -1) {
                                // debugger;
                                // qaf_ 컨트롤에 autofocus 처리
                            }
                        }
                    }
                });
            }

            var pageFormInit = function () {
                var mod = context[$w.pageScript];
                if (mod && mod['pageFormInit']) {
                    mod['pageFormInit']();
                }

                var qafControlList = [];
                var qafControls = document.querySelectorAll('[qaf-datafield],[qaf-options],[qaf-events]');
                for (var i = 0; i < qafControls.length; i++) {
                    var qafControl = qafControls[i];
                    if (qafControl.tagName) {
                        var tagName = qafControl.tagName.toUpperCase();
                        var dataField = qafControl.getAttribute('qaf-datafield');
                        var elementID = qafControl.getAttribute('id');
                        var formDataField = qafControl.closest('form') ? qafControl.closest('form').getAttribute('qaf-datafield') : '';
                        var controlType = '';

                        var controlOptions = qafControl.getAttribute('qaf-options') || null;
                        if (controlOptions != null) {
                            try {
                                controlOptions = eval('(' + controlOptions + ')');
                            } catch (error) {
                                $l.eventLog('$w.contentLoaded', 'elID: "{0}" qaf-options 확인 필요 '.format(elementID) + error.message, 'Warning');
                            }
                        }
                        else {
                            controlOptions = {};
                        }

                        var controlModule = null;

                        if (tagName.indexOf('QAF_') > -1) {
                            var moduleName = tagName.substring(4).toLowerCase();
                            controlModule = qaf.uicontrols['$' + moduleName];
                            controlType = moduleName;
                        }
                        else {
                            switch (tagName) {
                                case 'BUTTON':
                                    controlModule = qaf.uicontrols.$button;
                                    controlType = 'button';
                                    break;
                                case 'INPUT':
                                    controlType = qafControl.getAttribute('type').toLowerCase();
                                    switch (controlType) {
                                        case 'hidden':
                                        case 'text':
                                        case 'password':
                                        case 'color':
                                        case 'email':
                                        case 'number':
                                        case 'search':
                                        case 'tel':
                                        case 'url':
                                            controlModule = qaf.uicontrols.$textbox;
                                            break;
                                        case 'submit':
                                        case 'reset':
                                        case 'button':
                                            controlModule = qaf.uicontrols.$button;
                                            break;
                                        case 'radio':
                                            controlModule = qaf.uicontrols.$radio;
                                            break;
                                        case 'checkbox':
                                            controlModule = qaf.uicontrols.$checkbox;
                                            break;
                                    }
                                    break;
                                case 'TEXTAREA':
                                    controlModule = qaf.uicontrols.$textarea;
                                    controlType = 'textarea';
                                    break;
                                case 'SELECT':
                                    if (qafControl.getAttribute('multiple') == null) {
                                        controlModule = qaf.uicontrols.$select;
                                        controlType = 'select';
                                    }
                                    else {
                                        controlModule = qaf.uicontrols.$multiselect;
                                        controlType = 'multiselect';
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }

                        $l.addEvent(qafControl.id, 'focus', function (evt) {
                            $this.focusControl = evt.target || evt.currentTarget || evt.srcElement;
                            if ($this.focusControl) {
                                $this.tabOrderFocusID = $this.focusControl.id;
                            }
                            else {
                                $this.tabOrderFocusID = null;
                            }
                        });

                        if (controlModule) {
                            if (controlModule.addModuleList) {
                                controlModule.addModuleList(qafControl, qafControlList, controlOptions, controlType);
                            }

                            controlModule.controlLoad(elementID, controlOptions);
                        }
                        else {
                            if (elementID) {
                                qafControlList.push({
                                    id: elementID,
                                    formDataFieldID: formDataField,
                                    field: dataField,
                                    module: null,
                                    type: controlType ? controlType : qafControl.tagName.toLowerCase()
                                });
                            }

                            if ($this && $this.controlLoad) {
                                $this.controlLoad(elementID, controlOptions);
                            }
                        }
                    }
                }

                var qafEventControls = document.querySelectorAll('[qaf-events]');
                for (var i = 0; i < qafEventControls.length; i++) {
                    var qafControl = qafEventControls[i];
                    var events = null;

                    try {
                        events = eval('(' + qafControl.getAttribute('qaf-events') + ')');
                    } catch (error) {
                        $l.eventLog('$w.contentLoaded', 'elID: "{0}" qaf-events 확인 필요 '.format(qafControl.id) + error.message, 'Warning');
                    }

                    if (events) {
                        var length = events.length;
                        for (var j = 0; j < length; j++) {
                            var event = events[j];

                            var func = $this[qafControl.id + '_' + event];
                            if (func) {
                                $l.addEvent(qafControl.id, event, func);
                            }
                        }
                    }
                }

                var qafOptionControls = document.querySelectorAll('[qaf-options]');
                for (var i = 0; i < qafOptionControls.length; i++) {
                    var qafControl = qafOptionControls[i];
                    var elID = qafControl.id.replace('_hidden', '');
                    var options = null;

                    try {
                        var el = $l.get(qafControl.id + '_hidden') || $l.get(qafControl.id);
                        options = eval('(' + el.getAttribute('qaf-options') + ')');
                    } catch (error) {
                        $l.eventLog('$w.contentLoaded', 'elID: "{0}" qaf-options 확인 필요'.format(qafControl.id) + error.message, 'Warning');
                    }

                    if (options && options.transactConfig && options.transactConfig.triggerEvent) {
                        if (qaf.$reflection.isString(options.transactConfig.triggerEvent) == true) {
                            $l.addEvent(elID, options.transactConfig.triggerEvent, function (transactConfig) {
                                var el = this;
                                if (transactConfig && $object.isNullOrUndefined(transactConfig.triggerEvent) == true) {
                                    var options = eval('(' + el.getAttribute('qaf-options') + ')');
                                    transactConfig = options.transactConfig;
                                }
                                else {
                                    var options = eval('(' + el.getAttribute('qaf-options') + ')');
                                    if (options && options.transactConfig) {
                                        transactConfig = options.transactConfig;
                                    }
                                }

                                if (transactConfig) {
                                    $w.transactionAction(transactConfig);
                                }
                            });
                        }
                        else if (qaf.$reflection.isArray(options.transactConfig.triggerEvent) == true) {
                            var triggerFunction = function (transactConfig) {
                                var el = this;
                                if (transactConfig && $object.isNullOrUndefined(transactConfig.triggerEvent) == true) {
                                    var options = eval('(' + el.getAttribute('qaf-options') + ')');
                                    transactConfig = options.transactConfig;
                                }
                                else {
                                    var options = eval('(' + el.getAttribute('qaf-options') + ')');
                                    if (options && options.transactConfig) {
                                        transactConfig = options.transactConfig;
                                    }
                                }

                                if (transactConfig) {
                                    $w.transactionAction(transactConfig);
                                }
                            };

                            for (var key in options.transactConfig.triggerEvent) {
                                var eventName = options.transactConfig.triggerEvent[key];
                                $l.addEvent(elID, eventName, triggerFunction);
                            }
                        }
                    }

                    if (options && options.triggerConfig && options.triggerConfig.triggerEvent) {
                        if (qaf.$reflection.isString(options.triggerConfig.triggerEvent) == true) {
                            $l.addEvent(elID, options.triggerConfig.triggerEvent, function (triggerConfig) {
                                var el = this;
                                if (triggerConfig && $object.isNullOrUndefined(triggerConfig.triggerEvent) == true) {
                                    var options = eval('(' + el.getAttribute('qaf-options') + ')');
                                    triggerConfig = options.triggerConfig;
                                }
                                else {
                                    var options = eval('(' + el.getAttribute('qaf-options') + ')');
                                    if (options && options.triggerConfig) {
                                        triggerConfig = options.triggerConfig;
                                    }
                                }

                                if (triggerConfig) {
                                    $w.triggerAction(triggerConfig);
                                }
                            });
                        }
                        else if (qaf.$reflection.isArray(options.triggerConfig.triggerEvent) == true) {
                            var triggerFunction = function (triggerConfig) {
                                var el = this;
                                if (triggerConfig && $object.isNullOrUndefined(triggerConfig.triggerEvent) == true) {
                                    var options = eval('(' + el.getAttribute('qaf-options') + ')');
                                    triggerConfig = options.triggerConfig;
                                }
                                else {
                                    var options = eval('(' + el.getAttribute('qaf-options') + ')');
                                    if (options && options.triggerConfig) {
                                        triggerConfig = options.triggerConfig;
                                    }
                                }

                                if (triggerConfig) {
                                    $w.triggerAction(triggerConfig);
                                }
                            };

                            for (var key in options.triggerConfig.triggerEvent) {
                                var eventName = options.triggerConfig.triggerEvent[key];
                                $l.addEvent(elID, eventName, triggerFunction);
                            }
                        }
                    }
                }

                var elem = document.createElement('input');
                elem.type = 'hidden';
                elem.id = 'qafControlList';
                elem.textContent = JSON.stringify(qafControlList);;
                document.body.appendChild(elem);

                if (document.body.style.display == 'none') {
                    document.body.style.display = 'block';
                }

                if (mod) {
                    mod.qafControls = qafControlList;
                }
                else {
                    context.qafControls = qafControlList;
                }

                $w.remainingReadyIntervalID = setInterval(function () {
                    if ($w.remainingReadyCount == 0) {
                        clearInterval($w.remainingReadyIntervalID);
                        $w.remainingReadyIntervalID = null;
                        pageLoad();
                        $w.isPageLoad = true;
                    }
                }, 25);

                setTimeout(function () {
                    if ($w.remainingReadyIntervalID != null) {
                        $w.remainingReadyCount = 0;
                    }
                }, $w.pageReadyTimeout);
            };

            if ($w.mappingModule == true) {
                $w.moduleReadyIntervalID = setInterval(function () {
                    var mod = context[$w.pageScript];
                    if (mod && mod._pageInit == undefined) {
                        clearInterval($w.moduleReadyIntervalID);
                        $w.moduleReadyIntervalID = null;

                        if (context.domainLibraryLoad) {
                            domainLibraryLoad();
                        }

                        mod._pageInit = true;
                        if ($w.AppInfo && $w.AppInfo.mappingModel) {
                            var argArgs = $r.getCookie('qaf.iscache') == 'true' ? '' : '?bust=' + new Date().getTime();
                            var moduleJsonFile = $w.pageScript.replace('$', '') + '.json';
                            if (context.moduleJsonFile) {
                                moduleJsonFile = context.moduleJsonFile;
                            }

                            $w.loadJSON(moduleJsonFile + argArgs, mod, function (mod, json) {
                                mod.mappingModel = json;
                            }, pageFormInit, true);
                        }
                        else {
                            pageFormInit();
                        }
                    }
                }, 50);

                setTimeout(function () {
                    if ($w.moduleReadyIntervalID != null) {
                        clearInterval($w.moduleReadyIntervalID);
                        $w.moduleReadyIntervalID = null;
                        $l.eventLog('$w.contentLoaded', '"{0}" 모듈 확인 필요'.format($w.pageScript), 'Error');
                    }
                }, $w.pageReadyTimeout);
            }
            else {
                pageLoad();
                $w.isPageLoad = true;
            }
        },

        addReadyCount: function () {
            if ($w.eventAddReady && $w.isPageLoad == false) {
                document.dispatchEvent($w.eventAddReady);
            }
        },

        removeReadyCount: function () {
            if ($w.eventRemoveReady && $w.isPageLoad == false) {
                document.dispatchEvent($w.eventRemoveReady);
            }
        },

        createSelection: function (el, start, end) {
            /// <summary>
            /// 지정된 요소의 텍스트 영역을 선택합니다.
            /// </summary>
            /// <param name='el' type='Element'>텍스트 영역을 선택할 HTML 요소입니다.</param>
            /// <param name='start' type='Integer'>텍스트 영역의 시작 인덱스입니다.</param>
            /// <param name='end' type='Integer'>텍스트 영역의 끝 인덱스입니다.</param>
            el = $ref.isString(el) == true ? $l.get(el) : el;
            if (el.createTextRange) {
                var newend = end - start;
                var selRange = el.createTextRange();
                selRange.collapse(true);
                selRange.moveStart('character', start);
                selRange.moveEnd('character', newend);
                selRange.select();
                newend = null;
                selRange = null;
            }
            else if (el.setSelectionRange) {
                el.setSelectionRange(start, end);
            }

            el.focus();
        },

        argumentsExtend: function () {
            var extended = {};

            for (var key in arguments) {
                var argument = arguments[key];
                for (var prop in argument) {
                    if (Object.prototype.hasOwnProperty.call(argument, prop)) {
                        extended[prop] = argument[prop];
                    }
                }
            }

            return extended;
        },

        loadJSON: function (url, setting, success, callback, async, isForceCallback) {
            if (async == undefined || async == null) {
                async = true;
            }

            if (isForceCallback == undefined || isForceCallback == null) {
                isForceCallback = false;
            }

            var xhr = new XMLHttpRequest();
            if (async === true) {
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            if (success) {
                                success(setting, JSON.parse(xhr.responseText));
                            }

                            if (callback) {
                                callback();
                            }
                        }
                        else {
                            $l.eventLog('$w.loadJSON', 'async url: ' + url + ', status: ' + xhr.status.toString() + ', responseText: ' + xhr.responseText, 'Error');
                        }

                        if (xhr.status !== 200 && callback && isForceCallback == true) {
                            callback();
                        }
                    }
                };
                xhr.open('GET', url, true);
                xhr.send();
            }
            else {
                xhr.open('GET', url, false);
                xhr.send();

                if (xhr.status === 200) {
                    if (success) {
                        success(setting, JSON.parse(xhr.responseText));
                    }

                    if (callback) {
                        callback();
                    }
                }
                else {
                    $l.eventLog('$w.loadJSON', 'sync url: ' + url + ', status: ' + xhr.status.toString() + ', responseText: ' + xhr.responseText, 'Error');
                }

                if (callback && isForceCallback == true) {
                    callback();
                }
            }
        },

        getTriggerOptions: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return JSON.parse(el.getAttribute('triggerOptions'));
        },

        triggerAction: function (triggerConfig) {
            if ($this) {
                var isContinue = true;

                var defaultParams = {
                    args: [],
                    options: {}
                };

                triggerConfig.params = $w.argumentsExtend(defaultParams, triggerConfig.params);

                if ($this.beforeTrigger) {
                    isContinue = $this.beforeTrigger(triggerConfig.triggerID, triggerConfig.action, triggerConfig.params);
                }

                if ($object.isNullOrUndefined(isContinue) == true || isContinue == true) {
                    var el = $l.get(triggerConfig.triggerID);
                    var triggerResult = null;
                    var trigger = null;

                    // $로 시작하면 uicontrol 컨트롤 메서드, 아니면 화면 컨트롤 이벤트명
                    if (triggerConfig.action.indexOf('$') > -1) {
                        trigger = $this;
                        var currings = triggerConfig.action.split('.');
                        if (currings.length > 0) {
                            for (var i = 0; i < currings.length; i++) {
                                var curring = currings[i];
                                if (trigger) {
                                    trigger = trigger[curring];
                                }
                                else {
                                    trigger = context[curring];
                                }
                            }
                        }
                        else {
                            trigger = context[triggerConfig.action];
                        }
                    }
                    else {
                        trigger = $this[triggerConfig.triggerID + '_' + triggerConfig.action];
                    }

                    if (trigger) {
                        el.setAttribute('triggerOptions', JSON.stringify(triggerConfig.params.options));

                        if (triggerConfig.action.indexOf('$') > -1) {
                            $array.addAt(triggerConfig.params.args, 0, triggerConfig.triggerID);
                        }

                        triggerResult = trigger.apply(el, triggerConfig.params.args);
                        if ($this.afterTrigger) {
                            $this.afterTrigger(null, triggerConfig.action, {
                                elID: triggerConfig.triggerID,
                                result: triggerResult
                            });
                        }
                    }
                    else {
                        if ($this.afterTrigger) {
                            $this.afterTrigger('{0} trigger 확인 필요'.format(triggerConfig.action), triggerConfig.action, null);
                        }
                    }
                }
                else {
                    if ($this.afterTrigger) {
                        $this.afterTrigger('beforeTrigger continue false', triggerConfig.action, null);
                    }
                }
            }
        },

        transactionAction: function (transactConfig) {
            if (transactConfig && $this && $this.mappingModel) {
                if ($object.isNullOrUndefined(transactConfig.noProgress) == true) {
                    transactConfig.noProgress = false;
                }

                if ($w.progressMessage && transactConfig.noProgress == false) {
                    $w.progressMessage($res.progress);
                }

                try {
                    if ($object.isNullOrUndefined($this.mappingModel.Transactions) == true) {
                        $this.mappingModel.Transactions = [];
                    }

                    var isContinue = true;

                    if ($this.beforeTransaction) {
                        isContinue = $this.beforeTransaction(transactConfig);
                    }

                    if ($object.isNullOrUndefined(isContinue) == true || isContinue == true) {
                        var transactions = $this.mappingModel.Transactions;
                        for (var i = 0; i < transactions.length; i++) {
                            if (transactConfig.functionID == transactions[i].FunctionID) {
                                transactions.splice(i, 1);
                                break;
                            }
                        }

                        var qafControlList = $this.qafControls;
                        var transactionObject = {};
                        transactionObject.FunctionID = transactConfig.functionID;
                        transactionObject.TransactionResult = $object.isNullOrUndefined(transactConfig.transactionResult) == true ? true : transactConfig.transactionResult === true;
                        transactionObject.Inputs = [];
                        transactionObject.Outputs = [];

                        if (transactConfig.inputs) {
                            var inputs = transactConfig.inputs;
                            var inputsLength = inputs.length;
                            for (var i = 0; i < inputsLength; i++) {
                                var inputConfig = inputs[i];
                                var input = {
                                    RequestType: inputConfig.type,
                                    DataFieldID: inputConfig.dataFieldID ? inputConfig.dataFieldID : document.forms.length > 0 ? document.forms[0].getAttribute('qaf-datafield') : '',
                                    Items: {}
                                };

                                var qafControlConfigs = null;
                                if (inputConfig.type == 'Row') {
                                    var qafControlConfigs = qafControlList.filter(function (item) {
                                        return item.formDataFieldID == input.DataFieldID && ['grid', 'chart', 'chartjs'].indexOf(item.type) == -1;
                                    });

                                    if (qafControlConfigs && qafControlConfigs.length > 0) {
                                        for (var k = 0; k < qafControlConfigs.length; k++) {
                                            var qafControlConfig = qafControlConfigs[k];

                                            var el = $l.get(qafControlConfig.id + '_hidden') || $l.get(qafControlConfig.id);
                                            var options = el.getAttribute('qaf-options');
                                            if (options == null) {
                                                continue;
                                            }

                                            var qafOptions = null;

                                            try {
                                                qafOptions = JSON.parse(options);
                                            } catch (e) {
                                                qafOptions = eval('(' + options + ')');
                                            }

                                            if (qafOptions == null || qafControlConfig.field == '') {
                                                continue;
                                            }

                                            var isBelong = false;
                                            if (qafOptions.belongID) {
                                                if (qaf.$reflection.isString(qafOptions.belongID) == true) {
                                                    isBelong = transactConfig.functionID == qafOptions.belongID;
                                                }
                                                else if (qaf.$reflection.isArray(qafOptions.belongID) == true) {
                                                    isBelong = qafOptions.belongID.indexOf(transactConfig.functionID) > -1;
                                                }
                                            }

                                            if (isBelong == true) {
                                                input.Items[qafControlConfig.field] = {
                                                    FieldID: qafControlConfig.field,
                                                    DataType: qafOptions.dataType
                                                };
                                            }
                                        }
                                    }
                                    else {
                                        var qafControlConfigs = qafControlList.filter(function (item) {
                                            return item.field == input.DataFieldID && item.type == 'grid';
                                        });

                                        if (qafControlConfigs && qafControlConfigs.length > 0) {
                                            for (var k = 0; k < qafControlConfigs.length; k++) {
                                                var qafControlConfig = qafControlConfigs[k];

                                                var el = $l.get(qafControlConfig.id + '_hidden') || $l.get(qafControlConfig.id);
                                                var qafOptions = JSON.parse(el.getAttribute('qaf-options'));

                                                if (qafOptions == null) {
                                                    continue;
                                                }

                                                for (var l = 0; l < qafOptions.columns.length; l++) {
                                                    var column = qafOptions.columns[l];
                                                    var dataType = 'string'
                                                    switch (column.columnType) {
                                                        case 'checkbox':
                                                            dataType = 'bool';
                                                            break;
                                                        case 'numeric':
                                                            dataType = 'int';
                                                            break;
                                                        // case 'date':
                                                        //     dataType = 'date';
                                                        //     break;
                                                    }

                                                    var isBelong = false;
                                                    if (column.data == 'Flag') {
                                                        isBelong = true;
                                                    }
                                                    else if (column.belongID) {
                                                        if (qaf.$reflection.isString(column.belongID) == true) {
                                                            isBelong = transactConfig.functionID == column.belongID;
                                                        }
                                                        else if (qaf.$reflection.isArray(column.belongID) == true) {
                                                            isBelong = column.belongID.indexOf(transactConfig.functionID) > -1;
                                                        }
                                                    }

                                                    if (isBelong == true) {
                                                        input.Items[column.data] = {
                                                            FieldID: column.data,
                                                            DataType: dataType
                                                        };
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            if ($this.$data && $this.$data.storeList.length > 0) {
                                                for (var k = 0; k < $this.$data.storeList.length; k++) {
                                                    var store = $this.$data.storeList[k];
                                                    if (store.storeType == 'Form' && store.dataSourceID == input.DataFieldID) {
                                                        for (var l = 0; l < store.columns.length; l++) {
                                                            var column = store.columns[l];
                                                            var isBelong = false;
                                                            if (qaf.$reflection.isString(column.belongID) == true) {
                                                                isBelong = transactConfig.functionID == column.belongID;
                                                            }
                                                            else if (qaf.$reflection.isArray(column.belongID) == true) {
                                                                isBelong = column.belongID.indexOf(transactConfig.functionID) > -1;
                                                            }

                                                            if (isBelong == true) {
                                                                input.Items[column.data] = {
                                                                    FieldID: column.data,
                                                                    DataType: column.dataType
                                                                };
                                                            }
                                                        }

                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                else if (inputConfig.type == 'List') {
                                    var qafControlConfigs = qafControlList.filter(function (item) {
                                        return item.field == input.DataFieldID && item.type == 'grid';
                                    });

                                    if (qafControlConfigs && qafControlConfigs.length == 1) {
                                        var qafControlConfig = qafControlConfigs[0];

                                        var el = $l.get(qafControlConfig.id + '_hidden') || $l.get(qafControlConfig.id);
                                        var qafOptions = JSON.parse(el.getAttribute('qaf-options'));

                                        if (qafOptions == null) {
                                            continue;
                                        }

                                        for (var k = 0; k < qafOptions.columns.length; k++) {
                                            var column = qafOptions.columns[k];
                                            var dataType = 'string'
                                            switch (column.columnType) {
                                                case 'checkbox':
                                                    dataType = 'bool';
                                                    break;
                                                case 'numeric':
                                                    dataType = 'int';
                                                    break;
                                                // case 'date':
                                                //     dataType = 'date';
                                                //     break;
                                            }

                                            var isBelong = false;
                                            if (column.data == 'Flag') {
                                                isBelong = true;
                                            }
                                            else if (column.belongID) {
                                                if (qaf.$reflection.isString(column.belongID) == true) {
                                                    isBelong = transactConfig.functionID == column.belongID;
                                                }
                                                else if (qaf.$reflection.isArray(column.belongID) == true) {
                                                    isBelong = column.belongID.indexOf(transactConfig.functionID) > -1;
                                                }
                                            }

                                            if (isBelong == true) {
                                                input.Items[column.data] = {
                                                    FieldID: column.data,
                                                    DataType: dataType
                                                };
                                            }
                                        }
                                    }
                                    else {
                                        var isMapping = false;
                                        if ($this.$data && $this.$data.storeList.length > 0) {
                                            for (var k = 0; k < $this.$data.storeList.length; k++) {
                                                var store = $this.$data.storeList[k];
                                                if (store.storeType == 'Grid' && store.dataSourceID == input.DataFieldID) {
                                                    isMapping = true;
                                                    for (var l = 0; l < store.columns.length; l++) {
                                                        var column = store.columns[l];
                                                        var isBelong = false;
                                                        if (qaf.$reflection.isString(column.belongID) == true) {
                                                            isBelong = transactConfig.functionID == column.belongID;
                                                        }
                                                        else if (qaf.$reflection.isArray(column.belongID) == true) {
                                                            isBelong = column.belongID.indexOf(transactConfig.functionID) > -1;
                                                        }

                                                        if (isBelong == true) {
                                                            input.Items[column.data] = {
                                                                FieldID: column.data,
                                                                DataType: column.dataType
                                                            };
                                                        }
                                                    }

                                                    break;
                                                }
                                            }
                                        }

                                        if (isMapping == false) {
                                            $l.eventLog('$w.transactionAction', '{0} 컬럼 ID 중복 또는 존재여부 확인 필요'.format(input.DataFieldID), 'Warning');
                                        }
                                    }
                                }

                                transactionObject.Inputs.push(input);
                            }
                        }

                        if (transactConfig.outputs) {
                            var outputs = transactConfig.outputs;
                            var outputsLength = outputs.length;
                            var qafControls = $this.qafControls;
                            for (var i = 0; i < outputsLength; i++) {
                                var outputConfig = outputs[i];
                                var output = {
                                    ResponseType: outputConfig.type,
                                    DataFieldID: outputConfig.dataFieldID ? outputConfig.dataFieldID : '',
                                    Items: {}
                                };

                                var qafControlConfigs = null;
                                if (outputConfig.type == 'Form') {
                                    var qafControlConfigs = qafControlList.filter(function (item) {
                                        return item.formDataFieldID == output.DataFieldID && ['grid', 'chart', 'chartjs'].indexOf(item.type) == -1;
                                    });

                                    if (qafControlConfigs && qafControlConfigs.length > 0) {
                                        for (var k = 0; k < qafControlConfigs.length; k++) {
                                            var qafControlConfig = qafControlConfigs[k];

                                            var el = $l.get(qafControlConfig.id + '_hidden') || $l.get(qafControlConfig.id);
                                            var options = el.getAttribute('qaf-options');
                                            if (options == null) {
                                                continue;
                                            }

                                            var qafOptions = null;

                                            try {
                                                qafOptions = JSON.parse(options);
                                            } catch (e) {
                                                qafOptions = eval('(' + options + ')');
                                            }

                                            if (qafOptions == null || qafControlConfig.field == '') {
                                                continue;
                                            }

                                            output.Items[qafControlConfig.field] = {
                                                FieldID: qafControlConfig.field,
                                                DataType: qafOptions.dataType
                                            };

                                            if (outputConfig.clear == true) {
                                                if (qafControls && qafControls.length == 1) {
                                                    var bindingControlInfos = qafControls.filter(function (item) {
                                                        return item.field == outputConfig.dataFieldID;
                                                    });

                                                    if (bindingControlInfos.length == 1) {
                                                        var controlInfo = bindingControlInfos[0];
                                                        if (controlInfo.module == null) {
                                                            continue;
                                                        }

                                                        var controlID = controlInfo.id;
                                                        var controlField = controlInfo.field;
                                                        var controlModule = null;
                                                        var currings = controlInfo.module.split('.');
                                                        if (currings.length > 0) {
                                                            for (var l = 0; l < currings.length; l++) {
                                                                var curring = currings[l];
                                                                if (controlModule) {
                                                                    controlModule = controlModule[curring];
                                                                }
                                                                else {
                                                                    controlModule = context[curring];
                                                                }
                                                            }
                                                        }
                                                        else {
                                                            controlModule = context[controlInfo.module];
                                                        }

                                                        if (controlModule.clear) {
                                                            controlModule.clear(controlID);
                                                        }
                                                    }
                                                    else {
                                                        $l.eventLog('$w.transactionAction', '{0} DataFieldID 중복 또는 존재여부 확인 필요'.format(outputConfig.dataFieldID), 'Warning');
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        if ($this.$data && $this.$data.storeList.length > 0) {
                                            for (var k = 0; k < $this.$data.storeList.length; k++) {
                                                var store = $this.$data.storeList[k];
                                                if (store.storeType == 'Form' && store.dataSourceID == output.DataFieldID) {
                                                    for (var l = 0; l < store.columns.length; l++) {
                                                        var column = store.columns[l];

                                                        output.Items[column.data] = {
                                                            FieldID: column.data,
                                                            DataType: column.dataType
                                                        };
                                                    }

                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                                else if (outputConfig.type == 'Grid') {
                                    var qafControlConfigs = qafControlList.filter(function (item) {
                                        return item.field == output.DataFieldID && item.type == 'grid';
                                    });

                                    if (qafControlConfigs && qafControlConfigs.length == 1) {
                                        var qafControlConfig = qafControlConfigs[0];

                                        var el = $l.get(qafControlConfig.id + '_hidden') || $l.get(qafControlConfig.id);
                                        var qafOptions = JSON.parse(el.getAttribute('qaf-options'));

                                        if (qafOptions == null) {
                                            continue;
                                        }

                                        for (var k = 0; k < qafOptions.columns.length; k++) {
                                            var column = qafOptions.columns[k];
                                            var dataType = 'string'
                                            switch (column.type) {
                                                case 'checkbox':
                                                    dataType = 'bool';
                                                    break;
                                                case 'numeric':
                                                    dataType = 'int';
                                                    break;
                                                // case 'date':
                                                //     dataType = 'date';
                                                //     break;
                                            }

                                            output.Items[column.data] = {
                                                FieldID: column.data,
                                                DataType: dataType
                                            };
                                        }

                                        if (outputConfig.clear == true) {
                                            if (qafControls && qafControls.length > 0) {
                                                var bindingControlInfos = qafControls.filter(function (item) {
                                                    return item.field == output.DataFieldID;
                                                });

                                                var controlInfo = bindingControlInfos[0];
                                                var controlModule = null;
                                                var currings = controlInfo.module.split('.');
                                                if (currings.length > 0) {
                                                    for (var i = 0; i < currings.length; i++) {
                                                        var curring = currings[i];
                                                        if (controlModule) {
                                                            controlModule = controlModule[curring];
                                                        }
                                                        else {
                                                            controlModule = context[curring];
                                                        }
                                                    }
                                                }
                                                else {
                                                    controlModule = context[controlInfo.module];
                                                }

                                                if (controlModule.clear) {
                                                    controlModule.clear(controlInfo.id);
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        qafControlConfigs = qafControlList.filter(function (item) {
                                            return item.field == output.DataFieldID && ['chart', 'chartjs'].indexOf(item.type) > -1;
                                        });

                                        if (qafControlConfigs && qafControlConfigs.length == 1) {
                                            var qafControlConfig = qafControlConfigs[0];

                                            var el = $l.get(qafControlConfig.id + '_hidden') || $l.get(qafControlConfig.id);
                                            var qafOptions = JSON.parse(el.getAttribute('qaf-options'));

                                            if (qafOptions == null) {
                                                continue;
                                            }

                                            for (var k = 0; k < qafOptions.series.length; k++) {
                                                var column = qafOptions.series[k];
                                                output.Items[column.columnID] = {
                                                    FieldID: column.columnID,
                                                    DataType: column.dataType ? column.dataType : 'string'
                                                };
                                            }

                                            if (outputConfig.clear == true) {
                                                if (qafControls && qafControls.length == 1) {
                                                    var bindingControlInfos = qafControls.filter(function (item) {
                                                        return item.field == outputConfig.dataFieldID;
                                                    });

                                                    if (bindingControlInfos.length == 1) {
                                                        var controlInfo = bindingControlInfos[0];
                                                        if (controlInfo.module == null) {
                                                            continue;
                                                        }

                                                        var controlID = controlInfo.id;
                                                        var controlField = controlInfo.field;
                                                        var controlModule = null;
                                                        var currings = controlInfo.module.split('.');
                                                        if (currings.length > 0) {
                                                            for (var l = 0; l < currings.length; l++) {
                                                                var curring = currings[l];
                                                                if (controlModule) {
                                                                    controlModule = controlModule[curring];
                                                                }
                                                                else {
                                                                    controlModule = context[curring];
                                                                }
                                                            }
                                                        }
                                                        else {
                                                            controlModule = context[controlInfo.module];
                                                        }

                                                        if (controlModule.clear) {
                                                            controlModule.clear(controlID);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            var isMapping = false;
                                            if ($this.$data && $this.$data.storeList.length > 0) {
                                                for (var k = 0; k < $this.$data.storeList.length; k++) {
                                                    var store = $this.$data.storeList[k];
                                                    if (store.storeType == 'Grid' && store.dataSourceID == output.DataFieldID) {
                                                        isMapping = true;

                                                        for (var l = 0; l < store.columns.length; l++) {
                                                            var column = store.columns[l];

                                                            output.Items[column.data] = {
                                                                FieldID: column.data,
                                                                DataType: column.dataType
                                                            };
                                                        }

                                                        break;
                                                    }
                                                }
                                            }

                                            if (isMapping == false) {
                                                $l.eventLog('$w.transactionAction', '{0} DataFieldID 중복 또는 존재여부 확인 필요'.format(output.DataFieldID), 'Warning');
                                            }
                                        }
                                    }
                                }

                                transactionObject.Outputs.push(output);
                            }
                        }

                        $this.mappingModel.Transactions.push(transactionObject);
                        $w.transaction(transactConfig.functionID, function (responseObject, addtionalData) {
                            var error = null;
                            if (responseObject && responseObject.ErrorText.length > 0) {
                                error = responseObject.ErrorText[0];
                                $l.eventLog('$w.transaction.callback', error, 'Error');
                            }

                            var callbackResult = null;
                            if (transactConfig.callback && $ref.isFunction(transactConfig.callback) == true) {
                                callbackResult = transactConfig.callback(error, responseObject, addtionalData);
                            }

                            if (callbackResult == null || callbackResult === true) {
                                if ($this.afterTransaction) {
                                    $this.afterTransaction(null, transactConfig.functionID, responseObject, addtionalData);
                                }
                            }
                            else if (callbackResult === false) {
                                if ($this.afterTransaction) {
                                    $this.afterTransaction('callbackResult continue false', transactConfig.functionID, null, null);
                                }
                            }

                            if (transactConfig.callback && $ref.isArray(transactConfig.callback) == true) {
                                setTimeout(function () {
                                    var eventData = {
                                        error: error,
                                        responseObject: responseObject,
                                        addtionalData: addtionalData
                                    }
                                    $l.trigger(transactConfig.callback[0], transactConfig.callback[1], eventData);
                                });
                            }
                        }, transactConfig.triggerMessage);
                    }
                    else {
                        if ($w.closeProgressMessage) {
                            $w.closeProgressMessage();
                        }

                        if ($this.afterTransaction) {
                            $this.afterTransaction('beforeTransaction continue false', transactConfig.functionID, null, null);
                        }
                    }
                } catch (error) {
                    $l.eventLog('$w.transactionAction', error, 'Error');

                    if ($w.closeProgressMessage) {
                        $w.closeProgressMessage();
                    }
                }
            }
        },

        transactionDirect: function (directObject, callback) {
            /*
            var directObject = {
                ProgramID: 'SVU',
                BusinessID: 'ZZW',
                SystemID: 'BP01',
                TransactionID: 'ZZA010',
                FunctionID: 'L01',
                DataTransactionInterface: 'Row|Form',
                TransactionResult: true,
                InputObjects: [
                    { prop: 'ApplicationID', val: '' },
                    { prop: 'ProjectID', val: '' },
                    { prop: 'TransactionID', val: '' }
                ]
            };

            $w.transactionDirect(directObject, function (responseData, addtionalData) {
                debugger;
            });
            */
            directObject.TransactionResult = $object.isNullOrUndefined(directObject.TransactionResult) == true ? true : directObject.TransactionResult === true;
            var transactionObject = $w.transactionObject(directObject.FunctionID, 'Json');

            transactionObject.ProgramID = directObject.ProgramID;
            transactionObject.BusinessID = directObject.BusinessID;
            transactionObject.SystemID = directObject.SystemID;
            transactionObject.TransactionID = directObject.TransactionID;
            transactionObject.DataTransactionInterface = directObject.DataTransactionInterface || 'Row|Form';
            transactionObject.TransactionResult = $object.isNullOrUndefined(directObject.TransactionResult) == true ? true : directObject.TransactionResult === true;

            if (isNodejs == true) {
                transactionObject.ScreenID = directObject.ScreenID || directObject.TransactionID;
            }
            else {
                transactionObject.ScreenID = $w.pageScript.replace('$', '');
            }

            if (directObject.InputLists && directObject.InputLists.length > 0) {
                for (var key in directObject.InputLists) {
                    transactionObject.Inputs.push(directObject.InputLists[key]);
                }
                transactionObject.InputsItemCount.push(directObject.InputLists.length);
            }
            else {
                transactionObject.Inputs.push(directObject.InputObjects);
                transactionObject.InputsItemCount.push(1);
            }

            $w.executeTransaction(directObject, transactionObject, function (responseData, addtionalData) {
                if (callback) {
                    callback(responseData, addtionalData);
                }
            });
        },

        transaction: function (functionID, callback, message) {
            try {
                if ($w.domainTransactionLoaderStart) {
                    $w.domainTransactionLoaderStart();
                }

                if (message) {
                    if ($w.progressMessage) {
                        $w.progressMessage(message);
                    }
                }

                var responseObject = {
                    ErrorText: [],
                    OutputStat: []
                };

                if ($this && $this.mappingModel && $this.mappingModel.Transactions) {
                    var transactions = $this.mappingModel.Transactions.filter(function (item) {
                        return item.FunctionID == functionID;
                    });

                    if (transactions.length == 1) {
                        var transaction = transactions[0];
                        var transactionObject = $w.transactionObject(transaction.FunctionID, 'Json');

                        transactionObject.ProgramID = $this.mappingModel.ProgramID;
                        transactionObject.BusinessID = $this.mappingModel.BusinessID;
                        transactionObject.SystemID = $this.mappingModel.SystemID;
                        transactionObject.TransactionID = $this.mappingModel.TransactionID;
                        transactionObject.ScreenID = $w.pageScript.replace('$', '');

                        // qafControls 컨트롤 목록
                        var qafControls = context[$w.pageScript]['qafControls'];

                        // Input Mapping
                        var inputLength = transaction.Inputs.length;
                        for (var inputIndex = 0; inputIndex < inputLength; inputIndex++) {
                            var inputMapping = transaction.Inputs[inputIndex];
                            var inputObjects = [];

                            if (inputMapping.RequestType == 'Row') {
                                var bindingControlInfos = qafControls.filter(function (item) {
                                    return item.field == inputMapping.DataFieldID;
                                });

                                if (bindingControlInfos.length == 1) {
                                    var controlInfo = bindingControlInfos[0];

                                    if (['grid', 'chart'].indexOf(controlInfo.type) > -1) {
                                        var dataFieldID = inputMapping.DataFieldID; // qaf-datafield

                                        var controlValue = '';
                                        if (qafControls && qafControls.length > 0) {
                                            bindingControlInfos = qafControls.filter(function (item) {
                                                return item.field == dataFieldID;
                                            });

                                            if (bindingControlInfos.length == 1) {
                                                var controlInfo = bindingControlInfos[0];
                                                var controlModule = null;
                                                var currings = controlInfo.module.split('.');
                                                if (currings.length > 0) {
                                                    for (var i = 0; i < currings.length; i++) {
                                                        var curring = currings[i];
                                                        if (controlModule) {
                                                            controlModule = controlModule[curring];
                                                        }
                                                        else {
                                                            controlModule = context[curring];
                                                        }
                                                    }
                                                }
                                                else {
                                                    controlModule = context[controlInfo.module];
                                                }

                                                var el = $l.get(controlInfo.id + '_hidden') || $l.get(controlInfo.id);
                                                var qafOptions = JSON.parse(el.getAttribute('qaf-options'));

                                                for (var k = 0; k < qafOptions.columns.length; k++) {
                                                    var column = qafOptions.columns[k];
                                                    if (column.validators && $validation.transactionValidate) {
                                                        column.controlText = qafOptions.controlText || '';
                                                        var isValidate = $validation.transactionValidate(controlModule, controlInfo, column, inputMapping.RequestType);

                                                        if (isValidate == false) {
                                                            if ($this.afterTransaction) {
                                                                $this.afterTransaction('validators continue false', functionID, column, null);
                                                            }

                                                            if ($w.domainTransactionLoaderEnd) {
                                                                $w.domainTransactionLoaderEnd();
                                                            }

                                                            return false;
                                                        }
                                                    }
                                                }

                                                inputObjects = controlModule.getValue(controlInfo.id, 'Row', inputMapping.Items)[0];
                                            }
                                            else {
                                                $l.eventLog('$w.transaction', '"{0}" Row List Input Mapping 확인 필요'.format(dataFieldID), 'Warning');
                                            }
                                        }
                                    }
                                    else {
                                        for (var key in inputMapping.Items) {
                                            var meta = inputMapping.Items[key];
                                            var dataFieldID = key; // qaf-datafield
                                            var fieldID = meta.FieldID; // DbColumnID
                                            var dataType = meta.DataType;
                                            var serviceObject = { prop: fieldID, val: '' };

                                            var controlValue = '';
                                            if (qafControls.length > 0) {
                                                bindingControlInfos = qafControls.filter(function (item) {
                                                    return item.field == dataFieldID && item.formDataFieldID == inputMapping.DataFieldID;
                                                });

                                                if (bindingControlInfos.length == 1) {
                                                    var controlInfo = bindingControlInfos[0];
                                                    var controlModule = null;
                                                    var currings = controlInfo.module.split('.');
                                                    if (currings.length > 0) {
                                                        for (var i = 0; i < currings.length; i++) {
                                                            var curring = currings[i];
                                                            if (controlModule) {
                                                                controlModule = controlModule[curring];
                                                            }
                                                            else {
                                                                controlModule = context[curring];
                                                            }
                                                        }
                                                    }
                                                    else {
                                                        controlModule = context[controlInfo.module];
                                                    }

                                                    var el = $l.get(controlInfo.id + '_hidden') || $l.get(controlInfo.id);
                                                    var qafOptions = JSON.parse(el.getAttribute('qaf-options'));

                                                    if (qafOptions.validators && $validation.transactionValidate) {
                                                        var isValidate = $validation.transactionValidate(controlModule, controlInfo, qafOptions, inputMapping.RequestType);

                                                        if (isValidate == false) {
                                                            if ($this.afterTransaction) {
                                                                $this.afterTransaction('validators continue false', functionID, qafOptions, null);
                                                            }

                                                            if ($w.domainTransactionLoaderEnd) {
                                                                $w.domainTransactionLoaderEnd();
                                                            }

                                                            return false;
                                                        }
                                                    }

                                                    controlValue = controlModule.getValue(controlInfo.id, meta);

                                                    if (!controlValue && dataType == 'int') {
                                                        controlValue = 0;
                                                    }
                                                }
                                                else {
                                                    $l.eventLog('$w.transaction', '"{0}" Row Control Input Mapping 확인 필요'.format(dataFieldID), 'Warning');
                                                }
                                            }

                                            serviceObject.val = controlValue;
                                            inputObjects.push(serviceObject);
                                        }
                                    }
                                }
                                else {
                                    if ($this.$data && $this.$data.storeList.length > 0) {
                                        for (var key in inputMapping.Items) {
                                            var isMapping = false;
                                            var meta = inputMapping.Items[key];
                                            var dataFieldID = key; // qaf-datafield
                                            var fieldID = meta.FieldID; // DbColumnID
                                            var dataType = meta.DataType;
                                            var serviceObject = { prop: fieldID, val: '' };

                                            var controlValue = '';
                                            for (var k = 0; k < $this.$data.storeList.length; k++) {
                                                var store = $this.$data.storeList[k];
                                                if (store.storeType == 'Form' && store.dataSourceID == inputMapping.DataFieldID) {
                                                    isMapping = true;
                                                    bindingControlInfos = store.columns.filter(function (item) {
                                                        return item.data == dataFieldID;
                                                    });

                                                    if (bindingControlInfos.length == 1) {
                                                        var controlInfo = bindingControlInfos[0];
                                                        controlValue = $this.store[store.dataSourceID][controlInfo.data];

                                                        if (!controlValue && dataType == 'int') {
                                                            controlValue = 0;
                                                        }

                                                        if ($object.isNullOrUndefined(controlValue) == true) {
                                                            controlValue = '';
                                                        }
                                                    }
                                                    else {
                                                        $l.eventLog('$w.transaction', '"{0}" Row Input Mapping 확인 필요'.format(dataFieldID), 'Warning');
                                                    }

                                                    break;
                                                }
                                            }

                                            if (isMapping == true) {
                                                serviceObject.val = controlValue;
                                                inputObjects.push(serviceObject);
                                            }
                                            else {
                                                $l.eventLog('$w.transaction', '{0} Row 컨트롤 ID 중복 또는 존재여부 확인 필요'.format(inputMapping.DataFieldID), 'Warning');
                                            }
                                        }
                                    }
                                }

                                transactionObject.Inputs.push(inputObjects); // transactionObject.Inputs.push($reflection.clone(inputObjects));
                                transactionObject.InputsItemCount.push(1);
                            }
                            else if (inputMapping.RequestType == 'List') {
                                var dataFieldID = inputMapping.DataFieldID; // qaf-datafield

                                var controlValue = '';
                                if (qafControls && qafControls.length > 0) {
                                    var bindingControlInfos = qafControls.filter(function (item) {
                                        return item.field == dataFieldID;
                                    });

                                    if (bindingControlInfos.length == 1) {
                                        var controlInfo = bindingControlInfos[0];
                                        var controlModule = null;
                                        var currings = controlInfo.module.split('.');
                                        if (currings.length > 0) {
                                            for (var i = 0; i < currings.length; i++) {
                                                var curring = currings[i];
                                                if (controlModule) {
                                                    controlModule = controlModule[curring];
                                                }
                                                else {
                                                    controlModule = context[curring];
                                                }
                                            }
                                        }
                                        else {
                                            controlModule = context[controlInfo.module];
                                        }

                                        var el = $l.get(controlInfo.id + '_hidden') || $l.get(controlInfo.id);
                                        var qafOptions = JSON.parse(el.getAttribute('qaf-options'));

                                        for (var k = 0; k < qafOptions.columns.length; k++) {
                                            var column = qafOptions.columns[k];
                                            column.controlText = qafOptions.controlText || '';
                                            if (column.validators && $validation.transactionValidate) {
                                                var isValidate = $validation.transactionValidate(controlModule, controlInfo, column, inputMapping.RequestType);

                                                if (isValidate == false) {
                                                    if ($this.afterTransaction) {
                                                        $this.afterTransaction('validators continue false', functionID, column, null);
                                                    }

                                                    if ($w.domainTransactionLoaderEnd) {
                                                        $w.domainTransactionLoaderEnd();
                                                    }

                                                    return false;
                                                }
                                            }
                                        }

                                        inputObjects = controlModule.getValue(controlInfo.id, 'List', inputMapping.Items);
                                    }
                                    else {
                                        var isMapping = false;
                                        if ($this.$data && $this.$data.storeList.length > 0) {
                                            for (var k = 0; k < $this.$data.storeList.length; k++) {
                                                var store = $this.$data.storeList[k];
                                                if (store.storeType == 'Grid' && store.dataSourceID == dataFieldID) {
                                                    isMapping = true;
                                                    var bindingInfo = $this.$data.bindingList.find(function (item) {
                                                        return (item.dataSourceID == store.dataSourceID && item.controlType == 'grid');
                                                    });

                                                    if (bindingInfo) {
                                                        inputObjects = $this.store[store.dataSourceID][bindingInfo.dataFieldID];
                                                    }
                                                    else {
                                                        var controlValue = [];
                                                        var items = $this.store[store.dataSourceID];
                                                        var length = items.length;
                                                        for (var i = 0; i < length; i++) {
                                                            var item = items[i];

                                                            var row = [];
                                                            for (var key in item) {
                                                                var serviceObject = { prop: key, val: item[key] };
                                                                row.push(serviceObject);
                                                            }
                                                            controlValue.push(row);
                                                        }

                                                        inputObjects = controlValue;
                                                    }

                                                    break;
                                                }
                                            }
                                        }

                                        if (isMapping == false) {
                                            $l.eventLog('$w.transaction', '"{0}" List Input Mapping 확인 필요'.format(dataFieldID), 'Warning');
                                        }
                                    }
                                }

                                for (var key in inputObjects) {
                                    transactionObject.Inputs.push(inputObjects[key]);
                                }
                                transactionObject.InputsItemCount.push(inputObjects.length);
                            }
                        }

                        $w.executeTransaction($this.mappingModel, transactionObject, function (responseData, addtionalData) {
                            var errorText = '';
                            var isDynamicOutput = false;
                            for (var i = 0; i < transaction.Outputs.length; i++) {
                                if (transaction.Outputs[i].ResponseType == 'Dynamic') {
                                    isDynamicOutput = true;
                                    break;
                                }
                            }

                            if (isDynamicOutput == true) {
                                responseObject.OutputStat.push({
                                    FieldID: 'Dynamic',
                                    Count: 1,
                                    DynamicData: responseData
                                });
                            }
                            else {
                                if (responseData.length == transaction.Outputs.length) {
                                    // qafControls 컨트롤 목록
                                    var qafControls = context[$w.pageScript]['qafControls'];

                                    // Output Mapping을 설정
                                    var outputLength = transaction.Outputs.length;
                                    for (var outputIndex = 0; outputIndex < outputLength; outputIndex++) {
                                        var outputMapping = transaction.Outputs[outputIndex];
                                        var RES_OUTPUT = responseData[outputIndex];
                                        var responseFieldID = RES_OUTPUT['RES_FIELD_ID'];
                                        var outputData = RES_OUTPUT['RES_DAT'];

                                        if ($this.outputDataBinding) {
                                            $this.outputDataBinding(functionID, responseFieldID, outputData);
                                        }

                                        if (outputMapping.ResponseType == 'Form') {
                                            if ($object.isNullOrUndefined(outputData) == true || outputData.length) {
                                                responseObject.OutputStat.push({
                                                    FieldID: responseFieldID,
                                                    Count: 0
                                                });
                                            }
                                            else {
                                                responseObject.OutputStat.push({
                                                    FieldID: responseFieldID,
                                                    Count: 1
                                                });

                                                for (var key in outputMapping.Items) {
                                                    var meta = outputMapping.Items[key];
                                                    var dataFieldID = key; // qaf-datafield
                                                    var fieldID = meta.FieldID; // DbColumnID

                                                    var controlValue = outputData[fieldID];
                                                    if (controlValue != undefined && qafControls && qafControls.length > 0) {
                                                        var bindingControlInfos = qafControls.filter(function (item) {
                                                            return item.field == dataFieldID && item.formDataFieldID == outputMapping.DataFieldID;
                                                        });

                                                        if (bindingControlInfos.length == 1) {
                                                            var controlInfo = bindingControlInfos[0];
                                                            var controlModule = null;
                                                            var currings = controlInfo.module.split('.');
                                                            if (currings.length > 0) {
                                                                for (var i = 0; i < currings.length; i++) {
                                                                    var curring = currings[i];
                                                                    if (controlModule) {
                                                                        controlModule = controlModule[curring];
                                                                    }
                                                                    else {
                                                                        controlModule = context[curring];
                                                                    }
                                                                }
                                                            }
                                                            else {
                                                                controlModule = context[controlInfo.module];
                                                            }

                                                            controlModule.setValue(controlInfo.id, controlValue, meta);
                                                        }
                                                        else {
                                                            var isMapping = false;
                                                            if ($this.$data && $this.$data.storeList.length > 0) {
                                                                for (var k = 0; k < $this.$data.storeList.length; k++) {
                                                                    var store = $this.$data.storeList[k];
                                                                    if ($object.isNullOrUndefined($this.store[store.dataSourceID]) == true) {
                                                                        $this.store[store.dataSourceID] = {};
                                                                    }

                                                                    if (store.storeType == 'Form' && store.dataSourceID == outputMapping.DataFieldID) {
                                                                        isMapping = true;
                                                                        bindingControlInfos = store.columns.filter(function (item) {
                                                                            return item.data == dataFieldID;
                                                                        });

                                                                        if (bindingControlInfos.length == 1) {
                                                                            $this.store[store.dataSourceID][dataFieldID] = controlValue;
                                                                        }

                                                                        break;
                                                                    }
                                                                }
                                                            }

                                                            if (isMapping == false) {
                                                                errorText = '"{0}" Form Output Mapping 확인 필요'.format(dataFieldID);
                                                                responseObject.ErrorText.push(errorText);
                                                                $l.eventLog('$w.transaction', errorText, 'Error');
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        else if (outputMapping.ResponseType == 'Grid') {
                                            if (outputData.length && outputData.length > 0) {
                                                responseObject.OutputStat.push({
                                                    FieldID: responseFieldID,
                                                    Count: outputData.length
                                                });
                                                var dataFieldID = outputMapping.DataFieldID; // qaf-datafield
                                                if (qafControls && qafControls.length > 0) {
                                                    var bindingControlInfos = qafControls.filter(function (item) {
                                                        return item.field == dataFieldID;
                                                    });

                                                    if (bindingControlInfos.length == 1) {
                                                        var controlInfo = bindingControlInfos[0];
                                                        var controlModule = null;
                                                        var currings = controlInfo.module.split('.');
                                                        if (currings.length > 0) {
                                                            for (var i = 0; i < currings.length; i++) {
                                                                var curring = currings[i];
                                                                if (controlModule) {
                                                                    controlModule = controlModule[curring];
                                                                }
                                                                else {
                                                                    controlModule = context[curring];
                                                                }
                                                            }
                                                        }
                                                        else {
                                                            controlModule = context[controlInfo.module];
                                                        }

                                                        controlModule.setValue(controlInfo.id, outputData, outputMapping.Items);
                                                    }
                                                    else {
                                                        var isMapping = false;
                                                        if ($this.$data && $this.$data.storeList.length > 0) {
                                                            for (var k = 0; k < $this.$data.storeList.length; k++) {
                                                                var store = $this.$data.storeList[k];
                                                                if ($object.isNullOrUndefined($this.store[store.dataSourceID]) == true) {
                                                                    $this.store[store.dataSourceID] = [];
                                                                }

                                                                if (store.storeType == 'Grid' && store.dataSourceID == outputMapping.DataFieldID) {
                                                                    isMapping = true;
                                                                    var bindingInfos = $this.$data.bindingList.filter(function (item) {
                                                                        return (item.dataSourceID == store.dataSourceID && item.controlType == 'grid');
                                                                    });

                                                                    var length = outputData.length;
                                                                    for (var i = 0; i < length; i++) {
                                                                        outputData[i].Flag = 'R';
                                                                    }

                                                                    if (bindingInfos.length > 0) {
                                                                        for (var binding_i = 0; binding_i < bindingInfos.length; binding_i++) {
                                                                            var bindingInfo = bindingInfos[binding_i];
                                                                            $this.store[store.dataSourceID][bindingInfo.dataFieldID] = outputData;
                                                                        }
                                                                    }
                                                                    else {
                                                                        $this.store[store.dataSourceID] = outputData;
                                                                    }
                                                                    break;
                                                                }
                                                            }
                                                        }

                                                        if (isMapping == false) {
                                                            errorText = '"{0}" Grid Output Mapping 확인 필요'.format(dataFieldID);
                                                            responseObject.ErrorText.push(errorText);
                                                            $l.eventLog('$w.transaction', errorText, 'Error');
                                                        }
                                                    }
                                                }
                                            }
                                            else {
                                                responseObject.OutputStat.push({
                                                    FieldID: responseFieldID,
                                                    Count: 0
                                                });
                                            }
                                        }
                                        else if (outputMapping.ResponseType == 'Chart') {
                                            if (outputData.length && outputData.length > 0) {
                                                responseObject.OutputStat.push({
                                                    FieldID: responseFieldID,
                                                    Count: outputData.length
                                                });
                                                var dataFieldID = outputMapping.DataFieldID; // qaf-datafield

                                                if (qafControls && qafControls.length > 0) {
                                                    var bindingControlInfos = qafControls.filter(function (item) {
                                                        return item.field == dataFieldID;
                                                    });

                                                    if (bindingControlInfos.length == 1) {
                                                        var controlInfo = bindingControlInfos[0];
                                                        var controlModule = null;
                                                        var currings = controlInfo.module.split('.');
                                                        if (currings.length > 0) {
                                                            for (var i = 0; i < currings.length; i++) {
                                                                var curring = currings[i];
                                                                if (controlModule) {
                                                                    controlModule = controlModule[curring];
                                                                }
                                                                else {
                                                                    controlModule = context[curring];
                                                                }
                                                            }
                                                        }
                                                        else {
                                                            controlModule = context[controlInfo.module];
                                                        }

                                                        controlModule.setValue(controlInfo.id, outputData, outputMapping.Items);
                                                    }
                                                    else {
                                                        errorText = '"{0}" Chart Output Mapping 확인 필요'.format(dataFieldID);
                                                        responseObject.ErrorText.push(errorText);
                                                        $l.eventLog('$w.transaction', errorText, 'Error');
                                                    }
                                                }
                                            }
                                            else {
                                                responseObject.OutputStat.push({
                                                    FieldID: responseFieldID,
                                                    Count: 0
                                                });
                                            }
                                        }
                                    }
                                }
                                else {
                                    errorText = '"{0}" 기능의 거래 응답 정의와 데이터 갯수가 다릅니다'.format(transaction.FunctionID);
                                    responseObject.ErrorText.push(errorText);
                                    $l.eventLog('$w.transaction', errorText, 'Error');
                                }
                            }

                            if (callback) {
                                callback(responseObject, addtionalData);
                            }

                            if ($w.domainTransactionLoaderEnd) {
                                $w.domainTransactionLoaderEnd();
                            }
                        });
                    }
                    else {
                        errorText = '"{0}" 거래 중복 또는 존재여부 확인 필요'.format(functionID);
                        responseObject.ErrorText.push(errorText);
                        $l.eventLog('$w.transaction', errorText, 'Error');

                        if (callback) {
                            callback(responseObject);
                        }

                        if ($w.domainTransactionLoaderEnd) {
                            $w.domainTransactionLoaderEnd();
                        }
                    }
                }
                else {
                    errorText = '화면 매핑 정의 데이터가 없습니다';
                    responseObject.ErrorText.push(errorText);
                    $l.eventLog('$w.transaction', errorText, 'Error');

                    if (callback) {
                        callback(responseObject);
                    }

                    if ($w.domainTransactionLoaderEnd) {
                        $w.domainTransactionLoaderEnd();
                    }
                }
            } catch (error) {
                $l.eventLog('$w.transaction', error, 'Error');

                if ($w.domainTransactionLoaderEnd) {
                    $w.domainTransactionLoaderEnd();
                }
            }
        },

        scrollToTop: function () {
            /// <summary>
            /// 화면 최상단으로 스크롤값을 조정합니다
            /// </summary>
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

            if (scrollTop > 0) {
                context.requestAnimationFrame($w.scrollToTop);
                context.scrollTo(0, scrollTop - scrollTop / 8);
            }
        },

        setFavicon: function (url) {
            var favicon = document.querySelector('link[rel="icon"]');

            if (favicon) {
                favicon.href = url;
            } else {
                var link = document.createElement('link');
                link.rel = 'icon';
                link.href = url;

                document.head.appendChild(link);
            }
        },

        fileDownload: function (url, fileName) {
            var downloadFileName = '';
            if (fileName) {
                downloadFileName = fileName;
            }
            else {
                var match = url.toString().match(/.*\/(.+?)\./);
                if (match && match.length > 1) {
                    downloadFileName = match[1];
                }
            }

            var link = document.createElement('a');
            link.setAttribute('href', url);
            link.setAttribute('download', downloadFileName);

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },

        sleep: function (ms) {
            return new Promise(function (resolve) {
                return setTimeout(resolve, ms);
            });
        }
    });

    if (qaf && !qaf.Config) {
        qaf.Config = {};
    }

    context.$webform = context.$w = qaf.$w = context.$webform || $webform;
    if (isNodejs == true) {
        var fs = require('fs');
        var path = require('path');

        if (process.env.QAF_CONFIG) {
            qaf.Config = JSON.parse(process.env.QAF_CONFIG);
        }
        else {
            var qafConfigPath = path.join(path.dirname(require.main.filename), 'qaf.config.json')
            if (fs.existsSync(qafConfigPath) == true) {
                qaf.Config = JSON.parse(fs.readFileSync(qafConfigPath, 'utf8'));

                process.env.QAF_LogMinimumLevel = qaf.Config.LogMinimumLevel;
                process.env.QAF_FileLogBasePath = qaf.Config.FileLogBasePath;
                process.env.QAF_LocalStoragePath = qaf.Config.LocalStoragePath;
            }
        }

        if (qaf.Config && $string.isNullOrEmpty(qaf.Config.DataSourceFilePath) == true) {
            qaf.Config.DataSourceFilePath = path.join(process.cwd(), 'BusinessContract/Database/DataSource.xml');
        }

        delete $w.isPageLoad;
        delete $w.pageReadyTimeout;
        delete $w.eventAddReady;
        delete $w.eventRemoveReady;
        delete $w.moduleReadyIntervalID;
        delete $w.remainingReadyIntervalID;
        delete $w.remainingReadyCount;
        delete $w.defaultControlOptions;
        delete $w.initializeFormScript;
        delete $w.innerHTML;
        delete $w.innerText;
        delete $w.activeControl;
        delete $w.hasAutoFocus;
        delete $w.createTouchEvent;
        delete $w.contentLoaded;
        delete $w.addReadyCount;
        delete $w.removeReadyCount;
        delete $w.createSelection;
        delete $w.getTriggerOptions;
        delete $w.triggerAction;
        delete $w.transactionAction;
        delete $w.transaction;
        delete $w.scrollToTop;
        delete $w.setFavicon;
        delete $w.fileDownload;
        delete $w.sleep;
    }
    else {
        if (context.CefSharp) {
            qaf.bindObjects = qaf.bindObjects || [];
            if (context.contextCreatedData) {
                qaf.Config = context.contextCreatedData.Config;
                var contextData = $webform.argumentsExtend(context.contextCreatedData, {});
                delete contextData.Config;

                qaf.ContextData = contextData;
            }

            if (CefSharp.IsObjectCached('bound') == true) {
                var object = {};
                object.BindID = 'bound';
                object.Success = true;
                object.TypeName = bound.toString();
                qaf.bindObjects.push(object);
            }
        }
        else {
            var pathname = location.pathname;
            if (pathname.split('/').length > 0) {
                var filename = pathname.split('/')[location.pathname.split('/').length - 1];
                $webform.extend({ pageScript: '$' + (filename.indexOf('.') > -1 ? filename.substring(0, filename.indexOf('.')) : filename) });
            }

            $l.addEvent(context, 'load', function () {
                var mod = context[$w.pageScript];
                if (mod && mod.windowLoad) {
                    mod.windowLoad();
                }
            });

            var urlArgs = $r.getCookie('qaf.iscache') == 'true' ? '' : '?bust=' + new Date().getTime();
            var isAsyncLoad = !$b.isIE;

            globalThis.isLoadConfig = false;
            if (window.qafConfig) {
                qaf.Config = $w.argumentsExtend(qafConfig, qaf.Config);
                window.qafConfig = undefined;

                globalThis.isLoadConfig = true;
                $webform.contentLoaded();
            }
            else {
                $webform.loadJSON('/' + (window.qafConfigName || 'qaf.config.json') + urlArgs, null, function (setting, json) {
                    qaf.Config = $w.argumentsExtend(json, qaf.Config);

                    globalThis.isLoadConfig = true;
                    $webform.contentLoaded();
                }, null, isAsyncLoad);
            }
        }
    }
})(globalThis);