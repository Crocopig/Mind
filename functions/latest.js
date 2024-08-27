exports.handler = async (event, context) => {
  // Example static data for testing
  const latestData = {
    message: "Test message for debugging.",
    title: "Test Title",
    url: "https://www.example.com",
    fileType: "PDF"
  };

  return {
    statusCode: 200,
    body: JSON.stringify(latestData),
  };
};
