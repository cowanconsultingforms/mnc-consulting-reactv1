import styled from 'styled-components';
import { useState } from 'react';
const Heading = styled.h1`
  font-family: Garamond;
  color: rgb(128, 128, 128);
  padding-top: 10%;
`;

const AdminPage = () => {

    return (
        <div>
            <Heading>
                Administrator Page
            </Heading>
        </div>
    )
}


export default AdminPage;