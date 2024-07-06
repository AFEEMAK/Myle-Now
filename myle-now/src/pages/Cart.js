const { default: CartItems } = require("../components/CartItems");
const { default: SimilarServices } = require("../components/SimilarServices");


function Cart() {
    return(
        <>
        <CartItems/>
        <SimilarServices/>
        </>
    );
}

export default Cart;