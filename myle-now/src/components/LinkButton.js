import { Link } from "react-router-dom"

const ButtonStyles = {
        padding: '10px 20px',
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius:'5px',
        fontSize:'14px',
        cursor: 'pointer'
      
}

export default function LinkButton({buttontext}){
    return(
        <>
        <Link to='/Login'>

        <button style={ButtonStyles}>{buttontext}</button>
        </Link>
        </>
    )
}