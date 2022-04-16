import { React, useContext } from 'react';
import { PhotosContext, ThemeContext } from "./App";

const PhotosList = () => {
  const { currentPhotos, currentPage, setCurrentPage } = useContext(PhotosContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div id="photos-list-container"
      style={{
        "background-color": theme === "light" ? "white" : "black"
      }}
    >
      {currentPhotos &&
        <ul id="photos-list">
          {currentPhotos.map((data, key) => {
            return (
              <li key={key}>
                <h3
                  style={{
                    color: theme === "light" ? "black" : "white"
                  }}
                >
                  {data.title}</h3>
                <img
                  src={data.url}
                  alt={data.title}
                >
                </img>
              </li>
            )
          })}
        </ul>
      }
      <button
        id="fetch-photos"
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Fetch Photos
      </button>
    </div>
  )
}

export default PhotosList;
