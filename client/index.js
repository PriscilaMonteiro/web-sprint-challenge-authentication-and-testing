/* eslint-disable no-debugger */
/* eslint-disable no-undef */
const usernameInput = document.querySelector("#usernameInput");
const passwordInput = document.querySelector("#passwordInput");
const registerBtn = document.querySelector("#registerBtn");
const loginBtn = document.querySelector("#loginBtn");
const logoutBtn = document.querySelector("#logoutBtn");
const getJokesBtn = document.querySelector("#getJokesBtn");
const message = document.querySelector("#message");
const jokesList = document.querySelector("#jokesList");

const handle = (action) => (evt) => {
  evt.preventDefault();
  const credentials = {
    username: usernameInput.value,
    password: passwordInput.value,
  };
  fetch(`/api/auth/${action}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  })
    .then((res) => res.json())
    .then((data) => {
      message.textContent = data.message;
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
    })
    .catch((err) => {
      message.textContent = err.message;
      debugger;
    });
};

const logout = (evt) => {
  evt.preventDefault();
  if (localStorage.getItem("token")) {
    localStorage.removeItem("token");
    jokesList.textContent = "";
    message.textContent = "Bye!";
  } else {
    message.textContent = "Log in before logging out";
  }
};

const getJokes = (evt) => {
  evt.preventDefault();
  const token = localStorage.getItem("token");

  fetch(`/api/jokes`, {
    method: "GET",
    headers: token ? { Authorization: token } : {},
  })
    .then((res) => {
      return res.json();
    })
    .then((jokes) => {
      console.log(jokes);
      if (Array.isArray(jokes)) {
        jokes.forEach((joke) => {
          const div = document.createElement("div");
          div.textContent = joke.joke;
          jokesList.append(div);
        });
      } else {
        message.textContent = users.message;
      }
    })
    .catch((err) => {
      message.textContent = err.message;
      debugger;
    });
};

registerBtn.addEventListener("click", handle("register"));
loginBtn.addEventListener("click", handle("login"));
logoutBtn.addEventListener("click", logout);
getJokesBtn.addEventListener("click", getJokes);
