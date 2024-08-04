import { Button, Dropdown, Menu, Popconfirm, Tooltip, Typography } from "antd";
import { IoEyeSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";

import { AiFillDelete } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
const ActionGroup = ({
  record,
  handleViewComponent,
  handleEditComponent,
  handleDelete,
}) => {
  return (
    // 1st action
    // <div className="flex justify-center items-center ">
    //   <button
    //     className="flex hover:text-green-800 items-center p-2 mx-1"
    //     onClick={() => handleViewComponent(record)}
    //     key="1"
    //   >
    //     <IoEyeSharp size={18} />
    //     <span className="ml-2">View</span>
    //   </button>
    //   <button
    //     className="flex hover:text-blue-800 items-center p-2 mx-1"
    //     onClick={() => handleEditComponent(record)}
    //     key="2"
    //   >
    //     <FaEdit size={18} />
    //     <span className="ml-2">Edit</span>
    //   </button>
    //   <Popconfirm
    //     title="Are you sure you want to delete ?"
    //     onConfirm={() => handleDelete(record)}
    //   >
    //     <button
    //       className="flex hover:text-red-800 items-center p-2 mx-1"
    //       key="3"
    //     >
    //       <MdDelete size={20} />
    //       <span className="ml-2">Delete</span>
    //     </button>
    //   </Popconfirm>
    // </div>

    // 2nd action
    <div className="flex justify-evenly">
      <Tooltip title="View">
        <Button
          className="text-gray-800 hover:text-green-600"
          type="none"
          onClick={() => handleViewComponent(record)}
        >
          <IoEyeSharp size={18} />
        </Button>
      </Tooltip>

      <Tooltip title="Edit">
        <Button
          type="none"
          className="text-gray-800 hover:text-blue-600"
          onClick={() => handleEditComponent(record)}
        >
          <FaEdit size={18} />
        </Button>
      </Tooltip>

      <Tooltip title="Delete">
        <Popconfirm
          title="Are you sure you want to delete ?"
          onConfirm={() => handleDelete(record)}
        >
          <Button type="none" className="text-gray-800 hover:text-red-600">
            <AiFillDelete size={18} />
          </Button>
        </Popconfirm>
      </Tooltip>
    </div>
  );
};

export default ActionGroup;
