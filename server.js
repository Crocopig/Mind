exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const { message, title, url, fileType } = JSON.parse(event.body);

  // Here you would normally save the data to a database or some other storage.
  // For this example, we'll just log it and return it back in the response.
  const latestData = {
    message,
    title,
    url,
    fileType,
  };

  console.log(latestData);

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, data: latestData }),
  };
};
