import React, { useEffect, useState } from "react";
import { BarLoader, MoonLoader } from "react-spinners";
import { Post, Comment } from "api/submission";
import styled from "styled-components";
import { Comments } from "./Comments";
import { PostContent } from "./PostContent";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin: auto;
  margin-bottom: 10px;
  text-align: center;
  display: flex;
  flex-flow: column;
`;
const SearchBar = styled.div`
  margin: auto;
  margin-bottom: 30px;
  display: flex;
  flex-flow: row;
  justify-content: center;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  @media (max-width: 660px) {
    width: 95%;
    margin-bottom: 20px;
  }
  @media (max-width: 400px) {
    margin-bottom: 10px;
  }
`;

const SearchInput = styled.input`
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
`;

const SubmitButton = styled.button`
  ${({ disabled }) =>
    !disabled &&
    `&:hover {
      background-color: #008aaa;
    }
    cursor: pointer;
  `}

  background-color: #008cba;
  border: none;
  color: white;
  text-decoration: none;
  font-size: 16px;
  @media (max-width: 660px) {
    font-size: 12px;
  }
`;

const SubPrefix = styled.span`
  padding: 8px;
  height: 30px;
  font-size: 32px;
  background-color: white;
  border-radius: 5px 0px 0px 5px;
  line-height: 30px;
  @media (max-width: 660px) {
    height: 20px;
    font-size: 20px;
  }
  @media (max-width: 400px) {
    font-size: 16px;
  }
`;

const Content = styled.div`
  width: 90%;
  min-height: 70vh;
  margin: auto;
  background-color: white;
  border-radius: 5px 5px 5px 5px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  overflow: hidden;
  @media (max-width: 660px) {
    width: 99%;
  }
  @media (max-width: 400px) {
    width: 98%;
  }
`;
const PostInfo = styled.div`
  width: 100%;
  text-align: left;
  background-color: white;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  @media (max-width: 400px) {
    font-size: 16px;
  }
`;
const PostScore = styled.span`
  padding: 15px;
  padding-bottom: 0;
  color: gray;
  font-size: 14px;
  @media (max-width: 400px) {
    font-size: 13px;
  }
`;
const PostUser = styled.span`
  padding: 15px;
  padding-top: 0;
  color: gray;
  font-size: 14px;
  @media (max-width: 400px) {
    font-size: 13px;
  }
`;
const PostTitle = styled.div`
  padding: 15px;
  padding-top: 0;
  @media (max-width: 400px) {
    font-size: 14px;
  }
`;

const PostDescription = styled.div`
  width: 100%;
  background-color: whitesmoke;
  font-size: 16px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  > div {
    padding: 10px;
  }
`;
const ScoreScreen = styled(Content)`
  background-color: #ff4500;
  box-shadow: none;
  padding: 20px;
`;
const ScoreScreenTitle = styled.div`
  color: white;
  font-size: 30px;
`;
const ScoreScreenText = styled.div`
  color: white;
  font-size: 20px;
`;

const ScoreButton = styled.button`
  &:hover {
    background-color: #008aaa;
  }
  background-color: #008cba;
  color: white;
  font-size: 16px;
  margin: 10px;
  width: 150px;
  height: 60px;
  cursor: pointer;
`;

const CommentsContainer = styled.div`
  width: 100%;
  text-align: left;
  padding: 10px;
`;

type Props = {
  posts: Post[];
};

export const Main = ({ posts }: Props) => {
  const [post, setPost] = useState<Post>(posts[0]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [postIndex, setPostIndex] = useState(0);
  const [nextSub, setNextSub] = useState({
    isMatch: false,
    isNext: false,
  });

  useEffect(() => {
    loadComments(post);
  }, [post]);

  const loadComments = async (currentPost: Post) => {
    setLoadingComments(true);
    const comments: Comment[] = await currentPost.comments.fetchMore({
      amount: 50,
    });
    const sortedComments = comments.sort((a, b) => b.score - a.score);
    setComments(sortedComments);
    setLoadingComments(false);
  };

  const isSubMatch = (value: string) => {
    return (
      post.subreddit_name_prefixed.toLowerCase() === `r/${value.toLowerCase()}`
    );
  };

  const checkSubreddit = () => {
    const isMatch = isSubMatch(inputValue);
    setLoadingButton(true);
    setNextSub({
      isMatch,
      isNext: true,
    });
  };

  const setNextPost = (isNext: boolean) => {
    if (isNext) {
      const nextPostIndex = posts.length >= postIndex + 2 ? postIndex + 1 : 0;
      const nextPost = posts[nextPostIndex];
      setPostIndex(nextPostIndex);
      setPost(nextPost);
      setLoadingButton(false);
      setInputValue("");
      setNextSub({
        isMatch: false,
        isNext: false,
      });
    } else {
      setLoadingButton(false);
      setNextSub({
        isMatch: false,
        isNext: false,
      });
    }
  };

  const inputPlaceholderText =
    "Which subreddit was the post below submitted to?";

  return (
    <Container>
      <SearchBar>
        <SubPrefix>/r/</SubPrefix>
        <SearchInput
          type="text"
          placeholder={inputPlaceholderText}
          value={inputValue}
          onFocus={(e) => (e.target.placeholder = "")}
          onBlur={(e) => (e.target.placeholder = inputPlaceholderText)}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={nextSub.isNext}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              checkSubreddit();
            }
          }}
        />
        <SubmitButton disabled={nextSub.isNext} onClick={checkSubreddit}>
          {loadingButton ? <MoonLoader size={28} /> : "Submit"}
        </SubmitButton>
      </SearchBar>
      {nextSub.isNext ? (
        <ScoreScreen>
          <ScoreScreenTitle>
            {`/${post.subreddit_name_prefixed}`}
          </ScoreScreenTitle>
          {nextSub.isMatch ? (
            <ScoreScreenText>It's a match!</ScoreScreenText>
          ) : (
            <ScoreScreenText>It's not a match</ScoreScreenText>
          )}
          <ScoreScreenText>
            <ScoreButton onClick={() => setNextPost(false)}>
              See post again
            </ScoreButton>
          </ScoreScreenText>
          <ScoreScreenText>
            <ScoreButton onClick={() => setNextPost(true)}>
              Next post
            </ScoreButton>
          </ScoreScreenText>
        </ScoreScreen>
      ) : (
        <Content>
          <PostInfo>
            <PostScore>Score: {post.score}</PostScore>
            <PostUser>User: [Hidden]</PostUser>
            <PostTitle>{post.title && post.title}</PostTitle>
          </PostInfo>
          <PostDescription>
            <PostContent post={post} />
          </PostDescription>
          <CommentsContainer>
            {loadingComments ? (
              <BarLoader width="98%" height={5} color={"#FF4500"} />
            ) : (
              <Comments comments={comments} />
            )}
          </CommentsContainer>
        </Content>
      )}
    </Container>
  );
};
