function init({ request, response}: { request: any, response: any }) {
  response.body = "Welcome to this page";
  response.status = 200;
}

export {
  init,
};
