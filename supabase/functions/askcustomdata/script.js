document.addEventListener('DOMContentLoaded', () => {
  const queryInput = document.getElementById('query');
  const submitButton = document.getElementById('submit');
  const outputElement = document.getElementById('output');

  submitButton.addEventListener('click', async () => {
    const query = queryInput.value;

    const response = await fetch('/process-query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const responseData = await response.json();
    outputElement.textContent = responseData.text;
  });
});
