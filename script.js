function calculate() {
    // Получаем данные из формы
    const age = parseFloat(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const gender = document.getElementById('gender').value;
    const activity = parseFloat(document.getElementById('activity').value);

    // Проверяем, что все поля заполнены
    if (!age || !weight || !height || !gender || !activity) {
        alert('Пожалуйста, заполните все поля!');
        return;
    }

    // Расчёт BMR по формуле Миффлина–Сан Жеора
    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Суточная норма калорий
    const dailyCalories = bmr * activity;

    // Нормы БЖУ (на 1 кг веса)
    const protein = Math.round(weight * 2); // 2 г/кг
    const fat = Math.round(weight * 0.9); // 0,9 г/кг

    // Углеводы — остаток калорий
    const carbs = Math.round((dailyCalories - (protein * 4 + fat * 9)) / 4);

    // Вода (35 мл/кг)
    const water = Math.round(weight * 35);

    // Генерация примерного меню
    const mealPlan = generateMealPlan(protein, carbs, dailyCalories);

    // Вывод результата
    displayResult(dailyCalories, protein, fat, carbs, water, mealPlan);
}

function generateMealPlan(protein, carbs, calories) {
    const meals = {
        breakfast: "Овсянка на молоке (50 г) + банан + творог (100 г) + чай/кофе без сахара",
        lunch: "Гречка (80 г) + куриная грудка (150 г) + салат из свежих овощей с оливковым маслом",
        dinner: "Запечённая рыба (200 г) + рис (60 г) + брокколи на пару",
        snacks: "Йогурт натуральный (150 г) + горсть орехов (30 г) + яблоко"
    };

    return `
        <h3>Пример меню на день:</h3>
        <p><strong>Завтрак:</strong> ${meals.breakfast}</p>
        <p><strong>Обед:</strong> ${meals.lunch}</p>
        <p><strong>Ужин:</strong> ${meals.dinner}</p>
        <p><strong>Перекусы:</strong> ${meals.snacks}</p>
        <p><em>Совет: ешьте за 1,5–2 часа до тренировки, восполняйте белки в течение 30 мин после.</em></p>
    `;
}

function displayResult(calories, protein, fat, carbs, water, mealPlan) {
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <h2>Ваш индивидуальный рацион</h2>
        <p><strong>Суточная норма калорий:</strong> ${Math.round(calories)} ккал</p>
        <p><strong>Белки:</strong> ${protein} г (рост мышц)</p>
        <p><strong>Жиры:</strong> ${fat} г (здоровье гормонов)</p>
        <p><strong>Углеводы:</strong> ${carbs} г (энергия для тренировок)</p>
        <p><strong>Вода:</strong> ${water} мл (не менее 3 глотков в час тренировки)</p>
        ${mealPlan}
    `;
}
