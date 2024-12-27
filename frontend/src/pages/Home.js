import Products_List from '../components/Products_List';
import '../styles/Home.css';

const Home = ({ products }) => {
    return (
        <div>
            <Products_List products={products} />
        </div>
    );
};

export default Home;
