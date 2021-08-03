export function getLogin() {
    return fetch("/login")
      .then((response) => response.json())
      .then((data) => data);
  }