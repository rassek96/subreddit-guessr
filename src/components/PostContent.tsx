import React from "react";
import ReactPlayer from "react-player";
import { Post } from "api/submission";

type Props = {
  post: Post;
};
export const PostContent = ({ post }: Props) => {
  if (post.is_self) {
    return <div>{post.selftext}</div>;
  }

  if (post.is_video) {
    return (
      <ReactPlayer
        url={post.media?.reddit_video?.fallback_url}
        playing
        style={{ margin: "auto" }}
      />
    );
  }

  if (post.post_hint === "image") {
    return (
      <img
        src={post.url}
        alt="Post content"
        style={{
          objectFit: "cover",
          maxWidth: "95%",
          maxHeight: "99%",
        }}
      />
    );
  }

  if (post.post_hint === "link" || post.url) {
    return (
      <a href={post.url} target="_blank" rel="noopener noreferrer">
        {post.url}
      </a>
    );
  }

  return null;
};
