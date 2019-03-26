import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Card, Table, Button, Divider, Tag, Popconfirm, Timeline, Popover, Form, Input, Row, Col, Select, DatePicker, message } from 'antd';
import moment from 'moment';
import { formItemLayout } from '../../components/BaseLayout';
import {} from '../../utils/enum';
import { stringifyQuery, getSortName } from '../../utils/utils';

const TimelineItem = Timeline.Item;
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

/**
 * modelname potentialClient
 */
class List extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    queryForm: {},
    passwordVisible: false,
    selectedRowKeys: [],
    hasSelected: false,
  }

  componentDidMount() {
    const { dispatch, location: { query } } = this.props;

    this.loadData(query);
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'potentialClient/initState',
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
      type: 'potentialClient/fetch',
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
      type: 'potentialClient/delete',
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

  // 更新
  handleUpdateSalesBatch(salesId, idArr) {
    const { dispatch, location: { query } } = this.props;
    const params = {
      salesId,
      ids: idArr.join(','),
    };
    dispatch({
      type: 'membershipManagement/updateSalesBatch',
      payload: { params },
    }).then(res => {
      if (res && res.returnCode === '0') {
        message.success('转移成功');
        this.loadData(query);
      } else {
        message.error(`转移失败！${res.errorMessage}`);
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

  // 渲染密码
  renderPassword(pwd) {
    const { passwordVisible } = this.state;
    return <div style={{display: 'flex', justifyContent: 'space-between'}}>
      {
        passwordVisible &&
        <>
          <span>{pwd}</span>
          <a onClick={() => {
            this.setState({
              passwordVisible: false,
            });
          }}>隐藏</a>
        </> ||
        <>
          <span>******</span>
          <a onClick={() => {
            this.setState({
              passwordVisible: true,
            });
          }}>查看</a>
        </>
      }
    </div>
  }

  // 操作
  renderOperation() {
    const { location: { pathname }, dispatch, submitting } = this.props;
    const { hasSelected, selectedRowKeys } = this.state;
    return <Fragment>
      <Row type="flex" justify="space-between" style={{marginBottom: '20px'}}>
        <Col>
          <Input.Search 
            style={{width:'200px'}} 
            disabled={!hasSelected} 
            enterButton="一键转移"  
            onSearch={(val) => {
              this.handleUpdateSalesBatch(val, selectedRowKeys);
            }}
            loading={submitting}
          />
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
    const { potentialClient: { list }, location: { pathname }, form } = this.props;
    const { queryForm } = this.state;
    const { getFieldDecorator } = form;
    const rowGutter = { xs: 8, sm: 16, md: 16, lg: 24 };
    const colSpan = { xs: 24, sm: 8, md: 8, lg: 8 };
    return <Fragment>
      <Form onSubmit={this.handleSearch}>
        <Row gutter={rowGutter}>
          <Col {...colSpan}>
            <FormItem label="客户ID" {...formItemLayout}>
              {getFieldDecorator('f_Id', {
                initialValue: queryForm.f_Id,
              })(
                <Input placeholder="请输入ID"  />
              )}
            </FormItem>
          </Col>
          <Col {...colSpan}>
            <FormItem label="客户名" {...formItemLayout}>
            {getFieldDecorator('f_Username', {
              initialValue: queryForm.f_Username,
            })(
              <Input placeholder="请输入客户名"  />
            )}
            </FormItem>
          </Col>
          <Col {...colSpan}>
            <FormItem label="手机号" {...formItemLayout}>
            {getFieldDecorator('f_Phone', {
              initialValue: queryForm.f_Phone,
            })(
              <Input placeholder="请输入手机号"  />
            )}
            </FormItem>
          </Col>
        </Row>
        {this.renderOperation()}
      </Form>
    </Fragment>
  }

  render() {
    const { potentialClient: { list, total }, location: { pathname, query }, loading } = this.props;
    const { selectedRowKeys, hasSelected } = this.state;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      current: query.pageNo && parseInt(query.pageNo),
      pageSize: query.pageSize && parseInt(query.pageSize),
      total: total,
      showTotal: () => `共${total}条记录`
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ 
          selectedRowKeys,
          hasSelected: !hasSelected,
         });
      },
    };
    const columns = [{
      title: 'ID',
      dataIndex: 'id',
      sorter: true,
    }, {
      title: '潜在客户姓名',
      dataIndex: 'username',
      sorter: true,
    }, {
      title: '手机号',
      dataIndex: 'phone',
    }, {
      title: '操作',
      align: 'center',
      width: '220',
      render: (val, record) => {
        return <Fragment>
          <Popconfirm title="确认转移?" onConfirm={() => {this.handleDelete(record.id)}}>
            <Button size="small">转移</Button>
          </Popconfirm>
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
          rowSelection={rowSelection}
          loading={loading}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </Card>
    )
  }
}

function mapStateToProps({ potentialClient, membershipManagement, loading }) {
  return {
    potentialClient,
    membershipManagement,
    loading: loading.effects['potentialClient/fetch'],
    submitting: loading.effects['membershipManagement/updateSalesBatch'],
  }
}

export default Form.create()(connect(mapStateToProps)(List));