import {useQuery} from 'react-query';
import LinearProgress from '@material-ui/core/LinearProgress';

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

  return (
    <div className="App">
      Start
    </div>
  );
}

export default App;
