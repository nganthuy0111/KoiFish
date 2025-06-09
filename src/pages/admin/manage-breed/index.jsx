import { Form, Input } from "antd";
import CRUDTemplate from "../../../components/crud-template/crud-template";

function ManageBreed() {
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Breed Id",
      dataIndex: "breedId",
      key: "breedId",
    },
    {
      title: "Breed Name",
      dataIndex: "breedName",
      key: "breedName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  const formItems = (
    <>
    
      <Form.Item name="breedName" label="Breed Name">
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input.TextArea />
      </Form.Item>
    </>
  );

  return (
    <div>
      <CRUDTemplate columns={columns} formItems={formItems} path="breed" />
    </div>
  );
}

export default ManageBreed;
