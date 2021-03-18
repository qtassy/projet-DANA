function httpRequest(url, options) {
    return new Promise((resolve, reject) => {
        fetch(url, options).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    console.log("resolve");
                    resolve(data);
                })
            } else {
                response.json().then(data => {
                    console.log("reject");
                    reject(data);
                })
            }
        });
    })
}


export  {httpRequest};