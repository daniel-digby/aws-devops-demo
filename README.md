# comp30022-it-project

# Start Commands (all commands are run at project root)

you can start either the backend or the frontend individually by running:
```
yarn workspace client/server dev
```
or you can start them both at once by running:
```
yarn dev
```
you can look at all the available commands by checking the scripts section of each package.json

# Install Commands

we need to install our packages to a specific workspace, so they get managed and installed correctly during production. to do so run:

```
yarn workspace client add somepackage
```
```
yarn workspace server add somepackage
```

additionally, there is no distinguishment between dependencies and devDependencies (packages you only need in development like prettier) for the react app because it
all gets built into minified files when deployed. There is however a distinguishment between dependencies and devDependencies for the node server so please be careful
which you install as we go through the sem

to install something as a devDependency run:
```
yarn workspace server add -D someDevpackage
```

# yarn explantion

I couldn't get our test pipeline to run properly with the react app as a subfolder of our node server, as react is very pedantic about which version of jest it uses and didnt like
sharing with node.

To solve this, I split the two into two client/server directories. This created the problem of heroku not properly installing dependencies when the app was being deployed

Thus the solution I landed on was yarn workspaces.

The structure looks like this
```
(root)
- package.json
- yarn lock
- client
-- package.json
- server
-- package.json
```
and in the (root) package.json we see:
```
  "workspaces": {
    "packages": [
      "client",
      "server"
    ]
  }
```
what this means is that the (root) yarn controlls the whole "monorepo" and is the controller for all dependencies, we never directly install dependencies here.
So do not run "yarn add somepackage" as it will install it in the root rather than the client/server
# Test Pipeline

The way the test pipeline works, is by running:
```
yarn workspace server/client build
yarn workspace server/client test
```
for both the client and the server, and you can check the commands being run in the ./github/node.js.yml file.
The pipeline is set to run before pushes to main and develop, as well as before merges to main and develop so you'll be able to easily tell if a merge will break something
and github will automatically abort the merge

All we've got to do is write tests as/before we write code and it will keep our ship sailing

# Deployment

The way deployment works is by pushing the repo to heroku whenever we make a merge or a push to main and after the test pipeline has passed, what heroku then does is:
```
yarn workspaces foreach run build
yarn workspace server run start
```
^ then the server serves the static files that were build from react so we dont need to start the react app

# Github Setup

I've set it up so we all need to create a pull request to push to a protected branch (main/dev), so rather than pushing to these branches directly we should cut a branch off
as a hotfix from main, or a feature from dev. Make changes on the new branch then create a pr, and assign someone to review our changes before merging back in. We also will be
unable to merge until the tests pass
