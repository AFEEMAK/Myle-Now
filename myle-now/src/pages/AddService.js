import React from 'react';
import '../assets/search.png'

import AddServiceContent from '../components/AddServiceContent';
import AdminNav from '../components/AdminNav';

function AddService(){
    return (
        <>
        <AdminNav></AdminNav>
        <AddServiceContent></AddServiceContent>
        </>
    )
}

export default AddService