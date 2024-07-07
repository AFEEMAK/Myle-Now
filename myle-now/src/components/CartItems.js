import trash from '../assets/trash.png';
import massage from'../assets/massage.png';
import './CartItems.css'

function CartItems(){
    return(
        <>
        <div class= "cartContainer">
        <h1 class="cartHeading">Your Cart</h1>
        <div class="cartItemsList">
            <section class="try">
            <div class="cartItems">
                <div class="imgSec">
                    <img src={massage} alt=""></img>
                </div>

                <div class="infoSec">
                   
                    <div class="info1">
                        <div class="info1Text">
                            <h3 class="cardItemName">Haircut For Men</h3>
                             <p>Proffessional haircut that suits Your face.</p>
                        </div>
                        <div class="info1Img">
                            <img src={trash} alt=''></img>
                        </div>
                    </div>

                    <hr></hr>

                    <div class="info2">
                        <div class="quantity">
                            <button>-</button>
                            <p>1</p>
                            <button>+</button>
                        </div>
                        <div class="price">
                            <p class="priceText">50.00 CAD</p>
                        </div>
                    </div>
                    
                </div>
               
</div>
                
<div class="cartItems">
                <div class="imgSec">
                    <img src={massage} alt=""></img>
                </div>

                <div class="infoSec">
                   
                    <div class="info1">
                        <div class="info1Text">
                            <h3 class="cardItemName">Haircut For Men</h3>
                             <p>Proffessional haircut that suits Your face.</p>
                        </div>
                        <div class="info1Img">
                            <img src={trash} alt=''></img>
                        </div>
                    </div>

                    <hr></hr>

                    <div class="info2">
                        <div class="quantity">
                            <button>-</button>
                            <p>1</p>
                            <button>+</button>
                        </div>
                        <div class="price">
                            <p class="priceText">50.00 CAD</p>
                        </div>
                    </div>
                    
                </div>
               
</div>
<div class="cartItems">
                <div class="imgSec">
                    <img src={massage} alt=""></img>
                </div>

                <div class="infoSec">
                   
                    <div class="info1">
                        <div class="info1Text">
                            <h3 class="cardItemName">Haircut For Men</h3>
                             <p>Proffessional haircut that suits Your face.</p>
                        </div>
                        <div class="info1Img">
                            <img src={trash} alt=''></img>
                        </div>
                    </div>

                    <hr></hr>

                    <div class="info2">
                        <div class="quantity">
                            <button>-</button>
                            <p>1</p>
                            <button>+</button>
                        </div>
                        <div class="price">
                            <p class="priceText">50.00 CAD</p>
                        </div>
                    </div>
                    
                </div>
               
</div>
                
            </section>

            <section class="cartSummary">
                <h2 class="cartSummaryHeading">SUMMARY</h2>
                <div class="subtotal">
                    <p class="p1">Subtotal (1 Items)</p>
                    <p class="p2">50 CAD</p>
                </div>
                <div class="subtotal">
                    <p class="p1">Shipping and Handling</p>
                    <p class="p2">5 CAD</p>
                </div>
                <div class="subtotal">
                    <p class="p1">Tax (Calculated At Checkout)</p>
                    <p class="p2">0 CAD</p>
                </div>
                
                <hr></hr>

                <div class="subtotal">
                    <p class="bold">TOTAL</p>
                    <p class="bold">55 CAD</p>
                </div>
                <button class="checkoutBtn">CHECKOUT</button>
                

            </section>

        </div>
       
        </div>
        </>
    );
}

export default CartItems;