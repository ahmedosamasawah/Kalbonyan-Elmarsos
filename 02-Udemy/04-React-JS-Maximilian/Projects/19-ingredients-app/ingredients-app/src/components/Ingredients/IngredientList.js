import React from "react";

import "./IngredientList.css";

import LoadingIndicator from "../UI/LoadingIndicator";

const IngredientList = React.memo((props) => {
  console.log(props.ingredients);
  return (
    <section className="ingredient-list">
      <h2>Loaded Ingredients</h2>
      <ul>
        {props.loading ? (
          <LoadingIndicator />
        ) : (
          props.ingredients.map((ig) => (
            <li key={ig.id} onClick={props.onRemoveItem.bind(this, ig.id)}>
              <span>{ig.title}</span>
              <span>{ig.amount}x</span>
            </li>
          ))
        )}
      </ul>
    </section>
  );
});

export default IngredientList;
