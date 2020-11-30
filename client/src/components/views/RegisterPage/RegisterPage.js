//변경중인 js 파일
import React from "react";
import moment from "moment";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";

import {
  Form,
  Input,
  Button,
} from 'antd';

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
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegisterPage(props) {
  const dispatch = useDispatch();
  return (

    <Formik
      initialValues={{
        email: '',
        student_id: '',
        name: '',
        password: '',
        department: ''
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required('이름 입력 바람'),
        student_id: Yup.string()
          .required('학번 입력 바람'),
        email: Yup.string()
          .email('사용 불가능한 이메일입니다.')
          .required('이메일 입력 바람'),
        password: Yup.string()
          .min(6, '비밀번호는 최소 6글자 이상이어야 합니다.')
          .required('비밀번호 입력 바람'),
        department: Yup.string()
          .required('학과 입력 바람')
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {

          let dataToSubmit = {
            email: values.email,
            password: values.password,
            name: values.name,
            student_id: values.student_id,
            department: values.department,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
          };

          dispatch(registerUser(dataToSubmit)).then(response => {
            if (response.payload.success) {
              props.history.push("/login");
            } else {
              alert(response.payload.err.errmsg)
            }
          })

          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <div className="app">
            <h2>회원가입</h2>
            <Form style={{ minWidth: '375px' }} {...formItemLayout} onSubmit={handleSubmit} >

              <Form.Item required label="학과" hasFeedback>
                <Input
                  id="department"
                  placeholder="학과를 입력해주세요"
                  type="text"
                  value={values.department}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.department && touched.department ? 'text-input error' : 'text-input'
                  }
                />
                {errors.department && touched.department && (
                  <div className="input-feedback">{errors.department}</div>
                )}
              </Form.Item>

              <Form.Item required label="학번">
                <Input
                  id="student_id"
                  placeholder="학번을 입력해주세요"
                  type="text"
                  value={values.student_id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.student_id && touched.student_id ? 'text-input error' : 'text-input'
                  }
                />
                {errors.student_id && touched.student_id && (
                  <div className="input-feedback">{errors.student_id}</div>
                )}
              </Form.Item>

              <Form.Item required label="이름">
                <Input
                  id="name"
                  placeholder="이름을 적어주세요"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.name && touched.name ? 'text-input error' : 'text-input'
                  }
                />
                {errors.name && touched.name && (
                  <div className="input-feedback">{errors.name}</div>
                )}
              </Form.Item>

              <Form.Item required label="이메일" hasFeedback validateStatus={errors.email && touched.email ? "error" : 'success'}>
                <Input
                  id="email"
                  placeholder="이메일을 적어주세요"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item required label="비밀번호" hasFeedback validateStatus={errors.password && touched.password ? "error" : 'success'}>
                <Input
                  id="password"
                  placeholder="비밀번호를 적어주세요"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? 'text-input error' : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};


export default RegisterPage
