import { useState } from "react";
import { toast } from "react-hot-toast";

function Newproduct() {
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "", 
    price: "",
    description: "",
  });
  const serverDomain = process.env.REACT_APP_SERVER_DOMAIN;

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    const { name, category, image, price } = data;

    if (name && category && image && price) {
      const fetchData = await fetch(`${serverDomain}/uploadProduct`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const fetchRes = await fetchData.json();
      console.log(fetchRes);
      toast(fetchRes.message);

      setData(() => {
        return {
          name: "",
          category: "",
          image: "",
          price: "",
          description: "",
        };
      });
    } else {
      toast("Enter required fields");
    }
  };

  return (
    <div className="p-4">
      <form
        className="m-auto w-full max-w-md  shadow flex flex-col p-3 bg-white rounded-lg"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          className="bg-slate-200 p-1 my-1 rounded-lg"
          onChange={handleOnChange}
          value={data.name}
        />

        <label htmlFor="category">Category</label>
        <select
          className="bg-slate-200 p-1 my-1 rounded-lg"
          id="category"
          name="category"
          onChange={handleOnChange}
          value={data.category}
        >
          <option value={"other"}>select category</option>
          <option value={"fruits"}>Fruits</option>
          <option value={"vegetable"}>Vegetable</option>
          <option value={"icecream"}>Icecream</option>
          <option value={"dosa"}>Dosa</option>
          <option value={"pizza"}>Pizza</option>
          <option value={"rice"}>Rice</option>
          <option value={"cake"}>Cake</option>
          <option value={"burger"}>Burger</option>
          <option value={"paneer"}>Paneer</option>
          <option value={"sandwich"}>Sandwich</option>
        </select>

        <label htmlFor="image">Image Link</label>
        <input
          type="text"
          className="bg-slate-200 p-1 my-1 rounded-lg"
          name="image"
          onChange={handleOnChange}
          value={data.image}
        />

        <label htmlFor="price" className="my-1">
          Price
        </label>
        <input
          type="text"
          className="bg-slate-200 p-1 my-1 rounded-lg"
          name="price"
          onChange={handleOnChange}
          value={data.price}
        />

        <label htmlFor="description">Description</label>
        <textarea
          rows={2}
          value={data.description}
          className="bg-slate-200 p-1 my-1 resize-none rounded-lg"
          name="description"
          onChange={handleOnChange}
        ></textarea>

        <button className="bg-red-500 hover:bg-red-600 text-white text-lg py-1 px-4 font-medium my-2 max-w-[20%] mx-auto drop-shadow rounded-lg">
          Save
        </button>
      </form>
    </div>
  );
}

export default Newproduct;
