// const rootUrl = 'https://www.guzong1.com:446/admin/';
const rootUrl = 'http://127.0.0.1:8080/';

const api = {
    rootUrl : rootUrl,
    // express: {
    //     // 快递物流信息查询使用的是快递鸟接口，申请地址：http://www.kdniao.com/
    //     appid: '123', // 对应快递鸟用户后台 用户ID
    //     appkey: '123123', // 对应快递鸟用户后台 API key
    //     request_url: 'http://api.kdniao.cc/Ebusiness/EbusinessOrderHandle.aspx'
    // },
	// 4.19更新，物流查询不需要以上配置，只需要在server的config配置阿里云物流接口就可以
    qiniu: 'http://up-z0.qiniu.com',
    // 请根据自己创建的七牛的区域进行设置：
    // https://developer.qiniu.com/kodo/manual/1671/region-endpoint
	// 华东	  http(s)://up.qiniup.com
	// 华北	  http(s)://up-z1.qiniup.com
	// 华南	  http(s)://up-z2.qiniup.com
	// 北美	  http(s)://up-na0.qiniup.com
	// 东南亚 http(s)://up-as0.qiniup.com
};


// import api from './config/api'
// Axios.defaults.baseURL = api.rootUrl;

export default api