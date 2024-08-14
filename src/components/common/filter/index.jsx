import { Select } from "antd";

const DateFilter = ({ filterState }) => {
  return (
    <div>
      <Select
        className="w-[150px]"
        placeholder="Filter"
        defaultValue="all"
        allowClear
        onChange={(value) => {
          filterState(value);
        }}
        options={[
          { value: "all", label: "All" },
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
