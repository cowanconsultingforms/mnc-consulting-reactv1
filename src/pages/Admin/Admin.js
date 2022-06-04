import styled from 'styled-components';
import { useState } from 'react';
import AdminFlex from "../../components/Custom/Containers";
import  Search  from './Search';
import { FlexboxGrid ,Container,Header,} from 'rsuite';
import './styles.css';

const Heading = styled.h1`
  font-family: Garamond;
  color: rgb(128, 128, 128);
  padding-top: 10%;
  text-decoration:underline;
  align-items:center;
`;

const AdminPage = () => {

  return (
    <Container fluid="true" className="admin-container">
      <Heading> Administrator Page</Heading>
      <Container className="admin-search-container">
        <Search />
      </Container>
    </Container>
  );
}


export default AdminPage;