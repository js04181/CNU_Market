import React, { Component } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import axios from 'axios';
import FileUpload from '../../utils/FileUpload';

const { Title } = Typography;
const { TextArea } = Input;

const Category = [
    { key: 1, value: "디지털/가전" },
    { key: 2, value: "가구/인테리어" },
    { key: 3, value: "생활/가공식품" },
    { key: 4, value: "스포츠/레저" },
    { key: 5, value: "패션/잡화" },
    { key: 6, value: "게임/취미" },
    { key: 7, value: "뷰티/미용" },
    { key: 8, value: "도서/티켓/음반" },
    { key: 9, value: "기타" }
]

export class UploadProductPage extends Component {

    state = {
        title: '',
        description: '',
        category: 1,
        images: [],
        price: 0,
        safety: false
    }

    handleChangeTitle = (event) => {
        this.setState({ title: event.currentTarget.value })
    }

    handleChangePrice = (event) => {
        this.setState({ price: parseInt(event.currentTarget.value, 10) })
    }

    handleChangeDecsription = (event) => {
        // console.log(event.currentTarget.value)
        this.setState({ description: event.currentTarget.value })
    }

    handleChangeCategory = (event) => {
        this.setState({ category: event.currentTarget.value })
    }
    handleChecked = () => {
        this.setState({ safety: true })
    }

    onSubmit = (event) => {
        event.preventDefault();

        if (this.props.user.userData && !this.props.user.userData.isAuth) {
            return alert('Please Log in First')
        }

        if (!this.state.title || !this.state.description ||
            !this.state.category || !this.state.images
            || !this.state.price) {
            return alert('Please first fill all the fields')
        }

        const variables = {
            writer: this.props.user.userData._id,
            title: this.state.title,
            description: this.state.description,
            images: this.state.images,
            category: this.state.category,
            price: this.state.price,
            safety: this.state.safety
        }

        axios.post('/api/product/uploadProduct', variables)
            .then(response => {
                if (response.data.success) {
                    alert('video Uploaded Successfully')
                    setTimeout(() => {
                        this.props.history.push('/')
                    }, 1000);
                } else {
                    alert('Failed to upload video')
                }
            })
    }

    updateFiles = (newImages) => {
        this.setState({ images: newImages })
    }


    render() {
        return (
            <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <Title level={2} > Upload Travel Product</Title>
                </div>

                <Form onSubmit={this.onSubmit}>

                    <FileUpload refreshFunction={this.updateFiles} />

                    <br /><br />
                    <label>상품명</label>
                    <Input
                        onChange={this.handleChangeTitle}
                        value={this.state.title}
                    />
                    <br /><br />
                    <label>상품 설명</label>
                    <TextArea
                        onChange={this.handleChangeDecsription}
                        value={this.state.description}
                    />
                    <br /><br />
                    <label>가격(원)</label>
                    <Input
                        type="number"
                        onChange={this.handleChangePrice}
                        value={this.state.price}
                    />
                    <br /><br />
                    <select onChange={this.handleChangeCategory}>
                        {Category.map(item => (
                            <option key={item.key} value={item.key}>{item.value}</option>
                        ))}
                    </select>
                    <br /><br />
                    <label>안전거래여부 </label>
                    <Input
                        type="checkbox"
                        onchange={this.handleChecked}
                        checked={this.state.safety}
                    />
                    <br /><br />

                    <Button type="primary" size="large" onClick={this.onSubmit}>
                        Submit
                </Button>
                </Form>
            </div>
        )
    }
}

export default UploadProductPage
