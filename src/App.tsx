import {useState, useEffect} from 'react';
import {useQuery} from 'react-query';
import LinearProgress from '@material-ui/core/LinearProgress';
import Drawer from '@material-ui/core/Drawer';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import {Wrapper, StyledButton} from './App.styles';
import Item from './Item/Item';
import Cart from './Cart/Cart';

const LOCAL_STORAGE_KEY = "react-shopping-cart-items";

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

  useEffect(() => {
    const storageCartItems : string | null = localStorage.getItem(LOCAL_STORAGE_KEY);
    if(storageCartItems){
      setCartItems(JSON.parse(storageCartItems));
    }
  },[]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
  },[cartItems]);

  const {isLoading, error, data} = useQuery<CartItemType[]>('Products', getProducts);

  console.log(data);

  if(isLoading){
    return <LinearProgress/>
  }

  if(error){
    return <div>"Something went wrong"</div>
  }

  const handleAddTocart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      const isItemInCart = prev.find(item => item.id === clickedItem.id);
      if(isItemInCart) {
        return prev.map(item => item.id===clickedItem.id ? {...item, amount: item.amount+1} : item);
      }
      return [...prev,{...clickedItem, amount: 1}];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => 
      prev.reduce((ack, item) => {
        if(item.id === id){
          if(item.amount === 1) return ack;
          return [...ack, {...item, amount: item.amount-1}];
        }else{
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  const getTotalItems = (items: CartItemType[]) => 
    items.reduce((ack: number, item) => ack + item.amount, 0);

  return (
    <Wrapper>

      <Drawer anchor={'right'} open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart cartItems={cartItems} addToCart={handleAddTocart} removeFromCart={handleRemoveFromCart} /> 
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
