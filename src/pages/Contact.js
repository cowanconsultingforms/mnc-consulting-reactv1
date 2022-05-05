import styled from 'styled-components';
import TextField from '../components/Textfield';
const ContactDiv = styled.div`
  display: flex;
  box-sizing: border-box;
  margin: auto;
  max-width: 40%;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #fff;
  box-shadow: 0px 0px 19px 5px rgba(0, 0, 0, 0.19);
`;

const ContactTop = styled.div`
background-size:cover;
box-sizing:border-box;

`
const ContactBottom = styled.div`
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  height: 4px;
  width: 50px;
  border-radius: 2px;
  background-color: #818d86;
`;

const Contact = () => {
    return (
        <ContactDiv>
            <ContactTop>
                <image src="/src/assets/mncdevelopmentlogo.jpg" style="width:80%;">
                </image>
            </ContactTop>
        </ContactDiv>
    )
}

export default Contact;