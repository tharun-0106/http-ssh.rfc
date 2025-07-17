const form = document.getElementById('login-form');
const statusText = document.getElementById('status');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Stop page reload

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  const result = await response.json();

  if (response.ok) {
    statusText.textContent = '✅ Login successful!';
  } else {
    statusText.textContent = '❌ ' + result.message;
  }
});
