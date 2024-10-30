import { useState } from "react";
import { API_Key } from "../Utils/Constants";
import "./Search.css";

const Search = ({handleOpenImage}) => {
  const [searchItem, setSearchItem] = useState("");
  const [images, setImages] = useState([]);

  const getImages = async (searchItem) => {
    try {
      const SearchAPI = `https://api.pexels.com/v1/search?query=${searchItem}`;
      const response = await fetch(SearchAPI, {
        headers: { Authorization: API_Key },
      });
      const data = await response.json();
      setImages(data.photos);
      setSearchItem("");
    } catch (error) {
      console.log("No data found", error);
    }
  };

  const handleSearchImages = () => {
    getImages(searchItem);
  };

  return (
    <>
    <div className="detail-div">
       <h4>Name : Mandeep Singh</h4>
       <p>Mandeepsinghworkspace@gmail.com</p>
    </div>
    <div className="search-main">
      <h2 className="title-page">Search Page</h2>
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
    </>
  );
};

export default Search;
