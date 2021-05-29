/// <reference path='qaf.core.js' />

/// <summary>
/// HTML 요소의 시각적인 제어 기능을 제공
/// </summary>
(function (window) {
    'use strict';
    var $manipulation = $manipulation || new baseCore();
    var document = window.document;

    $manipulation.extend({
        version: "1.0",

        body: function () {
            return document;
        },

        documentElement: function () {
            return document.documentElement;
        },

        childNodes: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.childNodes;
        },

        firstChild: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.firstChild;
        },

        lastChild: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.lastChild;
        },

        nextSibling: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.nextSibling;
        },

        previousSibling: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.previousSibling;
        },

        siblings: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return [].slice.call(parent.children).filter(function (child) {
                return child !== el;
            });
        },

        parentNode: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.parentNode;
        },

        innerText: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.innerText;
        },

        nodeName: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.nodeName;
        },

        nodeType: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.nodeType;
        },

        nodeValue: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.nodeValue;
        },

        className: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.className;
        },

        removeAttribute: function (el, prop) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.removeAttribute(prop);
        },

        getAttribute: function (el, prop) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.getAttribute(prop);
        },

        setAttribute: function (el, prop, val) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.setAttribute(prop, val);
        },

        appendChild: function (el, node) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.appendChild(node);
        },

        cloneNode: function (el, isClone) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.cloneNode(isClone);
        },

        createElement: function (tagName) {
            return document.createElement(tagName);
        },

        createTextNode: function (data) {
            return document.createTextNode(data);
        },

        innerHTML: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.innerHTML;
        },

        outerHTML: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.outerHTML;
        },

        setStyle: function (el, prop, val) {
            /// <summary>
            /// 지정된 요소에 스타일 속성을 적용합니다.
            /// </summary>
            /// <param name='el' type='Element'>스타일 속성을 적용할 HTML 요소입니다.</param>
            /// <param name='prop' type='String'>스타일 속성의 키입니다.</param>
            /// <param name='val' type='String'>스타일 속성의 값입니다.</param>
            /// <returns type='Type'></returns>
            el = $ref.isString(el) == true ? $l.get(el) : el;
            el.style[prop] = val;
            return this;
        },

        addCssText: function (el, cssText) {
            /// <summary>
            /// 지정된 요소에 여러 스타일 속성을 텍스트로 적용합니다. 이 함수를 지원하지 않는 브라우저에서는 무시됩니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;$w.addCssText(el, 'background:red;width:200px;height:200px;');
            /// </summary>
            /// <param name='el' type='Element'>스타일 속성을 적용할 HTML 요소입니다.</param>
            /// <param name='objects' type='Array'>스타일 속성의 키와 값으로 구성된 배열입니다.</param>
            /// <returns type='Type'></returns>
            el = $ref.isString(el) == true ? $l.get(el) : el;
            if (el.style.cssText != undefined) {
                el.style.cssText = cssText;
            }
            return this;
        },

        addStyle: function (el, objects) {
            /// <summary>
            /// 지정된 요소에 여러 스타일 속성을 적용합니다.
            /// &#10;&#10;
            /// example :&#10;
            /// &#10;$w.addStyle(el, { backgroundColor:'blue', color:'white', border:'2px solid red' });
            /// </summary>
            /// <param name='el' type='Element'>스타일 속성을 적용할 HTML 요소입니다.</param>
            /// <param name='objects' type='Array'>스타일 속성의 키와 값으로 구성된 배열입니다.</param>
            /// <returns type='Type'></returns>
            el = $ref.isString(el) == true ? $l.get(el) : el;
            for (var prop in objects) {
                this.setStyle(el, prop, objects[prop]);
            }
            return this;
        },

        getStyle: function (el, prop) {
            /// <summary>
            /// 지정된 요소에 스타일 속성을 가져옵니다.
            /// </summary>
            /// <param name='el' type='Element'>스타일 속성을 가져올 HTML 요소입니다.</param>
            /// <param name='prop' type='String'>스타일 속성의 키입니다.</param>
            /// <returns type='Type'></returns>
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.style[prop];
        },

        hasHidden: function (el) {
            /// <summary>
            /// 지정된 요소가 화면상에 표시중인지 확인합니다.
            /// </summary>
            /// <param name='el' type='Element'>화면상에 표시중인지 확인할 HTML 요소입니다.</param>
            /// <returns type='Type'></returns>
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return (el == null || el.offsetParent == null || window.getComputedStyle(el)['display'] == 'none');
        },

        getComputedStyle: function (el, prop) {
            /// <summary>
            /// 지정된 요소에 계산된 스타일 속성을 가져옵니다.
            /// </summary>
            /// <param name='el' type='Element'>스타일 속성을 가져올 HTML 요소입니다.</param>
            /// <param name='prop' type='String'>스타일 속성의 키입니다.</param>
            /// <returns type='Type'></returns>
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return window.getComputedStyle(el)[prop];
        },

        addClass: function (el, css) {
            /// <summary>
            /// 지정된 요소에 스타일 클래스 명을 추가합니다.
            /// </summary>
            /// <param name='el' type='Element'>스타일 클래스를 지정할 HTML 요소입니다.</param>
            /// <param name='css' type='String'>스타일 클래스 명입니다.</param>
            /// <returns type='Type'></returns>
            el = $ref.isString(el) == true ? $l.get(el) : el;
            if (this.hasClass(el, css) == false) {
                if (el.classList && el.classList.add) {
                    el.classList.add(css);
                }
                else {
                    el.className = (el.className + ' ' + css).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                }
            }
            return this;
        },

        hasClass: function (el, css) {
            /// <summary>
            /// 지정된 요소에 스타일 클래스 명이 존재하는지 검사합니다.
            /// </summary>
            /// <param name='el' type='Element'>스타일 클래스 명이 존재하는지 검사할 HTML 요소입니다.</param>
            /// <param name='css' type='String'>스타일 클래스 명입니다.</param>
            /// <returns type='Boolean' />
            var result = false;
            el = $ref.isString(el) == true ? $l.get(el) : el;
            if (el) {
                if (el.classList && el.classList.contains) {
                    result = el.classList.contains(css);
                }
                else {
                    result = $m.getClassRegEx(css).test(el.className);
                }
            }

            return result;
        },

        toggleClass: function (el, css) {
            /// <summary>
            /// 지정된 요소에 스타일 클래스를 토글합니다.
            /// </summary>
            /// <param name='el' type='Element'>스타일 클래스 명이 존재하는지 검사할 HTML 요소입니다.</param>
            /// <param name='css' type='String'>스타일 클래스 명입니다.</param>
            /// <returns type='Type'></returns>
            el = $ref.isString(el) == true ? $l.get(el) : el;
            if (el) {
                if (el.classList && el.classList.toggle) {
                    el.classList.toggle(css);
                }
            }

            return this;
        },

        removeClass: function (el, css) {
            /// <summary>
            /// 지정된 요소에 스타일 클래스를 삭제합니다.
            /// </summary>
            /// <param name='el' type='Element'>스타일 클래스를 삭제할 HTML 요소입니다.</param>
            /// <param name='css' type='String'>스타일 클래스 명입니다.</param>
            /// <returns type='Type'></returns>
            el = $ref.isString(el) == true ? $l.get(el) : el;
            if (el) {
                if (css === undefined) {
                    el.className = '';
                }
                else {
                    if (el.classList && el.classList.remove) {
                        el.classList.remove(css);
                    }
                    else {
                        var re = $m.getClassRegEx(css);
                        el.className = el.className.replace(re, '');
                        re = null;
                    }

                }
            }

            return this;
        },

        append: function (el, tag, eid, styles, html) {
            /// <summary>
            ///  지정된 요소에 HTML 요소를 추가합니다.
            /// </summary>
            /// <param name='el' type='Element'>자식 태그를 추가할 HTML 요소입니다.</param>
            /// <param name='tag' type='String'>HTML 태그 명입니다.</param>
            /// <param name='eid' type='String'>HTML 요소의 고유 식별자입니다.</param>
            /// <param name='styles' type='String'>HTML 요소에 적용할 스타일입니다.</param>
            /// <param name='html' type='String'>innerHTML에 적용할 HTML입니다.</param>
            /// <returns type='Type'></returns>
            el = $ref.isString(el) == true ? $l.get(el) : el;
            var cl = document.createElement(tag);

            if (eid) {
                cl.id = eid;
            }

            if (styles) {
                this.addStyle(cl, styles);
            }

            if (html) {
                this.innerHTML(html);
            }

            el.appendChild(cl);
            return cl;
        },

        prepend: function (el, baseEl) {
            /// <summary>
            ///  지정된 요소 앞에 HTML 요소를 추가합니다.
            /// </summary>
            /// <param name='el' type='Element'>추가할 HTML 요소입니다.</param>
            /// <param name='baseEl' type='Element'>포함할 HTML 요소입니다.</param>
            /// <returns type='Type'></returns>
            el = $ref.isString(el) == true ? $l.get(el) : el;
            baseEl.insertBefore(el, baseEl.firstChild);
        },

        copy: function (el) {
            /// <summary>
            ///  지정된 HTML 요소를 복사하여 반환합니다.
            /// </summary>
            /// <param name='el' type='Element'>자식 태그를 복사할 HTML 요소입니다.</param>
            /// <returns type='Type'></returns>
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.cloneNode(true);
        },

        empty: function (el) {
            /// <summary>
            ///  지정된 HTML 요소의 자식 요소들을 삭제합니다.
            /// </summary>
            /// <param name='el' type='Element'>자식 태그를 삭제할 HTML 요소입니다.</param>
            /// <returns type='Type'></returns>
            el = $ref.isString(el) == true ? $l.get(el) : el;
            if (el) {
                while (el.firstChild) {
                    purge(el.firstChild);

                    el.removeChild(node.firstChild);
                }

            }

            return this;
        },

        remove: function (el) {
            /// <summary>
            ///  지정된 요소를 부모 요소에서 삭제합니다.
            /// </summary>
            /// <param name='el' type='Element'>부모 요소에서 삭제할 HTML 요소입니다.</param>
            /// <returns type='Type'></returns>
            el = $ref.isString(el) == true ? $l.get(el) : el;
            if (el) {
                purge(el);

                if (el.parentNode) {
                    el.parentNode.removeChild(el);
                }
            }

            return this;
        },

        hasChild: function (el) {
            /// <summary>
            ///  지정된 HTML 요소를 삭제합니다.
            /// </summary>
            /// <param name='el' type='Element'>자식 태그를 삭제할 HTML 요소입니다.</param>
            /// <returns type='Boolean'></returns>
            el = $ref.isString(el) == true ? $l.get(el) : el;
            return el.hasChildNodes();
        },

        addControlStyles: function (els, css) {
            /// <summary>
            /// 컨트롤들의 css을 추가합니다.
            /// </summary>
            /// <param name='els' type='Element'>css을 추가 할 HTML 요소입니다.</param>
            /// <param name='css' type='String'>Style 클래스 명입니다.</param>
            /// <returns type='Type'></returns>
            if (!css) {
                return;
            }

            var el = null;
            for (var i = 0; i < els.length; i++) {
                el = els[i];

                if (el != null) {
                    if (this.hasClass(el, css) == false) {
                        this.addClass(el, css);
                    }
                }
            }

            return this;
        },

        removeControlStyles: function (els, css) {
            /// <summary>
            /// 컨트롤들의 css을 삭제합니다.
            /// </summary>
            /// <param name='els' type='Element'>css을 추가 할 HTML 요소입니다.</param>
            /// <param name='css' type='String'>Style 클래스 명입니다.</param>
            /// <returns type='Type'></returns>
            if (!css) {
                return;
            }

            var el = null;

            for (var i = 0; i < els.length; i++) {
                el = els[i];

                if (el != null) {
                    if (this.hasClass(el, css) == true) {
                        this.removeClass(el, css);
                    }
                }
            }

            return this;
        },

        removeNode: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            if (el) {
                el.parentNode.removeChild(el);
            }
        },

        insertAfter: function (item, target) {
            var parent = target.parentNode;
            if (target.nextElementSibling) {
                parent.insertBefore(item, target.nextElementSibling);
            } else {
                parent.appendChild(item);
            }
        },

        hide: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            if (el) {
                el.style.display = 'none';
            }
        },

        hideAll: function (array) {
            for (var i = 0; i < array.length; i++) {
                this.hide(array[i]);
            }
        },

        show: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            if (el) {
                el.style.display = 'block';
            }
        },

        showAll: function (array) {
            for (var i = 0; i < array.length; i++) {
                this.show(array[i]);
            }
        },

        toggle: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            if (window.getComputedStyle(el).display === 'block') {
                this.hide(el);
                return;
            }

            this.show(el);
        },

        parent: function (el, id) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            var parent = el.parentElement;
            while (parent && parent.tagName != 'BODY') {
                if (parent.id == id) {
                    return parent;
                }

                parent = parent.parentElement;
            }

            return null;
        },

        //data : { tag, id, className, attributes : { key : value }, data : { key : value } }
        create: function (data) {
            var el = document.createElement(data.tag);
            if (data.id) {
                el.id = data.id;
            }

            if (data.className) {
                el.className = data.className;
            }

            if (data.style) {
                for (var prop in data.style) {
                    el.style[prop] = data.style[prop];
                }
            }

            if (data.attributes) {
                for (var prop in data.attributes) {
                    el.setAttribute(prop, data.attributes[prop]);
                }
            }

            if (data.data) {
                el.dataset = el.dataset ? result.dataset : {};
                for (var prop in data.data) {
                    el.dataset[prop] = data.data[prop];
                }
            }

            if (data.html) {
                el.innerHTML = data.html;
            }

            return el;
        },

        div: function (data) {
            if (!data) {
                data = new Object();
            }

            data.tag = 'div';
            return this.create(data);
        },

        label: function (data) {
            if (!data) {
                data = new Object();
            }

            data.tag = 'label';
            return this.create(data);
        },

        textField: function (data) {
            if (!data) {
                data = new Object();
            }

            data.tag = 'input';
            if (!data.attributes)
                data.attributes = new Object();

            data.attributes.type = 'text';

            return this.create(data);
        },

        checkbox: function (data) {
            if (!data) {
                data = new Object();
            }

            data.tag = 'input';
            if (!data.attributes)
                data.attributes = new Object();

            data.attributes.type = 'checkbox';

            return this.create(data);
        },

        each: function (array, handler) {
            for (var i = 0; i < array.length; i++) {
                handler(array[i], i);
            }
        },

        setActive: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            el.classList.add('active');
        },

        setUnactive: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            el.classList.remove('active');
        },

        select: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            el.selected = true;
            el.setAttribute('selected', 'selected');
        },

        deselect: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            el.selected = false;
            el.removeAttribute('selected');
        },

        check: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            el.checked = true;
        },

        uncheck: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            el.checked = false;
        },

        click: function (el) {
            el = $ref.isString(el) == true ? $l.get(el) : el;
            if (el.fireEvent) {
                el.fireEvent('onclick');
            } else {
                var evObj = document.createEvent('Events');
                evObj.initEvent('click', true, false);
                el.dispatchEvent(evObj);
            }
        },

        getClassRegEx: function (css) {
            /// <summary>
            /// 지정된 요소에 스타일 클래스를 검사하기 위한 정규식입니다.
            /// </summary>
            /// <param name='css' type='String'>스타일 클래스 명입니다.</param>
            return new RegExp('(^|\\s)' + css + '(\\s|$)');
        },
    });
    window.$manipulation = window.$m = qaf.$m = window.$manipulation || $manipulation;
})(globalThis);