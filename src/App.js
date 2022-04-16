import React, { useEffect, useState, createContext, useMemo } from 'react';
import PhotosList from './PhotosList.js';
import './App.scss';

export const PhotosContext = createContext({
  currentPhotos: [],
  currentPage: 1,
  setCurrentPage: () => { },
});

export const ThemeContext = createContext({
  theme: ""
});

const App = () => {
  const [currentPhotos, setCurrentPhotos] = useState([]);
  const [theme, setTheme] = useState('light');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 2;

  const fetchPhotos = () => {
    fetch(`https://jsonplaceholder.typicode.com/photos?_page=${currentPage}&_limit=${perPage}`)
      .then((res) => res.json())
      .then((json) => {
        setCurrentPhotos(json);
      })
      .catch(err => console.log(err));
  }
  const randomTheme = () => {
    const themes = ['dark', 'light'];
    return themes[Math.floor(Math.random() * 2)];
  }

  const photoValue = useMemo(
    () => ({ currentPhotos, currentPage, setCurrentPage }),
    [currentPhotos, currentPage]
  );

  const themeValue = useMemo(
    () => ({ theme }),
    [theme]
  );

  useEffect(() => {
    fetchPhotos();
  }, []);

  useEffect(() => {
    fetchPhotos();
    setTheme(randomTheme());
  }, [currentPage, theme]);

  return (
    <div className="App">
      <header className="App-header">
        <PhotosContext.Provider value={photoValue}>
          <ThemeContext.Provider value={themeValue}>
            <PhotosList />
          </ThemeContext.Provider>
        </PhotosContext.Provider>
      </header>
    </div>
  );
}

export default App;
