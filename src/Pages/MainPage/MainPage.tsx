import { Header } from "../../Components/Header/Header";
import "./MainPage.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { ShopItem } from "../../Components/ShopItem/ShopItem";

export type ShopItemData = {
  id: number;
  title: string;
  cover: string;
  price: number;
};

export const MainPage = () => {
  const [items, setItems] = useState<ShopItemData[]>([]);
  const [searchItem, setSearchItem] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/items")
      .then((response) => {
        console.log(response.data);
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Произошла ошибка при получении данных", error);
      });
  }, []);

  const changeSortMethod = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const filteredShopItems = items
    .filter((item) =>
      item.title.toLowerCase().includes(searchItem.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "Сортировать по названию") {
        return a.title.localeCompare(b.title);
      } else if (sortOption === "Сортировать по цене") {
        return b.price - a.price;
      }
      return 0;
    });

  return (
    <div className="mainPageContainer">
      <Header searchItem={setSearchItem} />
      <div className="mainContentContainer">
        <h1>Все товары</h1>
        <select onChange={changeSortMethod} className="mainPageSelect">
          <option value="">Выберите метод сортировки</option>
          <option value="Сортировать по названию">
            Сортировать по названию
          </option>
          <option value="Сортировать по цене">Сортировать по цене</option>
        </select>
        <div className="mainSelection">
          {filteredShopItems.map((item: ShopItemData) => {
            const props = {
              id: item.id,
              title: item.title,
              cover: item.cover,
              price: item.price,
            };
            return <ShopItem key={item.id} {...props} />;
          })}
        </div>
      </div>
    </div>
  );
};
