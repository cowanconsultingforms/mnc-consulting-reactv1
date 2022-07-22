import React from "react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";
import CarouselImage from "./Carousel";
import BasicTable from "./Table";
import NavBar from "../../components/Constants/Navbar";


export const ListingPage = () => {
    
    return (
    <div>
    <CarouselImage></CarouselImage>
    <BasicTable></BasicTable>
    </div>)
}

export default ListingPage;