import { useNavigate } from "react-router-dom";
import "./Header.scss";

type HeaderProps = {
  searchItem: React.Dispatch<React.SetStateAction<string>>;
};

export const Header = ({ searchItem }: HeaderProps) => {
  const navigate = useNavigate();
  const handleSearchItem = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchItem(event.target.value);
  };
  return (
    <div className="container">
      <h1>Clothes Shop</h1>
      <input placeholder="Найти товар..." onChange={handleSearchItem} />
      <p onClick={() => navigate("/cart")}>Корзина</p>
    </div>
  );
};
