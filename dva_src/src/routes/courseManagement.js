import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Card, Table, Button, Divider, Tag, Popconfirm, Timeline, Popover, Form, Input, Row, Col, Select, DatePicker, message } from 'antd';
import moment from 'moment';
import { formItemLayout } from '../components/BaseLayout';
import {  } from '../utils/enum';
import { stringifyQuery, getSortName } from '../utils/utils';

const TimelineItem = Timeline.Item;
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

/**
 * modelname courseManagement
 */
class List extends React.Component {
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
      type: 'courseManagement/initState',
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
      type: 'courseManagement/fetch',
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

  // 查询
  handleSearch = (e) => {
    e && e.preventDefault();

    const { form, location: { query } } = this.props;

    form.validateFields((err, formValue) => {
      if (err) {
        message.warn('表单校验出错！');
        return;
      }

      const params = {
        ...query,
        ...formValue,
      }

      // 处理时间
      if (params.f_CreateTime && params.f_CreateTime.length > 0) {
        params.f_CreateTimeBegin = params.f_CreateTime[0].startOf('day').valueOf();
        params.f_CreateTimeEnd = params.f_CreateTime[1].endOf('day').valueOf();
        delete params.f_CreateTime;
      }
      if (params.f_UpdateTime && params.f_UpdateTime.length > 0) {
        params.f_UpdateTimeBegin = params.f_UpdateTime[0].startOf('day').valueOf();
        params.f_UpdateTimeEnd = params.f_UpdateTime[1].endOf('day').valueOf();
        delete params.f_UpdateTime;
      }

      this.pushQueryToUrl(stringifyQuery(params));

      this.loadData(params);
    });
  }

  // 重置表单
  handleResetForm() {
    const { form } = this.props;
    form.resetFields();

    this.setState({
      queryForm: {},
    });

    this.pushQueryToUrl();

    this.loadData();
  }

  // 删除
  handleDelete(id) {
    const { dispatch, location: { query } } = this.props;
    dispatch({
      type: 'courseManagement/delete',
      payload: id,
    }).then(res => {
      if (res && res.returnCode === '0') {
        message.success('删除成功');
        this.loadData(query);
      } else {
        message.error(`删除失败${res.errorMessage}`);
      }
    });
  }

  // 表格改变
  handleTableChange = (pagination, filters, sorter) => {
    const { location: { query } } = this.props;
    const { current, pageSize } = pagination;
    const params = {
      ...query,
      pageSize,
      pageNo: current,
      sortName: getSortName(sorter.field, sorter.order),
    };

    this.pushQueryToUrl(stringifyQuery(params));

    this.loadData(params);
  }


  // 时间、作者信息展示
  renderUpdateInfo(time, author) {
    const lastTime = moment(time);
    return <Fragment>
      <div>{author}</div>
      <div>{lastTime.isValid() ? lastTime.format('YYYY-MM-DD HH:mm:ss') : ''}</div>
    </Fragment>    
  }

  // 时间轴
  renderTime(timeArr) {
    return <Fragment>
      <Timeline>
        {
          timeArr.map(time => {
            const lastTime = moment(time);
            const timeStamp = lastTime.isValid() ? lastTime.valueOf() : ''
            return <TimelineItem>{timeStamp}</TimelineItem>
          })
        }
      </Timeline>
    </Fragment>
  }

  // 操作
  renderOperation() {
    const { location: { pathname } } = this.props;
    return <Fragment>
      <Row type="flex" justify="space-between" style={{marginBottom: '20px'}}>
        <Col>
          <Button type="primary"><Link to={`${pathname}/edit`}>新建</Link></Button>
        </Col>
        <Col>
          <Button type="primary" htmlType="submit">查询</Button>
          <Divider type="vertical" />
          <Button onClick={() => { this.handleResetForm() }}>重置</Button>
        </Col>
      </Row>
    </Fragment>
  }

  renderForm() {
    const { courseManagement: { list }, location: { pathname }, form } = this.props;
    const { queryForm } = this.state;
    const { getFieldDecorator } = form;
    const rowGutter = { xs: 8, sm: 16, md: 16, lg: 24 };
    const colSpan = { xs: 24, sm: 12, md: 12, lg: 12 };
    return <Fragment>
      <Form onSubmit={this.handleSearch}>
        <Row gutter={rowGutter}>
          <Col {...colSpan}>
            <FormItem label="课程ID" {...formItemLayout}>
              {getFieldDecorator('f_Id', {
                initialValue: queryForm.f_Id,
              })(
                <Input placeholder="请输入ID"  />
              )}
            </FormItem>
          </Col>
          <Col {...colSpan}>
            <FormItem label="课程名称" {...formItemLayout}>
              {getFieldDecorator('f_Name', {
                initialValue: queryForm.f_Name,
              })(
                <Input placeholder="请输入课程名称"  />
              )}
              </FormItem>
            </Col>
        </Row>
        {this.renderOperation()}
      </Form>
    </Fragment>
  }

  render() {
    const { courseManagement: { list, total }, location: { pathname, query }, loading } = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      current: query.pageNo && parseInt(query.pageNo),
      pageSize: query.pageSize && parseInt(query.pageSize),
      total: total,
      showTotal: () => `共${total}条记录`
    };
    const columns = [{
      title: 'ID',
      dataIndex: 'id',
      sorter: true,
    }, {
      title: '课程名称',
      dataIndex: 'name',
      sorter: true,
    }, {
      title: '课程信息',
      dataIndex: 'courseInfo',
      align: 'center',
      sorter: true,
      // render: (val, record) => this.renderUpdateInfo(val, record.updatePerson)
    }, {
      title: '操作',
      align: 'center',
      width: '220',
      render: (val, record) => {
        return <Fragment>
          <Button size="small"><Link to={`${pathname}/edit?id=${record.id}`}>编辑</Link></Button>
          <Divider type="vertical" />
          <Popconfirm title="确认删除?删除后无法恢复" onConfirm={() => {this.handleDelete(record.id)}}>
            <Button type="danger" size="small">删除</Button>
          </Popconfirm>
        </Fragment>
      }
    }];
    return (
      <Card bordered={false}>
        {this.renderForm()}
        <Table
          columns={columns}
          dataSource={list}
          rowKey={record => record.id}
          loading={loading}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </Card>
    )
  }
}

function mapStateToProps({ courseManagement, loading }) {
  return {
    courseManagement,
    loading: loading.effects['courseManagement/fetch'],
  }
}

export default Form.create()(connect(mapStateToProps)(List));