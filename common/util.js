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
     *
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



}
