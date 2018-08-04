const snoowrap = require('snoowrap')
require('dotenv').config()

const r = new snoowrap({
  userAgent: process.env.USER_AGENT,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  refreshToken: process.env.REFRESH_TOKEN,
})

const getPosts = async () => {
  const hotPosts = await r.getHot()
  console.log('hotPosts', hotPosts[0])
}

getPosts()