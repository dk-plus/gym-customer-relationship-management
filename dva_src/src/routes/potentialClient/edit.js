import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import { Card, Table, Button, Divider, Tag, Popconfirm, Form, message, Row, Col, Input, Select, DatePicker } from 'antd';
import moment from 'moment';
import { SEX } from '../../utils/enum';
import { getParentPath } from '../../utils/utils';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;

/**
 * model potentialClient
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

    if (!params.id) {
      return;
    }

    dispatch({
      type: 'potentialClient/getDetail',
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

      let url = 'potentialClient/create';

      if (query.id) {
        url = 'potentialClient/update';
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
        } else {
          message.error(`保存失败！${res.errorMessage}`);
        }
      });
    });
  }

  renderForm() {
    const { potentialClient: { detail }, location: { pathname }, form, editLoading } = this.props;
    const { getFieldDecorator } = form;
    const rowGutter = { xs: 8, sm: 16, md: 16, lg: 24 };
    const colSpan = { xs: 24, sm: 12, md: 8, lg: 8 };
    return <Fragment>
      <Form onSubmit={this.handleSubmit}>
        <Card title="客户信息">
          <Form.Item label="客户姓名">
            {getFieldDecorator('username', {
              rules: [{
                required: true,
                message: '请输入客户姓名',
              }],
              initialValue: detail.username,
            })(
              <Input placeholder="请输入客户姓名" />
            )}
          </Form.Item>
          <Form.Item label="性别">
            {getFieldDecorator('sex', {
              initialValue: detail.sex,
            })(
              <Select placeholder="请选择性别" allowClear>
                <Option key={SEX.UNKNOWN} value={SEX.UNKNOWN}>未知</Option>
                <Option key={SEX.MALE} value={SEX.MALE}>男</Option>
                <Option key={SEX.FEMALE} value={SEX.FEMALE}>女</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="手机号">
            {getFieldDecorator('phone', {
              rules: [{
                required: true,
                message: '请输入手机号',
              }],
              initialValue: detail.phone,
            })(
              <Input placeholder="请输入手机号" />
            )}
          </Form.Item>
          <Form.Item label="会籍顾问">
            {getFieldDecorator('salesId', {
              initialValue: detail.salesId,
            })(
              <Select placeholder="请选择会籍顾问" allowClear>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="年龄">
            {getFieldDecorator('age', {
              initialValue: detail.age,
            })(
              <Input placeholder="请输入年龄" />
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
    const { potentialClient: { detail }, location: { pathname }, loading } = this.props;
    return (
      <Card bordered={false} bodyStyle={{ padding: 0 }} loading={loading}>
        {this.renderForm()}
      </Card>
    )
  }
}

function mapStateToProps({ potentialClient, loading }) {
  return {
    potentialClient,
    loading: loading.effects['potentialClient/getDetail'],
    editLoading: loading.effects['potentialClient/update'],
  }
}

export default Form.create()(connect(mapStateToProps)(Edit));