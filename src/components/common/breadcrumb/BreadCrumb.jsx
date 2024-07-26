import React from "react";
import { Breadcrumb } from "antd";

const CustomBreadCrumb = () => {
  return (
    <div>
      <Breadcrumb
        routes={[
          {
            path: "/dashboard",
            breadcrumbName: "Dashboard",
          },
          {
            path: "/setup",
            breadcrumbName: "Setup",
            children: [
              {
                path: "/income-category",
                breadcrumbName: "Income Category",
              },
              {
                path: "/expense-category",
                breadcrumbName: "Expense Category",
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default CustomBreadCrumb;
