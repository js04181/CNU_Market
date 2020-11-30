import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios';

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

function UploadProductPage(props) {

    const [TitleValue, setTitleValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [PriceValue, setPriceValue] = useState(0)
    const [CategoryValue, setCategoryValue] = useState(1)
    const [checked, setChecked] = useState(undefined)
    const [Images, setImages] = useState([])


    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }

    const onPriceChange = (event) => {
        setPriceValue(event.currentTarget.value)
    }

    const onCategorySelectChange = (event) => {
        setCategoryValue(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const onChecked = (event) => {
        setChecked(event.currentTarget.checked)
    }

    const onSubmit = (event) => {
        event.preventDefault();


        if (!TitleValue || !DescriptionValue || !PriceValue ||
            !CategoryValue || !Images) {
            return alert('모든 항목을 채워주세요!')
        }

        const variables = {
            writer: props.user.userData._id,
            title: TitleValue,
            description: DescriptionValue,
            price: PriceValue,
            images: Images,
            category: CategoryValue,
            safety: checked,
            commentList: []
        }

        Axios.post('/api/product/uploadProduct', variables)
            .then(response => {
                if (response.data.success) {
                    alert('상품을 성공적으로 업로드하였습니다.')
                    props.history.push('/')
                } else {
                    alert('상품을 업로드하는데 실패하였습니다.')
                }
            })

    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> 상품 업로드</Title>
            </div>


            <Form onSubmit={onSubmit} >

                {/* DropZone */}
                <FileUpload refreshFunction={updateImages} />

                <br />
                <br />
                <label>상품명</label>
                <Input
                    onChange={onTitleChange}
                    value={TitleValue}
                />
                <br />
                <br />
                <label>상품 설명</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={DescriptionValue}
                />
                <br />
                <br />
                <label>가격(원)</label>
                <Input
                    onChange={onPriceChange}
                    value={PriceValue}
                    type="number"
                />
                <br /><br />
                <select onChange={onCategorySelectChange} value={CategoryValue}>
                    {Category.map(item => (
                        <option key={item.key} value={item.key}>{item.value} </option>
                    ))}
                </select>
                <br />
                <br />
                <label>안전거래 여부</label>
                <Input
                    onChange={onChecked}
                    checked={checked}
                    type="checkbox"
                />
                <br />
                <br />
                <Button
                    onClick={onSubmit}
                >
                    업로드
                </Button>

            </Form>

        </div>
    )
}

export default UploadProductPage
