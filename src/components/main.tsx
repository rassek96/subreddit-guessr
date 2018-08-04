import * as React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin: auto;
  text-align: center;
  display: flex;
  flex-flow: column;
`
const SearchBar = styled.div`
  margin: auto;
  margin-bottom: 30px;
  display: flex;
  flex-flow: row;
  justify-content: center;
  > span {
    padding: 8px;
    height: 30px;
    font-size: 32px;
    background-color: white;
    border-radius: 5px 0px 0px 5px;
  }
  > input {
    padding: 8px;
    height: 30px;
    width: 500px;
    font-size: 18px;
    border: none;
    border-radius: 0px 5px 5px 0px;
  }
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
`
const Content = styled.div`
  width: 90%;
  min-height: 70vh;
  margin: auto;
  background-color: white;
  border-radius: 5px 5px 5px 5px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
`
const PostTitle = styled.div`
  width: 100%;
  text-align: left;
  background-color: white;
  font-size: 20px;
  > div {
    padding: 15px;
  }
`
const PostDescription = styled.div`
  width: 100%;
  text-align: left;
  background-color: whitesmoke;
  font-size: 16px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
  > div {
    padding: 10px;
    padding-left: 30px;
  }
`

const inputPlaceholderText = 'What subreddit was the post below submitted to?'
export const Main = () => (
  <Container>
    <SearchBar>
      <span>/r/</span>
      <input type='text' placeholder={inputPlaceholderText}
        onFocus={(e) => e.target.placeholder = ''}
        onBlur={(e) => e.target.placeholder = inputPlaceholderText}
      />
    </SearchBar>
    <Content>
      <PostTitle>
        <div>This is a title</div>
      </PostTitle>
      <PostDescription>
        <div>This is a description</div>
      </PostDescription>
    </Content>
  </Container>
)