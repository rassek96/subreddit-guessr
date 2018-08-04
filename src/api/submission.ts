const snoowrap = require('snoowrap')
require('dotenv').load()

const r = new snoowrap({
  userAgent: process.env.USER_AGENT,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  refreshToken: process.env.REFRESH_TOKEN,
})


export const getPosts = () => {
  const hotPosts = r.getHot()
  return hotPosts
}