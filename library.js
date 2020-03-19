"use strict";

class HTTPRequest {
	get(url) {
		return new Promise((resolve, reject) => {
			fetch(url, {
        method: "GET"
      })
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err))
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
