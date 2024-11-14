let products = []; // Переменная для хранения всех товаров
const itemsPerPage = 16;
let currentPage = 1;

window.onload = function() {
    fetchProducts(); // Загружаем товары при загрузке страницы

    // Привязываем форму поиска к функции handleSearch
    document.getElementById('search-space').addEventListener('submit', handleSearch);

    // Проверяем, сохранён ли пользователь
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
        document.getElementById('user-name').textContent = savedUsername;
        document.getElementById('user-name').classList.remove('hidden');
        document.getElementById('login-button').classList.add('hidden');
    }
};








// Функция для загрузки товаров с сервера
async function fetchProducts() {
    try {
        const response = await fetch('https://cartcom.onrender.com/products');
        products = await response.json(); // Сохраняем товары в переменной
        displayProducts(products); // Отображаем товары на странице
    } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
    }
}

// Функция для отображения товаров
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Очищаем список перед добавлением

    if (products.length > 0) {
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.innerHTML = `
                <img src="https://cartcom.onrender.com/${product.image[0]}" alt="${product.name}" class="product-image" />
                <h2>${product.name}</h2>
                <p>${product.price} </p>
                <p>${product.location}</p>
                
                <button id="productInfo" onclick="window.location.href='product.html?id=${product._id}'">Подробнее</button>
            `;
            productList.appendChild(productDiv);
        });
    } else {
        productList.innerHTML = '<p>Нет товаров по вашему запросу.</p>';
    } 
}

// Поиск товаров
function handleSearch(event) {
    event.preventDefault(); // Предотвращаем отправку формы
    const searchInput = document.getElementById('search-input').value.trim(); // Получаем введённый текст

    if (searchInput) {
        // Выполняем поиск по введенному запросу
        performSearch(searchInput);
    } else {
        // Если поле пустое, отображаем все товары
        displayProducts(products); // Предполагается, что products содержит все товары
    }
}



document.getElementById('search-input').addEventListener('input', function() {
    const clearButton = document.getElementById('clear-search');
    if (this.value.trim() !== '') {
        clearButton.classList.remove('hidden'); // Показываем кнопку
    } else {
        clearButton.classList.add('hidden'); // Скрываем кнопку
    }
});

// Обработчик на кнопку "Х"
document.getElementById('clear-search').addEventListener('click', function() {
    const searchInput = document.getElementById('search-input');
    searchInput.value = ''; // Очищаем поле
    this.classList.add('hidden'); // Скрываем кнопку "Х"
    displayProducts(products); // Отображаем все товары
});




