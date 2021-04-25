import { Row,Col } from 'antd';
import React, { useState, useRef } from 'react';
import TreeModule from './tree';
import Style from './tree.less'

const OrgMg: React.FC = () => {
    return (
        <>
            <Row>
                <Col className={Style.leftCon} span={10}>
                    <TreeModule>

                    </TreeModule>
                </Col>
                <Col className={Style.rightCon} span={14}>右侧</Col>
            </Row>
        </>
    );
};

export default OrgMg;
