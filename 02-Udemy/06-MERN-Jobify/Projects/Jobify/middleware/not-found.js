const notFoundMiddleWare = (request, response) =>
  response.status(404).send("Route Does Not Exist!");

export default notFoundMiddleWare;
