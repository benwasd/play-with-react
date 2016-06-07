Setting up a project from scratch
=================================

What we'll use:
- npm (for dependencies)
- webpack (for bundling/packaging)
- babel (for modern javascript)
- react (for ui components)
- redux (for state handling)
- sass (for styling)

Walkthrough (part 1)
--------------------

#### 1. Create a new folder somewhere on your computer

```
>> mkdir my-amazing-app && cd my-amazing-app
```

#### 2. Initialize the app/directory by using `npm init`

```
>> npm init
```

This will take you through the steps of initializing a node-app

Press `ENTER` all the way through and it will give you something like this:

```
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg> --save` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
name: (my-amazing-app)
version: (1.0.0)
description:
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to /Users/eirik/Development/opensource/my-amazing-app/package.json:

{
  "name": "my-amazing-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

#### 3. Install webpack in the project

Install and save as dependencies in your project

```
>> npm install webpack webpack-dev-server --save
```

Also - install them globally, so we can use them on the command line

```
>> npm install webpack webpack-dev-server -g
```

This will give you both webpack and the webpack development server which we'll use when developing our app.

#### 4. Create a `src` folder where we'll put our app source code

```
>> mkdir src && cd src
```

#### 5. Create an entry file for our webpack build

We'll go ahead and call this file `entry.js` for now:

```
>> touch entry.js
```

At the same time open your editor and add this to `entry.js`

```js
/**
 * /src/entry.js
 */

console.log('We are live!');
```

#### 6. Now lets set up our webpack config

First we'll have to tell webpack which file(s) it should pack, and where we want to put the bundle(s)

So start by creating a `webpack.config.js` in the root folder:

```
>> touch webpack.config.js
```

And populate it with the following content:

```js
/**
 * /webpack.config.js
 */

var webpack = require('webpack');

module.exports = {
  entry: [
    './src/entry.js'
  ],

  output: {
    path: './public/',
    publicPath: '/',
    filename: 'bundle.js'
  },
};
```

Here we have specified that we want our `entry.js` file to be "webpacked" and to place the resulting output in `/public/bundle.js`. Looking good so far!

#### 7. (alternative 1 - simple) Create an html file to display your app

Create the `/public` folder and create a new file `index.html`

```
>> mkdir public && cd public && touch index.html
```

And populate it with the following content:

```html
<!-- /public/index.html -->

<!doctype html>
<html>

<head>
  <meta charset="utf-8">
  <title>My Amazing App</title>
</head>

<body>
  <div id="app"></div>
  <script src="/bundle.js"></script>
</body>

</html>
```

If you want this `index.html` to be generated by webpack, then take a look at the next alternative (otherwise skip it for now).

#### 7. (alternative 2 - better in the long run) Use html-webpack-plugin to generate an html file to serve our app

We also need an HTML file that serves our bundled JavaScript app.

For this we will use a webpack plugin called `html-webpack-plugin`

So the first thing we'll do is to install it:

```
>> npm install html-webpack-plugin --save
```

Then - to use the plugin we'll include a new entry in our `webpack.config.js` file:

```js
/**
 * /webpack.config.js
 */

var webpack = require('webpack');

/**
 * Include our new plugin module
 */
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './src/entry.js'
  ],

  output: {
    path: './public/',
    publicPath: '/',
    filename: 'bundle.js'
  },

  /**
   * Here we'll add our new plugin
   */
  plugins: [new HtmlWebpackPlugin()]
};
```

This will now (when running webpack) produce a simple `index.html` file in the `/public` folder with our JavaScript app injected:

```html
<!-- /public/index.html -->

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Webpack App</title>
  </head>
  <body>
    <script src="bundle.js"></script>
  </body>
</html>
```

You could of course also just create this `index.html` manually yourself (see 7. (alternative 1)) and place it in `/public`, but we'll see shortly why it's more practical to use this plugin in the long run.

Since we're going to use React in our project we'll want to do some customization to our `index.html`, so we'll use another option provided by `html-webpack-plugin`, which is templates.

Create the following file in the project root folder and call it `index.template.html` which will serve as the template for generating the `index.html` in `/public`:

```
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
    <title>{%= o.htmlWebpackPlugin.options.title %}</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

And change the webpack configuration to the following:

```js
/**
 * /webpack.config.js
 */

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './src/entry.js'
  ],

  output: {
    path: './public/',
    publicPath: '/',
    filename: 'bundle.js'
  },

  /**
   * Here we change some of the options
   */
  plugins: [new HtmlWebpackPlugin({
    title: 'My React App', // set a custom title
    template: 'index.template.html', // use our custom template
    inject: 'body' // inject our bundled script into the body
  })]
};
```

This will now produce an `index.html` file in `/public` that contains the following:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
    <title>My React App</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="bundle.js"></script>
  </body>
</html>
```

