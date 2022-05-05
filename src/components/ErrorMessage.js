
import styled from "styled-components";
const ErrorMessage = styled.label`
  color: red;
`;
const ErrorMessageComponent = () => {
    return (
      <ErrorMessage id="error-msg-change-password">
        Password must be at least 8 characters long
      </ErrorMessage>
    );
}