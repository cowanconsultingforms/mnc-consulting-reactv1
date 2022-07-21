import React from "react";
import Contact from "../../components/Contact/Contact";
import ContactForm from "../../components/Contact/ContactForm";
import MNCLogo from "../../components/Constants/MNCLogo";
import { Footer } from "../../components/Constants/Footer";

import PropTypes from 'prop-types';


const ContactPage = (props) => {
    return (
      <Contact>
        <MNCLogo />
        <ContactForm />
      </Contact>
    );
}
export default ContactPage;