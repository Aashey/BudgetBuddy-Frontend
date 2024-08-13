import { Button, Dropdown, Menu } from "antd";
import React, { useState } from "react";
import { TiFilter } from "react-icons/ti";

const DateFilter = () => {
  const [filterState, setFilterState] = useState("");
  return (
    <div>
      <Dropdown
        trigger={["click"]}
        placement="bottom"
        overlay={
          <Menu>
            <Menu.Item
              onClick={() => {
                setFilterState("This Week");
              }}
            >
              This Week
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                setFilterState("This Month");
              }}
            >
              This Month
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                setFilterState("Period");
              }}
            >
              Custom Range
            </Menu.Item>
          </Menu>
        }
        className=""
      >
        <Button icon={<TiFilter size={22} />}>Filter</Button>
      </Dropdown>
    </div>
  );
};

export default DateFilter;
