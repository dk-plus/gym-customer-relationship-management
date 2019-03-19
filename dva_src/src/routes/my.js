import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import { Card, Table, Button, Divider, Tag, Popconfirm, Form, message, Row, Col, Input, Select, DatePicker } from 'antd';
import moment from 'moment';
import { ONLINE_STATUS } from '../utils/enum';
import { getParentPath, getUser } from '../utils/utils';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;

/**
 * model user
 * getDetail
 * create
 * update
 */
class Edit extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, location: { query } } = this.props;

    const userInfo = getUser();

    this.loadData(userInfo);
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/initState',
    });
  }

  // 加载数据
  loadData(params) {
    const { dispatch } = this.props;

    if (!params.id) {
      return;
    }

    dispatch({
      type: 'user/getDetail',
      payload: params.id
    });
  }

  // 返回上一层
  backToUrl() {
    const { location, dispatch } = this.props;
    let pathname = getParentPath(location);

    dispatch(routerRedux.push({ pathname }));
  }

  // 提交
  handleSubmit = (e) => {
    e && e.preventDefault();

    const { dispatch, form, location: { query } } = this.props;

    form.validateFieldsAndScroll((err, formValue) => {
      if (err) {
        message.warn('表单校验不通过');
        return;
      }

      const params = {
        ...formValue,
      }

      let url = 'user/create';

      if (query.id) {
        url = 'user/update';
      }

      dispatch({
        type: url,
        payload: {
          id: query.id || '',
          params
        }
      }).then(res => {
        if (res.returnCode === '0') {
          message.success('保存成功');
          this.backToUrl();
        }
      });
    });
  }

  renderForm() {
    const { user: { detail }, location: { pathname }, form, editLoading } = this.props;
    const { getFieldDecorator } = form;
    const rowGutter = { xs: 8, sm: 16, md: 16, lg: 24 };
    const colSpan = { xs: 24, sm: 12, md: 8, lg: 8 };
    return <Fragment>
      <Form onSubmit={this.handleSubmit}>
        <Card title="基本信息">
          <Form.Item label="用户名">
            {getFieldDecorator('name', {
              rules: [{
                required: true,
                message: '请输入用户名',
              }],
              initialValue: detail.username,
            })(
              <Input placeholder="请输入用户名" />
            )}
          </Form.Item>
          <Form.Item label="手机号">
            {getFieldDecorator('name', {
              rules: [{
                required: true,
                message: '请输入手机号',
              }],
              initialValue: detail.phone,
            })(
              <Input placeholder="请输入手机号" />
            )}
          </Form.Item>
          <Form.Item label="出生日期">
            {getFieldDecorator('name', {
              initialValue: detail.bornTime,
            })(
              <Input placeholder="请输入出生日期" />
            )}
          </Form.Item>
          <Form.Item label="描述">
            {getFieldDecorator('description', {
              initialValue: detail.description,
            })(
              <TextArea placeholder="请输入活动描述" rows={4} />
            )}
          </Form.Item>
        </Card>
        <Row type="flex" justify="end" style={{ marginTop: '20px' }}>
          <Col>
            <Button type="primary" htmlType="submit" loading={editLoading}>提交</Button>
            <Divider type="vertical" />
            <Button onClick={() => { this.backToUrl() }}>取消</Button>
          </Col>
        </Row>
      </Form>
    </Fragment>
  }

  render() {
    const { user: { detail }, location: { pathname }, loading } = this.props;
    return (
      <Card bordered={false} bodyStyle={{ padding: 0 }} loading={loading}>
        {this.renderForm()}
      </Card>
    )
  }
}

function mapStateToProps({ user, loading }) {
  return {
    user,
    loading: loading.effects['user/getDetail'],
    editLoading: loading.effects['user/update'],
  }
}

export default Form.create()(connect(mapStateToProps)(Edit));