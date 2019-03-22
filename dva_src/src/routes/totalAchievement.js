import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Card, Table, Button, Divider, Tag, Popconfirm, Timeline, Popover, Form, Input, Row, Col, Select, DatePicker, message, Tabs, Statistic, Icon } from 'antd';
import { Chart, Tooltip, Axis, Legend, SmoothLine, Point } from 'viser-react';
import moment from 'moment';
const DataSet = require('@antv/data-set');

const TimelineItem = Timeline.Item;
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const sourceData = [
];
for (let i = 1; i <= 28; i++) {
  sourceData.push({ day: i, '收入': Math.floor(Math.random() * 10) * 800 })
}

const dv = new DataSet.View().source(sourceData);
const data = dv.rows;

const scale = [{
  dataKey: '收入',
  min: 0,
}];

class TotalAchievement extends React.Component {
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
      type: 'totalAchievement/initState',
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
      type: 'totalAchievement/fetch',
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

  renderClient() {
    const { location: { pathname } } = this.props;
    return <Card>
      <Row gutter={16}>
        <Col span={8}>
          <Link to={`${pathname}/potentialClient`}>
            <Statistic title="潜在客户" value={80} />
          </Link>
        </Col>
        <Col span={8}>
          <Link to={`${pathname}/member`}>
            <Statistic title="正式会员" value={12} />
          </Link>
        </Col>
        <Col span={8}>
          <Statistic title="今日新增潜在客户" value={40} prefix={<Icon type="arrow-up" />} valueStyle={{ color: '#3f8600' }} />
        </Col>
      </Row>
    </Card>
  }

  renderMonth() {
    return <Chart forceFit height={400} data={data} scale={scale}>
      <Tooltip />
      <Axis />
      <Legend />
      <SmoothLine position="day*收入" />
      <Point position="day*收入" shape="circle" />
    </Chart>
  }

  render() {
    const { totalAchievement: { list, total }, location: { pathname, query }, loading } = this.props;
    return <>
      {this.renderClient()}
      <Tabs defaultActiveKey="3">
        <TabPane key="1" tab="今日"></TabPane>
        <TabPane key="2" tab="本周"></TabPane>
        <TabPane key="3" tab="本月">
          {this.renderMonth()}
        </TabPane>
      </Tabs>
    </>
  }
}

function mapStateToProps({ totalAchievement, loading }) {
  return {
    totalAchievement,
    loading: loading.effects['totalAchievement/fetch'],
  }
}

export default Form.create()(connect(mapStateToProps)(TotalAchievement));