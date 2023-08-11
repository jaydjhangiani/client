import { Form, Modal, message } from "antd";
import StripeCheckout from "react-stripe-checkout";
import { DepositFunds } from "../../apicalls/transactions";

const DepositModal = ({
  showDepositModal,
  setShowDepositModal,
  reloadData,
}) => {
  const [form] = Form.useForm();
  const onToken = async (token) => {
    try {
      const response = await DepositFunds({
        token: token,
        amount: form.getFieldValue("amount"),
      });
      if (response.success) {
        message.success(response.message);
        reloadData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <Modal
      title="Deposit"
      open={showDepositModal}
      onCancel={() => setShowDepositModal(false)}
      footer={null}
    >
      <div className="flex flex-col">
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Amount"
            className="w-100"
            name="amount"
            rules={[
              {
                required: true,
                message: "Please input amount",
              },
            ]}
          >
            <input type="number" />
          </Form.Item>
          <div className="flex justify-end gap-2">
            <button className="primary-outlined-btn">Cancel</button>
            <StripeCheckout
              token={onToken}
              currency="USD"
              amount={form.getFieldValue("amount") * 100}
              shippingAddress
              stripeKey="pk_test_51NcYpfSIOPGdW6dkfFqij9ci2ycgC7kw7866H9ERbwAEZTw2YGORrvNKcz14VfO3FNDPty9lsis3zuLYSRRQNRUB00YbSaWIA0"
            >
              <button className="primary-contained-btn">Deposit</button>
            </StripeCheckout>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default DepositModal;
