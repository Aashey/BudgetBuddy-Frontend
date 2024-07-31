import { Typography } from "antd";

const PageNotFound = () => {
  return (
    <>
      <div className="p-10 w-[100%] h-[100%] flex flex-col align-middle justify-center">
        <img src="error2.png" alt="404" className="m-auto w-auto" />
        <div className="mt-4 text-center font-bold text-2xl">
          <Typography.Title>404</Typography.Title>
          <span>PAGE NOT FOUND</span>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
