import React from 'react';
import { connect } from 'dva';

const footer= {
    background: '#2A3543',
    color: '#FFF',
    clear: 'both',
    height: '120px',
    paddingTop: '36px'

}
const content = {
    fontSize: '12px',
    color: '#B0BBCA',
    textAlign: 'center',
    lineheight: '24px'
}
function Footer() {
  return (
    <div style={footer}>
        <p style={content}>Copyright © 2019 新道科技股份有限公司  琼ICP备11002248号-3</p>
        <p style={content}>北京市海淀区北清路68号用友软件园　 三亚地址: 海南省三亚市崖城镇创意产业园内</p>
    </div>
  );
}

Footer.propTypes = {
};

export default connect()(Footer);
