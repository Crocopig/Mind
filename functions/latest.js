exports.handler = async (event, context) => {
  // Initial empty state
  const latestData = {
    message: "",
    title: "",
    url: "",
    fileType: ""
  };

  return {
    statusCode: 200,
    body: JSON.stringify(latestData),
  };
};
