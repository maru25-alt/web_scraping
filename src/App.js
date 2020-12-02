import React from 'react';
//import { Counter } from './features/counter/Counter';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/SideBar';
import SearchBar from './components/SearchBar';
import ProductsContainer from './components/ProductsContainer';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <div className="app">
        <div className="row mb-3">
              <div className="offset-xs-0 offset-sm-3 col-xs-12 col-sm-9">
                   <SearchBar></SearchBar>
              </div>
        </div>
        <div className="row">
            <div className=" col-sm-3"> <Sidebar></Sidebar></div>
            <div className="col-xs-9 col-sm-9"><ProductsContainer></ProductsContainer> </div>
        </div>
      </div>
      <Footer></Footer>

    </div>
  );
}

export default App;
