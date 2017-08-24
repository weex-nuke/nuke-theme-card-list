import fetch from './request/fetch';
/**
 * 其他接口接口封装可在Http中透出此处透出
 */
export const Http = {
  fetch,
};

export const NameSpace = function (name) {
  return function (v) {
    return `${name}-${v}`;
  };
};
