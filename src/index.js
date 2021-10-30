import React, { createContext, useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import Todos from './pages/Todos';
import Person from './pages/Person';

function Footbal() {
	const shoot = (event) => {
		alert('shoot !');
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
		{ id: 1, brand: 'Ford' },
		{ id: 2, brand: 'BMW' },
		{ id: 3, brand: 'Audi' },
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
			<input type="text" name="firstName" value={inputs.firstName || ''} onChange={handleChange} />

			<br />

			<label>LastName:</label>
			<input type="text" name="lastName" value={inputs.lastName || ''} onChange={handleChange} />

			<br />

			<label>Address:</label>
			<textarea type="text" name="address" value={inputs.address || ''} onChange={handleChange} />

			<br />

			<label>Car:</label>
			<select name="car" value={inputs.car || ''} onChange={handleChange}>
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
	const [todos, setTodos] = useState(['todo 1', 'todo 2']);
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

function Timer() {
	const [count, setCount] = useState(0);
	const [calculation, setCalculation] = useState(0);

	useEffect(() => {
		// setTimeout(() => {
		//   setCount((count) => count + 1);
		// }, 1000);
		setCalculation(() => count * 2);
	}, [count]);

	return (
		<>
			<p>Count: {count}</p>
			<button type="button" onClick={() => setCount((prevValue) => prevValue + 1)}>
				Add one
			</button>
			<p>Calculation: {calculation}</p>
		</>
	);
}

function UseEffectFetchData() {
	const [resourceType, setResourceType] = useState('todos');
	const [content, setContent] = useState([]);
	const [albums, setAlbums] = useState([]);

	// useEffect(() => {
	// 	fetch(`https://jsonplaceholder.typicode.com/albums`)
	// 		.then((response) => response.json())
	// 		.then((json) => setAlbums(json));
	// }, []);

	useEffect(() => {
		fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
			.then((response) => response.json())
			.then((json) => setContent(json));
	}, [resourceType]);

	return (
		<>
			<button type="button" onClick={() => setResourceType('todos')}>
				Fetch Todos
			</button>
			<button type="button" onClick={() => setResourceType('users')}>
				Fetch Users
			</button>
			<hr />
			albums
			{JSON.stringify(albums)}
			<hr />
			<p>{resourceType}</p>
			{content.map((item, key) => (
				<pre key={key}>{JSON.stringify(item)}</pre>
			))}
			albums
		</>
	);
}

const CountContext = createContext();

function Page1() {
	const [count, setCount] = useState(0);
	return (
		<CountContext.Provider value={count}>
      <button type="button" onClick={() => setCount(prevValue => prevValue + 1)}>Click + 1</button>
			<br />
      <Page2 />
			<br />
			<Page3 />
		</CountContext.Provider>
	);
}

function Page2() {
	const count = useContext(CountContext);
	return <> Page2 Count is : {count}</>;
}

function Page3() {
	const count = useContext(CountContext);
	return <>Page3 Count is : {count}</>;
}

ReactDOM.render(
	<React.StrictMode>
		{/* <Footbal />
		<Garage />
		<MyForm />
		<AppRouters />
		<AppCount />
		<Timer />
		<UseEffectFetchData /> */}
    <Page1 />
	</React.StrictMode>,
	document.getElementById('root')
);
