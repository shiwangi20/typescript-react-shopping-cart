import {useState} from 'react';
import {useQuery} from 'react-query';
import LinearProgress from '@material-ui/core/LinearProgress';
import Drawer from '@material-ui/core/Drawer';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import {Wrapper, StyledButton} from './App.styles';
import Item from './Item/Item';

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> => 
await (await(await (fetch('https://fakestoreapi.com/products/'))).json());

const App = () => {

  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const {isLoading, error, data} = useQuery<CartItemType[]>('Products', getProducts);

  console.log(data);

  if(isLoading){
    return <LinearProgress/>
  }

  if(error){
    return <div>"Something went wrong"</div>
  }

  const handleAddTocart = (clikedItem: CartItemType) => null;

  const getTotalItems = (items: CartItemType[]) => 
    items.reduce((ack: number, item) => ack + item.amount, 0);

  return (
    <Wrapper>
      <Drawer anchor={'right'} open={cartOpen} onClose={() => setCartOpen(false)}>
        Cart Items
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge color="primary" badgeContent={getTotalItems(cartItems)} >
          <AddShoppingCartIcon/>
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map(item => 
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddTocart={handleAddTocart}/>
          </Grid>
        )}
      </Grid>
    </Wrapper>
  );
}

export default App;
