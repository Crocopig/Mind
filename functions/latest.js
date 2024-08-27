// Simulated in-memory store (works only within the same instance)
let latestData = {
  message: "",
  title: "",
  url: "",
  fileType: ""
};

exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(latestData),
  };
};
