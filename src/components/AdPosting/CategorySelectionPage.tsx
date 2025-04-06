import React, { useEffect, useState } from "react";
import { Container, Card, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { categoriesStore } from "stores/Categories.store";
import { Category } from "types/Categories/Category";
import { observer } from "mobx-react-lite";
import "./CategorySelectionPage.css";

const CategorySelectionPage: React.FC = observer(() => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setIsLoading(true);
    try {
      await categoriesStore.fetchCategories();
      setCategories(categoriesStore.categories);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
    setIsLoading(false);
  };

  const handleCategorySelect = async (categoryNumber: number) => {
    try {
      // Fetch the levels for the selected category
      await categoriesStore.fetchCategoryLevels(categoryNumber);

      // Navigate to the post ad form with the selected category
      navigate("/post-ad", { state: { categoryNumber } });
    } catch (error) {
      console.error("Error fetching category levels:", error);
    }
  };

  if (isLoading) {
    return (
      <Container className="py-5 text-center" style={{ direction: "rtl" }}>
        <div>טוען קטגוריות...</div>
      </Container>
    );
  }

  return (
    <Container className="py-5" style={{ direction: "rtl" }}>
      <h1 className="text-center mb-4">בחר קטגוריה למודעה</h1>
      <Card>
        <Card.Body>
          <ListGroup className="category-list">
            {categories.map((category) => (
              <ListGroup.Item
                key={category.categoryNumber}
                action
                onClick={() => handleCategorySelect(category.categoryNumber)}
                className="text-end category-item"
              >
                {category.categoryName}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
});

export default CategorySelectionPage;
