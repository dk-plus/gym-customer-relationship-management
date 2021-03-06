import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import { Card, Table, Button, Divider, Tag, Popconfirm, Form, message, Row, Col, Input, Select, DatePicker } from 'antd';
import moment from 'moment';
import { ROLE } from '../../utils/enum';
import { getParentPath } from '../../utils/utils';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;

/**
 * model accountManagement
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
      type: 'accountManagement/initState',
    });
  }

  // 加载数据
  loadData(params) {
    const { dispatch } = this.props;

    if (!params.id) {
      return;
    }

    dispatch({
      type: 'accountManagement/getDetail',
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

      let url = 'accountManagement/create';

      if (query.hasRoleId) {
        url = 'accountManagement/update';
      }
      if (!query.hasRoleId) {
        params.uid = query.id;
      }

      dispatch({
        type: url,
        payload: {
          id: query.hasRoleId ||'',
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
    const { accountManagement: { detail }, location: { pathname }, form, editLoading } = this.props;
    const { getFieldDecorator } = form;
    const rowGutter = { xs: 8, sm: 16, md: 16, lg: 24 };
    const colSpan = { xs: 24, sm: 12, md: 8, lg: 8 };

    const roleId = detail.roles && detail.roles.map(role => role.roleId).join('，')
    return <Fragment>
      <Form onSubmit={this.handleSubmit}>
        <Card title={`用户名：${detail.username}`} extra={`用户ID：${detail.id}`}>
          <Form.Item label="角色">
            {getFieldDecorator('roleId', {
              initialValue: roleId,
            })(
              <Select placeholder="请选择角色" allowClear>
                <Option key={ROLE.MANAGER}>管理员</Option>
                <Option key={ROLE.COACH}>教练</Option>
                <Option key={ROLE.SALES}>会籍顾问</Option>
                <Option key={ROLE.MEMBER}>会员</Option>
              </Select>
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
    const { accountManagement: { detail }, location: { pathname }, loading } = this.props;
    return (
      <Card bordered={false} bodyStyle={{ padding: 0 }} loading={loading}>
        {this.renderForm()}
      </Card>
    )
  }
}

function mapStateToProps({ accountManagement, loading }) {
  return {
    accountManagement,
    loading: loading.effects['accountManagement/getDetail'],
    editLoading: loading.effects['accountManagement/update'],
  }
}

export default Form.create()(connect(mapStateToProps)(Edit));