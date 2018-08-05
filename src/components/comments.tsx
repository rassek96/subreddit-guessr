import marked from 'marked'
import * as React from 'react'
import styled from 'styled-components'

const CommentsHeader = styled.div`
  width: 95%;
  color: gray;
  border-bottom: 1px solid gray;
`
const CommentField = styled.div`
  width: 92%;
  border-bottom: 1px solid gray;
  padding: 20px;
`
const Score = styled.div`
  font-size: 14px;
  color: gray;
`
const User = styled.div`
  font-size: 12px;
  color: gray;
`
const Body = styled.div`
  margin-top: 5px;
`

type Props = {
  comments: any,
}
type State = {}

export class Comments extends React.Component<Props, State> {
  constructor(props) {
    super(props)
  }

  render() {
    const {comments} = this.props
    return (
      <div>
        <CommentsHeader>Comments</CommentsHeader>
        {comments.map((comment, i) => (
          <CommentField key={i}>
            <Score>
              Score: {comment.score}
            </Score>
            <User>
              User: [Hidden]
            </User>
            <Body>
              <div dangerouslySetInnerHTML={{__html: marked(comment.body)}} />
            </Body>
          </CommentField>
        ))}
      </div>
    )
  }
}