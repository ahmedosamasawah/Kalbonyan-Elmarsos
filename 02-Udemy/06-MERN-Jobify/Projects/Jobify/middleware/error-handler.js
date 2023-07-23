import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleWare = (error, request, response, next) => {
  console.log(error);

  const defaultError = {
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: error.message || "Something Went Wrong, Try Again Later!",
  };

  if (error.name === "ValidatorError") {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = Object.values(error.errors)
      .map((item) => item.message)
      .join(",");
  }

  if (error.code && error.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = `${Object.keys(error.keyValue)} Field Has To Be Unique!`;
  }
  response.status(defaultError.statusCode).json({ msg: defaultError.msg });
};

export default errorHandlerMiddleWare;
