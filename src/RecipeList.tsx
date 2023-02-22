import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { MealsState, setMeals } from "./MealsState";
import { Meal } from "./Meal";

function RecipeList() {
  const [selectedRecipe, setSelectedRecipe] = useState<number | null>(null);
  const someValue = useSelector((state: MealsState) => state.meals);
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
    );
    const data = await response.json();
    dispatch(setMeals({ meals: data.meals }));
    console.log(data.meals);
  };

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setMeals({ meals: data.meals }));
      });
  }, [dispatch]);

  const handleRecipeClick = (id: number) => {
    setSelectedRecipe(id);
  };

  const renderRecipeDetails = () => {
    if (!selectedRecipe) {
      return null;
    }

    const recipe = someValue.find((meal) => meal.idMeal === selectedRecipe);

    return (
      <>
        <Container className="py-4">
          <Button className="float-end" onClick={() => setSelectedRecipe(null)}>
            Back to List
          </Button>
        </Container>
        <Container className="py-4">
          <Row>
            <Col className="mb-4">
              <Card>
                <Container className="bg-dark py-5">
                  <Card.Img
                    variant="top"
                    src={recipe?.strMealThumb}
                    className="img-fluid rounded h-50 w-50 mx-auto d-block"
                  />
                </Container>
                <Card.Body className="py-5">
                  <Card.Title>{recipe?.strMeal}</Card.Title>
                  <Card.Subtitle className="mb-3 text-muted">
                    {recipe?.strCategory} ({recipe?.strArea})
                  </Card.Subtitle>
                  <Card.Text>{recipe?.strInstructions}</Card.Text>
                </Card.Body>

                <Card.Body className=" text-center py-5">
                  <Card.Title className="mb-3">Ingredients</Card.Title>
                  <ul className="list-unstyled ">
                    {[...Array(20)].map((_, i) => (
                      <li key={i}>
                        {recipe?.[`strIngredient${i + 1}` as keyof Meal] && (
                          <>
                            {recipe?.[`strIngredient${i + 1}` as keyof Meal]}{" "}
                            -&nbsp;
                            {recipe?.[`strMeasure${i + 1}` as keyof Meal]}
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    Source: {recipe?.strSource}
                  </small>
                </Card.Footer>
              </Card>
            </Col>
          </Row>

          <Button onClick={() => setSelectedRecipe(null)}>Back to List</Button>
        </Container>
      </>
    );
  };

  return (
    <>
      <Container>
        {renderRecipeDetails()}
        {!selectedRecipe && (
          <>
            <Row className="py-3">
              <Col className="d-flex flex-column align-items-center">
                <input
                  type="text"
                  placeholder="Search for a recipe"
                  className="rounded p-2 mx-2 border-0 shadow-sm  w-50 text-center mx-auto d-block"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button className="mt-3 mb-5" onClick={handleSearch}>
                  Search
                </Button>
              </Col>
            </Row>
            <Row>
              {someValue.map((meal) => (
                <Col md={12} lg={6} key={meal.idMeal} className="mb-5">
                  <Card className="h-100">
                    <Card.Img src={meal.strMealThumb}></Card.Img>
                    <Card.Body>
                      <Card.Title>{meal.strMeal}</Card.Title>

                      <Button onClick={() => handleRecipeClick(meal.idMeal)}>
                        View Recipe
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
    </>
  );
}

export default RecipeList;
