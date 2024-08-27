// This will store the latest data temporarily (use persistent storage in production)
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

    // Parse the JSON body of the request
    const { message, title, url, fileType } = JSON.parse(event.body);

    // Update the latestData object with the new values
    latestData = {
        message,
        title,
        url,
        fileType,
    };

    // Respond with the updated data
    return {
        statusCode: 200,
        body: JSON.stringify({ success: true, data: latestData }),
    };
};
