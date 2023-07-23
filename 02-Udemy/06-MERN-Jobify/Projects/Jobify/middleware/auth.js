import jwt from "jsonwebtoken";
import { UnAuthenticatedError } from "../errors/index.js";

const auth = async (request, response, next) => {
  const token = request.cookies.token;
  if (!token) throw new UnAuthenticatedError("Authentication Invalid");
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const testUser = payload.userId === "64b53eb26f0016f4dab4b57c";
    request.user = { userId: payload.userId, testUser };
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
};
export default auth;
