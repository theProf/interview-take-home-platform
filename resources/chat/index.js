const $chat = $('#chat');

const userID = 'bob';
const diagramID = 'diagram-1';

const getCurrentDate = () => {
  return new Date().toLocaleString("en-CA", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
}

const addBotMessage = (message, time = getCurrentDate()) => {
  $chat.prepend(`
    <div class="media w-33 mb-2 d-flex gap-2">
      <img
        src="https://cm4-production-assets.s3.amazonaws.com/1666102958779-vf.png" alt="Bot" width="30" height="30"
        class="rounded-circle mt-1" />
      <div class="media-body ml-3">
        <div class="bg-light rounded py-2 px-3 mb-2">
          <p class="text-small mb-0 text-muted">${message}</p>
        </div>
        <p class="small text-muted">${time}</p>
      </div>
    </div>
  `);
};

const addHumanMessage = (message, time = getCurrentDate()) => {
  $chat.prepend(`
    <div class="media w-50 ml-auto mb-2 align-self-end">
      <div class="media-body">
        <div class="bg-primary rounded py-2 px-3 mb-2">
          <p class="text-small mb-0 text-white">${message}</p>
        </div>
        <p class="small text-muted">${time}</p>
      </div>
    </div>
  `);
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

$('#message').submit(async (e) => {
  e.preventDefault();

  // grab form message
  const message = $('#message-input').val().trim();
  // reset input field
  $('#message-input').val('');
  if (!message) return false;

  addHumanMessage(message);

  sendMessage(userID, message);
});
