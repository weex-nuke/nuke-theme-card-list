import { createElement, Component, PropTypes } from 'rax';
import { View, Text, Image, Iconfont, Link } from 'nuke';
import * as common from '../../util/common';
import styles from './index.less';

class BigPicFeeds extends Component {
  constructor(props) {
    super(props);
    Iconfont({ name: 'iconfont', url: '//at.alicdn.com/t/font_1474198576_7440977.ttf' });
    this.state = {
      icon1: '\ue606',
      icon2: '\ue608',
    };
    this.uri1 = '//img.alicdn.com/tps/TB1U8HqQXXXXXajXpXXXXXXXXXX-28-24.png';
    this.uri2 = '//img.alicdn.com/tps/TB1SDLlQXXXXXX8XpXXXXXXXXXX-28-24.png';
  }

  render() {
    const data = this.props.data;
    const attachment = data.attachment;
    const imgUrl = attachment.banner || data.picLinks[0];
    const url = common.getUrl(data.idstr, data.attachmentSt);
    return (
      <Link href={url} target="_blank" style={styles.bigPicFeeds}>
        <View style={styles.titles}>{data.title}</View>
        <View>
          <Image style={styles.imgs} source={{ uri: imgUrl }} />
        </View>
        <View style={styles.attachment}>
          <Text style={styles.fmname}>{attachment.fm_name}</Text>
          <View style={styles.attention}>
            <View style={styles.readCount}>
              <Image style={styles.icones} source={{ uri: this.uri1 }} />
              <Text style={styles.counts}>{common.partiNumberFormat(attachment.read_count)}</Text>
            </View>
            <View style={styles.favorCount}>
              <Image style={styles.icones} src={this.uri2} />
              <Text style={styles.counts}>{common.partiNumberFormat(attachment.comment_count)}</Text>
            </View>
          </View>
        </View>
      </Link>
    );
  }
}
BigPicFeeds.propTypes = {
  data: PropTypes.shape({}).isRequired,
};
export default BigPicFeeds;
