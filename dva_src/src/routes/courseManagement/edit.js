import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import { Card, Table, Button, Divider, Tag, Popconfirm, Form, message, Row, Col, Input, Select, DatePicker } from 'antd';
import moment from 'moment';
import {  } from '../../utils/enum';
import { getParentPath } from '../../utils/utils';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;

/**
 * model courseManagement
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
      type: 'courseManagement/initState',
    });
  }

  // 加载数据
  loadData(params) {
    const { dispatch } = this.props;

    dispatch({
      type: 'coachManagement/fetch',
      payload: {
        params: {
          pageNo: 1,
          pageSize: 999,
        }
      }
    });
    
    if (!params.id) {
      return;
    }

    dispatch({
      type: 'courseManagement/getDetail',
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

      let url = 'courseManagement/create';

      if (query.id) {
        url = 'courseManagement/update';
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
    const { courseManagement: { detail }, location: { pathname }, form, editLoading } = this.props;
    const { getFieldDecorator } = form;
    const rowGutter = { xs: 8, sm: 16, md: 16, lg: 24 };
    const colSpan = { xs: 24, sm: 12, md: 8, lg: 8 };
    return <Fragment>
      <Form onSubmit={this.handleSubmit}>
        <Card title="基本信息">
          <Form.Item label="课程名称">
            {getFieldDecorator('name', {
              rules: [{
                required: true,
                message: '请输入课程名称',
              }],
              initialValue: detail.name,
            })(
              <Input placeholder="请输入课程名称" />
            )}
          </Form.Item>
          <Form.Item label="教练">
            {getFieldDecorator('coachId', {
              rules: [{
                required: true,
                message: '请输入课程名称',
              }],
              initialValue: detail.coachId,
            })(
              <Select placeholder="请选择教练" allowClear>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="描述">
            {getFieldDecorator('description', {
              initialValue: detail.description,
            })(
              <TextArea placeholder="请输入课程描述" rows={4} />
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
    const { courseManagement: { detail }, location: { pathname }, loading } = this.props;
    return (
      <Card bordered={false} bodyStyle={{ padding: 0 }} loading={loading}>
        {this.renderForm()}
      </Card>
    )
  }
}

function mapStateToProps({ courseManagement, loading }) {
  return {
    courseManagement,
    loading: loading.effects['courseManagement/getDetail'],
    editLoading: loading.effects['courseManagement/update'],
  }
}

export default Form.create()(connect(mapStateToProps)(Edit));