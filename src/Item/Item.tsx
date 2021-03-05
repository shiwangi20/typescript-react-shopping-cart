import {Wrapper} from './Item.styles';
import {CartItemType} from '../App';
import Button from '@material-ui/core/Button';

type Props = {
    item : CartItemType;
    handleAddTocart: (clickedItem: CartItemType) => void;
}

const Item: React.FC<Props> = ({item,handleAddTocart}) => {
    return (
        <Wrapper>
            <img src={item.image} alt={item.title}/>
            <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <h3>${item.price}</h3>
            </div>
            <Button onClick={() => handleAddTocart(item)}>Add To Cart</Button>
    </Wrapper>
    )
}

export default Item;