With all of this tedious stuff done we should be able to continue getting our app set up.

#### 8. Test run your app

Now you can try to start the webpack-dev-server and try out your app:

```
>> webpack-dev-server --content-base public --port 3000
```

Here we're actually saying:
- run webpack-dev-server
- use the `/public` folder as the folder you serve content from
- run the server on port 3000

And now you can head to [localhost:3000](http://localhost:3000) and open the console, and you should see

```
We are live!
```

#### 9. Add React to the project

We won't get far with just console logging stuff, so we'll install React as well

```
>> npm install react react-dom --save
```

This installs the React library for building components, in addition to the separate DOM-library that you use to render React apps into a browser DOM.

#### 10. Create a simple React app

Create a new folder in `/src` called `/components`

```
>> cd src && mkdir components && cd components
```

Inside that folder create a new file called `App.jsx`

```
>> touch App.jsx
```

Add the following content

```js
/**
 * /src/components/App.jsx
 */

const React = require('react');

const App = React.createClass({
  render() {
    const superStyles = {
      backgroundColor: 'yellow'
    };

    return (
      <div style={superStyles}>
        <h1>My Amazing React App!</h1>
      </div>
    );
  }
});

module.exports = App;
```

And we also need to make som additions to `/src/entry.js`

```js
/**
 * /src/entry.js
 */

//console.log('We are live!');

const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./components/App.jsx');

ReactDOM.render(<App />, document.getElementById('app'));
```

Now head to [localhost:3000](http://localhost:3000) again to see if you have your new React app!

(....)

Not working..?

That's because we're using new syntax that browsers aren't supporting yet. And browsers definitely don't understand JSX!

So we'll have to fix that by running all our code through the babel transpiler.

We can do this through webpack, but first we need to do some installing

#### 11. Adding babel to the project

First we need to install everything we need related to babel

```
>> npm install babel-cli babel-core babel-preset-es2015 babel-preset-react babel-loader --save
```

What we're installing here is
- the babel command line interface
- the babel runtime/engine
- presets for compiling es2015 and react
- a "loader" which webpack uses to transform our code with babel

So now we have to add some stuff to our `package.json` file to tell babel which presets we want to use when transpiling/converting. See the new `"babel"` field introduced.

```json
{
  "name": "my-amazing-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "babel-cli": "^6.4.0",
    "babel-core": "^6.4.0",
    "babel-loader": "^6.2.1",
    "babel-preset-es2015": "^6.3.13",
    "babel-preset-react": "^6.3.13",
    "react": "^0.14.6",
    "react-dom": "^0.14.6",
    "webpack": "^1.12.10",
    "webpack-dev-server": "^1.14.0"
  },
  "babel": {
    "presets": [
      "es2015",
      "react"
    ]
  }
}
```

In addition we need to tell webpack to use the `babel-loader` to transform our javascript files:

```js
/**
 * webpack.config.js
 */

var webpack = require('webpack');

module.exports = {
  entry: [
    './src/entry.js'
  ],

  output: {
    path: './public/',
    publicPath: '/',
    filename: 'bundle.js'
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'], // ['babel-loader'] also works
      exclude: /node_modules/,
    }]
  }
};
```

Here we're telling webpack that every time we `require` something in our code that is webpack we want to run any file with the `.js` or `.jsx` extension through the babel loader. We also tell webpack that it can ignore doing that for `require` calls to npm modules in `node_modules` as we don't want to worry about those for now, since they should work without.

So once again - let's go and check out [localhost:3000](http://localhost:3000)

Wohoo - you should now have your React app showing in the browser!

#### 12. Debugging our simple application

To demonstrate some of the issues of debugging application that are bundled we'll add a console.log to our application in `App.jsx`. Change it to the following:

```js
/**
 * /src/components/App.jsx
 */

const React = require('react');

const App = React.createClass({
  render() {
    console.log('Where am i...?'); // add a log statement

    const superStyles = {
      backgroundColor: 'yellow'
    };

    return (
      <div style={superStyles}>
        <h1>My Amazing React App!</h1>
      </div>
    );
  }
});

module.exports = App;
```

Now head to the browser and check the developer console

Where does it say that something has been logged..?

(......)

A reference to `bundle.js` and line 20000 something.. That's gonna be hard to track down eventually (and already is!), as it does not correspond to any of the files in your project folder.

Let's fix that!

#### 13. Adding source maps for better debugging

As we've seen, the app is a bit hard to debug now, since we haven't enabled source maps for webpack, so let's do that:

```js
var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',

  entry: [
    './src/entry.js'
  ],

  output: {
    path: './public/',
    publicPath: '/',
    filename: 'bundle.js'
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      exclude: /node_modules/,
    }]
  }
};
```

This tells webpack that we want to use the inline source maps option (see the docs for more options).

Now, restart the app with:

```
>> webpack-dev-server --content-base public --port 3000
```

And trace the origin of the `console.log` again.

Better huh? :-)

Now you actually get a reference to the exact location of the event and file it originated from.

Instead of `bundle.js` line 19854, you now have `App.jsx` line 5.

So far so good!

#### 14. Creating a way of running our app in production

Right now we're able to run our app using the webpack-dev-server, which runs a webserver for us.

But let's go ahead and create our own little web server in node to run the app ourselves:

First we'll install a small framework called Express and some small helpers

```
>> npm i express serve-static --save
```

Followed by creating a new file in our root called `app.js`

```
>> touch app.js
```

with the following content

```js
/**
 * app.js
 */

const path = require('path');
const express = require('express');
const serveStatic = require('serve-static');

const app = express();
const port = process.env.PORT || 3000;

// Use this middleware to server up static files built into /public
app.use(serveStatic(path.join(__dirname, 'public')));

// attach to port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
```

As you probably noticed - we're using ES6/ES2015 syntax here as well. Unfortunately node doesn't support this fully yet either.

But we can solve this by using the `babel-core` require hook.

So let's create another new file called `start.js` in our root folder:

```
>> touch start.js
```

with the following content:

```js
'use strict';

require('babel-core/register');
require('./app.js');
```

Now you can try to manually build you bundle by running:

```
>> webpack
```

Which will create the `bundle.js` in `/public`

And you can start your application by running:

```
node start.js
```

Now you should have your React app running from your own node server.

Start hacking! :)

