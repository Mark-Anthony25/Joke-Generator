// Add this to your existing script section
jokeButton.addEventListener('click', async () => {
    jokeContainer.innerHTML = '<p class="loading-dots">Fetching your joke</p>';
    
    const selectedCategories = Array.from(document.querySelectorAll('.toggle-button.active'))
        .map(button => button.getAttribute('data-value'))
        .join(',');

    if (!selectedCategories) {
        jokeContainer.innerHTML = '<p>Please select at least one category! 😅</p>';
        return;
    }

    const apiUrl = `https://v2.jokeapi.dev/joke/${selectedCategories}`;
    try {
        const response = await fetch(apiUrl);
        const jokeData = await response.json();

        if (jokeData.type === 'single') {
            jokeContainer.innerHTML = `<p>😆 ${jokeData.joke}</p>`;
        } else if (jokeData.type === 'twopart') {
            jokeContainer.innerHTML = `
                <p>🤔 ${jokeData.setup}</p>
                <p class="punchline">🎯 ${jokeData.delivery}</p>
            `;
        } else {
            jokeContainer.innerHTML = '<p>No jokes found! 😢</p>';
        }
    } catch (error) {
        jokeContainer.innerHTML = '<p>Oops! Something went wrong. Try again! 🙈</p>';
    }
});