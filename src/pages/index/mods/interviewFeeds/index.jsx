'use strict';

import { createElement, Component, PropTypes } from 'rax';
import { View, Text, Image, Iconfont, Link, Touchable } from 'nuke';
import * as commons from '../../util/common';
import styles from './index.less';

class InterviewFeeds extends Component {
  constructor(props) {
    super(props);
    Iconfont({ name: 'iconfont', url: '//at.alicdn.com/t/font_1474198576_7440977.ttf' });
    this.state = {
      icon1: '\ue606',
      icon2: '\ue608',
      icon3: '\ue9a4',
      showRemind: true,
      icon4: '\ue620',
    };
    this.uri1 = '//img.alicdn.com/tps/TB1U8HqQXXXXXajXpXXXXXXXXXX-28-24.png';
    this.uri2 = '//img.alicdn.com/tps/TB1UU7uPVXXXXc_apXXXXXXXXXX-150-150.png';
    this.uri3 = '//img.alicdn.com/tps/TB1U8HqQXXXXXajXpXXXXXXXXXX-28-24.png';
    this.uri4 = '//img.alicdn.com/tps/TB1SDLlQXXXXXX8XpXXXXXXXXXX-28-24.png';
  }
  // 判断返回的状态
  showStatus(data) {
    return {
      1: '未开始',
      2: '即将开始',
      3: '正在直播',
      4: '直播结束',
      5: '直播回顾',
    }[data];
  }
  // 调用提醒我的接口
  press(data) {
    console.log(data);
  }

  renderLiveEnd(data) {
    const attachment = data.attachment;
    const imgUrl = attachment.banner || data.picLinks[0];
    // 获取直播状态的颜色
    const colors = data.circlesBizTags && data.circlesBizTags[0].style.color;
    const url = commons.getUrl(data.idstr, data.attachmentSt);
    // border的样式
    const borderstyles = styles.borStyle;
    const s = Object.assign({ color: colors, borderColor: colors }, borderstyles);
    return (
      <Link href={url} target="_blank" style={styles.interviewFeedsBox}>
        <View style={styles.contentMain}>
          <Text style={styles.titles}>{data.title}</Text>
          <View style={styles.attachment}>
            <Text style={styles.fmnames}>{attachment.fm_name}</Text>
            <View style={styles.attention}>
              <View style={styles.readCount}>
                <Image style={styles.icones} source={{ uri: this.uri1 }} />
                <Text style={styles.counts}>{commons.partiNumberFormat(attachment.read_count)}</Text>
              </View>
              <View style={s}>
                {data.circlesBizTags[0].name}
              </View>
            </View>
          </View>
        </View>
        <View style={styles.imgs}>
          <Image style={{ width: 226, height: 160 }} source={{ uri: imgUrl }} />
          <Text style={styles.icons1}>{this.state.icon3}</Text>
        </View>
      </Link>
    );
  }

  renderLiving(data) {
    const attachment = data.attachment;
    // console.log(attachment.isParticipated)
    // 大图
    const bigPic = attachment.banner;
    // showTimes 直播时间处理，时间戳转  00-00-00 00:00:00格式
    const showTimes = commons.dataTimes(attachment.startTime);
    // 根据状态码返回对应的直播状态
    const showStatus = this.showStatus(attachment.liveStatus);
    // 获取直播状态的颜色
    const colors = data.circlesBizTags && data.circlesBizTags[0].style.color;
    // border的样式
    const borderstyles = styles.borStyle;
    const s = Object.assign({ color: colors, borderColor: colors }, borderstyles);
    const url = commons.getUrl(data.idstr, data.attachmentSt);
    // 根据isParticipated  判断是否点击提醒我，状态是1的时候显示提醒我
    let remind = null;
    if (!attachment.isParticipated && attachment.liveStatus === '1') {
      if (this.state.showRemind) {
        remind = (<Touchable style={styles.remind} onPress={this.press(data.id)}>
          <Image style={styles.remind_icon} source={{ uri: this.uri2 }} />
          <Text style={styles.reminds}>提醒我</Text>
        </Touchable>);
      } else {
        remind = null;
      }
    }

    return (
      <View>
        <Link href={url} target="_blank" style={styles.interviewFeedsBoxIng}>
          <View style={styles.ingtitles}>{data.title}</View>
          <View style={{ paddingTop: 24, paddingBottom: 30 }}>
            <Image style={{ width: 690, height: 360 }} source={{ uri: bigPic }} />
            <View style={styles.showStatus}>
              <Text style={styles.showTime}>直播时间：{showTimes}</Text>
              <View style={styles.showStatusRight}>
                <View style={styles.showstatus}>{showStatus}</View>
              </View>
            </View>
          </View>
          <View style={styles.attachment}>
            <Text style={styles.fmname}>{attachment.fm_name}</Text>
            <View style={styles.attention}>
              <View style={styles.readCount}>
                <Image style={styles.icones} source={{ uri: this.uri3 }} />
                <Text style={styles.counts}>{commons.partiNumberFormat(attachment.read_count)}</Text>
              </View>
              <View style={styles.favorCount}>
                <Image style={styles.icones} source={{ uri: this.uri4 }} />
                <Text style={styles.counts}>{commons.partiNumberFormat(attachment.comment_count)}</Text>
              </View>
              <Text style={s}>{data.circlesBizTags[0].name}</Text>
            </View>
          </View>
        </Link>
        {remind}
      </View>

    );
  }

  render() {
    const data = this.props.data;
    const attachment = data.attachment;
    const liveStatus = attachment.liveStatus;
    // 直播结束之前（展示直播时间等）
    const living = this.renderLiving(data);
    // 直播结束 （小图展示，展示一个视频icon）
    const liveEnd = this.renderLiveEnd(data);
    return (
      <View>{(liveStatus === 4 || liveStatus === 5) ? liveEnd : living}</View>
    );
  }
}
InterviewFeeds.propTypes = {
  data: PropTypes.shape({}).isRequired,
};
export default InterviewFeeds;
