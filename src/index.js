import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function UseEffectFetchData() {
	const [resourceType, setResourceType] = useState('todos');
	const [content, setContent] = useState([]);
	const [albums, setAlbums] = useState([]);

	useEffect(() => {
		fetch(`https://jsonplaceholder.typicode.com/albums`)
			.then((response) => response.json())
			.then((json) => setAlbums(json));
	}, []);

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
		</>
	);
}

ReactDOM.render(
	<React.StrictMode>
		<UseEffectFetchData />
	</React.StrictMode>,
	document.getElementById('root')
);
