import { Select } from "antd";

const DateFilter = ({ filterState }) => {
  return (
    <div>
      <Select
        className="w-[150px]"
        placeholder="Filter"
        defaultValue="today"
        allowClear
        onChange={(value) => {
          filterState(value);
        }}
        options={[
          { value: "today", label: "Today" },
          { value: "this_week", label: "This Week" },
          { value: "this_month", label: "This Month" },
          { value: "period", label: "Custom Range" },
        ]}
      />
    </div>
  );
};

export default DateFilter;
