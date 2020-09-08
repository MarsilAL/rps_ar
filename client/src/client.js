const writeEvent = (text) => {
  // <ul> elemnt
  const parent = document.querySelector("#events");

  //<li> elemnt
  const el = document.createElement("li");
  el.innerHTML = text;
  parent.appendChild(el);
};

//
const onFormSubmitted = (e) => {
  e.preventDefault();

  const input = document.querySelector("#chat");
  const text = input.value;
  input.value = "";

  sock.emit("message", text);
};

// add Butten Listners

const addButtenListners = () => {
  ["حجر", "ورقة", "مقص"].forEach((id) => {
    const button = document.getElementById(id);
    button.addEventListener("click", () => {
      sock.emit("turn", id);
    });
  });
};

// *********************

writeEvent("Welcome Syria[N]Talk Games");

const sock = io();
sock.on("message", writeEvent);

// ************

document
  .querySelector("#chat-form")
  .addEventListener("submit", onFormSubmitted);

addButtenListners();
