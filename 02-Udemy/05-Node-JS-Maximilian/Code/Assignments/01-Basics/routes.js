const fileSystem = require("fs");

const requestHandler = (request, response) => {
  const url = request.url;
  const method = request.method;

  if (url === "/") {
    response.setHeader("Content-Type", "text/html");
    response.write("<html>");
    response.write("<head><title>Enter Username</title></head>");
    response.write("<body>");
    response.write("<form action='/create-user' method='POST'>");
    response.write("<input type='text' name='username'>");
    response.write("<button type='submit'>Send</button>");
    response.write("</form>");
    response.write("</body>");
    response.write("</html>");
    return response.end();
  }

  if (url === "users") {
    response.setHeader("Content-Type", "text/html");
    response.write("<html>");
    response.write("<head><title>users</title></head>");
    response.write("<body><ul><li>user 1</li><li>user 2</li></ul></body>");
    response.write("</html>");
    response.end();
  }

  if (url === "/create-user" && method === "POST") {
    const body = [];
    request.on("data", (chunk) => {
      body.push(chunk);
    });

    request.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const users = parsedBody.split("=")[1];
      fileSystem.writeFile("users.txt", users, (error) => {
        response.statusCode = 302;
        response.setHeader("Location", "/");
        return response.end();
      });
    });
  }
};

exports.handler = requestHandler;
