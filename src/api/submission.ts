import Snoowrap from "snoowrap";
import { config } from "./env";

const r = new Snoowrap(config);

export type Post = Snoowrap.Submission;
export type Comment = Snoowrap.Comment;

export const getPosts = (): Promise<Post[]> => {
  return r
    .getHot()
    .then((hotPosts) => hotPosts ?? [])
    .catch((error) => {
      console.error(error.message);
      return [];
    });
};
