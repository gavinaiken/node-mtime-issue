# node-mtime-issue

To test the problem, clone the repo, then do the following:

```
npm i
gulp build
gulp build
```

You should see that on the first run of `gulp build` it copies all 3 test*.js files from `src` to `dist`.

On the second and subsequent runs of `gulp build` it is expected that no files will be copied over unless you touch the src file. However due to the bug, one or more files should be copied over every time.
