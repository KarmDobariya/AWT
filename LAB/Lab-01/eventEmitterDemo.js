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

    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(fn => fn(data));
        }
    }
}

const emitter = new EventEmitter();

// --- NEW: Helper to send data to MySQL ---
function saveToDB(eventType, message) {
    fetch('http://localhost:3000/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventType, message })
    }).catch(err => console.error("Error logging to DB:", err));
}
// ----------------------------------------

let currentUser = null;
let summary = { login: 0, logout: 0, purchase: 0, update: 0 };

const loginPage = document.getElementById("loginPage");
const dashboard = document.getElementById("dashboard");
const header = document.getElementById("header");
const logBox = document.getElementById("logBox");

/* Event listeners */
emitter.on("login", name => {
    const msg = `${name} logged in`;
    logBox.innerHTML += msg + "\n";
    summary.login++;
    saveToDB("login", msg); // Save to DB
});

emitter.on("purchase", item => {
    const msg = `${currentUser} purchased ${item}`;
    logBox.innerHTML += msg + "\n";
    summary.purchase++;
    saveToDB("purchase", msg); // Save to DB
});

emitter.on("update", newName => {
    const msg = `${currentUser} updated profile to ${newName}`;
    logBox.innerHTML += msg + "\n";
    currentUser = newName;
    summary.update++;
    saveToDB("update", msg); // Save to DB
});

emitter.on("logout", name => {
    const msg = `${name} logged out`;
    logBox.innerHTML += msg + "\n";
    summary.logout++;
    saveToDB("logout", msg); // Save to DB
});

/* Actions (Keep these the same as before) */
function login() {
    const name = document.getElementById("loginName").value.trim();
    if (!name) return alert("Enter name");
    currentUser = name;
    loginPage.classList.add("hidden");
    dashboard.classList.remove("hidden");
    header.classList.remove("hidden");
    emitter.emit("login", name);
}

function purchase() {
    if (!currentUser) return;
    const item = document.getElementById("itemInput").value.trim();
    if (!item) return alert("Enter item");
    emitter.emit("purchase", item);
    document.getElementById("itemInput").value = "";
}

function updateProfile() {
    const newName = document.getElementById("newNameInput").value.trim();
    if (!newName) return alert("Enter new name");
    emitter.emit("update", newName);
    document.getElementById("newNameInput").value = "";
}

function logout() {
    emitter.emit("logout", currentUser);
    currentUser = null;
    dashboard.classList.add("hidden");
    header.classList.add("hidden");
    loginPage.classList.remove("hidden");
}

function showSummary() {
    logBox.innerHTML +=
        `\n--- Event Summary ---\n` +
        `Logins: ${summary.login}\n` +
        `Logouts: ${summary.logout}\n` +
        `Purchases: ${summary.purchase}\n` +
        `Profile Updates: ${summary.update}\n`;
}