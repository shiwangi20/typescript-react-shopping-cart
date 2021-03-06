import {CartItemType} from '../App';
import {Wrapper} from './CartItem.styles';

type Props = {
    item: CartItemType;
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
}

const CartItem : React.FC<Props> = ({item, addToCart, removeFromCart}) => {
    return (
        <Wrapper>
            <div>Cart Item</div>
        </Wrapper>
    )
}

export default CartItem;