import axios from 'axios';

const projectId = 'medical-chatbot-t9lb'; // Replace with your Google Cloud project ID
const sessionId = '123456'; // Can be any unique identifier
const languageCode = 'en'; // Change if needed

const endpoint = `https://dialogflow.googleapis.com/v2/projects/${projectId}/agent/sessions/${sessionId}:detectIntent`;

const sendMessageToDialogflow = async (message) => {
  const requestBody = {
    queryInput: {
      text: {
        text: message,
        languageCode,
      },
    },
  };

  try {
    const response = await axios.post(endpoint, requestBody, {
      headers: {
        'Authorization': `c079acd77f66e0923e35972e967704d56c6ddf57`, // Use OAuth 2.0 or API key
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error sending message to Dialogflow:', error);
    throw error;
  }
};

export { sendMessageToDialogflow };
