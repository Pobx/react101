import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import Todos from "./pages/Todos";
import Person from "./pages/Person";

function Footbal() {
  const shoot = (event) => {
    alert("shoot !");
    console.log(event);
  };
  return (
    <>
      <button type="button" onClick={(event) => shoot(event)}>
        Shoot
      </button>
    </>
  );
}

function Garage() {
  const cars = [
    { id: 1, brand: "Ford" },
    { id: 2, brand: "BMW" },
    { id: 3, brand: "Audi" },
  ];

  return (
    <>
      <h1>Who lives in my garage ?</h1>
      {cars.length <= 0 && <h2>No car.</h2>}
      <ul>
        {cars.map((car) => (
          <li key={car.id}>{car.brand}</li>
        ))}
      </ul>
    </>
  );
}

function MyForm() {
  const [inputs, setInputs] = useState({});
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
  };
  const handleChange = (event) => {
    console.log(event);
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>FirstName:</label>
      <input
        type="text"
        name="firstName"
        value={inputs.firstName || ""}
        onChange={handleChange}
      />

      <br />

      <label>LastName:</label>
      <input
        type="text"
        name="lastName"
        value={inputs.lastName || ""}
        onChange={handleChange}
      />

      <br />

      <label>Address:</label>
      <textarea
        type="text"
        name="address"
        value={inputs.address || ""}
        onChange={handleChange}
      />

      <br />

      <label>Car:</label>
      <select name="car" value={inputs.car || ""} onChange={handleChange}>
        <option value="">--Select--</option>
        <option value="Ford">Ford</option>
        <option value="Volvo">Volvo</option>
        <option value="Fiat">Fiat</option>
      </select>

      <br />

      <input type="submit" />
    </form>
  );
}

function AppRouters() {
  return (
    <Router>
      <div>
        <Link to="/">Home</Link>
      </div>

      <div>
        <Link to="/blogs">Blog</Link>
      </div>

      <div>
        <Link to="/contact">Contact</Link>
      </div>

      <div>
        <Link to="/person">Person</Link>
      </div>

      <hr />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/blogs">
          <Blogs />
        </Route>

        <Route path="/contact">
          <Contact />
        </Route>

        <Route path="/person">
          <Person />
        </Route>
      </Switch>
    </Router>
  );
}

function AppCount() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState(["todo 1", "todo 2"]);
  const increment = () => setCount((c) => c + 1);
  const addTodo = () => setTodos((prev) => [...prev, Math.random().toString()]);

  return (
    <>
      <Todos todos={todos} />
      <hr />
      <div>
        Count: {count}
        <button type="button" onClick={increment}>
          +
        </button>
        <button type="button" onClick={addTodo}>
          addTodo
        </button>
      </div>
    </>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Footbal />
    <Garage />
    <MyForm />
    <AppRouters />
    <AppCount />
  </React.StrictMode>,
  document.getElementById("root")
);
