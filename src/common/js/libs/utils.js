import EventEmitter from './events';
import axios from 'axios';
import {message} from 'antd'

export function showLoading() {

    let div = document.createElement('div');
    div.id = 'loading';
    document.body.appendChild(div);
}

export function hideLoading() {

    let ele = document.getElementById('loading');

    ele && document.body.removeChild(ele);
}

export function fetch(opt) {

    return new Promise((resolve, reject) => {

    let e = new EventEmitter();

    e.on('overtime', () => {

        this.tipInfo({ content: '您的网络有点儿慢...' });
    })

    let timer = setInterval(() => {

        e.emit('overtime');
        clearInterval(timer);
    }, 10000)

    //当状态码不是0的时候，是否提示错误信息
    let errorTip = typeof opt.errorTip === 'undefined' ? true : false;

    //是否有加载提示
    let loadingTip = typeof opt.loadingTip === "undefined" ? true : false;

    loadingTip && showLoading();

    let defaultParams = {

        method: 'POST',
        headers: {

            "Content-Type": "application/json;charset=UTF-8"
        }
    }

    let options = Object.assign(defaultParams, opt);
    
    // redirectUrl(options)

    axios(options)
        .then(response => {

            clearInterval(timer);

            loadingTip && hideLoading();

            let data = response.data;


            if (data.code != 0) {

               
                message.error(data.message)
            } else {

                resolve(data.data);
            }
        })
        .catch(error => {

            clearInterval(timer);

            loadingTip && hideLoading();


            if (error.toString().indexOf('Network Error') > -1) {

               
                return;
            }

            let data = error.response.data;
            if ((data.statusCode == 403) && (data.message == '验证登录信息失败')) {

              
                return;
            }

            
        })
    })
}

function redirectUrl(opt) {

    opt.url = `http://localhost:7002${opt.url}`;
}

export function isEmail(email) {

    const reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;

    if (reg.test(email)) {

        return true;
    }
}

export function isEmpty(str) {

    return str.replace(/\s/g, '').length == 0;
}

export function strip(num, precision = 12) {
  
  num = +num

  num = parseFloat(+num.toPrecision(precision));

  return num.toFixed(4);
}