export function getCars() {
  return fetch("/cars")
    .then((response) => response.json())
    .then((data) => data);
}