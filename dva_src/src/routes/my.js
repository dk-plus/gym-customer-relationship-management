import React, { Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Card, Button, Divider, Form, message, Row, Col, Input } from 'antd';
import { getParentPath, getUser } from '../utils/utils';

const { TextArea } = Input;

/**
 * model user
 * getDetail
 * create
 * update
 */

const userInfo = getUser();

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
    }
  }

  componentDidMount() {
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

    const { dispatch, form} = this.props;

    form.validateFieldsAndScroll((err, formValue) => {
      if (err) {
        message.warn('表单校验不通过');
        return;
      }

      const params = {
        ...formValue,
      };

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
          this.loadData(userInfo);
          this.setState({
            editMode: false,
          })
        }
      });
    });
  }

  renderText() {
    const { user: { detail }} = this.props;
    return <Card title="基本信息" extra={<Button type="dashed" size="small" onClick={() => {this.setState({editMode: true})}}>编辑</Button>}>
      <Form.Item label="用户名">
      {detail.username}
      </Form.Item>
      <Form.Item label="手机号">
      {detail.phone}
      </Form.Item>
      <Form.Item label="描述">
      {detail.description}
      </Form.Item>
    </Card>
  }

  renderForm() {
    const { user: { detail }, form, editLoading } = this.props;
    const { getFieldDecorator } = form;
    return <Fragment>
      <Form onSubmit={this.handleSubmit}>
        <Card title="基本信息">
          <Form.Item label="用户名">
            {getFieldDecorator('username', {
              rules: [{
                required: true,
                message: '请输入用户名',
              }],
              initialValue: detail.username,
            })(
              <Input placeholder="请输入用户名" allowClear />
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
              <Input placeholder="请输入手机号" allowClear />
            )}
          </Form.Item>
          <Form.Item label="描述">
            {getFieldDecorator('description', {
              initialValue: detail.description,
            })(
              <TextArea placeholder="请输入描述" rows={4} />
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
    const { loading } = this.props;
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