import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Card, Table, Button, Divider, Popconfirm, Form, Input, Row, Col, message, Statistic, Icon } from 'antd';
import moment from 'moment';
import { formItemLayout } from '../../components/BaseLayout';
import { stringifyQuery, getSortName } from '../../utils/utils';

const FormItem = Form.Item;

/**
 * modelname potentialClient
 */
class List extends React.Component {

  state = {
    queryForm: {},
    passwordVisible: false,
    selectedRowKeys: [],
    hasSelected: false,
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

    dispatch({
      type: 'membershipManagement/getDetail',
      payload: params.salesId,
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
    const { form, location: { query } } = this.props;
    const params = {
      salesId: query.salesId,
    };
    form.resetFields();

    this.setState({
      queryForm: {},
    });

    this.pushQueryToUrl(stringifyQuery(params));

    this.loadData(params);
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
        this.setState({
          hasSelected: false,
        });
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

  // 渲染基本信息
  renderBaseInfo() {
    const { membershipManagement: { detail } } = this.props;
    const rowGutter = { xs: 8, sm: 16, md: 16, lg: 24 };
    const colSpan = { xs: 24, sm: 8, md: 8, lg: 8 };
    const members = detail.memberInfo && detail.memberInfo.filter(member => (
      member.isMember === 0 &&
      moment(member.createdAt).startOf('day').valueOf() === moment().startOf('day').valueOf()
    )) || [];
    return <>
      <Card style={{marginBottom: '20px'}} bordered={false} bodyStyle={{padding: '10px 0'}}>
        <Row gutter={rowGutter}>
          <Col {...colSpan}>
            <Card>
              <Statistic
                title="会籍顾问"
                value={detail.username}
              />
            </Card>
          </Col>
          <Col {...colSpan}>
            <Card>
              <Statistic
                title="会籍ID"
                value={detail.id}
              />
            </Card>
          </Col>
          <Col {...colSpan}>
            <Card>
              <Statistic
                title="今日新增潜在客户"
                value={members.length}
                valueStyle={{ color: '#3f8600' }}
                prefix={<Icon type="arrow-up" />}
                suffix="人"
              />
            </Card>
          </Col>
        </Row>
      </Card>  
    </>
  }

  // 操作
  renderOperation() {
    const { submitting } = this.props;
    const { hasSelected, selectedRowKeys } = this.state;
    return <Fragment>
      <Row type="flex" justify="space-between" style={{marginBottom: '20px'}}>
        <Col>
          <Input.Search 
            style={{width:'200px'}} 
            disabled={!hasSelected} 
            enterButton={<Button type="primary" loading={submitting} disabled={!hasSelected}>一键转移</Button>}  
            onSearch={(val) => {
              this.handleUpdateSalesBatch(val, selectedRowKeys);
            }}
            allowClear
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
    const { form } = this.props;
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
            <FormItem label="手机号" {...formItemLayout}>
            {getFieldDecorator('f_Phone', {
              initialValue: queryForm.f_Phone,
            })(
              <Input placeholder="请输入手机号" allowClear />
            )}
            </FormItem>
          </Col>
        </Row>
        {this.renderOperation()}
      </Form>
    </Fragment>
  }

  render() {
    const { potentialClient: { list, total }, location: { query }, loading } = this.props;
    const { selectedRowKeys } = this.state;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      current: query.pageNo && parseInt(query.pageNo, 10),
      pageSize: query.pageSize && parseInt(query.pageSize, 10),
      total: total,
      showTotal: () => `共${total}条记录`
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys) => {
        const selectFlag = selectedRowKeys.length > 0 ? true : false;
        this.setState({ 
          selectedRowKeys,
          hasSelected: selectFlag,
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
          <Popconfirm title="确认删除?删除后无法恢复" onConfirm={() => {this.handleDelete(record.id)}}>
            <Button type="danger" size="small">删除</Button>
          </Popconfirm>
        </Fragment>
      }
    }];
    return (
      <Card bordered={false}>
        {this.renderBaseInfo()}
        <Divider />
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