#### 15. Create npm scripts to make our app ready for deployment

Extend your `package.json` file to include the following under `"scripts"`:

```json
{
  ....
  "scripts": {
    "develop": "node_modules/.bin/webpack-dev-server --content-base public --port 3000",
    "start": "node start.js",
    "build": "webpack",
    "postinstall": "npm run build"
  },
  ....
}
```

Now you can run your development server by doing:

```
>> npm run develop
```

And you can build and run your production environment by doing:

```
>> npm run build && npm start
```

#### 16. Adding Hot Loading

We also want to use hot loading in our development server (because it's awesome!).

First we'll have to install the `react-hot-loader` package that webpack needs to hot load React components

```
>> npm install react-hot-loader --save
```

Then we need to add some additional entries to our `webpack.config.js` file that is specific to hot loading:

```js
var webpack = require('webpack');

module.exports = {
  entry: [
    './src/entry.js'
  ],

  output: {
    ....
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel'],
      exclude: /node_modules/,
    }]
  }
};
```

What we've added here is another loader for our `.js` and `.jsx` files which enables hot loading for react components

Now, in `package.json` we can also change our npm script `develop` to use enable hot loading by adding ` --hot --inline`

```json
{
  ....
  "scripts": {
    "develop": "node_modules/.bin/webpack-dev-server --content-base public --port 3000 --hot --inline",
    ....
  },
  ....
}
```

We should now have hot loading when we run `npm run develop`.

#### 17. Making it production ready and deploying to Heroku

Add the following to your `package.json` to specify to Heroku which version of node you want to install with your app:

```json
{
  ...
  "engines": {
    "node": "5.3.x"
  },
  ...
}
```

We also want to do some production optimizations to our "webpacked" JavaScript bundle, like:

1. Put React in production mode (smaller and faster)

2. Remove all duplicate code entries (deduping)

3. Minify the code to reduce file size

4. Use separate files for source maps (`.map`), since they take up pretty much space when inlined into the bundle itself

Which introduces the following changes of our `webpack.config.js` file:

```js
var webpack = require('webpack');

/**
 * Check if we are running production mode
 */
var isProduction = process.env.NODE_ENV == 'production';

/**
 * Create an array of plugins that
 * we'll use in our webpack config
 */
var plugins = [];

/**
 * Forward process.env.NODE_ENV into the bundle
 * to enable React.js production mode
 */
plugins.push(new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
}))

/**
 * Do code de-duping and minification
 * when running production mode
 */
if (isProduction) {
  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
  devtool: isProduction ? 'source-map' : 'inline-source-map',

  entry: [
    './src/entry.js'
  ],

  output: {
    path: './public/',
    publicPath: '/',
    filename: 'bundle.js'
  },

  plugins: plugins, // add the plugins we want to the config

  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel'],
      exclude: /node_modules/,
    }]
  }
};
```

And we'll also create a new file in the root called `.gitignore` (yes - with a dot in front) to avoid checking in any unwanted files to our repository (like github) or production environment (like heroku).

Add the following content:

```
# Compiled source #
###################
*.com
*.class
*.dll
*.exe
*.o
*.so

# Packages #
############
# it's better to unpack these files and commit the raw source
# git has its own built in compression methods
*.7z
*.dmg
*.gz
*.iso
*.jar
*.rar
*.tar
*.zip

# Logs and databases #
######################
*.log
*.sql
*.sqlite

# OS generated files #
######################
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db


# Custom
########
node_modules

# Bundles created by webpack
############################
**/public/*.js
**/public/*.map
```

Then:

(If you have any trouble - just ask!)

1. Create a user on Heroku
2. Create a new app from the Heroku dashboard
3. Follow the instructions to deploy your node app using git
4. Go to your app settings in Heroku and set the environment variable `NODE_ENV` to `production`
5. ????
6. Profit! :)


