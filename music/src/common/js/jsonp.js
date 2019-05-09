//https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&uin=0&needNewCode=1&platform=h5&jsonpCallback=jp0

import originJsonp from 'jsonp'//下载后引用 npm install jsonp --save

export default function jsonp(url,data,option){
    url += (url.indexOf('?') < 0 ? '?' : "&") + param(data);
    return new Promise((resolve,reject)=>{
        originJsonp(url,option,(err,data)=>{
            if(!err){
                resolve(data)
            }else{
                reject(err)
            }
        })
    })
}

function param(data){
    let url = '';
    for (const key in data) {
        let value = data[key] !== undefined ? data[key] : '';
        url += `&${key}=${encodeURIComponent(value)}`//encodeURIComponent()用来分隔 URI 组件的标点符号
    }
    //删除第一个&
    return url ? url.substring(1) : '';
}