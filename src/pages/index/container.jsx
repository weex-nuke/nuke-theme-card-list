/* @jsx createElement */
import { Component, createElement } from 'rax';
import { View, Text, Image, ListView, RefreshControl } from 'nuke';
import { Http } from '$util/index';
import CommonFeeds from './mods/commonFeeds/index';
import BigPicFeeds from './mods/bigPicFeeds/index';
import InterviewFeeds from './mods/interviewFeeds/index';
import MutiPicFeeds from './mods/mutiPicFeeds/index';
import styles from './container.less';

class ListViewDemo extends Component {
  constructor() {
    super();
    this.state = {
      data: [
      ],
      isRefreshing: false,
      showLoading: true,
      refreshText: '下拉刷新',
      hasNext: true,
      showFooter: true,
    };
    this.page = 1;
    this.handleLoadMore = this.handleLoadMore.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  componentWillMount() {
    this.fetchData().then((data) => {
      console.log(data);
      this.setState({
        data: this.formatData(data.data),
      });
    });
  }

  checkNum(num) {
    if (num > 9999) {
      return `${(num / 10000).toFixed(1)}万`;
    }
    return num;
  }

  serializeQuery(json) {
    return Object.keys(json).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`).join('&');
  }

  formatData(arr) {
    const newData = [];
    arr.forEach((item) => {
      item.attachment = JSON.parse(item.attachment);
      item.attachment.read_count = this.checkNum(item.attachment.read_count);
      item.attachment.comment_count = this.checkNum(item.attachment.comment_count);
      if (item.attachmentSt === 9 || item.attachmentSt === 10) {
        item.feed_url = `https://alimarket.taobao.com/markets/qnww/qn-live-tmp?msgid=${item.idstr}&type=${item.attachmentSt}`;
      } else {
        item.feed_url = `https://h5.m.taobao.com/qn/pc/niuba/niuba-feeds.html#/detail/${item.idstr}`;
      }
      newData.push(item);
    }, this);
    return newData;
  }

  fetchData() {
    const param = {
      page: this.page,
    };
    return Http.fetch({
      name: 'theme.list.get.info',
      data: param,
    });
  }

  handleRefresh() {
    this.setState({
      isRefreshing: true,
      refreshText: '加载中',
      hasNext: true,
      showFooter: true,
    });
    this.page = 1;
    this.fetchData().then((data) => {
      // 模拟慢速网络
      setTimeout(() => {
        this.setState({
          data: this.formatData(data.data),
          refreshText: '↓ 下拉刷新',
          isRefreshing: false,
        });
      }, 2000);
    });
  }

  handleLoadMore() {
    this.page = this.page + 1;
    this.fetchData().then((data) => {
      if (!data.hasNext) {
        this.setState({
          hasNext: false,
        });
        setTimeout(() => {
          this.setState({
            showFooter: false,
          });
        }, 2000);
      }
      if (data.data && data.data.length) {
        this.setState({ data: this.state.data.concat(this.formatData(data.data)) });
      }
    });
  }

  renderItem(item) {
    if (item == null) {
      return;
    }
    let msg;
    switch (item.attachmentSt) {
      case 1: msg = <CommonFeeds data={item} />;
        break;
      case 11: msg = <MutiPicFeeds data={item} />;
        break;
      case 16: msg = <BigPicFeeds data={item} />;
        break;
      case 10: msg = <InterviewFeeds data={item} />;
        break;
      default: msg = <CommonFeeds data={item} />;
        break;
    }
    return msg;
  }

  renderHeader() {
    return (
      <RefreshControl style={styles.refresh} refreshing={this.state.isRefreshing} onRefresh={this.handleRefresh}>
        <Text style={styles.refreshText}>{this.state.refreshText}</Text>
      </RefreshControl>
    );
  }
  renderFooter() {
    if (this.state.hasNext) {
      return (
        <View style={[styles.footerLoading]}><Image src="https://img.alicdn.com/tfs/TB1jZUQRXXXXXcpXpXXXXXXXXXX-100-100.gif?getAvatar=avatar" style={{ width: 100, height: 100 }} /></View>
      );
    } else if (this.state.showFooter) {
      return (<View style={[styles.footerLoading]}><Text style={styles.footerText}>没有了~</Text></View>);
    }
    return null;
  }
  render() {
    return (
      <ListView
        renderRow={this.renderItem}
        dataSource={this.state.data}
        onEndReached={this.handleLoadMore}
        renderHeader={this.renderHeader}
        renderFooter={this.renderFooter}
        showScrollbar={false}
      />
    );
  }
}
export default ListViewDemo;
