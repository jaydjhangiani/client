import { Form, Modal, message } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VerifyAccount } from "../../apicalls/transactions";
import { SendRequest } from "../../apicalls/requests";
// import {ShowLoading, HideLoading} from "../../redux/loaderSlice"

const NewRequestsModal = ({
  showNewRequestsModal,
  setShowNewRequestsModal,
  reloadData,
}) => {
  const { user } = useSelector((state) => state.users);
  const [isVerified, setIsVerified] = useState("");
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  // console.log(user);
  const verifyAccount = async () => {
    try {
      //   dispatch(ShowLoading());
      const response = await VerifyAccount({
        receiver: form.getFieldValue("receiver"),
      });
      //   dispatch(HideLoading());
      if (response.success) {
        setIsVerified("true");
      } else {
        setIsVerified("false");
      }
    } catch (error) {
      //   dispatch(HideLoading());
      setIsVerified("false");
    }
  };

  const onFinish = async (values) => {
    try {
      const payload = {
        ...values,
        sender: user._id,
        reference: values.reference || "no description",
        status: "success",
      };

      const respone = await SendRequest(payload);
      if (respone.success) {
        reloadData();
        setShowNewRequestsModal(false);
        message.success(respone.message);
      } else {
        message.error(respone.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <div>
      <Modal
        title="Transfer Funds"
        open={showNewRequestsModal}
        onCancel={() => setShowNewRequestsModal(false)}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <div className="flex gap-2 items-center">
            <Form.Item label="Account Number" name="receiver" className="w-100">
              <input type="text" />
            </Form.Item>
            <button
              type="button"
              className="primary-contained-btn mt-1"
              onClick={verifyAccount}
            >
              VERIFY
            </button>
          </div>
          {isVerified === "true" && (
            <div className="success-bg">Account Verified Successfully!</div>
          )}
          {isVerified === "false" && (
            <div className="error-bg">Account Verification Failure</div>
          )}
          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              { required: true, message: "Please input an amount" },
              { max: user.balance, message: "Insufficient Balance" },
            ]}
          >
            <input type="number" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <textarea type="text" />
          </Form.Item>

          <div className="flex justify-end gap-1">
            <button className="primary-outlined-btn">Cancel</button>
            {isVerified && (
              <button className="primary-contained-btn" type="submit">
                Request
              </button>
            )}
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default NewRequestsModal;
