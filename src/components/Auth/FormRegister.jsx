import React from "react";
import { Button, Form, Input, Space } from "antd";

function FormRegister(props) {
  const { handleOpenModalLogonRegister } = props;
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      className="form-login"
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div>
        <span className="label-input-account">EMAIL</span>
        <Form.Item
          // label="Username"
          name="username"
          rules={[{ required: true, message: "Xin hãy nhập Email!" }]}
        >
          <Input
            placeholder="Nhập email..."
            className="input-login"
            style={{ marginTop: "10px" }}
          />
        </Form.Item>
      </div>

      <div>
        <span className="label-input-account">MẬT KHẨU</span>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Xin hãy nhập Mật khẩu!" }]}
        >
          <Input.Password
            placeholder="Nhập mật khẩu..."
            className="input-login"
            style={{ marginTop: "10px" }}
          />
        </Form.Item>
      </div>

      <div>
        <span className="label-input-account">NHẬP LẠI MẬT KHẨU</span>
        <Form.Item
          name="re-password"
          rules={[{ required: true, message: "Xin hãy nhập Mật khẩu!" }]}
        >
          <Input.Password
            placeholder="Nhập lại mật khẩu..."
            className="input-login"
            style={{ marginTop: "10px" }}
          />
        </Form.Item>
      </div>

      <Form.Item>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{ height: "40px" }}
          >
            Đăng ký
          </Button>
          <Button
            block
            onClick={() => handleOpenModalLogonRegister("login")}
            style={{ height: "40px", marginTop: "10px" }}
          >
            <span style={{ fontWeight: "500" }}>
              Bạn đã có tài khoản rồi? Đăng nhập
            </span>
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

export default FormRegister;
