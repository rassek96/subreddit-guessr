import * as React from 'react'
import {getPosts} from './api/submission'
import {Main} from './components/main'
import {TopBar} from './components/topBar'

export class App extends React.Component<any,any> {
  constructor(props) {
    super(props)
    this.state = {
      posts: []
    }
  }
  componentDidMount() {
    getPosts().then(post => {
      this.setState({posts: post})
    })
  }

  render() {
    const posts = this.state.posts
    return posts && posts.length ? (
      <div id='container'>
        <TopBar />
        <Main posts={posts} />
      </div>
    ) : (
      <div id='container'>
        <TopBar />
      </div>
    )
  }
}