Walkthrough (part 2)
--------------------

Copy the files from `/project/components/` into `/src/components` of your project

```
App.jsx
AddChat.jsx
ChatList.jsx
```

And to include some default styling add a reference to Bootstrap in the `index.html` file:

```html
<!doctype html>
<html>

<head>
  <meta charset="utf-8">
  <title>My Amazing App</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
</head>

<body>
  <div id="app"></div>
  <script src="/bundle.js"></script>
</body>

</html>
```

Follow the instructions in the newly added files to complete the application.

(Ask at any point!)

Walkthrough (part 3)
--------------------

So we've seen how unidirectional data flow can help in keeping our application easier to reason about, maintain and scale. Now let's make our very simple chat app use the same approach.

#### Adding redux to the project

First we'll need to install some things:

1. `redux` - the very minimal state container
2. `react-redux` - React bindings for Redux to simplify the connection between the two
3. `redux-thunk` - A helper that enables us to have asynchronous actions in redux
4. `redux-logger` - A logger tool for Redux so we can easily inspect our state changing

```
>> npm install redux react-redux redux-thunk redux-logger
```

#### Extending our project with some new folders

Create the following folders in the root folder of the project

1. `/store` - this is where we'll put the initial configuration of the redux store
2. `/actions` - this is where we'll put all our redux actions and action creators
3. `/reducers` - this is where we'll put the reducer that updates our application state based on actions
4. `/services` - this is where we'll move all our abstractions that perform HTTP requests and similar, which we'll expose a simple methods
5. `/containers` - this is where we'll keep our smart components connected to redux state

```
>> mkdir store actions reducers services
```

#### Moving our services for re-use

First of all, let's move our API calls to a separate location, so that we get a clearer separation of concern and the possibility to re-use them in multiple locations:

- Create a file called `api.js` in the `/services` folder

```
>> cd services && touch api.js
```

What we want to do now is to move the specifics regarding HTTP calls from `ChatList.jsx` and `AddChat.jsx` into our new file

From:

