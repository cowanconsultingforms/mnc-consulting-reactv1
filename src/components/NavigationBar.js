import { Nav, Navbar } from "rsuite";

import React,{useState} from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { Loader ,Dropdown,ButtonToolbar,FlexboxGrid} from "rsuite";
const MainNavBar = styled.div`
  background-color: rgb(196, 196, 196);
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-color: white;
  box-shadow: 0px 5px 10px 2px #888888;
  text-decoration: none;
  color: white;
  text-align: center;
  padding: 19px 20px;
  text-decoration: none;
`;
const LeftSection = styled.div`
  font-weight: bold;
  font-size: 20px;
  color: white;
  justify-content: space-between;
  text-decoration: none;
`;
const RightSection = styled.div`
  font-size: 20px;
  display: block;
  color: white;
  text-align: center;
  padding: 19px 20px;
  text-decoration: none;
`;
const CustomDropdown = ({ ...props }) => (
  <Dropdown {...props}>
    <Dropdown.Item>New File</Dropdown.Item>
    <Dropdown.Item>New File with Current Profile</Dropdown.Item>
    <Dropdown.Item>Download As...</Dropdown.Item>
    <Dropdown.Item>Export PDF</Dropdown.Item>
    <Dropdown.Item>Export HTML</Dropdown.Item>
    <Dropdown.Item>Settings</Dropdown.Item>
    <Dropdown.Item>About</Dropdown.Item>
  </Dropdown>
);

const instance = (
  <ButtonToolbar>
    <CustomDropdown title="Hover" trigger="hover" />
    <CustomDropdown title="Click" trigger="click" />
    <CustomDropdown title="Right Click" trigger="contextMenu" />
    <CustomDropdown title="Click and Hover" trigger={["click", "hover"]} />
  </ButtonToolbar>
);



export const NavigationBar = ({ onSelect, activeKey, ...props }) => {
  
  const [eventKey,getActiveKey] = useState(activeKey);
  const user = sessionStorage.getItem("user");
  const navigate = useNavigate();
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
      page: "/login",
      text: "Login/Register",
      onClickFunc: () => navigate("/login"),
    },
  ];
  const protectedPages = [
    {
      key: 1,
      page: "/admin",
      text: "Administrator",
      onClickFunc: () => navigate("/admin"),
    },
  ];
  const renderDropdown = (pages) => {
 
            
    return (
      pages.map((page, idx) => {
        return (
          <React.Fragment>
            <RightSection style={{ flexDirection: "row-reverse" }}>
              <div
                className="NavLinkItem"
                id={idx}
                style={{
                  border: "none",
                  backgroundColor: "rgb(196, 196, 196)",
                  cursor: "pointer",
                  color: "white",
                  fontSize: "20px",
                  padding: "19px 20px",
                  textDecoration: "none",
                  textAlign: "left",
                  display: 'flex',
                  flexDirection:'row-reverse'
                
                }}
              >
                <Nav.Item as="a" key={idx} onClick={page.onClickFunc} vertical style={{
                  display:'block'}}>
                  {page.text}
                </Nav.Item>
              </div>
            </RightSection>
          </React.Fragment>
        );
      })
    );
      }
          
          

  return (
    <MainNavBar>
      <Navbar appearance="default" as="div">
        <LeftSection>
          <Navbar.Brand>
            <FaHome size={25} />
          </Navbar.Brand>
        </LeftSection>
        <RightSection>
          <Nav pullRight>{renderDropdown(pages)}</Nav>
        </RightSection>
      </Navbar>
    </MainNavBar>
  );
};

export default NavigationBar;
