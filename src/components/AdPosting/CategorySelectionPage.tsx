import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { categoriesStore } from "stores/Categories.store";
import { observer } from "mobx-react-lite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHome,
  faBuilding,
  faMapMarkerAlt,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import "./CategorySelectionPage.css";

const CategorySelectionPage: React.FC = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (categoriesStore.categoriesFetched) {
      setIsLoading(false);
    } else {
      loadCategories();
    }
  }, []);

  const loadCategories = async () => {
    setIsLoading(true);
    try {
      await categoriesStore.fetchCategories();
    } catch (error) {
      console.error("Error loading categories:", error);
    }
    setIsLoading(false);
  };

  const handleCategorySelect = async (categoryNumber: number) => {
    try {
      await categoriesStore.fetchCategoryLevels(categoryNumber);
      navigate("/post-ad", { state: { categoryNumber } });
    } catch (error) {
      console.error("Error fetching category levels:", error);
    }
  };

  // Map category numbers to icons
  const getCategoryIcon = (categoryNumber: number) => {
    const iconMap: { [key: number]: any } = {
      1: faHome,        // For rent
      2: faHome,    // For sale
      3: faHome, // Location
      4: faHome   // Information
    };
    return iconMap[categoryNumber] || faHome;
  };

  if (isLoading) {
    return (
      <Container className="py-5 text-center" style={{ direction: "rtl" }}>
        <div>טוען קטגוריות...</div>
      </Container>
    );
  }

  return (
    <Container className="ad-posting-container" style={{ direction: "rtl" }}>
      <h1 className="ad-posting-title">בחר קטגוריה</h1>
      <div className="ad-posting-grid">
        {categoriesStore.categories.map((category) => (
          <div
            key={category.categoryNumber}
            className="ad-posting-card-item"
            onClick={() => handleCategorySelect(category.categoryNumber)}
          >
            <div className="ad-posting-card-content">
              <div className="ad-posting-card-icon">
                <FontAwesomeIcon icon={getCategoryIcon(category.categoryNumber)} />
              </div>
              <div className="ad-posting-card-title">{category.categoryName}</div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
});

export default CategorySelectionPage;