function updateModels() {
    const brandSelect = document.getElementById('brand-select');
    const modelSelect = document.getElementById('model-select');
    
    // Очищаем предыдущие модели
    modelSelect.innerHTML = '<option value="">Модель</option>';

    const selectedBrand = brandSelect.value;
    
    // Определяем список моделей для каждой марки
    const modelsByBrand = {
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
        mercedes: ['A-Class', 'C-Class', 'E-Class', 'S-Class', 'GLA', 'GLB', 'GLC', 'GLE', 'GLS', 'G-Class', 'AMG GT', 'CLA', 'CLS', 'SLS AMG', 'V-Class'],
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

    // Если бренд выбран, добавляем модели для этого бренда
    if (selectedBrand && modelsByBrand[selectedBrand]) {
        modelsByBrand[selectedBrand].forEach(model => {
            const option = document.createElement('option');
            option.value = model.toLowerCase();
            option.textContent = model;
            modelSelect.appendChild(option);
        });
    }
}




// Выполнение поиска товаров
function performSearch(query) {
    const results = products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
    displayProducts(results); // Отображаем результаты поиска
}

// Фильтрация товаров
function applyFilters() {
    const category = document.getElementById('category-select').value;

    // Фильтры
    const brandFilterGroup = document.getElementById('brand-select').parentElement;
    const modelFilterGroup = document.getElementById('model-select').parentElement;
    const partFilterGroup = document.getElementById('part-filter-group');
    const yearFromElement = document.getElementById('year-from').parentElement;
    const yearToElement = document.getElementById('year-to').parentElement;
    const priceFromElement = document.getElementById('price-from').parentElement;
    const priceToElement = document.getElementById('price-to').parentElement;
    const yachtFilterGroup = document.getElementById('yacht-filter-group');
    const locationFilterGroup = document.getElementById('location-select').parentElement;

    // Скрываем все фильтры по умолчанию
    brandFilterGroup.classList.add('hidden');
    modelFilterGroup.classList.add('hidden');
    partFilterGroup.classList.add('hidden');
    yearFromElement.classList.add('hidden');
    yearToElement.classList.add('hidden');
    priceFromElement.classList.add('hidden');
    priceToElement.classList.add('hidden');
    yachtFilterGroup.classList.add('hidden');
    locationFilterGroup.classList.add('hidden');

    // Логика отображения фильтров в зависимости от категории
    if (category === 'car' || category === 'all' || category === '') {
        // Для категории "Автомобили" или если категория не выбрана
        brandFilterGroup.classList.remove('hidden');
        modelFilterGroup.classList.remove('hidden');
        yearFromElement.classList.remove('hidden');
        yearToElement.classList.remove('hidden');
        priceFromElement.classList.remove('hidden');
        priceToElement.classList.remove('hidden');
        locationFilterGroup.classList.remove('hidden');
    } else if (category === 'parts') {
        // Для категории "Запчасти"
        brandFilterGroup.classList.remove('hidden');
        modelFilterGroup.classList.remove('hidden');
        partFilterGroup.classList.remove('hidden');
        yearFromElement.classList.remove('hidden');
        yearToElement.classList.remove('hidden');
        priceToElement.classList.remove('hidden');
        locationFilterGroup.classList.remove('hidden');
    } else if (category === 'service') {
        // Для категории "Сервис"
        brandFilterGroup.classList.remove('hidden');
        modelFilterGroup.classList.remove('hidden');
        partFilterGroup.classList.remove('hidden');
        locationFilterGroup.classList.remove('hidden');
    } else if (category === 'rent') {
        // Для категории "Аренда"
        brandFilterGroup.classList.remove('hidden');
        modelFilterGroup.classList.remove('hidden');
        yearFromElement.classList.remove('hidden');
        yearToElement.classList.remove('hidden');
        priceFromElement.classList.remove('hidden');
        priceToElement.classList.remove('hidden');
        locationFilterGroup.classList.remove('hidden');
    } else if (category === 'yacht') {
        // Для категории "Яхты"
        yachtFilterGroup.classList.remove('hidden');
        locationFilterGroup.classList.remove('hidden');
    }





    
    // Получаем значения фильтров
    const brand = document.getElementById('brand-select').value;
    const model = document.getElementById('model-select').value;
    const yearFrom = document.getElementById('year-from').value;
    const yearTo = document.getElementById('year-to').value;
    const priceFrom = document.getElementById('price-from').value;
    const priceTo = document.getElementById('price-to').value;
    const location = document.getElementById('location-select').value;
    const part = document.getElementById('part-select').value;
    const yacht = document.getElementById('yacht-filter-group').value;

    let filteredProducts = products;

    // Применяем фильтры только если значение не пустое или не "all"
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }
    if (brand !== '') {
        filteredProducts = filteredProducts.filter(product => product.brand === brand);
    }
    if (model !== '') {
        filteredProducts = filteredProducts.filter(product => product.model && product.model.toLowerCase() === model);
    }
    if (yearFrom !== '') {
        filteredProducts = filteredProducts.filter(product => product.yearStart >= parseInt(yearFrom));
    }
    if (yearTo !== '') {
        filteredProducts = filteredProducts.filter(product => product.yearStart <= parseInt(yearTo));
    }
    if (priceFrom !== '') {
        filteredProducts = filteredProducts.filter(product => product.price >= parseInt(priceFrom));
    }
    if (priceTo !== '') {
        filteredProducts = filteredProducts.filter(product => product.price <= parseInt(priceTo));
    }
    if (location !== '') {
        filteredProducts = filteredProducts.filter(product => product.location && product.location.toLowerCase() === location);
    }
    if (part !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.part === part);
    }
    if (yacht !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.yacht === yacht);
    }


    displayProducts(filteredProducts);
}





// Обновление моделей на основе выбранной марки
function updateModels() {
    const brandSelect = document.getElementById('brand-select');
    const modelSelect = document.getElementById('model-select');

    modelSelect.innerHTML = '<option value="">Все модели</option>'; // Очищаем модели

    const selectedBrand = brandSelect.value;

    const modelsByBrand = {
       
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
        mercedes: ['A-Class', 'C-Class', 'E-Class', 'S-Class', 'GLA', 'GLB', 'GLC', 'GLE', 'GLS', 'G-Class', 'AMG GT', 'CLA', 'CLS', 'SLS AMG', 'V-Class'],
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

    if (modelsByBrand[selectedBrand]) {
        modelsByBrand[selectedBrand].forEach(model => {
            const option = document.createElement('option');
            option.value = model.toLowerCase();
            option.textContent = model;
            modelSelect.appendChild(option);
        });
    }
}












// Загрузка товаров при загрузке страницы
window.onload = function() {
    fetchProducts();
};

document.getElementById('category-select').addEventListener('change', function(event) {
    filterByCategory(event.target.value);
});



function resetFilters() {
    const filters = [
        'brand-select', 'model-select', 'year-from', 'year-to', 
        'price-from', 'price-to', 'location-select', 
        'part-select', 'yacht-select'
    ];
    filters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            if (filter.tagName === 'SELECT') {
                filter.value = filter.options[0].value; // Сброс к первому значению
            } else {
                filter.value = ''; // Сброс к пустому значению для input
            }
        }
    });
}




