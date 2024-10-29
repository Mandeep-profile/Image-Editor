import { useState } from "react";
import { API_Key } from "../Utils/Constants";
import "./Search.css";

const Search = () => {
  const [searchItem, setSearchItem] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();

  const getImages = async (searchItem) => {
    try {
      const SearchAPI = `https://api.pexels.com/v1/search?query=${searchItem}`;
      const response = await fetch(SearchAPI, {
        headers: { Authorization: API_Key },
      });
      const data = await response.json();
      setImages(data.photos);
      setSearchItem("");
      console.log(data);
    } catch (error) {
      console.log("No data found", error);
    }
  };

  const handleSearchImages = () => {
    getImages(searchItem);
  };

  const handleOpenImage = (imgUrl) => {
    setSelectedImage(imgUrl);
  };
  return (
    <div className="search-main">
      <input
        type="text"
        placeholder="Enter Image Title"
        className="input-search"
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
      />
      <button className="search-btn" onClick={handleSearchImages}>
        Search
      </button>

      <div className="img-container">
        {images?.map((img) => (
          <div className="image-main">
            <img
              src={img.src.medium}
              key={img.id}
              className="images"
              alt="Images"
            />
            <button
              className="caption-btn"
              onClick={() => handleOpenImage(img.src.medium)}
            >
              Add Caption
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
