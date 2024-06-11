
import ServiceHeader from "../components/ServiceHeader";
import React, { useEffect } from 'react'
import {useLocation} from 'react-router-dom'
function Services(){
    const {hash, key} = useLocation()
    useEffect(()=>{
    if(hash){
       const targetElement = document.getElementById(hash.substring(1))
        targetElement?.scrollIntoView({behavior: 'smooth'})
    }
}, [key, hash])
    return(
        <>
            <ServiceHeader/>
            
        </>
    )
}

export default Services;