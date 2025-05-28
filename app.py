from flask import Flask, request, jsonify, render_template
import requests
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env

app = Flask(__name__)

API_KEY = os.getenv("SPOONACULAR_API_KEY")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/recipes")
def recipes():
    # Get ingredients from URL query string, e.g., ?ingredients=apple,banana
    ingredients = request.args.get("ingredients")
    if not ingredients:
        return "No ingredients provided", 400

    ingredients_list = ingredients.split(",")

    response = requests.get(
        "https://api.spoonacular.com/recipes/findByIngredients",
        params={
            "ingredients": ",".join(ingredients_list),
            "number": 10,
            "apiKey": API_KEY
        }
    )
    recipes = response.json()
    return render_template("recipes.html", recipes=recipes)

if __name__ == "__main__":
    app.run(debug=True)
