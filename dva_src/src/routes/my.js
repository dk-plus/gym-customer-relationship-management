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
    this.state = {
      editMode: false,
    }
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

    const userInfo = getUser();
    form.validateFieldsAndScroll((err, formValue) => {
      if (err) {
        message.warn('表单校验不通过');
        return;
      }

      const params = {
        ...formValue,
      };
      params.bornTime = params.bornTime.startOf('day').valueOf();

      let url = 'user/create';

      if (userInfo.id) {
        url = 'user/update';
      }

      dispatch({
        type: url,
        payload: {
          id: userInfo.id || '',
          params
        }
      }).then(res => {
        if (res.returnCode === '0') {
          message.success('保存成功');
          this.setState({
            editMode: false,
          })
        }
      });
    });
  }

  renderText() {
    const { user: { detail }, location: { pathname }, form, editLoading } = this.props;
    return <Card title="基本信息" extra={<Button type="dashed" size="small" onClick={() => {this.setState({editMode: true})}}>编辑</Button>}>
      <Form.Item label="用户名">
      {detail.username}
      </Form.Item>
      <Form.Item label="手机号">
      {detail.phone}
      </Form.Item>
      <Form.Item label="出生日期">
      {moment(detail.bornTime).format('YYYY-MM-DD')}
      </Form.Item>
      <Form.Item label="描述">
      {detail.description}
      </Form.Item>
    </Card>
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
          <Form.Item label="出生日期">
            {getFieldDecorator('bornTime', {
              initialValue: detail.bornTime && moment(detail.bornTime),
            })(
              <DatePicker placeholder="请输入出生日期" />
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
            <Button onClick={() => { this.setState({editMode: false}) }}>取消</Button>
          </Col>
        </Row>
      </Form>
    </Fragment>
  }

  render() {
    const { user: { detail }, location: { pathname }, loading } = this.props;
    const { editMode } = this.state;
    return (
      <Card bordered={false} bodyStyle={{ padding: 0 }} loading={loading}>
        {
          editMode &&
          this.renderForm() ||
          this.renderText()
        }
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