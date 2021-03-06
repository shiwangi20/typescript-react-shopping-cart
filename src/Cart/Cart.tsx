import CartItem from '../CartItem/CartItem';
import {CartItemType} from '../App';
import {Wrapper} from './Cart.styles';

type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
}

const Cart: React.FC<Props> = ({cartItems, addToCart, removeFromCart}) => {

    const getTotalItems: number = cartItems.reduce((ack, item)=> ack + item.price * item.amount, 0);

    return (
        <Wrapper>
            <h3>Your Shopping Cart</h3>
            {
                cartItems.length === 0 ? <p>No items in Cart</p> :
                cartItems.map(item => <CartItem key={item.id} item={item} addToCart={addToCart} removeFromCart={removeFromCart} />)
            }
            <h3>Total: ${getTotalItems}</h3>
        </Wrapper>
    )
}

export default Cart;