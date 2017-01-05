var dom = {

    /**
     * is a element match the selector , 选择器支持多个以,号分割
     * 支持ie8 以上
     * @param {} element
     * @param {} selector
     * @returns {} 
     */
    matches: function(element, selector) {
        var nativeMatches = element.matches ||
            element.webkitMatchesSelector ||
            element.mozMatchesSelector ||
            element.oMatchesSelector ||
            element.msMatchesSelector ||
            element.matchesSelector || '';

        if (!element || element.nodeType != 1) {
            return false;
        }
        return nativeMatches.call(element, selector);
    },

    /**
     * is a element match the selector , 选择器支持多个以,号分割
     * 支持ie7 以上
     * @param {} element
     * @param {} selector
     * @returns {} 
     */
    matches2(element, selector) {

        var nativeMatches = element.matches ||
            element.webkitMatchesSelector ||
            element.mozMatchesSelector ||
            element.oMatchesSelector ||
            element.msMatchesSelector ||
            element.matchesSelector || '';

        if (nativeMatches) {
            return nativeMatches.call(element, selector);
        } else if (element.querySelectorAll) {
            var matches = (element.document || element.ownerDocument).querySelectorAll(selector),
                i = 0;

            while (matches[i] && matches[i] !== element) i++;
            return matches[i] ? true : false;
        }

        throw new Error('Your browser version is too old,please upgrade your browser');
    },

    /**
     * 返回指定元素最近的selector父元素
     * @param {} el
     * @param {} selector
     * @returns {} 
     */
    closest: function(el, selector) {

        var nativeMatches = element.matches ||
            element.webkitMatchesSelector ||
            element.mozMatchesSelector ||
            element.oMatchesSelector ||
            element.msMatchesSelector ||
            element.matchesSelector || '';

        while (el) {
            if (nativeMatches.call(el, selector)) {
                return el;
            } else {
                el = el.parentElement;
            }
        }

        return null;
    },

    /**
     * 使用img的方式发送日志
     *
     * @param url src链接
     * @returns {undefined}
     */
    imgSendLog: function(url) {
        var key = 'BD_PS_C' + (new Date()).getTime();
        var img = window[key] = new Image();
        img.onload = function() {
            // 防止多次触发onload;
            img.onload = img.onerror = img.onabort = null;
            // 清空引用,避免内存泄漏
            window[key] = null;
            img = null;
        };
        img.src = url;
    }


}
