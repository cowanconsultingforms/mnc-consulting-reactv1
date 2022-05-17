import { Nav, Navbar } from "rsuite";
  const pages = [
      {
        key:1,
      page: "/contact",
      text: "Contact",
      onClickFunc: () => navigate("/contact"),
    },
      {
        key:2,
      page: "/account",
      text: "Account",
      onClickFunc: () => navigate("/account"),
    },
      {
        key:3,
      page: "/listings",
      text: "Sales and Rentals",
      onClickFunc: () => navigate("/listings"),
    },
      {
        key:4,
      page: "/admin",
      text: "Administrator",
      onClickFunc: () => navigate("/admin"),
    },
      {
        key:5,
      page: "/login",
      text: "Login/Register",
      onClickFunc: () => navigate("/login"),
    },
  ];


const NavigationBar = ({ onSelect, activeKey, ...props }) => {
  const [activeKey,setActiveKey] = useState(activeKey);
  const [open, setOpen] = useState(false);
  const user = sessionStorage.getItem("user");
  const navigate = useNavigate();
  const { pages } = props;
  const renderDropdown = () => {
 
            
        return (
          
          <Nav.Item>
          
          </Nav.Item>
        );
        }
  
    return (
    <Navbar as={"div"} {...props}>
        <Navbar.Brand>MNC Development</Navbar.Brand>
        <Nav onSelect={onSelect} activeKey={activeKey}>
            <Nav.Item>
            
            </Nav.Item>
            </Nav>
    </Navbar>
        );
};

export default NavigationBar;
