import React, { useEffect, useState } from 'react'
import { Descriptions } from 'antd';
import Comment from './Comment';

function ProductInfo(props) {

    const [Product, setProduct] = useState({})

    useEffect(() => {

        setProduct(props.detail)

    }, [props.detail])

    return (
        <div>
            <Descriptions title="상품 정보">
                <Descriptions.Item label="가격"> {Product.price}</Descriptions.Item>
                <Descriptions.Item label="안전거래 여부">{Product.safety === true ? 'O' : 'X'}</Descriptions.Item>
                <Descriptions.Item label="상품 설명"> {Product.description}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div>
                <Comment Product={Product} CommentList={Product.commentList} />
            </div>

        </div>
    )
}

export default ProductInfo
