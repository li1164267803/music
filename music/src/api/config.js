// 在src的文件夹下创建api文件夹，用于储存api调用的js，新建config.js和recommend.js两个文件。 
export const commonParams = {
    g_th:1928093487,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp'
}

export const options={
    param:'jsonpCallback'//使用jsonp必传的param jsonpCallback为回调的字段名
}