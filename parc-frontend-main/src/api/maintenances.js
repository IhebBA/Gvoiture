export function getMaintenances() {
  return fetch("/maintenances")
    .then((response) => response.json())
    .then((data) => data);
}
