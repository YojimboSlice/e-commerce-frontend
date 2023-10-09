import { Outlet } from "react-router-dom";

import Header from "./Header";
import NavigationBar from "./NavigationBar";

const AppLayout = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <NavigationBar />
      <main className="lg:mt-16 mt-[108px]">
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
export default AppLayout;
