/**
 * 仅仅一个export可以使用default，多个export则拆开可以获得较好的treeshaking效果
 * 见https://github.com/airbnb/javascript/issues/1365
 */
export function getUrl(id, attachmentSt) {
  let event; let parameter;
  if (attachmentSt === 1 || attachmentSt === 11 || attachmentSt === 16) {
    // 普通feeds (1) 三图文feeds（11） 大图类型（16）
    event = 'openWebsite';
    parameter = { msg_id: id };
  } else if (attachmentSt === 6) {
    // 专题 （6）
    event = 'openHeadlineSubject';
    parameter = { subjectId: id };
  } else if (attachmentSt === 10) {
    // 视频直播 (10)
    event = 'openVideo';
    parameter = { biz_id: id };
  } else if (attachmentSt === 9) {
    // 图文直播 (9)
    event = 'openBackWebsite';
    parameter = { url: 'https://h5.m.taobao.com/qn/mobile/niuba-interview.html#/liveshow/{id}/'.replace(/{id}/, id) };
  } else if (attachmentSt === 13) {
    // 图文直播 (9)
    event = 'openWebsite';
    parameter = { url: 'https://h5.m.taobao.com/qn/mobile/niuba-feeds.html#/pk/{id}/'.replace(/{id}/, id) };
  }
  return `http://mock_url.html?${JSON.stringify(parameter)}&&${event}`;
}

export function partiNumberFormat(num) {
  let format = num;
  if (num > 10000) {
    format = `${(num / 10000).toFixed(1).toString()}万`;
  } else {
    format = num.toString();
  }
  return format;
}

export function add0(m) {
  return m < 10 ? `0${m}` : m;
}

export function dataTimes(data) {
  const time = new Date(data);
  const m = time.getMonth() + 1;
  const d = time.getDate();
  const h = time.getHours();
  const mm = time.getMinutes();
  return `${add0(m)}月${add0(d)}日 ${add0(h)}:${add0(mm)}`;
}
