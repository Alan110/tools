var utils = {

    /**
     * string,function,object,number ,统一小写
     * @param {} type
     * @returns {} 
     */
    isTypeEq: function(type, value) {
        return '[object ' + type + ']' === Object.prototype.toString.call(value).toLocaleLowerCase();
    },

    /**
     * 继承对象方法
     *
     * @param parent 继承者
     * @param child  被继承者
     * @param isDeep 是否深度拷贝
     * @isMerge 数组合并,注意值没有去重
     * @returns number 失败返回-1
     */
    extend: function(parent, child, isDeep, isMerge) {
        if (typeof parent !== 'object' || typeof child !== 'object') {
            return parent;
        }

        if (isDeep) {
            for (var i in child) {
                if (child.hasOwnProperty(i)) {
                    if (typeof child[i] === 'object') {
                        if (isMerge && Array.isArray(child[i]) && Array.isArray(parent[i])) {
                            var p1 = this.extend([], parent[i], isDeep);
                            var c1 = this.extend([], child[i], isDeep);
                            parent[i] = p1.concat(c1);
                        } else {
                            parent[i] = arguments.callee({}, child[i], isDeep);
                        }
                    } else {
                        parent[i] = child[i];
                    }
                }

            }
        } else {
            for (var j in child) {
                if (child.hasOwnProperty(j)) {
                    parent[j] = child[j];
                }

            }
        }
        return parent;
    },

    /**
     * 数据序列化处理
     * 1层对象为querystirng，二层对象会被序列号为json字符串
     * @param obj
     * @returns {string}
     */
    serialize: function(obj) {
        if (!obj) {
            return '';
        }

        var str = '';
        var item = '';
        if (this.isObject(obj)) {
            for (var k in obj) {
                item = obj[k];
                if (typeof item === 'undefined') {
                    continue;
                }

                if (this.isObject(item)) {
                    item = JSON.stringify(item);
                }

                str += k + '=' + encodeURIComponent(item) + '&';
            }
            str = str.substring(0, str.length - 1); // 去掉末尾的&
        } else if (this.isString(obj)) {
            str = obj;
        }

        return str;
    },

    /*
     * 节流函数，每过多少ms执行一次，中间不管调用多少次
     * 原理是计算当前时间与上一次刻度点时间的差, 每执行一次更新刻度时间点
     * */
    throttle: function(delay, action) {
        var last = 0
        return function() {
            var curr = +new Date()
            if (curr - last > delay) {
                action.apply(this, arguments)
                last = curr
            }
        }
    },

    /*
     * 限流函数，只有定下来，经过ms后，才执行
     * 原理就是不停的settimeout
     * */
    debounce: function(idle, action) {
        var last
        return function() {
            var ctx = this,
                args = arguments
            clearTimeout(last)
            last = setTimeout(function() {
                action.apply(ctx, args)
            }, idle)
        }
    },

    /*
     * 管道函数，第一函数的返回值作为第二个函数的参数, 依次执行, 做filter的时候很管用
     * 将函数执行顺序以参数的形式体现。
     * */
    compose : function() {
        var args = arguments;
        var start = args.length - 1;
        return function() {
            var i = start;
            var result = args[start].apply(this, arguments);
            while (i--) result = args[i].call(this, result);
            return result;
        };
    }




}
