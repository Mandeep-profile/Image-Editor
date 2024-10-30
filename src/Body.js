import Header from "./Components/Header";
import Search from "./Components/Search";

const Body = ({handleOpenImage}) => {
  return (
    <div className="App">
      <Header />
      <Search handleOpenImage={handleOpenImage}/>
    </div>
  );
}

export default Body;