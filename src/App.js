import React, { useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Body from "./Body";
import "./Styles.css";
import CanvasEditor from "./Components/CanvasEditor";

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const handleOpenImage = (imgUrl) => {
    setSelectedImage(imgUrl);
    navigate("/canvas");
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Body handleOpenImage={handleOpenImage} />} />
        <Route path="/canvas" element={<CanvasEditor selectedImage={selectedImage}  />} />
      </Routes>
    </div>
  );
};

export default App;
