import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Table({ longUrl, shortUrl, id }) {
	function handleDelete(id) {
		axios.delete(`/delete/${id}`).then(response => {
			if (response) {
				window.location.href = 'http://localhost:8080';
			}
		});
	}

	return (
		<tr>
			<td style={{ paddingRight: 10 }}>
				<a href={longUrl} target="_blank">
					{longUrl}
				</a>
			</td>
			<td style={{ paddingRight: 10 }}>
				<a href={'api/' + shortUrl} target="_blank">
					{shortUrl}
				</a>
			</td>
			<td style={{ paddingLeft: 10 }}>
				<button onClick={() => handleDelete(id)}>X</button>
			</td>
		</tr>
	);
}
