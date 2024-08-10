
import { Link } from "react-router-dom";
import './Admin.css'

function SpNav(){
    return(
        <div className="admin-nav">
            <ul>
                <li>
                    <Link to='/service_provider'>Confirmed Orders</Link>
                </li>
                <li>
                    <Link to='/service_provider/orders_queue'>Orders Queue</Link>
                </li> 
            </ul>
        </div>
    )
}

export default SpNav