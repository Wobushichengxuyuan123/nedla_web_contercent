import React from "react";
import { Input, Form, message, Switch, Select } from 'antd';
import './index.scss'
const FormItem = Form.Item;
var that = null;

class Addpoint extends React.Component {
    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            readonly: false,
            quyuList: [],
            locationAreaId_Name: '',
            projectName: sessionStorage.getItem('projectName')
        };
        that = this;

    }
    componentDidMount() {

        if (this.props.viewId) {
            this.getDataById(this.props.viewId);
        } else {
            this.formRef.current.resetFields()
        }

        this.quyu()
        this.update()
    }
    componentWillReceiveProps(nextProps) {

        if (nextProps.viewId != this.props.viewId) {
            this.getDataById(nextProps.viewId);
        }
    }
    quyu() {
        fetch(window.SYSTEM_CONFIG_BASICS + "/pubLocationArea/listQueryAll", {
            method: "Post",
            body: JSON.stringify({
                projectId: sessionStorage.getItem('projectId')
            })
        })
            .then(r => r.json())
            .then(b => {
                this.setState({
                    quyuList: b.data
                })
            })
    }
    update() {
        window.WebLonLatpoints = (data) => {
            let list = JSON.parse(data)
            this.formRef.current.setFieldsValue({
                "xcoordinate": list.Lon,
                "ycoordinate": list.Lat,
                "zcoordinate": list.Hei
            });

        }
    }
    getDataById(id) {
        fetch(window.SYSTEM_CONFIG_BASICS + "/pubPointPosition/getDataById?id=" + id, {
            method: "get",
        })
            .then(r => r.json())
            .then(b => {
                if (b.data) {
                    let data = b.data;
                    data.status = data.status == 1 ? true : false
                    this.formRef.current.setFieldsValue(data);
                }
            })
    }
    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <div className="addDepartment">
                <Form ref={this.formRef}  >
                    <FormItem {...formItemLayout} label="????????????" name='pointName' rules={[{ required: true, message: '????????????????????????' }, { max: 50, message: '??????????????????' }]}>
                        <Input disabled={this.state.readonly} placeholder="????????????" className="search_ipt01" />
                    </FormItem>
                    <FormItem {...formItemLayout} label="????????????" name='pointCode'
                        rules={[
                            { required: true, message: '????????????????????????' }, { max: 30, message: '??????????????????' },
                            { pattern: /^(?!_)(?!.*?_$)[a-zA-Z0-9_]+$/, message: '???????????????????????????????????????????????? ?????????_???????????????' }
                        ]}>
                        <Input disabled={this.state.readonly} placeholder="????????????" className="search_ipt01" />
                    </FormItem>
                    <FormItem {...formItemLayout} label="????????????" name='projectName' initialValue={this.state.projectName} rules={[{ required: true, message: '????????????????????????' }]}>
                        <Input disabled={true} placeholder="?????????????????????" className="search_ipt01" />
                    </FormItem>
                    <FormItem {...formItemLayout} label="????????????" name='projectId' rules={[{ required: true, message: '????????????????????????' }]} style={{ display: 'none' }}>
                        <Input disabled={true} placeholder="?????????????????????" className="search_ipt01" />
                    </FormItem>
                    <FormItem {...formItemLayout} label="????????????" name='locationAreaId' initialValue={this.state.locationAreaId_Name} rules={[{ required: false, message: '??????????????????' }]} >
                        <Select placeholder="?????????????????????" disabled={this.state.readonly} className="search_ipt01">
                            {this.state.quyuList.map((item, index) => {
                                return <Select.Option key={index} value={item.id}>{item.locationAreaName}</Select.Option>
                            })}
                        </Select>
                    </FormItem>
                    <FormItem
                        {...formItemLayout} label="X??????" name='xcoordinate'
                        rules={[{ required: false, message: '?????????X?????????' }, { pattern: /^-?[0-9]{1,10}([.][0-9]{1,10})?$/, message: '??????????????????X??????' }]}>
                        <Input disabled={this.state.readonly} placeholder="X??????" className="search_ipt01" />
                    </FormItem>
                    <FormItem {...formItemLayout} label="Y??????" name='ycoordinate'
                        rules={[{ required: false, message: '?????????Y?????????' }, { pattern: /^-?[0-9]{1,10}([.][0-9]{1,10})?$/, message: '??????????????????Y??????' }]}>
                        <Input disabled={this.state.readonly} placeholder="Y??????" className="search_ipt01" />
                    </FormItem>
                    <FormItem {...formItemLayout} label="Z??????" name='zcoordinate'
                        rules={[{ required: false, message: '?????????Z?????????' }, { pattern: /^-?[0-9]{1,10}([.][0-9]{1,10})?$/, message: '??????????????????Z??????' }]}>
                        <Input disabled={this.state.readonly} placeholder="Z??????" className="search_ipt01" />
                    </FormItem>
                    <FormItem {...formItemLayout} label="??????" name='description' rules={[{ required: false, message: '??????????????????' }, { max: 200, message: '??????????????????' }]}>
                        <Input.TextArea disabled={this.state.readonly} placeholder="??????" rows={4} className="search_ipt01" />
                    </FormItem>
                    <FormItem {...formItemLayout} label="??????/??????" name='status' initialValue={true} rules={[{ required: true, message: '??????????????????' }]}>
                        <Switch checkedChildren="??????" unCheckedChildren="??????" disabled={this.state.readonly} />
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default Addpoint;
