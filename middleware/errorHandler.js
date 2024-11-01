const errorHandler = (err, req, res, next) => {
  console.error(err);

  return res.status(500).json({ message: "Something went wrong!", code: 500 });
};

export default errorHandler;
