import React from "react";
import Contact from "../../components/Contact/Contact";
import ContactForm from "../../components/ContactForm";
import { DownloadLogo } from "../../components/constants/DownloadLogo";
import { Footer } from "../../components/constants/Footer";
import Email from "../../components/Contact/Email";
import PropTypes from 'prop-types';


const ContactPage = (props) => {
    return (
        <Contact>
            <ContactForm />
            <DownloadLogo />
            <Email />
        </Contact>
    );
}