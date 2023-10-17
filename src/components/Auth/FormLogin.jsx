import { Button, Form, Input, Space } from "antd";
import { useState } from "react";
import { postLogin } from "../../services/api";
import { toast } from "react-toastify";
import { useSubscription } from "../../utils/globalStateHook";
import { infoUserSubs, toggleAuthModalSubs } from "../Header/Header";

export function FormLogin(props) {
  const { handleOpenModalLogonRegister } = props;
  const [isLoading, setIsLoading] = useState(false);
  const { setState } = useSubscription(toggleAuthModalSubs);

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const dataLogin = {
        email: values?.username,
        password: values?.password,
      };

      // Response login
      const resLogin = await postLogin(dataLogin);
      const accessToken = resLogin?.data?.accessToken;
      const refreshToken = resLogin?.data?.refreshToken;
      let infoUser = {
        ...resLogin?.data?.infoUser,
        accessToken,
        refreshToken,
      };

      if (resLogin?.EC === 0 && accessToken && refreshToken) {
        // Save data to localStorage
        localStorage.setItem("infoUser", JSON.stringify(infoUser));

        infoUserSubs.updateState(infoUser);
        toast.success("Đăng nhập thành công!");

        // Close modal login/register
        setState({ type: "" });
      } else if (resLogin?.message) {
        toast.error(resLogin?.message);
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
          <Button
            className="button-submit-login"
            htmlType="submit"
            block
            loading={isLoading}
          >
            Đăng nhập
          </Button>
          <span className="warning-login">
            Hãy nhớ đăng xuất trên thiết bị dùng chung
          </span>

          <div className="button-move-to-register flex-center-all">
            <span>
              Mới sử dụng Quizlet?{` `}
              <button
                disabled={isLoading}
                className="remove-style-button cursor-pointer"
                type="button"
                onClick={() =>
                  !isLoading && handleOpenModalLogonRegister("register")
                }
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
