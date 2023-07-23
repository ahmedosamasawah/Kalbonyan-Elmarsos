import { BadRequestError } from "../errors/index.js";

const testUser = (request, response, next) => {
  if (request.user.testUser) throw new BadRequestError("Test User. Read Only!");
  next();
};

export default testUser;
