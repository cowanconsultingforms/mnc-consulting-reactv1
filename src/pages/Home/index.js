import React from 'react';
import Footer from '../../components/Constants/Footer';
import Landing from '../../components/Home/Landing';
import propTypes from "prop-types";


export const HomePage = () => {
    return (
        <React.Fragment>
        <div className="home-page-top">
             <Landing />
            </div>
       
        <div className="landing-bottom">
          <Footer className="footer" />
        </div>
      </React.Fragment>
    );
}

export default HomePage;

