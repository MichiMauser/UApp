import classes from '../styles/ChatApp.module.css'
import NavbarChat from "./navbarChat"
import Search from "./search"
import Chats from "./chats"

const Sidebar = () => {
  return (
    <div className={classes.sidebar}>
      <NavbarChat />
      <Search/>
      <Chats/>
    </div>
  );
};

export default Sidebar;