```js
/**
 * ./components/ChatList.jsx
 */

 getChats() {
   request
     .get(this.props.url)
     .end((err, res) => {
       if (err) {
         console.log('Error getting chats:', err);
       }

       //.....
     });
 },

 /**
  * ./components/AddChat.jsx
  */

  addChatMessage(name, text) {
    //....
    request
      .post(this.props.url)
      .send({ name, text })
      .set('Accept', 'application/json')
      .end((err) =>{
        if (err) {
          console.log('Error on post:', err);
        }

        console.log('Successful post');
      });
  },
```

To:

```js
/**
 * ./services/api.js
 */

import request from 'axios';

const apiURL = 'https://react-workshop-chat.herokuapp.com/chat';

export function postMessage({ name, text }, callback) {
  return request.post(apiURL, { name, text });
}

export function fetchMessages(callback) {
  return request
    .get(apiURL)
    .then((response) => response.data);
}
```

And install our new HTTP library

```
>> npm install axios --save
```

Now we have abstracted away the whole ordeal of doing requests to the API, which will make our React application much cleaner. We'll make use of this later on.

#### Creating our reducer function

Create a new file in the `/reducers` folder called `index.js`

```
>> cd reducers && touch index.js
```

And fill it with the following content:

```js
/**
 * ./reducers/index.js
 */

import {
  POPULATE_MESSAGES
} from '../actions';

const defaultState = {
  messages: []
}

export default function rootReducer(state = defaultState, action) {
  switch (action.type) {
    case POPULATE_MESSAGES:
      return Object.assign({}, state, {
        messages: action.messages
      });

    default:
      return state;
  }
}
```

The only thing we're doing here is replacing the whole list of messages with a new one every time the messages are populated. So the state will always contain the last 10 messages (which is provided by the API).


#### Creating the initial store configuration

Create a new file in the `/store` folder called `configure-store.js`:

```
>> touch configure-store.js
```

And add the following content:

```js
/**
 * ./store/configure-store.js
 */

/**
 * Dependencies
 */
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger';

/**
 * Importing our reducer
 */
import reducer from '../reducers'

/**
 * Apply the thunk and logging middleware to our store
 */
const createStoreWithMiddleware = applyMiddleware(
  thunk,
  logger()
)(createStore)

/**
 * Export the module as a function to create our store with
 */
module.exports = function configureStore(initialState) {
  const store = createStoreWithMiddleware(reducer, initialState)

  if (module.hot) {
    /**
     * Enable Webpack hot module replacement for reducers
     */
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store;
}
```

#### Create the actions that we need

Create a new file in the `/actions` folder called `index.js` and fill it with the following content:

```js
/**
 * Let's import the services/api
 * we made previously
 */
const api = require('../services/api');

/**
 * Constants
 */
export const POPULATE_MESSAGES_PENDING = 'POPULATE_MESSAGES_PENDING';
export const POPULATE_MESSAGES_SUCCESS = 'POPULATE_MESSAGES_SUCCESS';
export const POPULATE_MESSAGES_FAILED = 'POPULATE_MESSAGES_FAILED';
export const POST_MESSAGE_PENDING = 'POST_MESSAGE_PENDING';
export const POST_MESSAGE_SUCCESS = 'POST_MESSAGE_SUCCESS';
export const POST_MESSAGE_FAILED = 'POST_MESSAGE_FAILED';

/**
 * Actions - simple objects
 */
function populateMessagesPending() {
  return {
    type: POPULATE_MESSAGES_PENDING,
  };
}

function populateMessagesSuccess(messages) {
  return {
    type: POPULATE_MESSAGES_SUCCESS,
    messages
  };
}

function populateMessagesFailed(error) {
  return {
    type: POPULATE_MESSAGES_FAILED,
    error
  };
}

function postMessagePending() {
  return {
    type: POST_MESSAGE_PENDING,
  };
}

function postMessageSuccess() {
  return {
    type: POST_MESSAGE_SUCCESS,
  };
}

function postMessageFailed(error) {
  return {
    type: POST_MESSAGE_FAILED,
    error
  };
}

/**
 * Action creators - able to dispatch any number of actions
 * The functions we export and make available for calling in components or elsewhere
 */
export function postMessage({ name, text }) {
  return (dispatch) => {
    dispatch(postMessagePending());

    /**
     * Here we use our API abstraction to post
     * a message to the server
     */
    api.postMessage({ name, text })
    .then(
      () => dispatch(postMessageSuccess()),
      (err) => dispatch(postMessageFailed(err))
    );
  };
}

export function populateMessages() {
  return (dispatch) => {
    dispatch(populateMessagesPending());

    /**
     * Here we use our API abstraction to
     * fetch all available messages from the server
     */
    api.fetchMessages()
    .then(
      (messages) => dispatch(populateMessagesSuccess(messages)),
      (err) => dispatch(populateMessagesFailed(err))
    );
  };
}
```

