import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';

function IndexPage(props) {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>欢迎登陆健身房企业内部管理系统！</h1>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
