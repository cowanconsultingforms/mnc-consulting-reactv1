import React from "react";
import Contact from "../../components/Contact/Contact";
import ContactForm from "../../components/ContactForm";
import { DownloadLogo } from "../../components/Contact/DownloadLogo";
import Email from "../../components/Contact/Email";
import propTypes from 'prop-types';


const ContactPage = (props) => {
    return (
        <Contact>
            <ContactForm />
            <DownloadLogo />
            <Email />
        </Contact>
    );
}