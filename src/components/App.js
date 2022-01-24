import React, { useEffect, useState } from 'react';
// import { Router, Routes, Route } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { init } from '../actions';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from '../routes/Home';
import Movies from '../routes/Movies';
import TVShows from '../routes/TVShows';
import Detail from '../routes/Detail';
import SidebarData from './data/SidebarData';
// import ScrollToTop from '../helpers/ScrollToTop';
// import history from '../history';
import styles from './App.module.css';

const App = ({ init }) => {
  const [selectedSidebar, setSelectedSidebar] = useState(SidebarData[0].title);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [detailBackground, setDetailBackground] = useState({
    isON: false,
    url: '',
  });

  console.log(detailBackground.url);

  useEffect(() => {
    init();
  }, []);

  return (
    <div
      className={`${styles.container} ${detailBackground.isON && styles.modal}`}
      style={{
        // ⚠️画像の読み込み失敗時のために、デフォルトの背景色を変更しておく！
        // backgroundColor: 'red',
        backgroundImage:
          detailBackground.isON &&
          `linear-gradient(to top left, rgba(14, 13, 11, 0.95), rgba(14, 13, 11, 0.95)), url('https://image.tmdb.org/t/p/original${detailBackground.url}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        // backdropFilter: detailBackground.isON && 'blur(10px)',
      }}
    >
      {/* <Router history={history}> */}
      <BrowserRouter>
        <Header isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <Sidebar
          selectedSidebar={selectedSidebar}
          setSelectedSidebar={setSelectedSidebar}
          isCollapsed={isCollapsed}
        />
        {/* <ScrollToTop /> */}
        <Routes>
          <Route
            path="/"
            element={<Home setSelectedSidebar={setSelectedSidebar} />}
          />
          <Route
            path="movies/*"
            element={<Movies setSelectedSidebar={setSelectedSidebar} />}
          />
          <Route
            path="tvshows/*"
            element={<TVShows setSelectedSidebar={setSelectedSidebar} />}
          />
          <Route
            path="detail/:id"
            element={<Detail setDetailBackground={setDetailBackground} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default connect(null, {
  init,
})(App);
