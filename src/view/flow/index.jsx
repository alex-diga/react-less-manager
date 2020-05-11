import React from 'react';
import { Link } from 'react-router-dom'
import './index.less';

function Flow() {
  return (
    <div className="Flow">
      flow流量 统计 页面 
      <Link to="/page/flower/detail">
        去详情页面
      </Link>
    </div>
  );
}

export default Flow;
