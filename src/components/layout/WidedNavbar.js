import Menu from "./Menu";
import TopBar from "./TopBar";

export default function WidedNavbarNavbar({ isNavbarOpen, toggleNavbar }) {
  return (
    <>
      <TopBar isNavbarOpen={isNavbarOpen} toggleNavbar={toggleNavbar}/>
      <Menu isNavbarOpen={isNavbarOpen}/>
    </>
  );
}