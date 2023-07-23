import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';

const HeaderCartButton = props => {
  const [btnIsHighlighted, seBtnIsHighlighted] = useState(false);
  const cartCTX = useContext(CartContext);

  const numOfCartItems = cartCTX.items.reduce(
    (currentNum, item) => currentNum + item.amount,
    0
  );

  const { items } = cartCTX;
  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ''
  }`;

  useEffect(() => {
    if (!items.length === 0) {
      return;
    }

    seBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      seBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button className={btnClasses} onClick={props.onCartButtonClicked}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numOfCartItems}</span>
    </button>
  );
};
export default HeaderCartButton;
