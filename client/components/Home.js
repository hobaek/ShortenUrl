import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tb from './Table';
import generateUnique from './shorten';
export default function Home() {
	const [longUrl, setLongUrl] = useState('');
	const [urlList, setUrlList] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			await axios
				.get('http://localhost:3000/get')

				.then(res => {
					setUrlList(
						res.data.urls.map((item, index) => {
							return (
								<Tb key={item._id} id={item._id} index={index} {...item} />
							);
						})
					);
				})
				.catch(e => {
					console.log('error');
				});
		};
		fetchData();
	}, []);

	const getClickableLink = link => {
		return link.startsWith('http://') || link.startsWith('https://')
			? link
			: `http://${link}`;
	};

	async function handleChange(e) {
		const { value } = e.target;
		let newValue = await getClickableLink(value);
		setLongUrl(newValue);
	}

	function handleClick() {
		const newUrlObj = {
			longUrl: longUrl,
			shortUrl: generateUnique(longUrl),
		};
		axios
			.post('http://localhost:3000/add', newUrlObj)
			.then(response => {
				if (response) {
					window.location.href = 'http://localhost:8080';
				}
			})
			.catch(err => alert('longUrl already exists'));
	}

	return (
		<div>
			<div>
				<input
					style={{ width: 200, marginBottom: 10 }}
					type="text"
					placeholder="Write your URl"
					onChange={handleChange}
				/>
				<button onClick={handleClick}>Summit</button>
				<table>
					<thead>
						<tr>
							<th style={{ paddingRight: 10 }}>LongUrl</th>
							<th style={{ paddingRight: 10 }}>ShortUrl</th>
							<th style={{ paddingLeft: 10 }}>Delete</th>
						</tr>
					</thead>
					<tbody>{urlList}</tbody>
				</table>
			</div>
		</div>
	);
}
