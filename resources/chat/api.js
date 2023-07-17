function sendMessage(userID, message) {
  $.ajax({
    url: `http://localhost:4000/conversation/${diagramID}`,
    type: 'post',
    data: {
      userID,
      message,
    },
    success: async (response) => {
      for (const reply of response.reply) {
        await delay(100);

        switch (reply.type) {
          case 'text': {
            addBotMessage(reply.text);
            break;
          }
          default: {
            addBotMessage(`I don't know how to handle that reply (${reply.type})`);
            break;
          }
        }
      }
    },
    error: (err) => {
      console.error('Error while sending message', err);
    },
  });
}
