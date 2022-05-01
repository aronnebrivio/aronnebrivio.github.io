# aronnebrivio.github.io
Personal frontpage • 👉 [aronnebrivio.dev](https://aronnebrivio.dev)

![](https://github.com/aronnebrivio/aronnebrivio.github.io/workflows/Publish%20on%20Github%20Pages/badge.svg?branch=production)
![](https://github.com/aronnebrivio/aronnebrivio.github.io/workflows/Publish%20beta%20on%20Surge/badge.svg?branch=develop)
[![Build Status](https://travis-ci.com/aronnebrivio/aronnebrivio.github.io.svg?branch=production)](https://travis-ci.com/aronnebrivio/aronnebrivio.github.io)
[![Dependency status](https://david-dm.org/aronnebrivio/aronnebrivio.github.io.svg)](https://david-dm.org/aronnebrivio/aronnebrivio.github.io)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Faronnebrivio%2Faronnebrivio.github.io.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Faronnebrivio%2Faronnebrivio.github.io?ref=badge_shield)
[![LICENSE](https://img.shields.io/badge/license-MIT-gold.svg)](https://github.com/aronnebrivio/aronnebrivio.github.io/blob/master/LICENSE)

**IMPORTANT NOTE:**    
Due to a GitHub Pages limitation that *does not allow you to select a different branch for the deployment of user pages*, I configured `production` as the "master" branch in [git-flow](https://nvie.com/posts/a-successful-git-branching-model/) and as the "default" branch in GitHub repository settings.    
This will allow me to publish releases on a branch that differs to the `master` one, in which only the files generated by the build process will be contained.

To see the generated `dist` folder heads to [master branch](https://github.com/aronnebrivio/aronnebrivio.github.io/tree/master).

## Build
```bash
npm install
npm run build
```

This will create a new `dist` folder.

To automate the GitHub Page deploy I'm using [JamesIves/github-pages-deploy-action](https://github.com/JamesIves/github-pages-deploy-action) in my [GitHub workflow](https://github.com/aronnebrivio/aronnebrivio.github.io/blob/production/.github/workflows/prod.yml) for the *production* environment and [surge](https://surge.sh/) for the *develop* one (betas are published at [beta.aronnebrivio.surge.sh](http://beta.aronnebrivio.surge.sh)).

## Run locally
```bash
npm install
npm run serve
```

This will serve the `src` folder at `localhost:XXXX` (default port is `3000`).

*ProTip: you can serve the `dist` folder using `npm run serve-as-prod` command.*

## Run on Gitpod
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/aronnebrivio/aronnebrivio.github.io)

*Ref: [Gitpod.io](https://gitpod.io)*

## License
Copyright (c) 2020-2022 Aronne Brivio. Released under the MIT License. See [LICENSE](https://github.com/aronnebrivio/aronnebrivio.github.io/blob/master/LICENSE) for details.


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Faronnebrivio%2Faronnebrivio.github.io.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Faronnebrivio%2Faronnebrivio.github.io?ref=badge_large)
