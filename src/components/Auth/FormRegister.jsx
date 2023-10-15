import React, { useState } from "react";
import { Button, Form, Input, Space } from "antd";
import { postRegister } from "../../services/api";
import { toast } from "react-toastify";

function FormRegister(props) {
  const { handleOpenModalLogonRegister } = props;
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const dataRegister = {
        email: values.username,
        username: values.usernamePost,
        password: values.password,
      };

      const resRegister = await postRegister(dataRegister);

      if (resRegister.EC === 0) {
        toast.success(resRegister.message);
        handleOpenModalLogonRegister("login");
      } else {
        toast.error(resRegister.message);
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
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
          name="username"
          rules={[{ required: true, message: "Xin hãy nhập email!" }]}
        >
          <Input
            placeholder="Nhập email..."
            className="input-login"
            style={{ marginTop: "10px" }}
          />
        </Form.Item>
      </div>

      <div>
        <span className="label-input-account">Tên người dùng</span>
        <Form.Item
          name="usernamePost"
          rules={[{ required: true, message: "Xin hãy nhập tên người dùng!" }]}
        >
          <Input
            placeholder="Nhập tên người dùng..."
            className="input-login"
            style={{ marginTop: "10px" }}
          />
        </Form.Item>
      </div>

      <div>
        <span className="label-input-account">Mật khẩu</span>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Xin hãy nhập mật khẩu!" }]}
        >
          <Input.Password
            placeholder="Nhập mật khẩu..."
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
            className="button-submit-login"
            loading={isLoading}
          >
            Đăng ký
          </Button>
          <Button
            disabled={isLoading}
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
