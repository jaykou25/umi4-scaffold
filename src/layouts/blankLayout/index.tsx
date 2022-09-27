import { Outlet } from "umi";

const BlankLayout = () => {
  return (
    <div>
      <div>blank layout </div>
      <Outlet />
    </div>
  );
};

export default BlankLayout;
