import * as React from 'react'
import ReactPlayer from 'react-player'
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
  background-color: whitesmoke;
  font-size: 16px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);

  > div {
    padding: 10px;
  }
`

const inputPlaceholderText = 'What subreddit was the post below submitted to?'
export class Main extends React.Component<any,any> {
  constructor(props) {
    super(props)
    const postIdx = 0
    this.state = {
      post: this.props.posts[postIdx],
      comments: [],
      postIndex: postIdx}
  }
  componentDidMount() {
    // this.state.post.comments.then(c => {
    //   console.log(c)
    //   this.setState({comments: c})
    // })
  }

  render() {
    const {comments} = this.state
    const post = this.props.posts[this.state.postIndex]
    console.log(this.state.post)    
    let postContent
    if (post.is_self) {
      postContent = <div>{post.selftext}</div>
    }
    else if (post.is_video) {
      postContent = <ReactPlayer url={post.media.reddit_video.fallback_url} playing={true} style={{margin: 'auto'}}/>
    }
    else if (post.post_hint === 'image') {
      postContent = <img src={post.url}/>
    }
    else if (post.post_hint === 'link') {
      postContent = <a href={post.url} target='_blank'>{post.url}</a>
    }
    else if (post.url) {
      postContent = <a href={post.url} target='_blank'>{post.url}</a>
    }
    else {
      postContent = ''
    }

    return (
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
            <div>{post.title && post.title}</div>
          </PostTitle>
          <PostDescription>
            <div>{postContent}</div>
          </PostDescription>
          {comments.map((comment, i) => (
            <div key={i}>Comment{console.log(comment)}</div>
          ))}
        </Content>
      </Container>
    )
  }
}