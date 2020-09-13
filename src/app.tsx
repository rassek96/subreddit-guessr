import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getPosts, Post } from "./api/submission";
import { Main } from "./Components/Main";
import { TopBar } from "./Components/TopBar";

export const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  return (
    <div>
      <TopBar />
      {posts.length && <Main posts={posts} />}
    </div>
  );
};
