document.addEventListener('DOMContentLoaded', function() {
    let datosGlobales = null;
    const apiUrl = 'www.themealdb.com/api/json/v1/1/search.php?f=a';


    fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al cargar los datos');
      }
      return response.json();
    })
    .then(apiData => {
      loading.style.display = 'none';
      
      datosGlobales = apiData;
    
      processAndDisplay(apiData);
    })
    .catch(error => {
      console.error('Error:', error);
      loading.innerHTML = `Error al cargar datos: ${error.message}`;
    });

    function processAndDisplay(data) {
        if (!data || !data[0] || !data[0].meals) {
          loading.innerHTML = 'Error: Formato de datos inesperado';
          loading.style.display = 'block';
          return;
        }
        
    
        const meals = data[0].meals;
        
        mealsContainer.innerHTML = '';
        
        meals.forEach(meals => {
          const card = createMealsCard(meals, data[0]);
          mealsContainer.appendChild(card);
        });
      }


      function createMealsCard(_meals, datosCompletos) {
        const strMeal = datosCompletos.strMeal.find(e => e.idMeal === idMeal.strMeal);
        
        const card = document.createElement('div');
        card.className = 'card-meals';
        card.innerHTML = `
          <h3>${strMeal.strMeal}</h3>
          <img src="${strMeal.strMealThumb}" alt="${strMeal.strMeal}">
          <p>${strMeal.strInstructions}</p>
          <a href="${strMeal.strSource}" target="_blank">Ver receta</a>
        `;

      }
      
});