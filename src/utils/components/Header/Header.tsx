import { ChangeEvent, FC, useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";

import { ModuleRoutes } from "../../../app/routes/routes";

import { Categories } from "../../../app/domain/interfaces/categories";

import { categoriesRequest } from "../../../app/proxy/categories-request";

import { useGlobalSearchAppState } from "../../../app/context/search";

import superLogo from "/public/imgs/logotipo.jpg";

import './Header.css';

const Header: FC = () => {
  const [categories, setCategories] = useState<Categories[] | null>(null);

  const getCategories = async () => {
    try {
      const data = await categoriesRequest.getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const { searchTerm, setSearchTerm } = useGlobalSearchAppState();
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const location = useLocation();

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(event.target.value);
  };

  useEffect(() => {
    setLocalSearchTerm(""); 
    setSearchTerm("");
  }, [location, setSearchTerm]); 

  useEffect(() => {
    setSearchTerm(localSearchTerm);
  }, [localSearchTerm, setSearchTerm]);

  useEffect(() => {
    getCategories(); 
  }, []);

  return (
    <header>
      <div>
        <Link to={ModuleRoutes.Init}>
          <img src={superLogo} alt="Super Market logo" />
        </Link>
        <div className="search-container">
          <input
            type="text"
            id="search-input"
            value={localSearchTerm}
            onChange={handleSearchChange}
            placeholder="Search products..."
            autoComplete="off"
          />
        </div>
        <nav>
          <div className="dropdown">
            <a href="#" className="dropdown-toggle">
              Categories
            </a>
            <div id="categories-menu" className="dropdown-menu">
              {categories && categories.length > 0 ? (
                categories.map((category) => (
                  <Link
                    key={category.slug}
                    to={`${ModuleRoutes.Category}/${category.slug}`}
                  >
                    {category.name}
                  </Link>
                ))
              ) : (
                <p>Loading categories...</p>
              )}
            </div>
          </div>
        </nav>
        <button className="login-button">Login</button>
      </div>
    </header>
  );
};

export default Header;
