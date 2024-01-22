import "./CartPage.scss";
import { ShopItemData } from "../MainPage/MainPage";
import { useEffect, useState } from "react";
import axios from "axios";
import { CartShopItem } from "../../Components/CartShopItem/CartShopItem";
import { useNavigate } from "react-router-dom";

export const CartPage = () => {
  const [cartItems, setCartItems] = useState<ShopItemData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/cartItems")
      .then((response) => {
        console.log(response.data);
        setCartItems(response.data);
      })
      .catch((error) => {
        console.error("Произошла ошибка при получении данных", error);
      });
  }, []);

  const clearCartAndRedirect = () => {
    const deletePromises = cartItems.map((item) => {
      return axios.delete(`http://localhost:3000/cartItems/${item.id}`);
    });
    Promise.all(deletePromises)
      .then(() => {
        navigate("/main");
      })
      .catch((error) => {
        console.error("Произошла ошибка при очистке корзины", error);
      });
  };

  const totalSum = cartItems.reduce((sum, item) => sum + item.price, 0);

  const checkout = () => {
    const orderData = {
      items: cartItems.map((item) => item.title),
      totalSum,
    };

    axios
      .post("http://localhost:3000/orders", orderData)
      .then(() => {
        alert("Заказ успешно создан!");
        clearCartAndRedirect();
      })
      .catch((error) => {
        console.error("Произошла ошибка при создании заказа", error);
      });
  };

  return (
    <div className="cartPageContainer">
      <div className="cartPageFirstSection">
        <h1>Корзина</h1>
        <div className="cartShopItemSelection">
          {cartItems.map((item: ShopItemData) => {
            const props = {
              id: item.id,
              title: item.title,
              cover: item.cover,
              price: item.price,
            };
            return <CartShopItem key={item.id} {...props} />;
          })}
        </div>
      </div>
      <div className="cartPageSecondSection">
        <h1>Итоговая сумма:</h1>
        <h2>{totalSum} рублей</h2>
        <button onClick={checkout} className="cartShopPageBtn">
          Оформить заказ
        </button>
      </div>
    </div>
  );
};
