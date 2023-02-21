import React from 'react';
import SearchBar from '../Components/SearchBar/SearchBar';
import Content from './Content';

const MainContent = () => {
  return (
    <div className='main'>
        <SearchBar />
        <Content />
    </div>
  )
}

export default MainContent;