#### Create a root component that provides a binding from Redux to React

Create a new file in the `/containers` folder with the following content:

```js
const React = require('react');
const { Provider } = require('react-redux');
const configureStore = require('../store/configure-store');
const App = require('../components/App.jsx');

const store = configureStore();

const Root = React.createClass({
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
});

module.exports = Root;
```

#### Connecting our React app to Redux state and putting it all together

Change `/components/ChatList.jsx` to the following:

```js
const React = require('react');
const SetIntervalMixin = require('../mixins/set-interval-mixin');

const ChatList = React.createClass({
  mixins: [SetIntervalMixin],

  propTypes: {
    populateMessages: React.PropTypes.func.isRequired,
    messages: React.PropTypes.array.isRequired
  },

  componentDidMount() {
    this._setInterval(this.getChats, 1000);
  },

  getChats() {
    this.props.populateMessages();
  },

  render() {
    let list = this.state.chats.map((item, index) => {
      return (
        <li className="list-group-item" key={item._id} >
          <span>{item.name}: </span>{item.text}
        </li>
      );
    });

    return (
      <ul className="list-group">
        {list}
      </ul>
    );
  }
});

module.exports = ChatList;
```

Change `/components/AddChat.jsx` to the following:

```js
const React = require('react');
const ReactDOM = require('react-dom');

const AddChat = React.createClass({
  propTypes: {
    postMessage: React.PropTypes.func.isRequired
  },

  addChatMessage(name, text) {
    if (ReactDOM.findDOMNode(this.refs.newChatInput).value) {
      this.props.postMessage({ name, text })
    }
  },

  handleSubmit(e){
    if (!ReactDOM.findDOMNode(this.refs.newChatInput).value) {
      return;
    }

    if (e.keyCode === 13) {
      this.addChatMessage(
        ReactDOM.findDOMNode(this.refs.nicknameInput).value,
        ReactDOM.findDOMNode(this.refs.newChatInput).value
      );

      ReactDOM.findDOMNode(this.refs.newChatInput).value = '';
    }
  },

  render(){
    return (
      <div className="form-group">
        <input
          type="text"
          placeholder="Nickname"
          ref="nicknameInput"
          className="form-control"
        />
        <input
          type="text"
          placeholder="Compose Message"
          ref="newChatInput"
          className="form-control"
          onKeyDown={this.handleSubmit}
        />
      </div>
    );
  }
});

module.exports = AddChat;
```

Change `/components/App.jsx` to the following:

```js
const React = require('react');
const { connect } = require('react-redux');
const { bindActionCreators } = require('redux');

const AddChat = require('./AddChat.jsx');
const ChatList = require('./ChatList.jsx');

const {
  populateMessages,
  postMessage,
} = require('../actions');

const App = React.createClass({
  render() {
    const {
      postMessage,
      populateMessages,
      messages
    } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h1 className="text-center"> React Workshop Chat </h1>
            <div className="col-sm-8 col-sm-offset-2">

              <AddChat
                postMessage={postMessage}
              />

            </div>
            <div className="col-sm-10 col-sm-offset-1">
            <div className="panel panel-default">
              <div className="panel-heading">Chat Messages</div>

                <ChatList
                  messages={messages}
                  populateMessages={populateMessages}
                />

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

function mapStateToProps(state) {
  return {
    messages: state.messages
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    populateMessages,
    postMessage
  }, dispatch);
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
```

Change `/entry.js` to the following:

```js
const React = require('react');
const ReactDOM = require('react-dom');
const Root = require('./containers/Root.jsx');

ReactDOM.render(<Root />, document.getElementById('app'));
```

Now you should be able to run your new React/Redux app and see it in action!

(Bonus points for finding errors made by the author.. :))


Walkthrough (part 4)
--------------------

See the `/part-4-solution`