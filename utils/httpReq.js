const BASE_URL = "https://fakestoreapi.com";

const postData = async (path, data) => {
  try {
    const res = await fetch(`${BASE_URL}/${path}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json" },
    });

    const json = await res.json();
    return json;
  } catch (error) {
    alert("An error occurred: " + error.message);
  }
};

const getData = async (path) => {
  try {
    const res = await fetch(`${BASE_URL}/${path}`);
    const data = res.json();
    return data;
  } catch (error) {
    alert("error " + error.message);
  }
};

export { postData, getData };
