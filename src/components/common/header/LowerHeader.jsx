import { Button, DatePicker, Input, Space, Tooltip } from "antd";
import { CiSearch } from "react-icons/ci";
import { FaRegFileExcel } from "react-icons/fa";
import DateFilter from "../filter";
import { useState } from "react";
import { MdPreview } from "react-icons/md";
import dayjs from "dayjs";
import { disableAfterToday } from "../../../helper/disableDates";
const LowerHeader = ({ children, handleSearch, refetch, getQueryParam }) => {
  const { RangePicker } = DatePicker;

  const [filterType, setFilterType] = useState();
  const [dateRange, setDateRange] = useState();

  const filterState = (data) => {
    setFilterType(data);
  };

  const handleFilter = () => {
    if (filterType === "period") {
      getQueryParam(`from_date=${dateRange[0]}&to_date=${dateRange[1]}`);
    } else if (filterType === "this_week") {
      getQueryParam(`filter=${filterType}`);
    } else {
      getQueryParam(`filter=${filterType}`);
    }
    refetch();
  };
  return (
    <Space className="mb-4 flex justify-between">
      <span className="flex justify-start gap-2">
        <Input
          className="min-w-[200] max-w-[200]"
          prefix={<CiSearch size={14} />}
          onChange={handleSearch}
          placeholder="Search"
        />
        <DateFilter filterState={filterState} />
        {filterType === "period" && (
          <RangePicker
            disabledDate={disableAfterToday}
            onChange={(value) => {
              const formattedDates = value.map((date) =>
                dayjs(date).format("YYYY-MM-DD")
              );
              setDateRange(formattedDates);
            }}
            className="w-full"
          />
        )}
        <Button
          type="none"
          icon={<MdPreview size={22} />}
          onClick={handleFilter}
          className="bg-emerald-600 text-white hover:bg-emerald-800"
        >
          Preview
        </Button>
      </span>

      <Tooltip title="Export to excel">
        <Button
          className="custom-font bg-white"
          icon={<FaRegFileExcel size={16} />}
        >
          Excel
        </Button>
      </Tooltip>
    </Space>
  );
};

export default LowerHeader;
