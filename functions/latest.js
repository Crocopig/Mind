exports.handler = async (event, context) => {
  // Example static data
  const latestData = {
    message: "I fetched your PDF, sir.",
    title: "Google",
    url: "https://www.google.com",
    fileType: "PDF"
  };

  return {
    statusCode: 200,
    body: JSON.stringify(latestData),
  };
};
