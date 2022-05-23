import styled from 'styled-components';
import { useState } from 'react';
import AdminFlex from '../../components/Containers';
import  SearchUser  from './SearchUser';
import { FlexboxGrid ,Container,Header,} from 'rsuite';

const Heading = styled.h1`
  font-family: Garamond;
  color: rgb(128, 128, 128);
  padding-top: 10%;
  text-decoration:underline;
`;

const AdminPage = () => {

    return (
      <AdminFlex>
        <Heading> Administrator Page</Heading>
      <SearchUser />
      </AdminFlex>
    );
}


export default AdminPage;