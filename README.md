# subreddit-guessr

Simple web based game where you need to guess which subreddit a given post from the frontpage was originally submitted to based on its contents and comments.

The game is super simple and the design is pretty meh... But hey, it works.  
Might develop it further at some point, though probably not.

## How to run

The application needs Reddit API OAuth configuration to run.   

You need to set up a Reddit App if you haven't one already. It's really simple. Go to https://www.reddit.com/prefs/apps, and create a new app. Give it a name, make sure to set it as a script application. Set `http://127.0.0.1` as redirect-url (doesn't matter, but the field is required.)

In `src/api/`, create a file `env.ts` and add the following lines, replacing the brackets with actual values:

```typescript
// src/api/env.ts

export const config = {
  userAgent: <USER_AGENT>,         // Identifies the program to reddit, can be any string value.
  username: <USERNAME>,            // Username to a reddit account
  password: <PASSWORD>,            // Password to the reddit account
  clientId: <CLIENT_ID>,           // ID of the Reddit App (from https://www.reddit.com/prefs/apps)
  clientSecret: <CLIENT_SECRET>,   // Secret of the Reddit App (from https://www.reddit.com/prefs/apps)
};
```

Install dependencies
```
yarn
```

Run application
```
yarn start
```

Done