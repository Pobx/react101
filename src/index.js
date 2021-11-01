import React, { createContext, useContext, useEffect, useReducer, useRef, useState } from 'react';
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
	const [collection, setCollection] = useState([]);
	const [inputs, setInputs] = useState({});
	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(inputs);

		setCollection((prevCollection) => [...prevCollection, inputs]);
	};

	const handleChange = (event) => {
		console.log(event);
		const name = event.target.name;
		const value = event.target.value;

		setInputs((values) => ({ ...values, [name]: value }));
	};

	return (
		<>
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

			<br />

			{collection.map((item, key) => (
				<pre key={key}>
					{key} {JSON.stringify(item)}
				</pre>
			))}
		</>
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

	const getData = (resourceType) => {
		fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
			.then((response) => response.json())
			.then((json) => setContent(json));
	};

	useEffect(() => {
		getData(resourceType);
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
		</>
	);
}

const CountContext = createContext();

function Page1() {
	const [count, setCount] = useState(0);
	return (
		<CountContext.Provider value={count}>
			<button type="button" onClick={() => setCount((prevValue) => prevValue + 1)}>
				Click + 1
			</button>
			<br />
			<Page2 />
			<br />
			{/* <Page3 /> */}
		</CountContext.Provider>
	);
}

function Page2() {
	const count = useContext(CountContext);
	return (
		<>
			{' '}
			Page2 Count is : {count} <Page3 />
		</>
	);
}

function Page3() {
	const count = useContext(CountContext);
	return <>Page3 Count is : {count}</>;
}

function CountState() {
	const [count, setCount] = useState(0);
	// function updateCount() {
	// 	setCount((prevValue) => prevValue + 1)
	// }
	const updateCount = (event) => {
		console.log(event);
		setCount((prevValue) => prevValue + 1);
	};

	return (
		<>
			Count is {count}
			<button type="button" onClick={(event) => updateCount(event)}>
				Add 1
			</button>
		</>
	);
}

function MyUseRef() {
	const [inputValue, setInputValue] = useState('');
	const count = useRef(0);

	useEffect(() => {
		count.current = count.current + 1;
		console.log(count.current);
	});

	return (
		<>
			<input type="text" value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
			<h1>render Count: {count.current}</h1>
		</>
	);
}

function MyUseRefFocus() {
	const inputElement = useRef();
	const focusInput = () => {
		console.log(inputElement);
		inputElement.current.focus();
	};

	return (
		<>
			<input type="text" ref={inputElement} />
			<button type="button" onClick={focusInput}>
				Focus Input
			</button>
		</>
	);
}

function MyuseRefTrackingChange() {
	const [inputValue, setInputValue] = useState('');
	const previousInputValue = useRef('');

	useEffect(() => {
		previousInputValue.current = inputValue;
	}, [inputValue]);

	return (
		<>
			<input type="text" value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
			<p>Current Value: {inputValue}</p>
			<p>Previous Value: {previousInputValue.current}</p>
		</>
	);
}

const initialTodos = [
	{ id: 1, title: 'Todo 1', complete: false },
	{ id: 2, title: 'Todo 2', complete: false },
];

const reducer = (state, action) => {
	switch (action.type) {
		case 'COMPLETE':
			return state.map((todo) => {
				if (todo.id === action.id) {
					return { ...todo, complete: !todo.complete };
				} else {
					return todo;
				}
			});

		default:
			return state;
	}
};

function TodosReducer() {
	const [todos, dispatch] = useReducer(reducer, initialTodos);
	const handleComplete = (todo) => {
		dispatch({ type: 'COMPLETE', id: todo.id });
	};

	return (
		<>
			{todos.map((todo) => (
				<div key={todo.id}>
					<label>
						<input type="checkbox" checked={todo.complete} onChange={() => handleComplete(todo)} />
						{todo.title}
					</label>
				</div>
			))}
		</>
	);
}

const RenderCounter = () => {
	const counter = useRef(0);

	// Since the ref value is updated in the render phase,
	// the value can be incremented more than once
	// counter.current = counter.current + 1;

	useEffect(() => {
		// Every time the component has been re-rendered,
		// the counter is incremented
		counter.current = counter.current + 1;
	});

	return <h1>{`The component has been re-rendered ${JSON.stringify(counter)} times`}</h1>;
};

function MyUseRef2() {
	const [name, setName] = useState('');
	const renderCount = useRef(0);
	const input = useRef();

	useEffect(() => {
		renderCount.current = renderCount.current + 1;
	});

	const onFocus = () => {
		input.current.focus();
		input.current.value = 'Hello Pobx';
	};

	return (
		<>
			<input ref={input} value={name} onChange={(e) => setName(e.target.value)} />
			<p>My name is {name}</p>
			<p>Rendered is {renderCount.current}</p>

			<button type="button" onClick={onFocus}>
				Focus
			</button>
		</>
	);
}

function LogButtonClicks() {
	const countRef = useRef(0);
	const [count, setCount] = useState(0);

	const handle = () => {
		// countRef.current++;
		// console.log(`Clicked ${countRef.current} times`);
		const updatedCount = count + 1;
		console.log(`Clicked ${updatedCount} times`);
		setCount(updatedCount);
	};
	console.log('I rendered!');

	return (
		<>
			{/* <p>{countRef.current}</p> */}
			<p>{count}</p>
			<button onClick={handle}>Click me</button>
		</>
	);
}

function StopWatch() {
	const timerIdRef = useRef(0);
	const [count, setCount] = useState(0);
	const startHandler = () => {
		if (timerIdRef.current) {
			return;
		}

		timerIdRef.current = setInterval(() => setCount((c) => c + 1), 1000);
    console.log(timerIdRef.current)
	};

	const stopHandler = () => {
		clearInterval(timerIdRef.current);
		timerIdRef.current = 0;
	};

	useEffect(() => {
		return () => clearInterval(timerIdRef);
	}, []);

	return (
		<>
			<div>Timer: {count}</div>
			<div>
				<button type="button" onClick={startHandler}>
					Start
				</button>
				<button type="button" onClick={stopHandler}>
					Stop
				</button>
			</div>
		</>
	);
}

ReactDOM.render(
	<React.StrictMode>
		{/* <Footbal />
		<Garage />
		<MyForm />
		<AppRouters />
		<AppCount />
		<Timer />
		 */}
		{/* <CountState /> */}
		{/* <MyForm /> */}
		{/* <UseEffectFetchData /> */}
		{/* <Page1 /> */}
		{/* <MyUseRef /> */}
		{/* <MyUseRefFocus /> */}
		{/* <MyuseRefTrackingChange /> */}
		{/* <TodosReducer /> */}
		{/* <RenderCounter /> */}
		{/* <MyUseRef2 /> */}
		{/* <LogButtonClicks /> */}
    <StopWatch />
	</React.StrictMode>,
	document.getElementById('root')
);
