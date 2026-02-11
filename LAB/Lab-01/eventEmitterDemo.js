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

let currentUser = null;
let summary = {
    login: 0,
    logout: 0,
    purchase: 0,
    update: 0
};

const loginPage = document.getElementById("loginPage");
const dashboard = document.getElementById("dashboard");
const header = document.getElementById("header");
const logBox = document.getElementById("logBox");

/* Event listeners */
emitter.on("login", name => {
    logBox.innerHTML += `${name} logged in\n`;
    summary.login++;
});

emitter.on("purchase", item => {
    logBox.innerHTML += `${currentUser} purchased ${item}\n`;
    summary.purchase++;
});

emitter.on("update", newName => {
    logBox.innerHTML += `${currentUser} updated profile to ${newName}\n`;
    currentUser = newName;
    summary.update++;
});

emitter.on("logout", name => {
    logBox.innerHTML += `${name} logged out\n`;
    summary.logout++;
});

/* Actions */
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
    itemInput.value = "";
}

function updateProfile() {
    const newName = document.getElementById("newNameInput").value.trim();
    if (!newName) return alert("Enter new name");

    emitter.emit("update", newName);
    newNameInput.value = "";
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
