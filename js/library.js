"use strict";

class HTTPRequest {
	get(url) {
		return new Promise((resolve, reject) => {
			fetch(url, {
				method: "GET"
			})
				.then(res => res.json())
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}

	post(url, data) {
		return new Promise((resolve, reject) => {
			const postRequest = new ajaxRequest();
			postRequest.open("POST", url, true);
			postRequest.setRequestHeader("Content-type", "application/json");
			postRequest.onload = () => {
				if (this.status === 200) {
					if (this.readyState === 4) {
						if (this.responseText != null) {
							resolve(this.responseText);
						} else {
							reject(`Error: Ready state ${this.readyState}`);
						}
					} else {
						reject(`Error: HTTP Status ${this.status}`);
					}
				}
			};
			postRequest.send(JSON.stringify(data));
		});
	}

	put(url, data) {
		return new Promise((resolve, reject) => {
			fetch(url, {
				method: "POST",
				headers: {
					"Content-type": "application/vnd.github.v3+json",
					Authorization: "token bf707020d9f03c3990257ef2a3b9185d27e40013"
				},
				body: {
					message: "Updated high score new",
					committer: {
						name: "Andrew2432",
						email: "drew.devops@gmail.com"
					},
					content: data
				}
			})
				.then(res => res.json())
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
}

function ajaxRequest() {
	let request;
	try {
		request = new XMLHttpRequest();
	} catch (error1) {
		try {
			request = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (error2) {
			try {
				request = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (error3) {
				request = null;
			}
		}
	}
	return request;
}
