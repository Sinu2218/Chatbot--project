// Emoji Mapping
const emojis = {
  hi: "👋",
  smile: "😊",
  happy: "😄",
  sad: "😢",
  think: "🤔",
  robot: "🤖",
  bye: "👋"
};

// Responses
const responses = {
  greeting: [
    `${emojis.hi} Hello! Kaise ho?`,
    `${emojis.smile} Hi! Tum kaise ho?`
  ],
  name: [
    (name) => `${emojis.robot} Nice to meet you, ${name}! ${emojis.happy}`,
    (name) => `Hello ${name}! Main tumhara friendly chatbot hoon!`
  ],
  feeling: [
    `${emojis.smile} Main theek hoon, tum kaise ho?`,
    `${emojis.happy} Sab theek hai, tum batao!`
  ],
  bye: [
    `${emojis.bye} Alvida! Phir milte hain.`,
    `${emojis.sad} Bye! Dhyan rakhna!`
  ],
  unknown: [
    `${emojis.think} Hmm... main iske baare mein nahi jaanti, lekin tum batao!`,
    `${emojis.smile} Mujhe samajh nahi aaya, par tum interesting ho!`
  ]
};

// Send Message Function
function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  appendMessage("user", message);
  input.value = "";

  setTimeout(() => {
    botResponse(message);
  }, 500);
}

// Append message
function appendMessage(sender, text) {
  const chatBox = document.getElementById("chat-box");
  const messageEl = document.createElement("div");
  messageEl.classList.add("message", sender === "user" ? "user-message" : "bot-message");
  messageEl.innerText = text;
  chatBox.appendChild(messageEl);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Bot response logic
function botResponse(userMessage) {
  let response;

  if (/hello|hi|hey/i.test(userMessage)) {
    response = random(responses.greeting);
  } else if (/my name is (.+)/i.test(userMessage)) {
    const name = userMessage.match(/my name is (.+)/i)[1];
    response = random(responses.name, name);
  } else if (/how are you/i.test(userMessage)) {
    response = random(responses.feeling);
  } else if (/bye|goodbye/i.test(userMessage)) {
    response = random(responses.bye);
  } else {
    response = random(responses.unknown);
  }

  appendMessage("bot", response);
}

// Random response
function random(arr, param = null) {
  const item = arr[Math.floor(Math.random() * arr.length)];
  return typeof item === "function" ? item(param) : item;
}

// Enter key functionality
document.getElementById("user-input").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});
