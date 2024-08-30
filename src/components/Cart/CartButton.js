import styles from "./CartButton.module.css";
import { mainActions } from "../../store/main-slice";
import {useDispatch, useSelector} from "react-redux";

const CartButton = (props) => {
    const dispatchFunction = useDispatch();
    const itemsQuantity =  useSelector (state => state.cart.itemsQuantity)
    const cartVisibilityHandler = () => {
        dispatchFunction(mainActions.toggleCartVisibility());
    }
    return (
        <button className={styles.button} onClick={cartVisibilityHandler}>
            <span>Корзина</span>
            <span className={styles.badge}>{itemsQuantity }</span>
        </button>
    );
};

export default CartButton;
