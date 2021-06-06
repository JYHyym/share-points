import axios from 'axios';
// 声明一个 Map 用于存储每个请求的标识 和 取消函数
const pendingRequest = new Map();
const generateReqKey = config => {
  const {method, url, params, data} = config;
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&');
};

/**
 * 添加请求
 * @param {Object} config
 */
const addPendingRequest = config => {
  const requestKey = generateReqKey(config);
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken(cancel => {
      if (!pendingRequest.has(requestKey)) {
        // 如果 pending 中不存在当前请求，则添加进去
        pendingRequest.set(requestKey, cancel);
      }
    });
};
/**
 * 移除请求
 * @param {Object} config
 */
const removePendingRequest = config => {
  const requestKey = generateReqKey(config);
  if (pendingRequest.has(requestKey)) {
    // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    const cancel = pendingRequest.get(requestKey);
    cancel(requestKey);
    pendingRequest.delete(requestKey);
  }
};

/**
 * @description: 请求拦截器
 * @param {*}
 * @return {*}
 */
axios.interceptors.request.use(
  function (config) {
    removePendingRequest(config); // 检查是否存在重复请求，若存在则取消已发的请求
    addPendingRequest(config); // 把当前请求信息添加到pendingRequest对象中
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

/**
 * @description: 响应拦截器
 * @param {*}
 * @return {*}
 */
axios.interceptors.response.use(
  response => {
    removePendingRequest(response.config); // 从pendingRequest对象中移除请求
    return response;
  },
  error => {
    removePendingRequest(error.config || {}); // 从pendingRequest对象中移除请求
    if (axios.isCancel(error)) {
      console.log('已取消的重复请求：' + error.message);
    } else {
      // 添加异常处理
    }
    return Promise.reject(error);
  }
);

export default axios;
