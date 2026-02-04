// Simple EventEmitter implementation for browser
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(...args));
    }
  }
}

const emitter = new EventEmitter();

// object to store event counts
const eventCount = {
  login: 0,
  logout: 0,
  purchase: 0,
  profileUpdate: 0
};

// Helper function to display output
function displayOutput(message) {
  const output = document.getElementById("output");
  const newLine = document.createElement("p");
  newLine.textContent = message;
  output.appendChild(newLine);
}

// event listeners
emitter.on("user-login", (username) => {
  eventCount.login++;
  const message = `${username} logged in`;
  console.log(message);
  displayOutput(message);
});

emitter.on("user-logout", (username) => {
  eventCount.logout++;
  const message = `${username} logged out`;
  console.log(message);
  displayOutput(message);
});

emitter.on("user-purchase", (username, item) => {
  eventCount.purchase++;
  const message = `${username} purchased ${item}`;
  console.log(message);
  displayOutput(message);
});

emitter.on("profile-update", (username) => {
  eventCount.profileUpdate++;
  const message = `${username} updated profile`;
  console.log(message);
  displayOutput(message);
});

// summary event
emitter.on("summary", () => {
  displayOutput("\n--- Event Summary ---");
  displayOutput("Logins: " + eventCount.login);
  displayOutput("Logouts: " + eventCount.logout);
  displayOutput("Purchases: " + eventCount.purchase);
  displayOutput("Profile Updates: " + eventCount.profileUpdate);
});

// Button handler functions
function login() {
  emitter.emit("user-login", "User");
}

function logout() {
  emitter.emit("user-logout", "User");
}

function purchase() {
  const item = prompt("Enter item name:") || "Item";
  emitter.emit("user-purchase", "User", item);
}

function updateProfile() {
  emitter.emit("profile-update", "User");
}

function showSummary() {
  emitter.emit("summary");
}
