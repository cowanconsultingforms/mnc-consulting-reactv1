import React from 'react';
import styled from 'styled-components';
import { db, auth, app } from '../../firebase';
import { query, getDocs, where, collection, serverTimestamp } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Container, FlexboxGrid, Header, Content, Footer,Carousel } from 'rsuite';


const ListingPage = () => { 
    
    return(
  <div className="login-page">
    <Container classPrefix="login-page-container">
      <Content>
        <FlexboxGrid justify="center" align="center">
          <FlexboxGrid.Item colspan={12}>
            <Panel header={<h3>Login</h3>} bordered>
              <Form fluid>
                <Form.Group>
                  <Form.ControlLabel>
                    Username or email address
                  </Form.ControlLabel>
                  <Form.Control name="name" />
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Password</Form.ControlLabel>
                  <Form.Control
                    name="password"
                    type="password"
                    autoComplete="off"
                  />
                </Form.Group>
                <Form.Group>
                  <ButtonToolbar>
                    <Button appearance="primary">Sign in</Button>
                    <Button appearance="link">Forgot password?</Button>
                  </ButtonToolbar>
                </Form.Group>
              </Form>
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
    </Container>
  </div>
    )
}
const fileList = [
  {
    name: "a.png",
    fileKey: 1,
    url: "https://user-images.githubusercontent.com/1203827/47638792-92414e00-db9a-11e8-89c2-f8f430a23cd3.png",
  },
  {
    name: "b.png",
    fileKey: 2,
    url: "https://user-images.githubusercontent.com/1203827/47638807-9d947980-db9a-11e8-9ee5-e0cc9cd7e8ad.png",
  },
];
const instance = (
  <Uploader
    listType="picture-text"
    defaultFileList={fileList}
    action="//jsonplaceholder.typicode.com/posts/"
    renderFileInfo={(file, fileElement) => {
      return (
        <div>
          <span>File Name: {file.name}</span>
          <p>File URL: {file.url}</p>
        </div>
      );
    }}
  />
);