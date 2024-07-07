import './Orders.css';
import massage from '../assets/massage.png';


function Orders(){
    return(
        <div className="ordersContainer">
            <h1 className="orderHeading">Order History</h1>

            <div className="orderCard">
                <div className="orderImg">
                    <img src={massage} alt=""></img>

                </div>
                <div className="orderInfo">
                    <div className="div1">
                        <div className="orderNameNumber">
                            <h3 className="orderName">MEN'S HAIRCUT</h3>
                            <p className="para">Order Number: 31254616566561465</p>
                        </div>
                        <div className="buttons">
                            <button className="editBtn">EDIT</button>
                            <button className="cancelBtn">CANCEL</button>
                        </div>
                    </div>
                    <div className="div2">
                        <p className="para">Service Provider: Rifa Prasla ( &#9733; 5.2K)</p>
                        <p className="para">Contact: +1 5485485481</p>
                    </div>
                    <hr class="orderLine"></hr>
                    <div className="div3">
                        <p className="para">Address: 308 King Street North, Waterloo On. N2K 0G4</p>
                        <p className="status">SCHEDULED</p>
                    </div>
                    <div className="div4">
                        <p className="orderTotal">Order Total: 50CAD</p>
                        <p className="time">November 21,2024  10.00AM</p>
                    </div>

                </div>

            </div>
        </div>
        
    )

}

export default Orders;