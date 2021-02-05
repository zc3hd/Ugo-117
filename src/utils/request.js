// 导出？
export default function(Vue) {
  // Vue：构造函数Vue;
  //      原型对象，在其上设置方法，在Vue所有实例化对象中this都可以使用该方法；

  // 封装请求的方法，解决两个问题
  //    2.
  Vue.prototype.$request = async function(opt) {
    // 1.配置基础路径地址
    const base = "https://api-ugo-web.itheima.net";
    opt.url = base + opt.url;


    // 加载loading效果
    uni.showLoading({
      title: "加载中...",
      // mask: true,  防止触摸穿透 : loading不消失，触摸屏幕没有反应；
    });


    // 2.内部必定发出请求；
    const [err, res] = await uni.request({
      url: opt.url
    });


    uni.hideLoading();


    // 对返回数据格式处理；前提：后台所有接口返回数据格式都是这个样子！
    return res.data;
  };



}