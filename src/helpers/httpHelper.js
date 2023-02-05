const headers = {
  "Content-Type": "application/json"
};

async function request(url, method, data) {
  const options = {
    method: method || "POST",
    headers: headers || {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  const resp = await fetch(url, options);
  return resp;
}

export default request;
