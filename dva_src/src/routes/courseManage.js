import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Card, Table, Button, Divider, Tag, Popconfirm, Timeline, Popover, Form, Input, Row, Col, Select, DatePicker, message, Tabs, Statistic, Icon, Calendar, Badge, Tooltip } from 'antd';
import moment from 'moment';

const TimelineItem = Timeline.Item;
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

function getListData(value) {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: <Tooltip title="时间：下午3点-5点">瑜伽课</Tooltip> },
        { type: 'success', content: <Tooltip title="时间：下午6点-8点">游泳课</Tooltip> },
      ]; break;
    case 10:
      listData = [
        { type: 'warning', content: <Tooltip title="时间：下午3点-5点">瑜伽课</Tooltip> },
        { type: 'success', content: <Tooltip title="时间：下午6点-8点">游泳课</Tooltip> },
      ]; break;
    case 17:
      listData = [
        { type: 'warning', content: <Tooltip title="时间：下午3点-5点">瑜伽课</Tooltip> },
        { type: 'success', content: <Tooltip title="时间：下午6点-8点">游泳课</Tooltip> },
      ]; break;
    default:
  }
  return listData || [];
}

function dateCellRender(value) {
  const listData = getListData(value);
  return (
    <div className="events">
      {
        listData.map(item => (
          <div key={item.content}>
            <Badge status={item.type} text={item.content} />
          </div>
        ))
      }
    </div>
  );
}

function getMonthData(value) {
  if (value.month() === 8) {
    return 1394;
  }
}

function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
}

class Template extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    queryForm: {},
  }

  componentDidMount() {
    const { dispatch, location: { query } } = this.props;

    this.loadData(query);
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'template/initState',
    });
  }

  // 加载数据
  loadData(params) {
    const { dispatch } = this.props;

    const queryForm = {
      ...params,
    }

    this.setState({
      queryForm,
    });

    dispatch({
      type: 'template/fetch',
      payload: { params },
    });
  }

  // url加入查询参数
  pushQueryToUrl(search) {
    const { history } = this.props;
    history.replace({
      search,
    });
  }

  render() {
    const { template: { list, total }, location: { pathname, query }, loading } = this.props;
    return <>
      <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
    </>
  }
}

function mapStateToProps({ template, loading }) {
  return {
    template,
    loading: loading.effects['template/fetch'],
  }
}

export default Form.create()(connect(mapStateToProps)(Template));