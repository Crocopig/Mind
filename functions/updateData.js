let latestData = {
  message: "",
  title: "",
  url: "",
  fileType: ""
};

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const { message, title, url, fileType } = JSON.parse(event.body);

  // Update the latest data with the incoming data
  latestData = {
    message,
    title,
    url,
    fileType,
  };

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, data: latestData }),
  };
};
