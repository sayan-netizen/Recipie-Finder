document.getElementById("findRecipesBtn").addEventListener("click", async () => {
    const ingredientInput = document.getElementById("ingredientInput").value;
    const ingredients = ingredientInput.split(",").map(item => item.trim());
    
    if (ingredients.length === 0) {
        alert("Please enter some ingredients!");
        return;
    }

    const response = await fetch("/get_recipes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ ingredients })
    });

    const data = await response.json();
    const recipesContainer = document.getElementById("recipesContainer");
    recipesContainer.innerHTML = "";

    if (data.error) {
        recipesContainer.innerHTML = `<p>${data.error}</p>`;
    } else {
        data.recipes.forEach(recipe => {
            recipesContainer.innerHTML += `
                <div class="recipe">
                    <h3>${recipe.title}</h3>
                    <img src="${recipe.image}" alt="${recipe.title}" width="100%">
                </div>
            `;
        });
    }
});
