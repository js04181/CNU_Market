import { Descriptions } from 'antd';
import { Component } from 'react';
import React from 'react';
import { Button } from 'antd';

class ProfilePage extends Component {

  state = {
    name: "",
    department: "",
    email: "",
    grade: "",
    student_id: ""
  }

  async componentDidMount() {
    console.log("ComponentDidMount1");
    const response = await fetch('/api/users/getInfo', {
      method: 'get',
      headers: {
        'Content-type': 'application/json'
      }
    })
    const body = await response.json();
    this.setState(
      {
        email: body.email,
        department: body.department,
        name: body.name,
        grade: body.grade,
        student_id: body.student_id
      }
    )
    console.log("ComponentDidMount2");
  }
  handleToChange = () => {
    console.log("heelloo")
    this.props.history.push({
      pathname: '/change',
      data: {
        email: this.state.email,
        name: this.state.name,
        student_id: this.state.student_id,
        department: this.state.department,
      }
    })
  }
  render() {
    const { name, email, grade, student_id, department } = this.state;
    return (
      <>
        <Descriptions title="&ensp;회원정보" bordered>
          <Descriptions.Item label="학과">{department}</Descriptions.Item>
          <Descriptions.Item label="학번">{student_id}</Descriptions.Item>
          <Descriptions.Item label="이름">{name}</Descriptions.Item>
          <Descriptions.Item label="이메일">{email}</Descriptions.Item>
          <Descriptions.Item label="회원등급">{grade}</Descriptions.Item>

        </Descriptions>,
        <br></br>
        <Button type="primary" onClick={this.handleToChange}>회원정보 수정</Button>

      </>

    );
  }
}

export default ProfilePage