// Фильтрация товаров по категории при нажатии на кнопку в header
function filterByCategory(category) {
    // Сброс всех фильтров, если они существуют на странице
    const brandSelect = document.getElementById('brand-select');
    if (brandSelect) brandSelect.value = '';

    const modelSelect = document.getElementById('model-select');
    if (modelSelect) modelSelect.value = '';

    const yearFrom = document.getElementById('year-from');
    if (yearFrom) yearFrom.value = '';

    const yearTo = document.getElementById('year-to');
    if (yearTo) yearTo.value = '';

    const priceFrom = document.getElementById('price-from');
    if (priceFrom) priceFrom.value = '';

    const priceTo = document.getElementById('price-to');
    if (priceTo) priceTo.value = '';

    const locationSelect = document.getElementById('location-select');
    if (locationSelect) locationSelect.value = '';

    const partSelect = document.getElementById('part-select');
    if (partSelect) partSelect.value = 'all';

    const yachtSelect = document.getElementById('yacht-select');
    if (yachtSelect) yachtSelect.value = 'all';

    // Устанавливаем категорию в фильтре
    const categorySelect = document.getElementById('category-select');
    if (categorySelect) categorySelect.value = category;

    // Применяем фильтры
    applyFilters();
}







// Переход на главную страницу
function goHome() {
    window.location.href = 'https://gadamx.github.io/carWcar.com/';
}

// Переход на страницу профиля
function goToProfile() {
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    if (userId && username) {
        window.location.href = `profile.html?username=${username}&userId=${userId}`;
    } else {
        alert('Пожалуйста, войдите в систему.');
    }
}

// Показать модальное окно авторизации
function showPopup() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('popup').style.display = 'block';
}

// Скрыть модальное окно авторизации
function hidePopup() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('popup').style.display = 'none';
}

// Авторизация
async function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('https://cartcom.onrender.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) throw new Error('Ошибка входа');
        const data = await response.json();
        alert('Успешный вход!');

        document.getElementById('login-button').classList.add('hidden');
        const userNameElement = document.getElementById('user-name');
        userNameElement.textContent = username;
        userNameElement.classList.remove('hidden');

        localStorage.setItem('username', username);
        localStorage.setItem('userId', data.userId);
        fetchProducts();
         





        
    } catch (error) {
        alert(error.message);
    }
}





// Регистрация
async function handleRegister(event) {
    event.preventDefault();

    const username = document.getElementById('register-username').value;
    const phone = document.getElementById('register-phone').value;
    const whatsApp = document.getElementById('register-whatsApp').value;
    const telegram = document.getElementById('register-telegram').value;
    const instagram = document.getElementById('register-instagram').value;
    
    const email = document.getElementById('register-website').value;
    const address = document.getElementById('register-address').value;
    const password = document.getElementById('register-password').value;


    const isCompany = document.querySelector('input[name="registration-type"]:checked').value === 'company';
    let companyName, website, licenseNumber;

    if (isCompany) {
        companyName = document.getElementById('register-company-name').value;
        licenseNumber = document.getElementById('register-license-number').value;
        website = document.getElementById('register-website').value;
    }

    if (!username || !phone || !email || !address || !whatsApp || !telegram || !instagram || !password || (isCompany && (!companyName || !website || !licenseNumber))) {
        alert('Пожалуйста, заполните все поля.');
        return;
    }

    const userData = { 
        username, 
        phone, 
        email, 
        whatsApp,
        instagram,
        telegram,
        address, 
        password, 
        isCompany, 
        ...(isCompany && { companyName, licenseNumber,website }) 
    };

    try {
        const response = await fetch('https://cartcom.onrender.com/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) throw new Error('Ошибка регистрации');
        alert('Регистрация прошла успешно! Пожалуйста, войдите.');
        closePopup();

        toggleForms();
    } catch (error) {
        alert(error.message);
    }
}

// Переключение между формами входа и регистрации
function toggleForms() {
    document.getElementById('login-form').classList.toggle('hidden');
    document.getElementById('register-form').classList.toggle('hidden');
}


function toggleCompanyFields() {
    const companyFields = document.getElementById('company-fields');
    const isCompany = document.querySelector('input[name="registration-type"]:checked').value === 'company';
    
    if (isCompany) {
        companyFields.classList.remove('hidden');
    } else {
        companyFields.classList.add('hidden');
    }
}






function closePopup() {
    document.getElementById('popup').classList.add('hidden');
    document.getElementById('overlay').classList.add('hidden');
}













// Проверка авторизации и переход на страницу добавления товара
function handleAddProductClick() {
    const userId = localStorage.getItem('userId'); // Проверяем, есть ли userId в localStorage
    if (userId) {
        // Пользователь авторизован
        
        window.location.href = 'add-product.html?userId=' + userId; // Перенаправляем на страницу добавления товара
    } else {
        // Пользователь не авторизован
        alert('Пожалуйста, войдите в кабинет, чтобы добавить товар.');
        showPopup(); // Показываем окно авторизации
    }
}



window.onload = function() {
    fetchProducts();



    document.getElementById('category-select').value = 'car'; // Устанавливаем категорию "car" по умолчанию
    applyFilters(); // Применяем фильтры для категории "car"
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
        document.getElementById('user-name').textContent = savedUsername;
        document.getElementById('user-name').classList.remove('hidden');
        document.getElementById('login-button').classList.add('hidden');
    }
};

