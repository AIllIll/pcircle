import React from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Button, Icon, Popconfirm, Avatar } from 'antd';
import Highlighter from 'react-highlight-words'
import { hashHistory } from "react-router";
import { changeMenuKeysAction } from "../../models/main/changeMenuKeys";
import {deleteUserInfo, deleteUserInfoAction} from "../../models/user/deleteUserInfo";
// const FormItem = Form.Item
// const EditableContext = React.createContext()
// const EditableRow = ({ form, index, ...props}) => (
//   <EditableContext.Provider value={form}>
//     <tr {...props}></tr>
//   </EditableContext.Provider>
// )
// const EditableFormRow = Form.create()(EditableRow);
class UserTable extends React.Component {
  constructor(props) {
    super(props)
    // console.log(this.props.userInfos)
    this.state = {
      searchText: '',
      data: this.props.userInfos
    }
    this.getColumnSearchProps = this.getColumnSearchProps.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys, selectedKeys, confirm, clearFilters
    }) => (
      <div style={{ padding: "8px", borderRadius: "4px", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,.15)" }}>
        <Input
          ref={node => { this.searchInput = node }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type={"primary"}
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon={"search"}
          size={"small"}
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size={"small"}
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <Icon type={"search"} style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select())
      }
    },
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  })

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0]
    })
  }

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({
      searchText: ''
    })
  }

  handleDelete = (key) => {
    // 删除用户
    // const dataSource = [...this.state.data];
    // this.setState({
    //   data: dataSource.filter(item => item.key != key)
    // })
    console.log(key)
    this.props.dispatch(deleteUserInfoAction(key))
  }

  handleClick = (key) => {
    console.log(key)
    this.props.dispatch(changeMenuKeysAction(["3", "sub2"]))
    hashHistory.push({
      pathname: '/usdetail',
      query: { userId: key }
    })

  }
  render() {
    const colums = [{
      title: '用户头像',
      dataIndex: 'avatarUrl',
      key: 'avatarUrl',
      render: avatarUrl => <Avatar src={avatarUrl} />
    }, {
      title: '用户昵称',
      dataIndex: 'nickName',
      key: 'nickName',
      ...this.getColumnSearchProps('nickName')
    }, {
      title: '用户openid',
      dataIndex: '_id',
      key: '_id',
      ...this.getColumnSearchProps('_id'),
      width: 100,
    }, {
      title: "用户复盘分享",
      dataIndex: "inviteMember",
      key: "inviteMember",
      ...this.getColumnSearchProps('inviteMember')
    }, {
      title: "用户复盘分享列表",
      dataIndex: "inviteList",
      key: "inviteList",
      ...this.getColumnSearchProps('inviteList'),
      width: '10%',
    }, {
      title: "用户训练营分享",
      dataIndex: "campMember",
      key: "campMember",
      ...this.getColumnSearchProps('campMember')
    }, {
      title: "用户复盘分享列表",
      dataIndex: "campList",
      key: "campList",
      ...this.getColumnSearchProps('campList'),
      width: '10%',
    }, {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) => (
        <div>
          {this.state.data.length >= 1
            ? (
              <Popconfirm title={"确定删除用户吗？"} onConfirm={() => this.handleDelete(record._id)}>
                <a href="javascript:;">删除用户</a>
              </Popconfirm>
            ) : null}
            <Button style={{ marginLeft: '4px' }} type="primary" size="small" onClick={() => this.handleClick(record._id)}>查看用户</Button>
        </div>

      )
    }]
    return (
      <Table dataSource={this.state.data} columns={colums} scroll={{ x: 1300 }} />
    )
  }
}

UserTable.propTypes = {
  userInfos: PropTypes.array
}

export default UserTable
