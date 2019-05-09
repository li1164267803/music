import jsonp from '@/common/js/jsonp.js';
import {commonParams, options} from './config.js';

export function getRecommend(){
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'//可变的url 以qq音乐的排行榜为例

    const data = Object.assign({},commonParams,{
        platform:'h5',
        uin:0,
        needNewCode:1
    })
//     说明：Object.assign() 为 es6 javascript对象方法，功能是合并多个对象数据
//      Object.assign方法的第一个参数是目标对象，后面的参数都是源对象。
//      注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。

    return jsonp(url,data,options)
}


export function getSingers(mid){
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'//歌手详情

    const data = Object.assign({},commonParams,{
        platform:'yqq',
        hostUin:0,
        order: 'listen',
        num: 80,
        songstatus: 1,
        singermid: mid,
        needNewCode:0,
        begin:0
    })
    
    return jsonp(url,data,options)
}