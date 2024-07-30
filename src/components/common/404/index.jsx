import { Typography } from "antd";

const PageNotFound = () => {
  return (
    <>
      <div className="flex flex-col justify-center align-middle w-[80%]">
        <img src="error.png" alt="404" className="m-auto w-[40%]" />
        <Typography.Title className="w-auto m-auto">
          PAGE NOT FOUND
        </Typography.Title>
      </div>
    </>
  );
};

export default PageNotFound;
