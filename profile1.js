 // Функция для перехода на главную страницу
 function goHome() {
    window.location.href = 'index.html';
}
window.onclick = function(event) {
   if (event.target == document.getElementById('edit-modal')) {
       closeEditModal();
   }
}



// Функция для обновления списка моделей на основе выбранного бренда
function updateModels() {
    const brand = document.getElementById('product-brand').value; // Получаем выбранный бренд
    const modelSelect = document.getElementById('product-model'); // Находим элемент <select> для модели
    modelSelect.innerHTML = '<option value="">Выберите модель</option>'; // Очищаем список моделей, добавляем первый пустой элемент

    // Массив моделей для каждого бренда
    const models = {
        audi: ['A1', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q2', 'Q3', 'Q5', 'Q7', 'Q8', 'TT', 'R8', 'e-tron GT', 'RS3', 'RS4', 'RS5', 'RS6', 'RS7', 'RS Q3', 'RS Q8', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
        acura: ['ILX', 'TLX', 'RLX', 'RDX', 'MDX', 'NSX', 'Integra', 'Legend', 'Vigor', 'CL', 'RSX', 'TSX', 'ZDX', 'SLX', 'EL', 'CSX'],
        alfaromeo: ['Giulia', 'Stelvio', '4C', 'GTV', 'Spider', 'Alfetta', 'Mito', 'Giulietta', 'Brera', '166', '159', '156', '147', '145', '33', 'Montreal'],
        astonmartin: ['DBX', 'Vantage', 'DB11', 'DBS', 'Rapide', 'Vanquish', 'Vulcan', 'One-77', 'Lagonda', 'DB9', 'DB7', 'Virage', 'V8 Vantage', 'V12 Vantage', 'Cygnet', 'DB5'],
        bmw: ['1 Series', '2 Series', '3 Series', '4 Series', '5 Series', '6 Series', '7 Series', '8 Series', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'Z4', 'i3', 'i4', 'i8', 'iX', 'M2', 'M3', 'M4', 'M5', 'M6', 'M8', 'X3 M', 'X5 M', 'X6 M'],
        bentley: ['Bentayga', 'Continental GT', 'Flying Spur', 'Mulsanne', 'Azure', 'Brooklands', 'Arnage', 'Turbo R', 'Continental R', 'Eight', 'T Series', 'Mark VI'],
        bugatti: ['Chiron', 'Veyron', 'Divo', 'Centodieci', 'La Voiture Noire', 'Bolide', 'EB110', 'Type 57', 'Type 41 Royale', 'Type 35', 'Type 32', 'Type 13'],
        buick: ['Enclave', 'Encore', 'Encore GX', 'Envision', 'Regal', 'LaCrosse', 'Cascada', 'Verano', 'Lucerne', 'Park Avenue', 'LeSabre', 'Century', 'Roadmaster', 'Skylark', 'Riviera', 'Wildcat'],
        cadillac: ['Escalade', 'XT5', 'XT4', 'XT6', 'CT4', 'CT5', 'CT6', 'ATS', 'XTS', 'CTS', 'SRX', 'DTS', 'STS', 'Seville', 'DeVille', 'Fleetwood', 'Eldorado', 'Cimarron', 'Brougham', 'Allante'],
        chevrolet: ['Silverado', 'Tahoe', 'Suburban', 'Colorado', 'Traverse', 'Equinox', 'Blazer', 'Trailblazer', 'Malibu', 'Impala', 'Camaro', 'Corvette', 'Spark', 'Sonic', 'Bolt', 'Cruze', 'Avalanche', 'Avalon', 'Caprice', 'Cobalt'],
        chrysler: ['300', 'Pacifica', 'Voyager', 'Aspen', 'Crossfire', 'Sebring', 'Town & Country', 'Concorde', 'LHS', 'PT Cruiser', 'Cirrus', 'LeBaron', 'New Yorker', 'Imperial', 'Fifth Avenue'],
        citroën: ['C1', 'C3', 'C3 Aircross', 'C4', 'C4 Cactus', 'C4 Picasso', 'C4 SpaceTourer', 'C5', 'C5 Aircross', 'C6', 'Berlingo', 'DS3', 'DS4', 'DS5', 'Saxo', 'Xantia', 'XM', 'ZX'],
        dacia: ['Duster', 'Sandero', 'Logan', 'Lodgy', 'Dokker', 'Spring', 'Solenza', '1310', '1100', '500', '1300', 'Nova', 'SuperNova'],
        daihatsu: ['Charade', 'Terios', 'Copen', 'Mira', 'Move', 'Sirion', 'Cuore', 'Rocky', 'Feroza', 'Applause', 'Materia', 'Hijet', 'YRV', 'Tanto', 'Bee', 'Max', 'Gran Max'],
        dodge: ['Charger', 'Challenger', 'Durango', 'Ram', 'Journey', 'Dart', 'Grand Caravan', 'Viper', 'Avenger', 'Nitro', 'Magnum', 'Caliber', 'Stratus', 'Neon', 'Intrepid'],

        ferrari: ['488', 'SF90 Stradale', 'F8 Tributo', '812 Superfast', 'Roma', 'Portofino', 'LaFerrari', '458', 'California', 'Enzo', 'F40', 'Testarossa', 'Monza SP1', 'Monza SP2', 'GTC4Lusso'],
        fiat: ['500', '500X', '500L', 'Panda', 'Tipo', 'Punto', 'Ducato', 'Uno', 'Qubo', 'Linea', 'Multipla', 'Doblo', 'Strada', 'Fiorino', 'Bravo'],
        ford: ['F-150', 'Mustang', 'Explorer', 'Escape', 'Edge', 'Bronco', 'Expedition', 'Ranger', 'Fiesta', 'Focus', 'Fusion', 'Taurus', 'C-Max', 'EcoSport', 'Transit'],
        genesis: ['G70', 'G80', 'G90', 'GV70', 'GV80'],
        gmc: ['Sierra', 'Canyon', 'Yukon', 'Acadia', 'Terrain', 'Savanna', 'Envoy'],
        honda: ['Civic', 'Accord', 'CR-V', 'Pilot', 'HR-V', 'Ridgeline', 'Odyssey', 'Fit', 'Passport', 'Element', 'Prelude', 'S2000', 'Insight', 'Clarity'],
        hyundai: ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Palisade', 'Kona', 'Veloster', 'Accent', 'Ioniq', 'Venue', 'Genesis Coupe', 'Azera'],
        infiniti: ['Q50', 'Q60', 'QX50', 'QX60', 'QX80', 'G37', 'FX35', 'EX35', 'M37', 'JX35', 'Q30'],
        isuzu: ['D-Max', 'MU-X', 'Trooper', 'Rodeo', 'Axiom', 'VehiCROSS', 'Ascender', 'Amigo', 'Hombre'],
        jaguar: ['F-Type', 'XF', 'XE', 'XJ', 'F-Pace', 'E-Pace', 'I-Pace', 'XK', 'S-Type', 'X-Type'],
        jeep: ['Wrangler', 'Grand Cherokee', 'Cherokee', 'Compass', 'Renegade', 'Gladiator', 'Patriot', 'Commander', 'Liberty'],
        kia: ['Optima', 'Soul', 'Sorento', 'Sportage', 'Telluride', 'Seltos', 'Rio', 'Forte', 'Stinger', 'Carnival', 'Niro', 'K900'],
        koenigsegg: ['Agera', 'Regera', 'Jesko', 'Gemera', 'CCX', 'One:1', 'CCR', 'CC8S'],
        lamborghini: ['Aventador', 'Huracan', 'Urus', 'Gallardo', 'Murcielago', 'Diablo', 'Countach', 'Reventon', 'Sian', 'Veneno'],
        landrover: ['Range Rover', 'Range Rover Sport', 'Range Rover Velar', 'Range Rover Evoque', 'Discovery', 'Discovery Sport', 'Defender', 'Freelander'],
        lexus: ['ES', 'IS', 'LS', 'GS', 'RX', 'NX', 'UX', 'GX', 'LX', 'RC', 'LC', 'LFA'],
        lincoln: ['Navigator', 'Aviator', 'Corsair', 'Nautilus', 'MKC', 'MKT', 'MKX', 'MKZ', 'Continental', 'Town Car'],
        lotus: ['Evora', 'Elise', 'Exige', 'Emira', 'Esprit', 'Europa', 'Elite', 'Eclat', 'Seven'],
        maserati: ['Ghibli', 'Levante', 'Quattroporte', 'GranTurismo', 'GranCabrio', 'MC20'],
        mazda: ['Mazda3', 'Mazda6', 'CX-3', 'CX-5', 'CX-9', 'CX-30', 'MX-5 Miata', 'RX-8', 'RX-7', 'BT-50', 'Mazda2'],
        mclaren: ['720S', '650S', '570S', '600LT', 'Senna', 'P1', 'GT', '765LT', 'Artura', 'Speedtail'],
        mercedesbenz: ['A-Class', 'C-Class', 'E-Class', 'S-Class', 'GLA', 'GLB', 'GLC', 'GLE', 'GLS', 'G-Class', 'AMG GT', 'CLA', 'CLS', 'SLS AMG', 'V-Class'],
        mini: ['Cooper', 'Cooper S', 'Clubman', 'Countryman', 'Paceman', 'Convertible', 'John Cooper Works'],
        mitsubishi: ['Outlander', 'Eclipse Cross', 'ASX', 'Pajero', 'Lancer', 'Mirage', 'Galant', 'Montero', 'Evolution', 'Endeavor'],
        nissan: ['Altima', 'Sentra', 'Maxima', 'Rogue', 'Murano', 'Pathfinder', 'Armada', 'Frontier', 'Titan', '370Z', 'GT-R', 'Juke', 'Kicks', 'Versa', 'Leaf'],
        pagani: ['Zonda', 'Huayra', 'Imola'],
        peugeot: ['208', '308', '508', '2008', '3008', '5008', 'Partner', 'Rifter', 'Expert', 'Traveller', '206', '207', '407', '605'],
        porsche: ['911', 'Cayenne', 'Macan', 'Panamera', 'Taycan', '718 Cayman', '718 Boxster', 'Carrera GT'],
        ram: ['1500', '2500', '3500', 'ProMaster', 'ProMaster City'],
        renault: ['Clio', 'Megane', 'Captur', 'Kadjar', 'Talisman', 'Koleos', 'Scenic', 'Espace', 'Duster', 'Twingo', 'Fluence'],
        rollsroyce: ['Phantom', 'Ghost', 'Wraith', 'Dawn', 'Cullinan', 'Silver Shadow', 'Silver Ghost', 'Silver Spur', 'Corniche'],
        saab: ['9-3', '9-5', '900', '9000', '9-4X', '9-7X'],
        seat: ['Ibiza', 'Leon', 'Ateca', 'Arona', 'Tarraco', 'Alhambra', 'Toledo', 'Cordoba'],
        skoda: ['Octavia', 'Superb', 'Fabia', 'Kodiaq', 'Karoq', 'Kamiq', 'Scala', 'Citigo', 'Yeti'],
        smart: ['Fortwo', 'Forfour', 'Roadster'],
        subaru: ['Impreza', 'Outback', 'Forester', 'Crosstrek', 'WRX', 'Legacy', 'Ascent', 'BRZ', 'Baja', 'SVX'],
        suzuki: ['Swift', 'Vitara', 'SX4', 'Jimny', 'Baleno', 'Alto', 'Celerio', 'Ignis', 'Kizashi', 'Ertiga', 'Grand Vitara'],
        tesla: ['Model S', 'Model 3', 'Model X', 'Model Y', 'Cybertruck', 'Roadster'],
        toyota: ['Corolla', 'Camry', 'Prius', 'RAV4', 'Highlander', 'Land Cruiser', 'Tacoma', 'Tundra', 'Avalon', 'Supra', '4Runner', 'Sienna', 'Yaris'],
        volkswagen: ['Golf', 'Passat', 'Tiguan', 'Jetta', 'Atlas', 'Touareg', 'Arteon', 'Beetle', 'Polo', 'ID.4'],
        volvo: ['XC40', 'XC60', 'XC90', 'S60', 'S90', 'V60', 'V90', 'C40', 'V40'],
    };

    // Если выбран бренд, и у него есть модели, добавляем их в <select>
    if (models[brand]) {
        models[brand].forEach(model => {
            const option = document.createElement('option'); // Создаем элемент <option>
            option.value = model; // Устанавливаем значение опции
            option.textContent = model; // Устанавливаем отображаемый текст опции
            modelSelect.appendChild(option); // Добавляем опцию в список моделей
        });
    }
}

// Получаем параметры из URL (например, имя пользователя и ID пользователя)
const params = new URLSearchParams(window.location.search);
const username = params.get('username'); // Получаем имя пользователя из URL
const userId = params.get('userId'); // Получаем ID пользователя из URL

// Отображаем приветственное сообщение
document.getElementById('welcome-message').textContent = `Welcome , ${username}!`;
// Загружаем товары при загрузке страницы
fetchProducts();

// Массив для хранения товаров пользователя
let products = [];

// Функция для загрузки товаров пользователя
async function fetchProducts() {
    try {
        // Отправляем запрос на сервер для получения товаров по ID пользователя
        const response = await fetch(`https://cartcom.onrender.com/products/${userId}`);
        if (!response.ok) throw new Error(`Ошибка загрузки товаров: ${response.statusText}`); // Обрабатываем ошибку, если запрос не удался

        products = await response.json(); // Парсим ответ в формате JSON
        const productList = document.getElementById('product-list'); // Получаем элемент списка товаров
        productList.innerHTML = ''; // Очищаем список товаров

        // Перебираем полученные товары и добавляем их в список
        products.forEach(product => {
            const li = document.createElement('li'); // Создаем элемент списка <li>
            li.classList.add('product-card'); // Добавляем класс для стилизации карточки товара

            // Создаем элемент изображения товара, если оно есть
            if (product.image && product.image.length > 0) {
                const img = document.createElement('img'); // Создаем элемент <img>
                img.src = `https://cartcom.onrender.com/${product.image[0]}`; // Указываем путь к изображению
                img.alt = product.name; // Устанавливаем альтернативный текст для изображения
                img.classList.add('product-image'); // Добавляем класс для стилизации изображения
                li.appendChild(img); // Добавляем изображение к элементу товара
            }

            // Создаем контейнер для деталей товара
            const detailsDiv = document.createElement('div'); // Создаем контейнер <div> для деталей
            detailsDiv.classList.add('product-details'); // Добавляем класс для стилей деталей

            // Добавляем название товара
            const title = document.createElement('h4'); // Создаем заголовок товара
            title.textContent = product.name; // Устанавливаем название товара
            title.classList.add('product-title'); // Добавляем класс для стилизации заголовка
            detailsDiv.appendChild(title); // Добавляем заголовок в контейнер деталей

            // Добавляем цену товара
            const price = document.createElement('p'); // Создаем элемент для отображения цены
            price.textContent = `${product.price} AED`; // Устанавливаем цену товара
            price.classList.add('product-price'); // Добавляем класс для стилизации цены
            detailsDiv.appendChild(price); // Добавляем цену в контейнер деталей

            // Добавляем описание товара
            const description = document.createElement('textarea'); // Создаем элемент текстового поля
            description.textContent = product.note; // Устанавливаем текст описания товара
            description.classList.add('product-description'); // Добавляем класс для стилизации описания
            detailsDiv.appendChild(description); // Добавляем описание в контейнер деталей

            li.appendChild(detailsDiv); // Добавляем контейнер деталей в элемент товара

            // Создаем контейнер для кнопок действий
            const actionsDiv = document.createElement('div'); // Создаем контейнер для кнопок
            actionsDiv.classList.add('product-actions'); // Добавляем класс для стилизации кнопок

            // Кнопка редактирования
            const editButton = document.createElement('button'); // Создаем кнопку редактирования
            editButton.textContent = 'Edit'; // Устанавливаем текст кнопки
            editButton.onclick = () => editProduct(product._id); // Назначаем событие при клике
            actionsDiv.appendChild(editButton); // Добавляем кнопку в контейнер действий

            // Кнопка удаления
            const deleteButton = document.createElement('button'); // Создаем кнопку удаления
            deleteButton.textContent = 'Delet'; // Устанавливаем текст кнопки
            deleteButton.onclick = () => deleteProduct(product._id); // Назначаем событие при клике
            actionsDiv.appendChild(deleteButton); // Добавляем кнопку в контейнер действий

            li.appendChild(actionsDiv); // Добавляем контейнер действий в элемент товара
            productList.appendChild(li); // Добавляем элемент товара в список
        });
    } catch (error) {
        alert('Ошибка загрузки товаров: ' + error.message); // Выводим сообщение об ошибке
    }
}




async function editProduct(productId) {
    console.log('Попытка редактирования товара с ID:', productId); // Логируем ID товара
    currentProductId = productId; // Устанавливаем ID товара

    try {
        // Отправляем запрос на сервер
        const response = await fetch(`https://cartcom.onrender.com/product/${productId}`);
        console.log('Ответ от сервера:', response); // Логируем ответ сервера

        // Проверяем статус ответа
        if (!response.ok) {
            throw new Error('Ошибка получения товара: ' + response.statusText);
        }

        // Парсим ответ в JSON
        const product = await response.json();
        console.log('Данные товара:', product); // Логируем полученные данные

        // Проверка на наличие товара
        if (product) {
            document.getElementById('product-name').value = product.name || '';
            document.getElementById('product-price').value = product.price || '';
            document.getElementById('product-description').value = product.note || '';
            document.getElementById('product-year-start').value = product.yearStart || '';
            document.getElementById('product-location').value = product.location || '';
            document.getElementById('product-category').value = product.category || '';
            document.getElementById('product-brand').value = product.brand || '';
            
            // Обновляем модели для выбранного бренда
            updateModels(); 

            // Ожидаем обновления списка моделей
            setTimeout(() => {
                document.getElementById('product-model').value = product.model || '';
            }, 100);


         // Проверка и отображение поля "vacation" на основе категории
         const vacationElement = document.getElementById('product-vacation-group');
         const partElement = document.getElementById('part-select-group');
         const driveElement = document.getElementById('product-drive-group');
         const kmElement = document.getElementById('product-km-group');
         const colorElement = document.getElementById('product-color-group');
         const engineElement = document.getElementById('product-engine-group');
         const transmationElement = document.getElementById('product-transmation-group');
         const yearStartElement = document.getElementById('product-year-start-group');
         const priceElement = document.getElementById('product-price-group');
         const modelElement = document.getElementById('product-model-group');
         const brandElement = document.getElementById('product-brand-group');
         
         // Проверяем наличие элементов
         if (vacationElement && partElement && driveElement && kmElement && colorElement && engineElement && transmationElement && yearStartElement && priceElement && modelElement && brandElement) {
             if (product.category === 'car' || product.category === 'rent') {
                 // Скрываем поля для категорий "car" и "rent"
                 vacationElement.classList.add('hidden');
                 partElement.classList.add('hidden');
             } else if (product.category === 'parts') {
                 // Скрываем поля для категории "parts"
                 vacationElement.classList.add('hidden');
                 driveElement.classList.add('hidden');
                 kmElement.classList.add('hidden');
                 colorElement.classList.add('hidden');
                 
                 // Показываем нужные поля
                 partElement.classList.remove('hidden');
                 document.getElementById('part-select').value = product.part || '';
             } else if (product.category === 'service') {
                 // Скрываем поля для категории "service"
                 engineElement.classList.add('hidden');
                 transmationElement.classList.add('hidden');
                 colorElement.classList.add('hidden');
                 kmElement.classList.add('hidden');
                 driveElement.classList.add('hidden');
                 vacationElement.classList.add('hidden');
                 yearStartElement.classList.add('hidden');
                 priceElement.classList.add('hidden');
                 modelElement.classList.add('hidden');
             } else if (product.category === 'yacht') {
                 // Скрываем поля для категории "yacht"
                 priceElement.classList.add('hidden');
                 yearStartElement.classList.add('hidden');
                 brandElement.classList.add('hidden');
                 partElement.classList.add('hidden');
                 vacationElement.classList.add('hidden');
                 driveElement.classList.add('hidden');
                 kmElement.classList.add('hidden');
                 colorElement.classList.add('hidden');
                 transmationElement.classList.add('hidden');
                 engineElement.classList.add('hidden');
                 modelElement.classList.add('hidden');
             } else {
                 // Показываем все поля для других категорий, если необходимо
                 vacationElement.classList.remove('hidden');
                 driveElement.classList.remove('hidden');
                 kmElement.classList.remove('hidden');
                 colorElement.classList.remove('hidden');
                 engineElement.classList.remove('hidden');
                 transmationElement.classList.remove('hidden');
                 yearStartElement.classList.remove('hidden');
                 priceElement.classList.remove('hidden');
                 modelElement.classList.remove('hidden');
                 brandElement.classList.remove('hidden');
                 partElement.classList.remove('hidden');
                 document.getElementById('product-vacation').value = product.vacation || '';
                 document.getElementById('part-select').value = product.part || '';
             }
         } else {
             console.warn('Один или несколько элементов не найдены в DOM.');
         }






















            // Заполняем остальные поля
            document.getElementById('part-select').value = product.part || '';
            document.getElementById('product-vacation').value = product.vacation || '';
            document.getElementById('product-drive').value = product.drive || '';
            document.getElementById('product-km').value = product.km || '';
            document.getElementById('product-color').value = product.color || '';
            document.getElementById('product-transmation').value = product.transmation || '';
            document.getElementById('product-engine').value = product.engine || '';

            // Показываем модальное окно для редактирования
            document.getElementById('edit-modal').classList.remove('hidden');
        } else {
            alert('Товар не найден');
        }
    } catch (error) {
        console.error('Ошибка при запросе данных товара:', error); // Логируем ошибку
        alert('Ошибка при загрузке данных товара: ' + error.message);
    }
}





// Функция для удаления товара
async function deleteProduct(id) {
    if (confirm('Вы уверены, что хотите удалить этот товар?')) { // Подтверждаем действие у пользователя
        try {
            // Отправляем запрос на сервер для удаления товара
            const response = await fetch(`https://cartcom.onrender.com/delete-product/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Ошибка удаления товара: ' + response.statusText); // Обрабатываем ошибки
            alert('Товар успешно удалён!'); // Уведомляем пользователя об успешном удалении
            fetchProducts(); // Обновляем список товаров
        } catch (error) {
            alert(error.message); // Выводим сообщение об ошибке
        }
    }
}

// Переменная для хранения ID редактируемого товара
let currentProductId = null;

// Функция для открытия модального окна редактирования товара
function openEditModal(product) {
    currentProductId = product._id; // Сохраняем ID текущего товара

    // Заполняем поля формы данными товара
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-description').value = product.note;
    document.getElementById('product-year-start').value = product.yearStart;
    document.getElementById('product-location').value = product.location;
    document.getElementById('product-category').value = product.category;
    document.getElementById('product-brand').value = product.brand;
    document.getElementById('product-model').value = product.model;

    // Показ дополнительных полей, если они есть
    document.getElementById('product-part').value = product.part;
    document.getElementById('product-color-group').value = product.color;
    document.getElementById('product-engine-group').value = product.engine;
    document.getElementById('product-transmation-group').value = product.transmation;
    document.getElementById('product-km-group').value = product.km;
    document.getElementById('product-drive-group').value = product.drive;
    document.getElementById('product-vacation-group').value = product.vacation;

    document.getElementById('edit-modal').classList.remove('hidden'); // Показываем модальное окно
}


/// Функция для закрытия модального окна редактирования товара
function closeEditModal() {
    document.getElementById('edit-modal').classList.add('hidden'); // Скрываем модальное окно
    window.location.reload(); // Перезагружаем страницу автоматически после закрытия модального окна
}

// Функция для скрытия/показа полей в зависимости от значения
function toggleFieldVisibility(fieldId, value) {
    const fieldGroup = document.getElementById(fieldId); // Находим элемент по ID
    if (fieldGroup) { // Если элемент найден
        if (value) {
            fieldGroup.classList.remove('hidden'); // Показываем элемент, если есть значение
        } else {
            fieldGroup.classList.add('hidden'); // Скрываем элемент, если значение пустое
        }
    } else {
        console.warn(`Элемент с id "${fieldId}" не найден.`); // Логируем предупреждение, если элемент не найден
    }
}

// Функция для выхода из системы
function logout() {
    if (confirm('Вы уверены, что хотите выйти?')) { // Подтверждаем действие
        localStorage.removeItem('username'); // Удаляем имя пользователя из localStorage
        localStorage.removeItem('userId'); // Удаляем ID пользователя из localStorage
        alert('Вы вышли из системы.'); // Уведомляем пользователя
        window.location.href = 'index.html'; // Перенаправляем на главную страницу
    }
}

// Функция для перехода на страницу добавления товара
function goToAddProduct() {
    window.location.href = `add-product.html?username=${username}&userId=${userId}`; // Перенаправляем с параметрами
}

// Функция для показа всплывающего меню профиля
window.onload = function() {
    const savedUsername = localStorage.getItem('username'); // Получаем имя пользователя из localStorage
    const usernameElement = document.getElementById('user-name'); // Находим элемент для отображения имени
    const popupMenu = document.getElementById('popup-menu'); // Находим всплывающее меню

    if (usernameElement && savedUsername) { // Если есть сохраненное имя пользователя
        usernameElement.textContent = savedUsername; // Устанавливаем текст для отображения имени
        usernameElement.classList.remove('hidden'); // Показываем элемент с именем пользователя
    }

    // Показываем всплывающее меню при наведении на имя пользователя
    usernameElement.addEventListener('mouseover', function(event) {
        const rect = usernameElement.getBoundingClientRect(); // Получаем координаты элемента
        popupMenu.style.display = 'block'; // Показываем всплывающее меню
        popupMenu.style.top = `${rect.bottom + window.scrollY}px`; // Устанавливаем положение меню по оси Y
        popupMenu.style.left = `${rect.left}px`; // Устанавливаем положение меню по оси X
    });

    // Скрываем всплывающее меню, если курсор уходит с элемента
    usernameElement.addEventListener('mouseleave', function() {
        setTimeout(() => {
            if (!popupMenu.matches(':hover')) { // Проверяем, наведен ли курсор на меню
                popupMenu.style.display = 'none'; // Скрываем меню, если курсор не на нем
            }
        }, 200); // Добавляем небольшую задержку
    });

    popupMenu.addEventListener('mouseleave', function() {
        popupMenu.style.display = 'none'; // Скрываем меню, если курсор ушел с него
    });
};



// Функция для сохранения изменений товара
async function saveProduct() {
    const productName = document.getElementById('product-name')?.value || ''; // Проверка на наличие элемента
    const productPrice = document.getElementById('product-price')?.value || '';
    const productDescription = document.getElementById('product-description')?.value || '';
    const productYearStart = document.getElementById('product-year-start')?.value || '';
    const productLocation = document.getElementById('product-location')?.value || '';
    const productCategory = document.getElementById('product-category')?.value || '';
    const productBrand = document.getElementById('product-brand')?.value || ''; 
    const productModel = document.getElementById('product-model')?.value || '';
    const productPart = document.getElementById('product-part')?.value || '';
    const productYacht = document.getElementById('product-vacation')?.value || '';
    const productDrive = document.getElementById('product-drive')?.value || '';
    const productColor = document.getElementById('product-color')?.value || '';
    const productKm = document.getElementById('product-km')?.value || '';
    const productEngine = document.getElementById('product-engine')?.value || '';

    // Формируем тело запроса
    const body = JSON.stringify({
        name: productName,
        price: productPrice,
        description: productDescription,
        yearStart: productYearStart,
        location: productLocation,
        category: productCategory,
        brand: productBrand,
        model: productModel,
        note: productDescription,
        part: productPart,
        vacation: productYacht,
        color: productColor,
        km: productKm,
        engine: productEngine,
        drive: productDrive
    });

    console.log('Отправляемое тело запроса:', body); // Логирование тела запроса

    try {
        const response = await fetch(`https://cartcom.onrender.com/edit-product/${currentProductId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body, // Отправляем тело запроса
        });

        if (!response.ok) throw new Error('Ошибка редактирования товара: ' + response.statusText);
        alert('Товар успешно обновлён!');
        fetchProducts();
        closeEditModal();
    } catch (error) {
        alert(error.message);
    }
}



// Функция для редактирования профиля
async function editProfile() {
    const userId = localStorage.getItem('userId'); // Получаем userId из localStorage
    if (!userId) {
        console.error('userId не найден в localStorage');
        return;
    }

    try {
        // Запрос на сервер для получения информации о пользователе
        const response = await fetch(`https://cartcom.onrender.com/user/${userId}`);
        if (!response.ok) throw new Error('Ошибка получения данных профиля: ' + response.statusText);
        
        const userData = await response.json(); // Парсим данные профиля

        // Заполняем поля формы профиля
        document.getElementById('profile-username').value = userData.username || '';
        document.getElementById('profile-phone').value = userData.phone || '';
        document.getElementById('profile-whatsApp').value = userData.whatsApp || '';
        document.getElementById('profile-telegram').value = userData.telegram || '';
        document.getElementById('profile-instagram').value = userData.instagram || '';
        document.getElementById('profile-website').value = userData.website || '';
        document.getElementById('profile-address').value = userData.address || '';
    

        // Открываем модальное окно редактирования профиля
        document.getElementById('edit-profile-modal').classList.remove('hidden');
    } catch (error) {
        console.error('Ошибка получения данных профиля:', error);
    }
}

// Функция для сохранения изменений профиля
async function saveProfile() {
    const userId = localStorage.getItem('userId'); // Получаем userId из localStorage
    const username = document.getElementById('profile-username').value || '';
    const phone = document.getElementById('profile-phone').value || '';
    
    const whatsApp = document.getElementById('profile-whatsApp').value || '';
    const telegram = document.getElementById('profile-telegram').value || '';
    const instagram = document.getElementById('profile-instagram').value || '';
    const website = document.getElementById('profile-website').value || '';
    const address = document.getElementById('profile-address').value || '';

    try {
        // Отправляем PUT-запрос для сохранения профиля
        const response = await fetch(`https://cartcom.onrender.com/user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, phone, address, whatsApp, telegram, instagram, website }), // Отправляем обновленные данные
        });

        if (!response.ok) throw new Error('Ошибка обновления профиля: ' + response.statusText);

        alert('Профиль успешно обновлен');
        closeProfileModal(); // Закрываем модальное окно после сохранения
    } catch (error) {
        console.error('Ошибка сохранения профиля:', error);
    }
}

// Функция для закрытия модального окна редактирования профиля
function closeProfileModal() {
    document.getElementById('edit-profile-modal').classList.add('hidden'); // Скрываем модальное окно
}




