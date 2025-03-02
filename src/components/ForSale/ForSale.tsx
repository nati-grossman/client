import { useParams, Link } from 'react-router-dom';

interface House {
  city: string;
  price: string;
  description: string;
}

const housesData: Record<string, House> = {
  house1: { city: 'בית שמש', price: '₪1,500,000', description: 'דירה 4 חדרים עם נוף מדהים' },
  house2: { city: 'ביתר עילית', price: '₪1,200,000', description: 'דירת גן חדשה עם מרפסת' },
};

const ForSale: React.FC = () => {
  const { houseId } = useParams<{ houseId?: string }>();

  if (houseId && housesData[houseId]) {
    const house = housesData[houseId];
    return (
      <div>
        <h1>דירה למכירה ב{house.city}</h1>
        <p><strong>מחיר:</strong> {house.price}</p>
        <p>{house.description}</p>
        <Link to="/for-sale">🔙 חזרה לרשימה</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>רשימת דירות למכירה</h1>
      <ul>
        {Object.entries(housesData).map(([id, house]) => (
          <li key={id}>
            <Link to={`/for-sale/${id}`}>דירה ב{house.city}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ForSale;
