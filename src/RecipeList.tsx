import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { MealsState, setMeals } from './MealsState';

function RecipeList() {
  const someValue = useSelector((state: MealsState) => state.meals);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setMeals({ meals: data.meals }));
      });
  }, [dispatch]);

  
  return (
    <Container>
      <Row>
      {someValue.map((meal) =>
        <Col md={12} lg={6} key={meal.idMeal} className="mb-5">
          <Card className="h-100">
             <Card.Img src={meal.strMealThumb}></Card.Img>
             <Card.Body>
              <Card.Title>{meal.strMeal}</Card.Title>
              <Card.Text>{meal.strInstructions}</Card.Text>
             </Card.Body>
          </Card>
 
        </Col>
        
      )}
      </Row>
    </Container>
  );
}

export default RecipeList;