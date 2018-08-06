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
  @media (max-width: 660px) {
      width: 95%;
      margin-bottom: 20px;
  }
  @media (max-width: 400px) {
      margin-bottom: 10px;
  }
  > span {
    padding: 8px;
    height: 30px;
    font-size: 32px;
    background-color: white;
    border-radius: 5px 0px 0px 5px;
    @media (max-width: 660px) {
      height: 20px;
      font-size: 20px;
    }
    @media (max-width: 400px) {
      font-size: 16px;
    }
  }
  > input {
    padding: 8px;
    height: 30px;
    width: 500px;
    font-size: 18px;
    border: none;
    background-color: white;
    @media (max-width: 660px) {
      width: 100%;
      height: 20px;
      font-size: 12px;
    }
    @media (max-width: 400px) {
      font-size: 10px;
    }
  }
  > button {
    &:hover {
      background-color: #008AAA;
    }
    background-color: #008CBA;
    border: none;
    color: white;
    text-decoration: none;
    font-size: 16px;
    width: 50px;
    cursor: pointer;
    @media (max-width: 660px) {
      font-size: 12px;
    }
  }
`
const Content = styled.div`
  width: 90%;
  min-height: 70vh;
  margin: auto;
  background-color: white;
  border-radius: 5px 5px 5px 5px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
  overflow: hidden;
  @media (max-width: 660px) {
    width: 99%;
  }
  @media (max-width: 400px) {
    width: 98%;
  }
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
    @media (max-width: 400px) {
      font-size: 14px;
    }
  }
  > span {
    color: gray;
    font-size: 14px;
    @media (max-width: 400px) {
      font-size: 13px;
    }
  }
  @media (max-width: 400px) {
    font-size: 16px;
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
const ScoreScreen = styled(Content)`
  background-color: #FF4500;
  box-shadow: none;
  padding: 20px;
`
const ScoreScreenTitle = styled.div`
  color: white;
  font-size: 30px;
`
const ScoreScreenText = styled.div`
  color: white;
  font-size: 20px;
  > button {
    &:hover {
      background-color: #008AAA;
    }
    background-color: #008CBA;
    color: white;
    font-size: 16px;
    margin: 10px;
    width: 150px;
    height: 60px;
    cursor: pointer;
  }
`
const CommentsContainer = styled.div`
  width: 100%;
  text-align: left;
  padding: 10px;
`

const isSubMatch = (value: string, subreddit: string) => {
  return subreddit.toLowerCase() === `r/${value.toLowerCase()}`
}

type Props = {
  posts: any[],
}
type State = {
  post: any,
  postIndex: number,
  inputValue: string,
  buttonLoading: boolean,
  comments: object[],
  commentLoading: boolean,
  subNext: {isMatch: boolean, isNext: boolean},
}

const inputPlaceholderText = 'Which subreddit was the post below submitted to?'
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
      commentLoading: false,
      subNext: {
        isMatch: false,
        isNext: false,
      },
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

  checkSubreddit() {
    const match = isSubMatch(this.state.inputValue, this.state.post.subreddit_name_prefixed)
    this.setState({
      buttonLoading: true,
      subNext: {
        isMatch: match,
        isNext: true,
      },
    })
  }
  
  nextPost(isNext) {
    if (isNext) {
      const currentPostIndex = (this.props.posts.length >= this.state.postIndex + 2)
        ? this.state.postIndex + 1
        : 0
      const currentPost = this.props.posts[currentPostIndex]
      this.setState({
        postIndex: currentPostIndex,
        post: currentPost,
        buttonLoading: false,
        inputValue: '',
        subNext: {
          isMatch: false,
          isNext: false,
        },
      })
      this.loadComments(currentPost)
    }
    else {
      this.setState({
        buttonLoading: false,
        subNext: {
          isMatch: false,
          isNext: false,
        },
      })
    }
  }

  render() {
    const {buttonLoading, inputValue, post, comments, commentLoading, subNext } = this.state
    let postContent
    if (post.is_self) {
      postContent = <div>{post.selftext}</div>
    }
    else if (post.is_video) {
      postContent = <ReactPlayer url={post.media.reddit_video.fallback_url} playing={true} style={{margin: 'auto'}}/>
    }
    else if (post.post_hint === 'image') {
      postContent = <img src={post.url} style={{
        objectFit: 'cover',
        maxWidth: '95%',
        maxHeight: '99%',
      }} />
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
            disabled={subNext.isNext}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                this.checkSubreddit()
              }
            }}
          />
          <button
            disabled={subNext.isNext}
            onClick={() => this.checkSubreddit()}
          >
            {buttonLoading ? <MoonLoader size={28} /> : 'Enter'}
          </button>
        </SearchBar>
        {subNext.isNext ? (
          <ScoreScreen>
            <ScoreScreenTitle>
              {`/${post.subreddit_name_prefixed}`}
            </ScoreScreenTitle>
            {subNext.isMatch ? (
              <ScoreScreenText>
                It's a match!
              </ScoreScreenText>
            ) : (
              <ScoreScreenText>
                It's not a match
              </ScoreScreenText>
            )}
            <ScoreScreenText>
              <button
                onClick={() => this.nextPost(false)}
              >
                See post again
              </button>
            </ScoreScreenText>
            <ScoreScreenText>
              <button
                onClick={() => this.nextPost(true)}
              >
                Next post
              </button>
            </ScoreScreenText>
          </ScoreScreen>
        ) : (
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
        )}
      </Container>
    )
  }
}