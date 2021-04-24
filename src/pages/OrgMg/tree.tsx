import {Button, Input, Switch} from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import React, { useState, useRef } from 'react';

import Style from './tree.less'

const { Search } = Input;

const onSearch = value => console.log(value);
const Tree: React.FC = () => {
    return (
        <>
            <span>显示被注销的组织</span>
            <Switch
                checkedChildren={<CheckOutlined/>}
                unCheckedChildren={<CloseOutlined/>}
                defaultChecked
            />
            <span>隐藏被注销的组织</span>

            <span>|</span>
            <Button type="primary">展开所有组织</Button>

            <Search
                placeholder="input search text"
                allowClear
                enterButton="查询"
                size="large"
                onSearch={onSearch}
            />

        </>
    );
};

export default Tree;
