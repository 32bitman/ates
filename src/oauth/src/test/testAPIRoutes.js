module.exports = (router, app, testAPIService) => {
  router.post("/hello", app.oauth.authorise(), testAPIService.helloWorld);
  router.get("/list", testAPIService.list);

  return router;
};
