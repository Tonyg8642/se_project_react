const baseUrl = "http://localhost:3001";

function handleResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function getItems() {
  return fetch(`${baseUrl}/items`).then(handleResponse);
}
//pass the item you want to delete
// use the correct method
function deleteItem(item) {
  return fetch(`${baseUrl}/items/${item}`, { method: "DELETE" }).then(
    handleResponse
  );
}

function addItem({ name, imageUrl: imageUrl, weather, _id }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, imageUrl: imageUrl, weather, _id }),
  }).then(handleResponse);
}

export { getItems, deleteItem, addItem };
