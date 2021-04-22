import { Row,Col } from 'antd';
import React, { useState, useRef } from 'react';
import Style from './tree.less'

const OrgMg: React.FC = () => {
    return (
        <>
            <Row>
                <Col className={Style.leftCon} span={9}>左侧</Col>
                <Col className={Style.rightCon} span={15}>右侧</Col>
            </Row>
        </>
    );
};

export default OrgMg;
