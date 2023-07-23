import Card from '../UI/Card';
import MealItem from './MealItem';
import { useEffect, useState } from 'react';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://food-order-487e9-default-rtdb.firebaseio.com/meals.json'
      );

      if (!response.ok) throw new Error('Something went wrong!');

      const data = await response.json();

      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchData().catch(error => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  const mealsList = meals.map(meal => (
    <MealItem meal={meal} key={meal.id} id={meal.id} />
  ));

  if (isLoading) {
    return (
      <section>
        <p className={classes.mealsLoading}>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <p className={classes.errorMessage}>{error}</p>
      </section>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>{mealsList}</Card>
    </section>
  );
};

export default AvailableMeals;
