import React from 'react';
import '../assets/search.png'
import AdminNav from '../components/AdminNav';
import ServiceDetailsForm from '../components/ServiceDetailForm';
// import ServiceDetailForm 
function DetailForm(){
    return (
        <>
        <AdminNav></AdminNav>
        <ServiceDetailsForm></ServiceDetailsForm>
        </>
    )
}

export default DetailForm