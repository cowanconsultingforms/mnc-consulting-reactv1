import styled from 'styled-components';
import { useState } from 'react';
import AdminFlex from '../../components/Containers';
import  SearchUser  from './SearchUser';
import { FlexboxGrid } from 'rsuite';

const Heading = styled.h1`
  font-family: Garamond;
  color: rgb(128, 128, 128);
  padding-top: 10%;
  text-decoration:underline;
`;

const AdminPage = () => {

    return (
      
        <FlexboxGrid>
          <Heading> Administrator Page</Heading>
          <SearchUser />
        </FlexboxGrid>
     
    );
}


export default AdminPage;