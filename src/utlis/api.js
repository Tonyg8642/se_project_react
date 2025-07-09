const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}
//pass the item you want to delete
// use the correct method
function deleteItem(item) {
  return fetch(`${baseUrl}/items/${item}`, { method: "DELETE" }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

function addItem({ name, imageUrl: imageUrl, weather, _id }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    body: JSON.stringify({ name, imageUrl: imageUrl, weather, _id }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

export { getItems, deleteItem, addItem };
