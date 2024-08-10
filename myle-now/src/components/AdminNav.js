
import { Link } from "react-router-dom";
import './Admin.css'

function AdminNav(){
    return(
        <div className="admin-nav">
            <ul>
                <li>
                    <Link to='/admin/add/service'>Add Service</Link>
                </li>
                <li>
                    <Link to='/admin/add/content'>Add Service Content</Link>
                </li> 
                <li>
                    <Link to='/admin/add/service-provider'>Add Service Provider</Link>
                </li> 
            </ul>
        </div>
    )
}

export default AdminNav