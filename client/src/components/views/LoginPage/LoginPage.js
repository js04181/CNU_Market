//변경중인 코드
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../../_actions/user_actions";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Icon, Input, Button, Typography } from 'antd';
import { useDispatch } from "react-redux";

const { Title } = Typography;

function LoginPage(props) {
  const dispatch = useDispatch();

  const [formErrorMessage, setFormErrorMessage] = useState('')

  return (
    <Formik
      initialValues={{
        student_id: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        student_id: Yup.string()
          .required('학번 입력 바람'),
        password: Yup.string()
          .min(6, '비밀번호는 최소 6글자 이상이어야합니다.')
          .required('비밀번호 입력 바람'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            student_id: values.student_id,
            password: values.password
          };

          dispatch(loginUser(dataToSubmit))
            .then(response => {
              if (response.payload.loginSuccess) {
                window.localStorage.setItem('userId', response.payload.userId);

                props.history.push("/");
              } else {
                setFormErrorMessage('학번과 비밀번호를 다시 입력하세요.')
              }
            })
            .catch(err => {
              setFormErrorMessage('학번과 비밀번호를 다시 입력하세요.')
              setTimeout(() => {
                setFormErrorMessage("")
              }, 3000);
            });
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

            <Title level={2}>로그인</Title>
            <form onSubmit={handleSubmit} style={{ width: '350px' }}>

              <Form.Item required>
                <Input
                  id="student_id"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
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

              <Form.Item required>
                <Input
                  id="password"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
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

              {formErrorMessage && (
                <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
              )}

              <Form.Item>

                <div>
                  <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                    로그인
                </Button>
                </div>
                <a href="/register">회원가입</a>
              </Form.Item>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default withRouter(LoginPage);


