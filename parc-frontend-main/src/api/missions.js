export function getMissions() {
  return fetch("/missions")
    .then((response) => response.json())
    .then((data) => data);
}
