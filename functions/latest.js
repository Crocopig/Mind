// This will be used to store the most recent data
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
