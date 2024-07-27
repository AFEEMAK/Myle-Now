import { Link } from "react-router-dom"

const ButtonStyles = {
        padding: '10px 20px',
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius:'5px',
        fontSize:'14px',
        cursor: 'pointer'
      
}

export default function LinkButton({buttontext, btnfuntion, btnlink}){
   
    if(btnlink){

    return(

        <Link to={btnlink}>

    <button className="nav-button" style={ButtonStyles}>{buttontext}</button>
    </Link>
    )
   }
   if(btnfuntion){

       return(

           <>
           <Link to='/Login'>
       
           <button className="nav-button" onClick={btnfuntion} style={ButtonStyles}>{buttontext}</button>
           </Link>
           </>
       )
   }
   else{
    return(
        <>
        <Link to='/Login'>

        <button className="nav-button" style={ButtonStyles}>{buttontext}</button>
        </Link>
        </>
    )
}
}