import { Component } from "react";
import React from 'react'
import Axios from 'axios';

import { Form, Icon, Input, Button, List } from 'antd';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      commentData: [],
    };
  }
  onChange = (e) => {
    this.setState({ comment: e.target.value });
  };
  componentDidUpdate(prevProps) {
    console.log("ComponentDidUpdate")
    if (this.props.CommentList !== prevProps.CommentList) {
      console.log(this.props.CommentList)
      this.setState({ commentData: this.props.CommentList })
    }
  }

  goStage() {
    Axios({
      method: 'post',
      url: '/api/product/writeComment',
      data: {
        id: this.props.Product._id,
        comment: this.state.comment
      },
    }).then((res) => {
      this.setState({
        commentData: this.state.commentData.concat(res.data)
      })
    })
  }
  commentSubmit = async () => {
    if (this.state.comment === "") {
      alert("댓글을 작성해주세요")
    } else {
      this.goStage();
    }
  }
  render() {

    return <div>
      <div>
        <List
          itemLayout="horizontal"
          dataSource={this.state.commentData}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={item.name}
                description={item.comment} />
            </List.Item>)}
        />
      </div>
      <div>
        <Form.Item required>
          <Input
            id="comment"
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="댓글 작성"
            type="comment"
            onChange={this.onChange}
          />
          <Button onClick={this.commentSubmit} type="primary" >
            댓글 달기
        </Button>
        </Form.Item>
      </div>
    </div>
  }
}
export default Comment;