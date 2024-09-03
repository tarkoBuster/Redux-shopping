import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useDispatch, useSelector} from "react-redux";
import {Fragment, useEffect} from "react";
import {mainActions} from "./store/main-slice";
import StatusBarMessage from "./components/UI/StatusBarMessage";

let isInitialRunning = true;
function App() {
    const isCartVisible = useSelector((state) => state.main.isCartVisible);
    const cart = useSelector((state) => state.cart);
    const statusMessage = useSelector((state) => state.main.showStatusMessage);
    const dispatchFunction = useDispatch();

    useEffect(() => {
        const sendCartData = async () => {
            dispatchFunction(mainActions.showStatusMessage({
                    status: 'pending',
                    title: 'відправка даних',
                    message: 'data fetching...',
                })
            );
            const response = await fetch(
                'https://shopping-5652e-default-rtdb.firebaseio.com/cart.json',
                {
                    method: 'PUT',
                    body: JSON.stringify(cart),
                }
            );
            if (!response.ok) {
                throw new Error('Помилка при відправці даних корзини')
            }

            dispatchFunction(mainActions.showStatusMessage({
                    status: 'success',
                    title: 'Відправка даних Успішна',
                    message: 'Дані успішно відправлені на сервер!',
                })
            );
        };

        if(isInitialRunning) {
            isInitialRunning = false;
            return;
        }

        sendCartData().catch((e) => {
            dispatchFunction(mainActions.showStatusMessage({
                    status: 'error',
                    title: 'Відправка даних Успішна',
                    message: 'Помилка при відправці даних корзини',
                })
            );
        });
    }, [cart, dispatchFunction]);
    console.log(statusMessage);
    return (
        <Fragment>
            {statusMessage && (
            <StatusBarMessage status={statusMessage.status}
                              title={statusMessage.title}
                              message={statusMessage.message}/>
        )}
            <Layout>
                {isCartVisible && <Cart/>}
                <Products/>
            </Layout>
        </Fragment>
    );
}

export default App;
