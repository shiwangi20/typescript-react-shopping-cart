import {useQuery} from 'react-query';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import {Wrapper} from './App.styles';
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

  const {isLoading, error, data} = useQuery<CartItemType[]>('Products', getProducts);

  console.log(data);

  if(isLoading){
    return <LinearProgress/>
  }

  if(error){
    return <div>"Something went wrong"</div>
  }

  const handleAddTocart = (clikedItem: CartItemType) => null;

  return (
    <Wrapper>
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
