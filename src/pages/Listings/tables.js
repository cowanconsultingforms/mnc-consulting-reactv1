import Table from 'rsuite/Table';
import React, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import fakeData from 'https://github.com/rsuite/rsuite/blob/master/docs/public/data/users.json';

const tableApp = () => {
    return (
      <Table
        height={400}
        data={fakeData}
        onRowClick={data => {
          console.log(data);
        }}
      >
        <Table.Column width={70} align="center" fixed>
          <Table.HeaderCell>Id</Table.HeaderCell>
          <Table.Cell dataKey="id" />
        </Table.Column>
  
        <Table.Column width={200} fixed>
          <Table.HeaderCell>First Name</Table.HeaderCell>
          <Table.Table.Cell dataKey="firstName" />
        </Table.Column>
  
        <Table.Column width={200}>
          <Table.HeaderCell>Last Name</Table.HeaderCell>
          <Table.Cell dataKey="lastName" />
        </Table.Column>
  
        <Table.Column width={200}>
          <Table.HeaderCell>City</Table.HeaderCell>
          <Table.Cell dataKey="city" />
        </Table.Column>
  
        <Table.Column width={200}>
          <Table.HeaderCell>Street</Table.HeaderCell>
          <Table.Cell dataKey="street" />
        </Table.Column>
  
        <Table.Column width={300}>
          <Table.HeaderCell>Company Name</Table.HeaderCell>
          <Table.Cell dataKey="companyName" />
        </Table.Column>
  
        <Table.Column width={300}>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.Cell dataKey="email" />
        </Table.Column>
        <Table.Column width={120} fixed="right">
          <Table.HeaderCell>Action</Table.HeaderCell>
  
          <Table.Cell>
            {rowData => {
              function handleAction() {
                alert(`id:${rowData.id}`);
              }
              return (
                <span>
                  <a onClick={handleAction}> Edit </a> | <a onClick={handleAction}> Remove </a>
                </span>
              );
            }}
          </Table.Cell>
        </Table.Column>
      </Table>
    );
  };
  
  ReactDOM.render(<tableApp />);


export default tableApp


