import * as React from 'react'
import ReactPlayer from 'react-player'
import {BarLoader, MoonLoader} from 'react-spinners'
import styled from 'styled-components'
import {Comments} from './comments'

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin: auto;
  margin-bottom: 10px;
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
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
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
  }
  > button {
    background-color: #008CBA;
    border: none;
    color: white;
    text-decoration: none;
    font-size: 16px;
    width: 50px;
    cursor: pointer;
  }
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
  display: flex;
  flex-direction: column;
  > div {
    padding: 15px;
    padding-top: 0;
  }
  > span {
    color: gray;
    font-size: 14px;
  }
`
const PostScore = styled.span`
  padding: 15px;
  padding-bottom: 0;
`
const PostUser = styled.span`
  padding: 15px;
  padding-top: 0;
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
const CommentsContainer = styled.div`
  width: 100%;
  text-align: left;
  padding: 10px;
`

type Props = {
  posts: object,
}
type State = {
  post: any,
  postIndex: number,
  inputValue: string,
  buttonLoading: boolean,
  comments: object[],
  commentLoading: boolean,
}

const inputPlaceholderText = 'What subreddit was the post below submitted to?'
export class Main extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    const postIdx = 0
    this.state = {
      post: this.props.posts[postIdx],
      postIndex: postIdx,
      inputValue: '',
      buttonLoading: false,
      comments: [],
      commentLoading: false
    }
  }

  componentWillMount() {
    const currentPost = this.props.posts[this.state.postIndex]
    this.setState({
      post: currentPost
    })
    this.loadComments(currentPost)
  }

  loadComments(currentPost) {
    this.setState({commentLoading: true})
    currentPost.comments.fetchMore({amount: 50}).then(c => {
      const commentsSorted = c.sort((a,b) => (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0))
      this.setState({comments: commentsSorted, commentLoading: false})
    })
  }

  updatePost() {
    console.log(this.state.inputValue)
    console.log(this.state.post.subreddit_name_prefixed)
    this.setState({
      buttonLoading: true
    })
    // TODO CHECK SUBREDDIT CORRECT HERE
    const currentPostIndex = this.state.postIndex + 1
    const currentPost = this.props.posts[currentPostIndex]
    this.setState({
      postIndex: currentPostIndex,
      post: currentPost,
      buttonLoading: false
    })
    this.loadComments(currentPost)
  }

  render() {
    const {buttonLoading, inputValue, post, comments, commentLoading } = this.state
    console.log(post)
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
    else if (post.post_hint === 'link' || post.url) {
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
            value={inputValue}
            onFocus={(e) => e.target.placeholder = ''}
            onBlur={(e) => e.target.placeholder = inputPlaceholderText}
            onChange={e => this.setState({inputValue: e.target.value})}
          />
          <button
            onClick={() => this.updatePost()}
          >
            {buttonLoading ? <MoonLoader size={28} /> : 'Next'}
          </button>
        </SearchBar>
        <Content>
          <PostTitle>
            <PostScore>Score: {post.score}</PostScore>
            <PostUser>User: [Hidden]</PostUser>
            <div>{post.title && post.title}</div>
          </PostTitle>
          <PostDescription>
            <div>{postContent}</div>
          </PostDescription>
          <CommentsContainer>
            {commentLoading 
              ? <BarLoader width={98} widthUnit='%' height={5} color={'#FF4500'} /> 
              : <Comments comments={comments} />}
          </CommentsContainer>
        </Content>
      </Container>
    )
  }
}