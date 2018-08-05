import snoowrap from 'snoowrap'
import {config} from './env'

const r = new snoowrap(config)

export const getPosts = () => {
  const hotPosts = r.getHot()
  return hotPosts
}