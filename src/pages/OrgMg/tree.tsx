import {Tree, Input, Col, Row, Button} from 'antd';
import React from 'react';
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

//将树所有数据去掉层级，放入dataList数组中
const dataList = [];
const generateList = data => {
    for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const { key ,title} = node;
        dataList.push({ key, title: title });
        if (node.children) {
            generateList(node.children);
        }
    }
};
generateList(gData1);
//获取父节点的key，用于展开父级节点
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
        show:true
    };

    onExpand = expandedKeys => {
        this.setState({
            expandedKeys,
            autoExpandParent: true,
        });
    };

    onChange = e => {
        const { value } = e.target;
        console.log('dataList',dataList)
        const expandedKeys = dataList
            .map(item => {
                if (item.title.indexOf(value) > -1) {
                    return getParentKey(item.key, gData1);
                }
                return null;
            })
            .filter((item, i, self) => item && self.indexOf(item) === i);
        console.log('expandedKeys',expandedKeys)
        this.setState({
            expandedKeys,
            searchValue: value,
            autoExpandParent: true,
        });
    };
    clicked(param,event){
        let show = this.state.show
        this.setState({
            show: !show
        });
        console.log(param) //hello world
        console.log(event.target.value) //按钮
    };
    render() {
        const { searchValue, expandedKeys, autoExpandParent } = this.state;
        const loop = data =>
            data.map(item => {
                const index = item.title.indexOf(searchValue);
                const beforeStr = item.title.substr(0, index);
                const afterStr = item.title.substr(index + searchValue.length);
                const title =
                    index > -1 ? (
                        <span>
                            {beforeStr}
                            <span className="site-tree-search-value">{searchValue}</span>
                            {afterStr}
                        </span>
                    ) : (
                        <span>{item.title}</span>
                    );
                if (item.children) {
                    return { title, key: item.key, children: loop(item.children) };
                }

                return {
                    title,
                    key: item.key,
                };
            });
        return (
            <div>
                <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
                <Tree
                    onExpand={this.onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    treeData={loop(gData1)}
                />
                {/*树操作菜单区域*/}
                <div className={`treeOperation ${this.state.show ? 'show' : 'hide'}`}>
                    <Row>
                        <Col span={3}>组织管理</Col>
                        {this.state.show ? (
                            <Col style={{backgroundColor: '#999'}} span={18} className={``}>中间按钮区域</Col>
                        ) : null}
                        <Col span={2}>
                            <Button onClick={this.clicked.bind(this,"hello world")}>收起</Button>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
