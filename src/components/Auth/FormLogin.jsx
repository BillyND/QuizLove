import { Button, Form, Input, Space } from "antd";

export function FormLogin(props) {
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

      <div className="warning-login">
        Bằng cách nhấp Đăng nhập, bạn chấp nhận{" "}
        <a href="/tos" rel="noopener" target="_blank">
          <span>Điều khoản dịch vụ</span>
        </a>{" "}
        Và{" "}
        <a href="/privacy" rel="noopener" target="_blank">
          <span>Chính sách quyền riêng tư</span>
        </a>
        {`   của QuizLove`}
      </div>

      <Form.Item>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Button className="button-submit-login" htmlType="submit" block>
            Đăng nhập
          </Button>
          <span className="warning-login">
            Hãy nhớ đăng xuất trên thiết bị dùng chung
          </span>

          <div className="button-move-to-register flex-center-all">
            <span>
              Mới sử dụng Quizlet?{` `}
              <button
                className="remove-style-button cursor-pointer"
                type="button"
                onClick={() => handleOpenModalLogonRegister("register")}
              >
                Tạo tài khoản
              </button>
            </span>
          </div>
        </Space>
      </Form.Item>
    </Form>
  );
}
