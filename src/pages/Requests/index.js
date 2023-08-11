import { Table, Tabs, message } from "antd";
import PageTitle from "../../components/PageTitle";
import TabPane from "antd/es/tabs/TabPane";
import { useEffect, useState } from "react";
import NewRequestsModal from "./NewRequestsModal";
import { GetAllRequestsByUser } from "../../apicalls/requests";
import { useSelector } from "react-redux";
import moment from "moment";

const Requests = () => {
  const [showNewRequestsModal, setShowNewRequestsModal] = useState(false);
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state.users);
  const columns = [
    { title: "Request ID", dataIndex: "_id" },
    {
      title: "User",
      dataIndex: "sender",
      render(sender) {
        return sender.firstName + " " + sender.lastName;
      },
    },
    {
      title: "Receiver",
      dataIndex: "receiver",
      render(receiver) {
        return receiver.firstName + " " + receiver.lastName;
      },
    },
    { title: "Amount", dataIndex: "amount" },
    {
      title: "Date",
      dataIndex: "date",
      render(text, record) {
        return moment(record.createdAt).format("DD/MM/YYYY hh:mm:ss A");
      },
    },
    { title: "Status", dataIndex: "status" },
  ];

  const getData = async () => {
    try {
      const response = await GetAllRequestsByUser();
      if (response.success) {
        const sendData = response.data.filter(
          (item) => item.sender._id === user._id
        );
        const receiveData = response.data.filter(
          (item) => item.receiver._id === user._id
        );
        setData({ sent: sendData, received: receiveData });
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <PageTitle title="Requests" />
        <button
          className="primary-outlined-btn"
          onClick={() => setShowNewRequestsModal(true)}
        >
          Request Funds
        </button>
      </div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Sent" key="1">
          <Table columns={columns} dataSource={data.sent} />
        </TabPane>
        <TabPane tab="Received" key="2">
          <Table columns={columns} dataSource={data.received} />
        </TabPane>
      </Tabs>

      {showNewRequestsModal && (
        <NewRequestsModal
          showNewRequestsModal={showNewRequestsModal}
          setShowNewRequestsModal={setShowNewRequestsModal}
          reloadData={getData}
        />
      )}
    </div>
  );
};

export default Requests;
