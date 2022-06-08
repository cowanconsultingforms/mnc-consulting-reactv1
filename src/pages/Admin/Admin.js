import styled from 'styled-components';
import { useState } from 'react';
import AdminFlex from "../../components/Custom/Containers";
import  Search  from './Search';
import { FlexboxGrid ,Container,Header,Row,Form,Schema} from 'rsuite';
import './styles.css';
import AddListing from './AddListing';



const AdminPage = () => {

  return (
    <Container fluid="true" className="admin-container">
      <Row className="header-row">
        <h1> Administrator Page</h1>
      </Row>
      <Container className="admin-search-container">
        <AddListing />
      </Container>
    </Container>
  );
}


export default AdminPage;