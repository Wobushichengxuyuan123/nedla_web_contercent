import React, { Component } from 'react'
import { Table } from 'antd';
import './style.css'
class Renyuanmenjin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableList: this.props.tableList,
            timer: null,
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.tableList != nextProps.tableList) {
            this.setState({
                tableList: nextProps.tableList
            }, () => {
                this.InitialScroll(this.state.tableList)
            })
        }
    }
    InitialScroll(data) {
        let v = document.getElementsByClassName("ant-table-body")[0];
        if (data.length > 10) {
            let time = setInterval(() => {
                v.scrollTop += 1.2;
                if (Math.ceil(v.scrollTop) >= parseFloat(v.scrollHeight - v.clientHeight)) {
                    v.scrollTop = 0
                    // setTimeout(() => { v.scrollTop = 0 }, 1000)
                }
            }, 100)
            this.setState({
                timer: time
            })
            clearInterval(this.state.timer)
        }
    }
    acc(data) {
        this.props.isalert(data)
    }
    render() {
        const { timer, tableList } = this.state;
        const columns = [
            {
                title: '门禁',
                dataIndex: 'locationAreaName',
                key: 'locationAreaName',
                width: 120,
                align: 'center',
                className: 'beijing'
            },
            {
                title: '人员',
                dataIndex: 'personName',
                key: 'personName',
                width: 120,
                align: 'center'
            },
            {
                title: '所属单位',
                dataIndex: 'deptName',
                key: 'deptName',
                width: 180,
                align: 'center'

            },
            // {
            //     title: '编号',
            //     dataIndex: 'personCode',
            //     key: 'personCode',
            //     width: 120,
            //     align: 'center'
            // },
            // {
            //     title: '职务',
            //     dataIndex: 'postName',
            //     key: 'postName',
            //     width: 80,
            //     align: 'center'
            // },
            {
                title: '进/出',
                dataIndex: 'state',
                key: 'state',
                width: 80,
                align: 'center'
            },
            {
                title: '时间（入/出）',
                dataIndex: 'time',
                key: 'time',
                width: 160,
                align: 'center'
            },
            {
                title: '联系方式',
                dataIndex: 'mobile_phone',
                key: 'mobile_phone',
                width: 120,
                align: 'center'
            }
        ];
        return (
            <div className='container' >
                <div className='overall'>
                    <div className='table' onMouseEnter={() => {
                        if (timer) clearTimeout(timer);  // 如果之前有定时器 先把之前的定时器取消
                        clearInterval(timer)
                    }} onMouseLeave={() => {
                        if (timer) clearTimeout(timer);  // 如果之前有定时器 先把之前的定时器取消
                        this.InitialScroll(tableList)
                    }} >
                        <Table
                        className='WH'
                            id="cyclicScroll"
                            scroll={{ y: 400 }}
                            dataSource={tableList}
                            columns={columns}
                            pagination={false}
                            rowClassName={(record, index) => index % 2 === 0 ? 'oddNumber' : 'evenNumbers'}
                            onRow={record => {
                                return {
                                    onClick: event => { this.acc(record) }, // 点击行     
                                }
                            }
                            }
                        />
                    </div>
                </div>
            </div >
        )
    }

}
export default Renyuanmenjin

