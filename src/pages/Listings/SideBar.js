import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar, Container } from "rsuite";
import { useCollectionData } from 'react-firebase-hooks/firestore';

const ListingSideBar = () => {
    
    return (
        <Container>
            <Sidebar
                style={{ width: "100%" }}
                defaultOpenKeys={["1"]}
                activeKey="1"
                onSelect={() => { }}
            >
            </Sidebar>
            </Container>
    )
}