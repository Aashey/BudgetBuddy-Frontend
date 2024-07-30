import { Typography } from "antd";

const ActionGroup = ({
  record,
  handleViewComponent,
  handleEditComponent,
  handleDelete,
}) => {
  return (
    <div className="flex justify-evenly">
      <Typography.Link
        className="text-gray-600"
        onClick={() => handleViewComponent(record)}
      >
        View
      </Typography.Link>
      <Typography.Link onClick={() => handleEditComponent(record)}>
        Edit
      </Typography.Link>
      <Typography.Link onClick={() => handleDelete(record)}>
        Delete
      </Typography.Link>
    </div>
  );
};

export default ActionGroup;
