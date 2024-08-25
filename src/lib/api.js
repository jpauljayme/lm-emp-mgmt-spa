const API_URL = 'http://localhost:8081/';

export async function fetchGraphQL(query, variables = {}) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = await response.json();
  
  if (result.errors) {
    throw new Error(result.errors.map(error => error.message).join('\n'));
  }

  return result.data;
}
