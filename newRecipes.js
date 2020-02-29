function openAddingRecipe(){
    document.getElementById("add-recipe-move").style.left = "0px";
    document.getElementById("add-button-main").style.display = "none";
}

function closeAddingRecipe(){
    document.getElementById("add-recipe-move").style.left = "-1200px";
    document.getElementById("add-button-main").style.display = "block";
}

// List to store all bestRecipes
let recipeList = {};

//Adding basics recipes to list
addRecipeToList('Pancakes');
addRecipeToList('Snack party');
addRecipeToList('Langos');
addRecipeToList('Burger');
addRecipeToList('Fish');
addRecipeToList('Dumplings');

function removeRecipe(recipeTitle) {
    removeElementFromRecipesList(recipeTitle);
    let recipeElement = document.getElementById(recipeTitle);
    $(recipeElement).fadeOut("slow");
}

function removeElementFromRecipesList(id) {
    delete recipeList[id]
}

function getAttributesFromForm(){
    let title = document.getElementById("form-title").value;
    let firstImage = document.getElementById("form-image-first").value;
    let secondImage = document.getElementById("form-image-second").value;
    let ingredients = document.getElementById("form-ingredients").value;
    let instructions = document.getElementById("form-instructions").value;
    return {
        title,
        firstImage,
        secondImage,
        ingredients,
        instructions
    };
}

function addRecipeToList(title) {
    recipeList[title] = false;
}

function createIngredientsFromString(ingredientsString) {
    return ingredientsString.split('\n').map(x => `<li>${x}</li>`).join("\n");
}

function getSingleRecipeElement(title) {
    let firstElement = document.getElementById(title).getElementsByClassName("first-view")[0];
    let secondElement = document.getElementById(title).getElementsByClassName("second-view")[0];

    return {secondElement,
            firstElement};
}


function addRecipe(){
    let attributes = getAttributesFromForm();

    if(!isFormGoodValidated(attributes)) return;

    //create article (adding recipe)
    let newRecipe = document.createElement("article");
    newRecipe.classList.add("single_recipe");
    addRecipeToList(attributes.title);
    newRecipe.id = attributes.title;

    newRecipe.addEventListener('click', () => changeCurrentRecipe(attributes.title));

    newRecipe.innerHTML += `
        <div class="first-view">
            <figure class="grow">
                <img src="${attributes.firstImage}" />
                <figcaption>${attributes.title}</figcaption>
            </figure>
            <p style="text-align: left; text-decoration: underline">Ingredients: </p>
            <ul style="text-align: left; list-style-type: circle;" class="ingredients">
                ${createIngredientsFromString(attributes.ingredients)}
            </ul>
            <div class="removeRecipe" onclick="removeRecipe('${attributes.title}')"><i class="fa fa-trash"></i></div>
        </div>
        <div class="second-view">
            <figure class="grow">
                <img src="${attributes.secondImage}" />
                <figcaption>${attributes.title}</figcaption>
            </figure>
            
            <p style="text-align: left; text-decoration: underline">Prepare: </p>
            <p style="font-family: 'Poiret One', cursive; text-align: justify">${attributes.instructions}</p>
            <div class="removeRecipe" onclick="removeRecipe('${attributes.title}')"><i class="fa fa-trash"></i></div>
         </div>`;

    document.getElementById("all-recipes").appendChild(newRecipe);
    document.getElementById("add-form-recipe").reset();
    closeAddingRecipe();

    $("input").css('border', 'none');
    $("textarea").css('border', 'none');
}

function animateChange(id, secondElement, firstElement) {
    if(recipeList[id]){
        secondElement.style.webkitTransform = "rotateY(90deg)";
        setTimeout(function(){
            change(secondElement, firstElement);
            firstElement.style.webkitTransform = "rotateY(0deg)";
        }, 500);
    }
    else{
        firstElement.style.webkitTransform = "rotateY(90deg)";
        setTimeout(function(){
            change(firstElement, secondElement);
            secondElement.style.webkitTransform = "rotateY(0deg)";
        }, 500);
    }
}

function changeCurrentRecipe(id) {
    for (let recipeId in recipeList) {
        if (id !== recipeId && recipeList[recipeId] === true) {
            const { secondElement, firstElement } = getSingleRecipeElement(recipeId);
            animateChange(recipeId, secondElement, firstElement);
            recipeList[recipeId] = false;
            break;
        }
    }
    const { secondElement, firstElement } = getSingleRecipeElement(id);
    animateChange(id, secondElement, firstElement);
    recipeList[id] = !recipeList[id];
}

function change(hide, show){
    hide.style.display = "none";
    show.style.display = "block";
}