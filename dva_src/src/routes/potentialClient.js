import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Card, Table, Button, Divider, Tag, Popconfirm, Form, Input, Row, Col, Select, message } from 'antd';
import moment from 'moment';
import { formItemLayout } from '../components/BaseLayout';
import { SEX } from '../utils/enum';
import { stringifyQuery, getSortName, getUser } from '../utils/utils';

const FormItem = Form.Item;
const { Option } = Select;

/**
 * modelname potentialClient
 */
const userInfo = getUser();
const isManager = userInfo.role.some(item => item === 'manager');

class List extends React.Component {

  state = {
    queryForm: {},
  }

  componentDidMount() {
    const { location: { query } } = this.props;

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
    params = params || {};

    const queryForm = {
      ...params,
    }

    this.setState({
      queryForm,
    });

    if (!isManager) {
      params.salesId = userInfo.id;
    }

    dispatch({
      type: 'potentialClient/fetch',
      payload: { params },
    });

    dispatch({
      type: 'membershipManagement/fetch',
      payload: { 
        params: {
          pageNo: 1,
          pageSize: 999,
        }
       },
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
  
  // 设置成为会员
  handleSetMember(id) {
    const { dispatch, location: { query } } = this.props;
    dispatch({
      type: 'potentialClient/updateStatus',
      payload: {id},
    }).then(res => {
      if (res && res.returnCode === '0') {
        message.success('设置会员成功');
        this.loadData(query);
      } else {
        message.error(`设置会员失败${res.errorMessage}`);
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

  // 状态
  renderSex(sex) {
    switch (sex) {
      case SEX.MALE:
        return <Tag color="blue">男</Tag>
      case SEX.FEMALE:
        return <Tag color="pink">女</Tag>
      default:
        return <Tag>未知</Tag>
    }
  }

  // 时间、作者信息展示
  renderUpdateInfo(time, author) {
    const lastTime = moment(time);
    return <Fragment>
      <div>{author}</div>
      <div>{lastTime.isValid() ? lastTime.format('YYYY-MM-DD HH:mm:ss') : ''}</div>
    </Fragment>    
  }

  // 操作
  renderOperation() {
    return <Fragment>
      <Row type="flex" justify="end" style={{marginBottom: '20px'}}>
        <Col>
          <Button type="primary" htmlType="submit">查询</Button>
          <Divider type="vertical" />
          <Button onClick={() => { this.handleResetForm() }}>重置</Button>
        </Col>
      </Row>
    </Fragment>
  }

  renderForm() {
    const { membershipManagement: { membershipList }, form } = this.props;
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
                <Input placeholder="请输入ID" allowClear />
              )}
            </FormItem>
          </Col>
          <Col {...colSpan}>
            <FormItem label="客户名" {...formItemLayout}>
            {getFieldDecorator('f_Username', {
              initialValue: queryForm.f_Username,
            })(
              <Input placeholder="请输入客户名" allowClear />
            )}
            </FormItem>
          </Col>
          <Col {...colSpan}>
            <FormItem label="会籍顾问" {...formItemLayout}>
            {getFieldDecorator('f_SalesId', {
              initialValue: queryForm.f_SalesId,
            })(
              <Select placeholder="请选择会籍顾问" disabled={!isManager} allowClear>
                {
                  membershipList.map(item => <Option key={item.id}>{`${item.username || '未知'}(${item.id})`}</Option>)
                }
              </Select>
            )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={rowGutter}>
          <Col {...colSpan}>
            <FormItem label="手机号" {...formItemLayout}>
              {getFieldDecorator('f_Phone', {
                initialValue: queryForm.f_Phone,
              })(
                <Input placeholder="请输入手机号" allowClear />
              )}
            </FormItem>
          </Col>
          <Col {...colSpan}>
            <FormItem label="性别" {...formItemLayout}>
            {getFieldDecorator('f_Sex', {
              initialValue: queryForm.f_Sex,
            })(
              <Select placeholder="请选择性别" allowClear>
                <Option key={SEX.UNKNOWN} value={SEX.UNKNOWN}>未知</Option>
                <Option key={SEX.MALE} value={SEX.MALE}>男</Option>
                <Option key={SEX.FEMALE} value={SEX.FEMALE}>女</Option>
              </Select>
            )}
            </FormItem>
          </Col>
          <Col {...colSpan}>
            <FormItem label="年龄" {...formItemLayout}>
            {getFieldDecorator('f_Age', {
              initialValue: queryForm.f_Age,
            })(
              <Input placeholder="请输入年龄" allowClear />
            )}
            </FormItem>
          </Col>
        </Row>
        {this.renderOperation()}
      </Form>
    </Fragment>
  }

  render() {
    const { potentialClient: { list, total }, membershipManagement: { membershipMap }, location: { pathname, query }, loading } = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      current: query.pageNo && parseInt(query.pageNo, 10),
      pageSize: query.pageSize && parseInt(query.pageSize, 10),
      total: total,
      showTotal: () => `共${total}条记录`
    };
    const columns = [{
      title: 'ID',
      dataIndex: 'id',
      sorter: true,
    }, {
      title: '客户名',
      dataIndex: 'username',
      sorter: true,
    }, {
      title: '会籍顾问',
      dataIndex: 'salesId',
      render: (val) => membershipMap[val],
    }, {
      title: '手机号',
      dataIndex: 'phone',
    }, {
      title: '性别',
      dataIndex: 'sex',
      align: 'center',
      render: (val, record) => this.renderSex(val),
    }, {
      title: '年龄',
      dataIndex: 'age',
    }, {
      title: '创建信息',
      dataIndex: 'createdAt',
      align: 'center',
      sorter: true,
      render: (val, record) => this.renderUpdateInfo(val, record.creator)
    }, {
      title: '更新信息',
      dataIndex: 'updatedAt',
      align: 'center',
      sorter: true,
      render: (val, record) => this.renderUpdateInfo(val, record.updatePerson)
    }, {
      title: '操作',
      align: 'center',
      width: '250px',
      render: (val, record) => {
        const id = record.roles && record.roles.map(hasRole => hasRole.id)[0];
        const query = id && `&hasRoleId=${id}` || '';
        return <Fragment>
          <Button size="small"><Link to={`${pathname}/edit?id=${record.id}${query}`}>编辑</Link></Button>
          <Divider type="vertical" />
          <Popconfirm title="确认成为会员?" onConfirm={() => {this.handleSetMember(record.id)}}>
            <Button type="danger" size="small">成为会员</Button>
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
  }
}

export default Form.create()(connect(mapStateToProps)(List));