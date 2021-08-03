export function getAgents() {
    return fetch("/agents")
      .then((response) => response.json())
      .then((data) => data);
  }