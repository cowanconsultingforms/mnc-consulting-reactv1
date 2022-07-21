import React from 'react';
import LandingFooter from '../../components/Constants/Footer';
import Landing from '../../components/Home/Landing';
import AuthContext from '../../context/AuthContext';
import propTypes from "prop-types";

export const HomePage = () => {
    
    return (
        <React.Fragment>
            <div className="home-page-top">
             <Landing />
            </div>
       
        <div className="landing-bottom">
          <LandingFooter className="footer" />
        </div>
      </React.Fragment>
    );
}

export default HomePage;