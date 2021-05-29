/// <reference path='../qaf.core.js' />
/// <reference path='../qaf.webform.js' />

/// <summary>
/// 클라이언트에서 xml, ajax, 크로스 웹 사이트 요청을 위한 jsonp의 확장입니다.
/// </summary>
(function ($webform) {
    'use strict';
    if (!$webform) {
        $webform = new baseCore();
    }

    var document = null;
    if (isNodejs == true) {
    }
    else {
        document = window.document;
    }

    $webform.extend({
        method: 'POST',

        setServiceObjectHeader: function (jsonObject) {
            /// <summary>
            /// ServiceObject의 공통 헤더를 지정하도록 제안합니다.
            /// </summary>
            return this;
        },

        setServiceClientHeader: function (xhr) {
            /// <summary>
            /// ServiceClient의 공통 헤더를 지정합니다.
            /// </summary>
            var isContinue = true;
            xhr.setRequestHeader('User-CertKey', 'UUNOLkV4cGVydEFwcA=='); // 인증키 라이센스키

            try {
                return isContinue;
            }
            finally {
                isContinue = null;
            }
            return this;
        },

        xmlParser: function (xml) {
            /// <summary>
            /// 지정된 xml 문자열값으로 DOMDocument를 반환합니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;var parser = new $w.xmlParser(); 
            /// </summary>
            /// <param name='xml' type='String'>xml 문자열입니다.</param>
            /// <returns type='Object' />
            var parser = null;
            if (!globalThis.DOMParser) {
                var pids = ['Msxml2.DOMDocument.3.0', 'Msxml2.DOMDocument'];

                for (var i = 0; i < pids.length; i++) {
                    parser = new ActiveXObject(pids[i]);
                    parser.async = false;
                    parser.setProperty('SelectionLanguage', 'XPath');
                    if (parser.loadXML(xml) == true) {
                        break;
                    }
                }

                return parser;
            }
            else {
                parser = new globalThis.DOMParser();
                return parser.parseFromString(xml, 'text/xml');
            }
        },

        xmlHttp: function () {
            /// <summary>
            /// AJAX 통신을 위한 XMLHttpRequest를 반환합니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;var httpRequest = new $w.xmlHttp(); 
            /// </summary>
            /// <returns type='Object' />
            var httpRequest = null;
            if (!globalThis.XMLHttpRequest) {
                var pids = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP'];

                for (var i = 0; i < pids.length; i++) {
                    httpRequest = new ActiveXObject(pids[i]);
                    if (httpRequest) {
                        break;
                    }
                }

                return httpRequest;
            }
            else {
                httpRequest = new globalThis.XMLHttpRequest();
                return httpRequest;
            }
        },

        loadScript: function (url, scriptID) {
            /// <summary>
            /// Javascript를 동적으로 head에 로딩
            /// $w.loadScript('/Scripts/Site.js');
            /// </summary>
            /// <param name='url' type='String'>Javascript URL</param>
            /// <returns type='Object' />
            var head;
            var resourceID;
            if (document.getElementsByTagName('head')) {
                head = document.getElementsByTagName('head')[0];
            }
            else {
                document.documentElement.insertBefore(document.createElement('head'), document.documentElement.firstChild);
                head = document.getElementsByTagName('head')[0];
            }

            resourceID = scriptID || 'id_' + $l.random();

            var el = document.createElement('script');

            el.setAttribute('type', 'text/javascript');
            el.setAttribute('src', url + '&noCache=' + (new Date()).getTime());
            el.setAttribute('id', resourceID);

            head.insertBefore(el, head.firstChild);

            return this;
        },

        loadStyle: function (url, styleID) {
            /// <summary>
            /// StyleSheet를 동적으로 head에 로딩
            /// $w.loadStyle('/Css/Site.css');
            /// </summary>
            /// <param name='url' type='String'>StyleSheet URL</param>
            /// <returns type='Object' />
            var head;
            var resourceID;
            if (document.getElementsByTagName('head')) {
                head = document.getElementsByTagName('head')[0];
            }
            else {
                document.documentElement.insertBefore(document.createElement('head'), document.documentElement.firstChild);
                head = document.getElementsByTagName('head')[0];
            }

            resourceID = styleID || 'id_' + $l.random();

            var el = document.createElement('link');

            el.setAttribute('rel', 'stylesheet');
            el.setAttribute('type', 'text/css');
            el.setAttribute('href', url + '&noCache=' + (new Date()).getTime());
            el.setAttribute('id', resourceID);

            head.appendChild(el);

            return this;
        },

        loadText: function (url, callback) {
            /// <summary>
            /// Html, Json등 텍스트 파일 내용을 동적으로 반환
            /// $w.loadText('/Css/Site.css');
            /// </summary>
            /// <param name='url' type='String'>Html, Json등 URL</param>
            /// <returns type='Object' />
            url = url;

            var xhr = $w.xmlHttp();
            xhr.open('get', url + '&noCache=' + (new Date()).getTime(), true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status !== 200) {
                        if (xhr.status == 0) {
                            $l.eventLog('$w.loadText', 'X-Requested transfort error', 'Fatal');
                        }
                        else {
                            $l.eventLog('$w.loadText', 'response status - {0}'.format(xhr.statusText) + xhr.responseText, 'Error');
                        }
                        return;
                    }

                    if (callback) {
                        callback(xhr.responseText)
                    }
                }
            }
            xhr.send();
        },

        serviceObject: function (serviceID, returnType) {
            /// <summary>
            /// serviceClient 요청을 수행하기위한 기본 jsonObject를 반환합니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;var jsonObject = $w.serviceObject('LabelDictionaryInsert');
            /// &#10;jsonObject.NameValues.push({ 'prop': 'LabelID', 'val': $l.get('ddlPopLabelID').value });
            /// &#10;jsonObject.NameValues.push({ 'prop': 'LabelValue', 'val': $l.get('txtPopLabelName').value });
            /// &#10;jsonObject.NameValues.push({ 'prop': 'Tooltip', 'val': $l.get('txtPopLabelDicToolTip').value });
            /// </summary>
            /// <param name='functionID' type='String'>서비스 요청 식별자입니다.</param>
            /// <param name='returnType' type='Object'>요청 반환 타입입니다.</param>
            /// <returns type='Object' />
            var dataType = 'json';
            if (returnType) {
                dataType = returnType;
            }

            var jsonObject = {};
            jsonObject.RequestID = $l.guid();
            jsonObject.ReturnType = dataType;
            jsonObject.ServiceID = serviceID;
            jsonObject.NameValues = [];

            if (this.setServiceObjectHeader) {
                this.setServiceObjectHeader(jsonObject);
            }

            dataType = null;
            return jsonObject;
        },

        transactionObject: function (functionID, returnType) {
            /// <summary>
            /// serviceClient 요청을 수행하기위한 기본 jsonObject를 반환합니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;var jsonObject = $w.transactionObject('LabelDictionaryInsert');
            /// &#10;jsonObject.NameValues.push({ 'prop': 'LabelID', 'val': $l.get('ddlPopLabelID').value });
            /// &#10;jsonObject.NameValues.push({ 'prop': 'LabelValue', 'val': $l.get('txtPopLabelName').value });
            /// &#10;jsonObject.NameValues.push({ 'prop': 'Tooltip', 'val': $l.get('txtPopLabelDicToolTip').value });
            /// </summary>
            /// <param name='functionID' type='String'>서비스 요청 식별자입니다.</param>
            /// <param name='returnType' type='Object'>요청 반환 타입입니다.</param>
            /// <returns type='Object' />
            var dataType = 'Json';
            if (returnType) {
                dataType = returnType;
            }

            var jsonObject = {};
            jsonObject.ProgramID = '';
            jsonObject.BusinessID = '';
            jsonObject.SystemID = '';
            jsonObject.TransactionID = '';
            jsonObject.DataTransactionInterface = null;
            jsonObject.TransactionResult = true;
            jsonObject.FunctionID = functionID;
            jsonObject.ScreenID = '';
            jsonObject.RequestID = $l.guid();
            jsonObject.ReturnType = dataType;
            jsonObject.ResultAlias = [];
            jsonObject.InputsItemCount = [];
            jsonObject.Inputs = [];

            if (this.setServiceObjectHeader) {
                this.setServiceObjectHeader(jsonObject);
            }

            dataType = null;
            return jsonObject;
        },

        basicServiceClient: function (url, jsonObject, callback, async, token) {
            /// <summary>
            /// 기본 WCF 요청을 수행합니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;var jsonParam = '{'argument': 'WebServiceClick!'}';
            /// &#10;$webform.basicServiceClient('/ServiceClient/WebForm1.aspx/HelloWorld', jsonParam, HelloWorldCallback);
            /// &#10;$webform.basicServiceClient('/ServiceClient/WebService1.asmx/HelloWorld', jsonParam, HelloWorldCallback);
            /// &#10;$webform.basicServiceClient('/ServiceClient/Service1.svc/HelloWorld', jsonParam, HelloWorldCallback);
            /// &#10;
            /// &#10;function HelloWorldCallback(response)
            /// &#10;{
            /// &#10;    alert(response);
            /// &#10;}
            /// </summary>
            /// <param name='url' type='String'>서비스 요청 주소입니다.</param>
            /// <param name='props' type='Object'>요청 전달 매개변수입니다.</param>
            /// <param name='callback' type='Function'>서비스 요청을 비동기로 호출후 응답을 처리할 콜백 함수입니다. 동기로 호출시 콜백은 무시됩니다.</param>
            /// <param name='async' type='Boolean' mayBeNull='true'>서비스 요청을 동기, 비동기로 수행할 옵션입니다.(기본값 true)</param>
            /// <param name='token' type='String' mayBeNull='true'>서비스 요청시 보안 처리를 위해 요청 헤더에 토큰을 지정합니다.</param>
            /// <returns type='Object' />
            if (!jsonObject) {
                alert('서비스 호출에 필요한 jsonObject가 구성되지 않았습니다.');
                return;
            }

            var jsonString = JSON.stringify(jsonObject);

            var xhr = this.xmlHttp();

            xhr.open($webform.method, url, true);
            xhr.setRequestHeader('Accept-Language', this.localeID);
            xhr.setRequestHeader('Accept-Charset', 'UTF-8');
            //xhr.setRequestHeader('User-Agent', 'XmlHttpRequest');

            if (token !== undefined) {
                xhr.setRequestHeader('User-Token', token);
            }

            if (async !== undefined && xhr.async) {
                xhr.async = async;

                if (xhr.async == false) {
                    xhr.setRequestHeader('X-Requested-With', 'QAF ServiceClient');
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send(jsonString);

                    return xhr;
                }
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status !== 200) {
                        if (xhr.status == 0) {
                            $l.eventLog('$w.serviceClient', 'X-Requested transfort error', 'Fatal');
                        }
                        else {
                            $l.eventLog('$w.serviceClient', 'response status - {0}'.format(xhr.statusText) + xhr.responseText, 'Error');
                        }
                        return;
                    }

                    var contentType = 'text';
                    var errorText = '';
                    var functionID = '';

                    try {
                        var jsonObject = JSON.parse(xhr.responseText);
                        contentType = jsonObject.ReturnType;
                        functionID = jsonObject.FunctionID;
                        if (contentType === 'error') {
                            errorText = jsonObject.ExceptionText;
                        }
                    }
                    catch (e) {
                        contentType = 'error';
                        errorText = e.toString();
                        if (functionID.length == 0) {
                            functionID = 'Unknown FunctionID';
                        }
                    }

                    if (contentType.indexOf('text') > -1 || contentType.indexOf('json') > -1) {
                        if (callback) {
                            callback(xhr.responseText);
                        }
                    }
                    else if (contentType.indexOf('xml') > -1) {
                        if (callback) {
                            callback(xhr.responseXML);
                        }
                    }
                    else {
                        alert('FunctionID : ' + functionID + '\n' + errorText);
                    }
                }
            }
            xhr.setRequestHeader('X-Requested-With', 'QAF ServiceClient');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(jsonString);
        },

        serviceClient: function (url, jsonObject, callback, async, token) {
            /// <summary>
            /// 비즈니스 로직이 포함되어 있는 WCF 요청을 수행합니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;var jsonParam = '{'argument': 'WebServiceClick!'}';
            /// &#10;$webform.serviceClient('/ServiceClient/WebForm1.aspx/HelloWorld', jsonParam, HelloWorldCallback);
            /// &#10;$webform.serviceClient('/ServiceClient/WebService1.asmx/HelloWorld', jsonParam, HelloWorldCallback);
            /// &#10;$webform.serviceClient('/ServiceClient/Service1.svc/HelloWorld', jsonParam, HelloWorldCallback);
            /// &#10;
            /// &#10;function HelloWorldCallback(response)
            /// &#10;{
            /// &#10;    alert(response);
            /// &#10;}
            /// </summary>
            /// <param name='url' type='String'>서비스 요청 주소입니다.</param>
            /// <param name='props' type='Object'>요청 전달 매개변수입니다.</param>
            /// <param name='callback' type='Function'>서비스 요청을 비동기로 호출후 응답을 처리할 콜백 함수입니다. 동기로 호출시 콜백은 무시됩니다.</param>
            /// <param name='async' type='Boolean' mayBeNull='true'>서비스 요청을 동기, 비동기로 수행할 옵션입니다.(기본값 true)</param>
            /// <param name='token' type='String' mayBeNull='true'>서비스 요청시 보안 처리를 위해 요청 헤더에 토큰을 지정합니다.</param>
            /// <returns type='Object' />
            if (!jsonObject) {
                alert('서비스 호출에 필요한 거래정보가 구성되지 않았습니다.');
                return;
            }

            var jsonString = JSON.stringify(jsonObject);

            var xhr = this.xmlHttp();

            xhr.open($webform.method, url, true);
            xhr.setRequestHeader('Accept-Language', this.localeID);
            //xhr.setRequestHeader('User-Agent', 'XmlHttpRequest');

            if (this.setServiceClientHeader) {
                if (this.setServiceClientHeader(xhr) == false) {
                    return;
                }
            }

            if (token !== undefined) {
                xhr.setRequestHeader('User-Token', token);
            }

            if (async !== undefined && xhr.async) {
                xhr.async = async;

                if (xhr.async == false) {
                    xhr.setRequestHeader('X-Requested-With', 'QAF ServiceClient');
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send(jsonString);

                    return xhr;
                }
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status !== 200) {
                        if (xhr.status == 0) {
                            $l.eventLog('$w.serviceClient', 'X-Requested transfort error', 'Fatal');
                        }
                        else {
                            $l.eventLog('$w.serviceClient', 'response status - {0}'.format(xhr.statusText) + xhr.responseText, 'Error');
                        }
                        return;
                    }

                    try {
                        if ($w.clientTag && $w.clientTag == "ROQKFWKTLFGODZNJFL" && $w.serviceClientInterceptor) {
                            if ($w.serviceClientInterceptor(url, xhr) === false) {
                                return;
                            }
                        }
                    }
                    catch (e) {
                        // ajax 요청중에 웹 페이지가 close되었을 경우 return 처리입니다.
                        return;
                    }

                    var contentType = 'text';
                    var errorText = '';
                    var functionID = '';

                    try {
                        var jsonObject = JSON.parse(xhr.responseText);
                        contentType = jsonObject.ReturnType;
                        functionID = jsonObject.FunctionID;
                        if (contentType === 'error') {
                            errorText = jsonObject.ExceptionText;
                        }
                    }
                    catch (e) {
                        contentType = 'error';
                        errorText = e.toString();
                        if (functionID.length == 0) {
                            functionID = 'Unknown FunctionID';
                        }
                    }

                    if (contentType === 'warning') {
                        if ($this.serviceClientException) {
                            $this.serviceClientException(url, jsonObject, xhr);
                        }
                        else {
                            alert('FunctionID : ' + functionID + '\n' + jsonObject.Result);
                        }
                    }
                    else if (contentType.indexOf('text') > -1 || contentType.indexOf('json') > -1) {
                        if (callback) {
                            callback(jsonObject);
                        }
                    }
                    else if (contentType.indexOf('xml') > -1) {
                        if (callback) {
                            callback(xhr.responseXML);
                        }
                    }
                    else {
                        if ($w.serviceClientException) {
                            if ($w.serviceClientException(url, jsonObject, xhr) === false) {
                                alert('FunctionID : ' + functionID + '\n' + errorText);
                            }
                        }
                        else {
                            alert('FunctionID : ' + functionID + '\n' + errorText);
                        }

                        if ($this.serviceClientException) {
                            $this.serviceClientException(url, jsonObject, xhr);
                        }
                    }
                }
            }
            xhr.setRequestHeader('X-Requested-With', 'QAF ServiceClient');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(jsonString);
        },

        executeBindMethod: function (bindID, methodName, methodParameters, callback) {
            qaf.bindObjects = qaf.bindObjects || [];

            var result = null;
            var bindMessage = '';

            var isBindObject = false;
            var length = qaf.bindObjects.length;
            for (var i = 0; i < length; i++) {
                var bindObject = qaf.bindObjects[i];
                if (bindObject.BindID == bindID) {
                    isBindObject = bindObject.Success;
                    bindMessage = bindObject.Message;
                    break;
                }
            }

            if (isBindObject == true) {
                var bindObject = globalThis[bindID];

                if (bindObject[methodName]) {
                    var bindMethod = bindObject[methodName];
                    result = bindMethod(methodParameters, callback);
                }
                else {
                    $l.eventLog('qaf.bindObjects.{0} 메서드 정보 없음', '{1}'.format(bindID, methodName), 'Error');
                }
            }
            else {
                $l.eventLog('qaf.bindObjects 객체 정보 없음', '{0} - {1}'.format(bindID, bindMessage), 'Error');
            }

            return result;
        },

        executeTransaction: function (mappingModel, transactionObject, callback, async, token) {
            /// <summary>
            /// 비즈니스 로직이 포함되어 있는 WCF 요청을 수행합니다.
            /// </summary>
            /// <param name='url' type='String'>서비스 요청 주소입니다.</param>
            /// <param name='props' type='Object'>요청 전달 매개변수입니다.</param>
            /// <param name='callback' type='Function'>서비스 요청을 비동기로 호출후 응답을 처리할 콜백 함수입니다. 동기로 호출시 콜백은 무시됩니다.</param>
            /// <param name='async' type='Boolean' mayBeNull='true'>서비스 요청을 동기, 비동기로 수행할 옵션입니다.(기본값 true)</param>
            /// <param name='token' type='String' mayBeNull='true'>서비스 요청시 보안 처리를 위해 요청 헤더에 토큰을 지정합니다.</param>
            /// <returns type='Object' />
            if (!mappingModel || !transactionObject) {
                if (isNodejs == false) {
                    alert('서비스 호출에 필요한 거래 정보가 구성되지 않았습니다');
                }

                $l.eventLog('$w.executeTransaction', '서비스 호출에 필요한 거래 정보 확인 필요', 'Error');
                return;
            }

            var apiService = null;
            if (isNodejs == true) {
                var apiServices = $w.getStorage('apiServices', false);
                if (apiServices) {
                    apiService = apiServices[qaf.Config.Transaction.SystemID + qaf.Config.DomainServerType];
                    if ((apiServices.BearerToken == null || apiServices.BearerToken == undefined) && globalThis.bearerToken) {
                        apiServices.BearerToken = globalThis.bearerToken;
                        $w.setStorage('apiServices', apiServices, false);
                    }
                }
                else {
                    if (qaf.Config.DomainAPIServer != null) {
                        apiService = qaf.Config.DomainAPIServer;
                        apiServices = {};
                        if (token || globalThis.bearerToken) {
                            apiServices.BearerToken = token || globalThis.bearerToken;
                        }
                        apiServices[qaf.Config.Transaction.SystemID + qaf.Config.DomainServerType] = apiService;

                        $w.setStorage('apiServices', apiServices, false);
                        $l.eventLog('$w.executeTransaction', 'apiService 확인 필요 systemApi: {0}'.format(JSON.stringify(apiService)), 'Debug');
                    }
                    else {
                        $l.eventLog('$w.executeTransaction', '서비스 호출에 필요한 BP 정보가 구성되지 확인 필요', 'Error');
                    }
                }
            }
            else {
                if (location.href.indexOf('qaf://') > -1) {
                    transactionObject.SystemID = mappingModel.SystemID;
                    transactionObject.TransactionID = mappingModel.TransactionID;
                    transactionObject.ScreenID = mappingModel.ScreenID;
                    var methodResult = $w.executeBindMethod('bound', 'executeTransaction', transactionObject, function (responseText) {
                        if ($w.clientTag && $w.serviceClientInterceptor) {
                            if ($w.serviceClientInterceptor($w.clientTag, xhr) === false) {
                                return;
                            }
                        }

                        try {
                            var transactionResponse = JSON.parse(responseText);
                            if (transactionResponse.Acknowledge == 1) {
                                var jsonObject = [];

                                var mdo = transactionResponse.MDO;
                                if (transactionResponse.DAT.RES_OUTPUT != null && transactionResponse.DAT.RES_OUTPUT.length > 0) {
                                    var RES_TX_MAP_ID = transactionResponse.DAT.RES_TX_MAP_ID;
                                    var RES_OUTPUT = transactionResponse.DAT.RES_OUTPUT;
                                    var length = RES_OUTPUT.length;
                                    for (var i = 0; i < length; i++) {
                                        var item = RES_OUTPUT[i];
                                        jsonObject.push({
                                            RES_FIELD_ID: item.RES_FIELD_ID,
                                            RES_DAT: item.RES_DAT
                                        });
                                    }
                                }

                                if (callback) {
                                    var addtionalData = {};
                                    if (mdo.ADI_MSG) {
                                        for (var i = 0; i < mdo.ADI_MSG.length; i++) {
                                            var adiMsg = mdo.ADI_MSG[i];

                                            if (addtionalData[adiMsg.ADI_MSG_CD]) {
                                                if (isNaN(parseInt(addtionalData[adiMsg.ADI_MSG_CD])) == false) {
                                                    addtionalData[adiMsg.ADI_MSG_CD] = parseInt(addtionalData[adiMsg.ADI_MSG_CD]) + parseInt(adiMsg.ADI_MSG_TXT);
                                                }
                                                else {
                                                    $l.eventLog('$w.executeTransaction.addtionalData', '"{0}" 추가 데이터 중복 확인 필요'.format(adiMsg.ADI_MSG_CD), 'Warning');
                                                }
                                            }
                                            else {
                                                addtionalData[adiMsg.ADI_MSG_CD] = adiMsg.ADI_MSG_TXT;
                                            }
                                        }
                                    }

                                    callback(jsonObject, addtionalData);
                                }
                            }
                            else {
                                var errorText = transactionResponse.ExceptionText;
                                var errorMessage = '거래: {0}, 기능: {1} 수행중 예외가 발생하였습니다'.format(transactionObject.TransactionID, transactionObject.FunctionID);
                                if ($w.serviceClientException) {
                                    $w.serviceClientException('요청오류', errorMessage, errorText);
                                }

                                $l.eventLog('$w.executeTransaction', errorText, 'Error');

                                if ($this && $this.frameEvent) {
                                    $this.frameEvent('transactionException', {
                                        transactionID: transactionObject.TransactionID,
                                        functionID: transactionObject.FunctionID,
                                        errorText: errorText,
                                        errorMessage: errorMessage
                                    });
                                }
                            }
                        }
                        catch (error) {
                            var errorMessage = '거래: {0}, 기능: {1} 수행중 오류가 발생하였습니다'.format(transactionObject.TransactionID, transactionObject.FunctionID);
                            if ($w.serviceClientException) {
                                $w.serviceClientException('오류', errorMessage, error.stack);
                            }

                            $l.eventLog('$w.executeTransaction', error, 'Error');

                            if ($this && $this.frameEvent) {
                                $this.frameEvent('transactionError', {
                                    transactionID: transactionObject.TransactionID,
                                    functionID: transactionObject.FunctionID,
                                    errorText: error.message,
                                    errorMessage: errorMessage
                                });
                            }
                        }
                    });
                    return;
                }
            }

            var apiServices = $w.getStorage('apiServices', false);
            if (apiServices) {
                apiService = apiServices[qaf.Config.Transaction.SystemID + qaf.Config.DomainServerType];
            }

            if (apiService == null) {
                $l.eventLog('$w.executeTransaction', 'apiService 확인 필요', 'Fatal');
            }
            else {
                if (apiService.ExceptionText) {
                    $l.eventLog('$w.executeTransaction', 'apiService 확인 필요 SystemID: {0}, ServerType: {1}, Message: {2}'.format(mappingModel.SystemID, qaf.Config.DomainServerType, apiService.ExceptionText), 'Fatal');
                    return;
                }

                var url = '';
                if (apiService.Port && apiService.Port != '') {
                    url = '{0}://{1}:{2}{3}'.format(apiService.Protocol, apiService.IP, apiService.Port, apiService.Path);
                }
                else {
                    url = '{0}://{1}{2}'.format(apiService.Protocol, apiService.IP, apiService.Path);
                }

                var requestDateTime = $date.toString(new Date(), 'f');
                // -- 36바이트 = AppID 3자리 + ProjectID 3자리 + 거래ID 6자리 + 기능ID 3자리 + 환경ID 1자리 + Timestamp (yyyyMMddhhmmssfff) 17자리 + 버퍼 3바이트
                var requestID = ''.concat(mappingModel.ProgramID, mappingModel.BusinessID, transactionObject.TransactionID, transactionObject.FunctionID, qaf.Config.Transaction.RunningEnvironment, requestDateTime, $l.random(3)).toUpperCase();
                var globalID = '';
                if (apiService.RequestID) {
                    globalID = apiService.RequestID;
                }
                else {
                    globalID = requestID;
                }

                var transactionRequest = {
                    AccessTokenID: apiServices.BearerToken,
                    Action: 'REPLY',
                    ClientTag: ''.concat(qaf.Config.Transaction.SystemCode, "|", qaf.Config.Transaction.MachineName, "|", qaf.Config.Program.ProgramVersion),
                    LoadOptions: [],
                    RequestID: requestID,
                    Version: qaf.Config.Transaction.ProtocolVersion,
                    SH: {
                        CLNT_IPAD: apiService.ClientIP,
                        CLNT_MAC: '',
                        ENV_INF_DSCD: qaf.Config.Transaction.RunningEnvironment,
                        FST_TLM_REQ_DTM: apiService.CreateDateTime || requestDateTime,
                        FST_TMS_SYS_CD: qaf.Config.Transaction.SystemCode,
                        GLBL_ID: globalID,
                        GLBL_ID_PRG_SRNO: 1,
                        INTF_ID: qaf.Config.Transaction.SystemInterfaceID,
                        LANG_DSCD: qaf.Config.Program.LanguageID,
                        MD_KDCD: qaf.Config.Transaction.MachineTypeID,
                        TLM_ENCY_DSCD: qaf.Config.Transaction.DataEncryptionYN,
                        TLM_REQ_DTM: requestDateTime,
                    },
                    TH: {
                        BIZ_ID: mappingModel.BusinessID,
                        EXNK_DSCD: isNodejs == true ? 'AP' : navigator.connection == null ? '' : navigator.connection.effectiveType,
                        FUNC_CD: transactionObject.FunctionID,
                        DAT_FMT: qaf.Config.Transaction.DataFormat,
                        LQTY_DAT_PRC_DIS: 'N',
                        MSK_NTGT_TRN_YN: 'Y',
                        OPR_NO: isNodejs == true ? 'AP' : $w.SSO ? $w.SSO.UserID : '',
                        PGM_ID: mappingModel.ProgramID,
                        RLPE_SQCN: 1,
                        SMLT_TRN_DSCD: 'N',
                        TRM_BRNO: qaf.Config.Program.TerminalBranchCode,
                        TRN_CD: transactionObject.TransactionID,
                        TRN_SCRN_CD: transactionObject.ScreenID,
                        CRYPTO_DSCD: qaf.Config.Transaction.CryptoCode || 'P',
                        CRYPTO_KEY: qaf.Config.Transaction.CryptoCKey || ''
                    },
                    TCI: [],
                    DTI: null,
                    DAT: {
                        REQ_INPUT: [],
                        REQ_INPUTDATA: [],
                        REQ_INPUT_CNT: [],
                        REQ_TX_MAP_ID: ''
                    }
                };

                if (mappingModel.Transactions) {
                    var transactions = mappingModel.Transactions.filter(function (item) {
                        return item.FunctionID == transactionObject.FunctionID;
                    });

                    if (transactions.length == 1) {
                        var transaction = transactions[0];

                        var inputs = transaction.Inputs.map(function (item) { return item.RequestType; }).join(',');
                        var outputs = transaction.Outputs.map(function (item) { return item.ResponseType; }).join(',');
                        transactionRequest.DTI = '{0}|{1}'.format(inputs, outputs);
                    }
                }
                else if (transactionObject.DataTransactionInterface) {
                    transactionRequest.DTI = transactionObject.DataTransactionInterface;
                }

                if (transactionRequest.TH.DAT_FMT == 'J' || transactionRequest.TH.DAT_FMT == 'T') {
                }
                else {
                    $l.eventLog('$w.executeTransaction', 'TH.DAT_FMT 확인 필요: {0}'.format(transactionRequest.TH.DAT_FMT), 'Error');
                    throw new Error('TH.DAT_FMT 확인 필요: {0}'.format(transactionRequest.TH.DAT_FMT));
                }

                transactionRequest.DAT.REQ_INPUT_CNT = transactionObject.InputsItemCount;
                transactionRequest.DAT.REQ_INPUT = [];
                transactionRequest.DAT.REQ_INPUTDATA = [];
                var length = transactionObject.Inputs.length;

                for (var i = 0; i < length; i++) {
                    var inputs = transactionObject.Inputs[i];

                    var reqInputs = [];
                    for (var j = 0; j < inputs.length; j++) {
                        var item = inputs[j];

                        reqInputs.push({
                            REQ_FIELD_ID: item.prop,
                            REQ_FIELD_DAT: item.val
                        });
                    }

                    if (transactionRequest.TH.CRYPTO_DSCD == 'C') {
                        if (transactionRequest.TH.DAT_FMT == 'J') {
                            transactionRequest.DAT.REQ_INPUTDATA.push($c.LZString.compressToBase64(JSON.stringify(reqInputs)));
                        }
                        else {
                            transactionRequest.DAT.REQ_INPUTDATA.push($c.LZString.compressToBase64($object.toCSV(reqInputs, { delimeter: '｜', newline: '↵' })));
                        }
                    }
                    else {
                        if (transactionRequest.TH.DAT_FMT == 'J') {
                            transactionRequest.DAT.REQ_INPUT.push(reqInputs);
                        }
                        else {
                            transactionRequest.DAT.REQ_INPUTDATA.push($object.toCSV(reqInputs, { delimeter: '｜', newline: '↵' }));
                        }
                    }
                }

                var xhr = $w.xmlHttp();

                xhr.open($webform.method, url, true);
                xhr.setRequestHeader('Accept-Language', $w.localeID);
                //xhr.setRequestHeader('User-Agent', 'XmlHttpRequest');
                xhr.setRequestHeader('Server-SystemID', mappingModel.SystemID);
                xhr.setRequestHeader('Server-BusinessID', mappingModel.BusinessID);

                if ($w.setServiceClientHeader) {
                    if ($w.setServiceClientHeader(xhr) == false) {
                        return;
                    }
                }

                if (async !== undefined && xhr.async == true) {
                    xhr.async = async;

                    if (xhr.async == false) {
                        xhr.setRequestHeader('X-Requested-With', 'QAF ServiceClient');
                        // xhr.setRequestHeader('Content-Type', 'application/json');
                        xhr.setRequestHeader('Content-Type', 'qrame/json-transact');
                        xhr.send(transactionRequest);

                        return xhr;
                    }
                }

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status !== 200) {
                            if (xhr.status == 0) {
                                $l.eventLog('$w.executeTransaction', 'X-Requested transfort error', 'Fatal');
                            }
                            else {
                                $l.eventLog('$w.executeTransaction', 'response status - {0}'.format(xhr.statusText) + xhr.responseText, 'Error');
                            }

                            if ($w.domainTransactionLoaderEnd) {
                                $w.domainTransactionLoaderEnd();
                            }
                            return;
                        }

                        if ($w.clientTag && $w.serviceClientInterceptor) {
                            if ($w.serviceClientInterceptor($w.clientTag, xhr) === false) {
                                return;
                            }
                        }

                        try {
                            var transactionResponse = JSON.parse(xhr.responseText);
                            if (transactionObject.TransactionResult == true) {
                                if (transactionResponse.Acknowledge == 1) {
                                    var jsonObject = [];

                                    var mdo = transactionResponse.MDO;
                                    if (transactionResponse.DAT.RES_OUTPUT != null && transactionResponse.DAT.RES_OUTPUT.length > 0) {
                                        var RES_TX_MAP_ID = transactionResponse.DAT.RES_TX_MAP_ID;
                                        var RES_OUTPUT = transactionResponse.DAT.RES_OUTPUT;
                                        var length = RES_OUTPUT.length;
                                        for (var i = 0; i < length; i++) {
                                            var item = RES_OUTPUT[i];

                                            if (transactionResponse.TH.DAT_FMT == 'J') {
                                                if (transactionResponse.TH.CRYPTO_DSCD == 'C') {
                                                    jsonObject.push({
                                                        RES_FIELD_ID: item.RES_FIELD_ID,
                                                        RES_DAT: JSON.parse($c.LZString.decompressFromBase64(item.RES_DAT))
                                                    });
                                                }
                                                else {
                                                    jsonObject.push({
                                                        RES_FIELD_ID: item.RES_FIELD_ID,
                                                        RES_DAT: item.RES_DAT
                                                    });
                                                }
                                            }
                                            else {
                                                if (mappingModel.Transactions) {
                                                    var transaction = mappingModel.Transactions.find(function (item) {
                                                        return item.FunctionID == transactionObject.FunctionID;
                                                    });

                                                    if (transaction) {
                                                        var RES_DAT = null;
                                                        if ($ref.isEmpty(item.RES_DAT) == false) {
                                                            RES_DAT = transactionResponse.TH.CRYPTO_DSCD == 'C' ? $c.LZString.decompressFromBase64(item.RES_DAT).split('＾') : item.RES_DAT.split('＾');
                                                            var meta = $string.toParameterObject(RES_DAT[0]);
                                                            RES_DAT = $string.toJSON(RES_DAT[1], { delimeter: '｜', newline: '↵', meta: meta });

                                                            var outputMapping = transaction.Outputs[i];
                                                            if (outputMapping.ResponseType == 'Form') {
                                                                RES_DAT = RES_DAT[0];
                                                            }
                                                        }

                                                        jsonObject.push({
                                                            RES_FIELD_ID: item.RES_FIELD_ID,
                                                            RES_DAT: RES_DAT
                                                        });
                                                    }
                                                }
                                                else {
                                                    var RES_DAT = transactionResponse.TH.CRYPTO_DSCD == 'C' ? $c.LZString.decompressFromBase64(item.RES_DAT).split('＾') : item.RES_DAT.split('＾');
                                                    var meta = $string.toParameterObject(RES_DAT[0]);
                                                    RES_DAT = $string.toJSON(RES_DAT[1], { delimeter: '｜', newline: '↵', meta: meta });

                                                    jsonObject.push({
                                                        RES_FIELD_ID: item.RES_FIELD_ID,
                                                        RES_DAT: RES_DAT
                                                    });
                                                }
                                            }
                                        }
                                    }

                                    if (callback) {
                                        var addtionalData = {};
                                        if (mdo.ADI_MSG) {
                                            for (var i = 0; i < mdo.ADI_MSG.length; i++) {
                                                var adiMsg = mdo.ADI_MSG[i];

                                                if (addtionalData[adiMsg.ADI_MSG_CD]) {
                                                    if (isNaN(parseInt(addtionalData[adiMsg.ADI_MSG_CD])) == false) {
                                                        addtionalData[adiMsg.ADI_MSG_CD] = parseInt(addtionalData[adiMsg.ADI_MSG_CD]) + parseInt(adiMsg.ADI_MSG_TXT);
                                                    }
                                                    else {
                                                        $l.eventLog('$w.executeTransaction.addtionalData', '"{0}" 추가 데이터 중복 확인 필요'.format(adiMsg.ADI_MSG_CD));
                                                    }
                                                }
                                                else {
                                                    addtionalData[adiMsg.ADI_MSG_CD] = adiMsg.ADI_MSG_TXT;
                                                }
                                            }
                                        }

                                        try {
                                            callback(jsonObject, addtionalData);
                                        } catch (error) {
                                            $l.eventLog('$w.executeTransaction callback', error, 'Error');
                                        }
                                    }
                                }
                                else {
                                    var errorText = transactionResponse.ExceptionText;
                                    var errorMessage = '거래: {0}, 기능: {1} 수행중 예외가 발생하였습니다'.format(transactionRequest.TH.TRN_CD, transactionRequest.TH.FUNC_CD);
                                    if ($w.serviceClientException) {
                                        $w.serviceClientException('요청오류', errorMessage, errorText);
                                    }

                                    $l.eventLog('$w.executeTransaction', errorText, 'Warning');

                                    if (isNodejs == false) {
                                        if ($this && $this.frameEvent) {
                                            $this.frameEvent('transactionException', {
                                                transactionID: transactionRequest.TH.TRN_CD,
                                                functionID: transactionRequest.TH.FUNC_CD,
                                                errorText: errorText,
                                                errorMessage: errorMessage
                                            });
                                        }
                                    }
                                    else {
                                        if (callback) {
                                            try {
                                                callback([], null);
                                            } catch (error) {
                                                $l.eventLog('$w.executeTransaction callback', error, 'Error');
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                if (callback) {
                                    if (transactionResponse.Acknowledge == 1) {
                                        try {
                                            var mdo = transactionResponse.MDO;
                                            if (transactionResponse.DAT.RES_OUTPUT != null && transactionResponse.DAT.RES_OUTPUT.length > 0) {
                                                var RES_TX_MAP_ID = transactionResponse.DAT.RES_TX_MAP_ID;
                                                var RES_OUTPUT = transactionResponse.DAT.RES_OUTPUT;
                                                var length = RES_OUTPUT.length;
                                                for (var i = 0; i < length; i++) {
                                                    var item = RES_OUTPUT[i];
                                                    if (transactionResponse.TH.DAT_FMT == 'J') {
                                                        if (transactionResponse.TH.CRYPTO_DSCD == 'C') {
                                                            item.RES_DAT = JSON.parse($c.LZString.decompressFromBase64(item.RES_DAT));
                                                        }
                                                    }
                                                    else {
                                                        item.RES_DAT = transactionResponse.TH.CRYPTO_DSCD == 'C' ? $c.LZString.decompressFromBase64(item.RES_DAT) : item.RES_DAT;
                                                    }
                                                }
                                            }
                                        } catch (error) {
                                            $l.eventLog('$w.executeTransaction', error, 'Error');
                                        }
                                    }

                                    try {
                                        callback(transactionResponse);
                                    } catch (error) {
                                        $l.eventLog('$w.executeTransaction callback', error, 'Error');
                                    }
                                }
                            }
                        }
                        catch (error) {
                            var errorMessage = '거래: {0}, 기능: {1} 수행중 오류가 발생하였습니다'.format(transactionRequest.TH.TRN_CD, transactionRequest.TH.FUNC_CD);
                            if ($w.serviceClientException) {
                                $w.serviceClientException('오류', errorMessage, error.stack);
                            }

                            $l.eventLog('$w.executeTransaction', error, 'Error');

                            if (isNodejs == false) {
                                if ($this && $this.frameEvent) {
                                    $this.frameEvent('transactionError', {
                                        transactionID: transactionRequest.TH.TRN_CD,
                                        functionID: transactionRequest.TH.FUNC_CD,
                                        errorText: error.message,
                                        errorMessage: errorMessage
                                    });
                                }
                            }
                            else {
                                if (callback) {
                                    try {
                                        callback([], null);
                                    } catch (error) {
                                        $l.eventLog('$w.executeTransaction callback', error, 'Error');
                                    }
                                }
                            }
                        }

                        if ($w.domainTransactionLoaderEnd) {
                            $w.domainTransactionLoaderEnd();
                        }
                    }
                }
                xhr.setRequestHeader('X-Requested-With', 'QAF ServiceClient');
                // xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.setRequestHeader('Content-Type', 'qrame/json-transact');
                xhr.timeout = qaf.Config.TransactionTimeout;
                xhr.send(JSON.stringify(transactionRequest));
            }
        }
    });
})(qaf.$webform || qaf.$w);