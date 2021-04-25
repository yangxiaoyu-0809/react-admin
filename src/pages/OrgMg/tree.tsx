import { Tree, Input } from 'antd';
import React, { useState, useRef } from 'react';
import './tree.less'

const { Search } = Input;
const x = 3;
const y = 2;
const z = 1;
const gData = []
const gData1 = [{
    title: 'parent 1',
    key: '0-0',
    children: [
        {
            title: 'parent 1-0',
            key: '0-0-0',
            children: [
                {
                    title: 'leaf',
                    key: '0-0-0-0',
                },
                {
                    title: 'leaf',
                    key: '0-0-0-1',
                },
            ],
        },
        {
            title: 'parent 1-1',
            key: '0-0-1',
            children: [
                {
                    title: 'sss',
                    key: '0-0-1-0'
                }
            ],
        },
    ],
}];

const generateData = (_level, _preKey, _tns) => {
    const preKey = _preKey || '0';
    const tns = _tns || gData;

    const children = [];
    for (let i = 0; i < x; i++) {
        const key = `${preKey}-${i}`;
        tns.push({ title: key, key });
        if (i < y) {
            children.push(key);
        }
    }
    if (_level < 0) {
        return tns;
    }
    const level = _level - 1;
    children.forEach((key, index) => {
        tns[index].children = [];
        return generateData(level, key, tns[index].children);
    });
};
generateData(z);

const dataList = [];
const generateList = data => {
    for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const { key } = node;
        dataList.push({ key, title: key });
        if (node.children) {
            generateList(node.children);
        }
    }
};
generateList(gData);

const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some(item => item.key === key)) {
                parentKey = node.key;
            } else if (getParentKey(key, node.children)) {
                parentKey = getParentKey(key, node.children);
            }
        }
    }
    return parentKey;
};

export default class SearchTree extends React.Component {
    state = {
        expandedKeys: [],
        searchValue: '',
        autoExpandParent: true,
    };

    onExpand = expandedKeys => {
        this.setState({
            expandedKeys,
            autoExpandParent: true,
        });
    };

    onChange = e => {
        const { value } = e.target;
        const expandedKeys = dataList
            .map(item => {
                if (item.title.indexOf(value) > -1) {
                    return getParentKey(item.key, gData);
                }
                return null;
            })
            .filter((item, i, self) => item && self.indexOf(item) === i);
        this.setState({
            expandedKeys,
            searchValue: value,
            autoExpandParent: true,
        });
    };

    render() {
        const { searchValue, expandedKeys, autoExpandParent } = this.state;
        return (
            <div>
                <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
                <Tree
                    onExpand={this.onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    // treeData={loop(gData)}
                    treeData={gData1}
                />
            </div>
        );
    }
}