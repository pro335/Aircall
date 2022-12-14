import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header.jsx';
import ActivityFeed from './components/Activity/ActivityFeed.jsx';
import styled, { createGlobalStyle } from "styled-components";

const Container = styled.div`
  width: 376px;
  height: 666px;
  z-index: 100;

  background: white;
  border-radius: 3px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.9);
`;

const GlobalStyle = createGlobalStyle`
  html,
  body,
  h1,
  h2,
  h3,
  ul,
  li {
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    font-size: 100%;
  }

  body {
    background: #233142;
    font-family: helvetica, arial, sans-serif;
    font-size: 13px;
    color: #333333;
    line-height: 1;
  }
`;

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;



const App = () => {
  return (
    <div className='container'>
      <Wrapper>
        <GlobalStyle />
        <Container>
          <Header />
          <ActivityFeed />
        </Container>
      </Wrapper>
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
