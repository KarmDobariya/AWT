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

// track currently logged-in user
let currentUser = null;

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
  // legacy single-arg handler (if used)
  eventCount.profileUpdate++;
  const message = `${username} updated profile`;
  console.log(message);
  displayOutput(message);
});

// modern profile-update handler (oldName, newName)
emitter.on("profile-update-new", (oldName, newName) => {
  eventCount.profileUpdate++;
  const message = `${oldName} updated profile to ${newName}`;
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
  const usernameInput = document.getElementById("usernameInput");
  const username = (usernameInput && usernameInput.value.trim()) ? usernameInput.value.trim() : "User";
  currentUser = username;
  emitter.emit("user-login", username);
  if (usernameInput) usernameInput.value = "";
}

function logout() {
  const username = currentUser || "User";
  emitter.emit("user-logout", username);
  currentUser = null;
}

function purchase() {
  const purchaseInput = document.getElementById("purchaseInput");
  const item = purchaseInput && purchaseInput.value.trim() ? purchaseInput.value.trim() : null;
  if (!currentUser) {
    displayOutput("No user is logged in. Please login first.");
    return;
  }
  if (!item) {
    displayOutput("Please enter an item name to purchase.");
    return;
  }
  emitter.emit("user-purchase", currentUser, item);
  if (purchaseInput) purchaseInput.value = "";
}

function updateProfile() {
  const newNameInput = document.getElementById("newNameInput");
  const newName = newNameInput && newNameInput.value.trim() ? newNameInput.value.trim() : null;
  if (!currentUser) {
    displayOutput("No user is logged in. Please login first.");
    return;
  }
  if (!newName) {
    displayOutput("Please enter a new name for profile update.");
    return;
  }
  const oldName = currentUser;
  currentUser = newName;
  // emit new-style profile-update with old and new name
  emitter.emit("profile-update-new", oldName, newName);
  if (newNameInput) newNameInput.value = "";
}

function showSummary() {
  emitter.emit("summary");
}
