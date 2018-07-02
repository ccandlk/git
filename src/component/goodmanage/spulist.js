import React from 'react';
import { Form, Select, Checkbox, Radio, Table, message, DatePicker, Row, Col, Tooltip } from 'antd';
// import { Link } from 'react-router';
import moment from 'moment';
import Mock from 'mockjs';
import mockData from '../../mock/statistics';
import cityList from '../../mock/cityList';
import reqwest from 'reqwest';
// import dataSource from '../../mock/';

// import Utils from '@lib/util';
// import { remove } from 'lodash/array'
// import './list.less';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const { RangePicker } = DatePicker;

const dataSource = [{
  key: '1',
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号'
}, {
  key: '2',
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号'
}];

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '住址',
  dataIndex: 'address',
  key: 'address',
}];

// const optionProvinceList = [
//   {'id': 1, 'name': '江苏'},
//   {'id': 2, 'name': '浙江'},
//   {'id': 3, 'name': '北京'},
//   {'id': 4, 'name': '苏州'},
//   {'id': 5, 'name': '无锡'},
//   {'id': 6, 'name': '杭州'},
// ];

// const optionCityList = [
//   {'id': 1, 'name': '南京'},
//   {'id': 2, 'name': '上海'},
//   {'id': 3, 'name': '北京'},
//   {'id': 4, 'name': '苏州'},
//   {'id': 5, 'name': '无锡'},
//   {'id': 6, 'name': '杭州'},
// ];

const catogaryList = ["全部", "美食（全部）", "美食代订座", "美食代金券", "美食套餐", "团购美食", "门票", "休闲娱乐", "演出赛事", "一日游"];
const timeRangeType = ['昨日', '近1个自然周', '近1个自然月', '自定义'];
const starsList = ["全部", "五星", "四星半", "四星", "三星半", "三星", "二星", "无星"];

export default class Statistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        provinceList: [],
        cityList: [],
        timeRange: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        province: '',
        city: '',
        catogary: '',
        star: ''
      }
    };
  }

  componentDidMount() {
    this.mockData();
    reqwest({
      url: '../../mock/dataSource.js',
      method: 'get',
      type: 'json',
      crossOrigin: true,
      withCredentials: true
    }).then(res => {
      console.log(res);
    });
  }
  

  changeStringtoArr(val) {
    const starList = [];
    val.map((item) => {
      starList.push({
        label: item,
        value: item 
      });
    });
    return starList;
  }

  handleOption(val) {
    const optionList = val.map((item) => {
      return (
        <Option key={item.id} value={JSON.stringify(item)}>{item.name}</Option>
      )
    });
    return optionList;
  }

  handleRadio(val) {
    const radioList = val.map((item) => {
      return (
        <Radio key={item} value={item}>{item}</Radio>
      )
    });
    return radioList;
  }

  handleChange(v, stateKey) {
    const { formData } = this.state;
    if(stateKey === 'star') {
      if (v.indexOf('全部') === -1 && v.length === starsList.length - 1 && formData[stateKey].indexOf('全部') === -1) {
        formData[stateKey] = starsList;
      } else if (v.indexOf('全部') !== -1 && v.length === starsList.length - 1) {
        formData[stateKey] = v.filter(item => item!== '全部');
      } else if (v.indexOf('全部') !== -1 && formData[stateKey].indexOf('全部') === -1) {
        formData[stateKey] = starsList;
      } else if (v.indexOf('全部') === -1 && v.length === starsList.length - 1 && formData[stateKey].indexOf('全部') !== -1) {
        formData[stateKey] = [];
      } else {
        formData[stateKey] = v;
      }
    } else if (stateKey === 'province') {
      const val = JSON.parse(v);
      formData[stateKey] = val.name;
    } else if (stateKey === 'timeRange') {
     formData[stateKey] = [v[0], v[1]];
    } else {
      formData[stateKey] = v.target.value;
    }
    this.setState({
      formData
    });
  }

  mockData() {
    const { formData } = this.state;
    if (mockData.response.code === 200) {
      formData.provinceList = mockData.response.data;
       this.setState(
         formData
       );
    }
    if (cityList.response.code === 200) {
      formData.cityList = cityList.response.data;
       this.setState(
         formData
       );
    }
  }

  render() {
    const { formData } = this.state;
    const OptionProvinceList = this.handleOption(formData.provinceList);
    const OptionCityList = this.handleOption(formData.cityList);
    const starList = this.changeStringtoArr(starsList);

    return (
      <div>
        <div>
          <Form layout="inline">
            <Row>
              <Col span='10'>
                <FormItem label='地区'>
                  <Select placeholder="请选择" 
                    style={{ width: '300px' }} 
                    value={formData.province}
                    onChange={(e) => this.handleChange(e, 'province')}>
                    {OptionProvinceList}
                  </Select>
                </FormItem>
              </Col>
              <Col span='10'>
                <FormItem label='城市'>
                  <Select placeholder="请选择" style={{ width: '300px' }} value={formData.city}>
                    {OptionCityList}
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <FormItem label='分类'>
                <RadioGroup value={formData.catogary} onChange={(e) => this.handleChange(e, 'catogary')}>
                  {this.handleRadio(catogaryList)}
                </RadioGroup>
              </FormItem>
            </Row>
            <Row>
              <FormItem label='星级'>
                <CheckboxGroup value={formData.star} options={starList} 
                  onChange={(e) => this.handleChange(e, 'star')}>
                </CheckboxGroup>
              </FormItem>
            </Row>
            <Row>
              <FormItem label='时间'>
                <RadioGroup>
                {this.handleRadio(timeRangeType)}
                </RadioGroup>
                <RangePicker value={formData.timeRange} onChange={(e) => {this.handleChange(e, 'timeRange')}}/>
              </FormItem>
            </Row>
          </Form>
        </div>
        <div>
          <Table dataSource={dataSource} columns={columns}>

          </Table>
        </div>
      </div>
    )
  }
}
