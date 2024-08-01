import { Typography } from "antd";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <div className="p-10 w-[100%] h-[100%] flex flex-col align-middle justify-center">
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <Typography.Text className="text-blue-600 text-xl">
              404
            </Typography.Text>
            <Typography.Title className=" text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Page not found
            </Typography.Title>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/dashboard"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Go back home
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default PageNotFound;
