import Logo from "../ui/logo.component";

function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}
export default NavBar;
