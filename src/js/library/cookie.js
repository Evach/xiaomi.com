    const cookie = {
        get(key) {
            if (document.cookie) { // 判断是否有cookie数据
                let cookies = document.cookie.split('; ');
                for (let i in cookies) {
                    let item = cookies[i].split('=');
                    if (item[0] === key) return item[1];
                }
            }
            return ''; // 如果没有cookie或遍历结束没有获得值 则返回空字符串
        },

        set(key, value, day) {
            if (typeof day === 'number') {
                let d = new Date();
                d.setDate(d.getDate() + day);
                document.cookie = `${key}=${value};expires=${d};path=/`;
            } else {
                document.cookie = `${key}=${value};path=/`;
            }
            return this;
        },

        remove(key) {
            this.set(key, '', -1);
        }
    };

    export { cookie };