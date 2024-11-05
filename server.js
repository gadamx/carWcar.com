const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const URL ="mongodb+srv://sales02paradise:123pass..P@cluster0.lzncc.mongodb.net/cartcom?retryWrites=true&w=majority&appName=Cluster0"
const sharp = require('sharp');
app.use(cors());
app.use(bodyParser.json());





app.use('/uploads', express.static('uploads')); // Для доступа к загруженным изображениям






// Подключение к MongoDB
mongoose
    .connect(URL)
    .then(() => console.log('Подключено к MongoDB'))
    .catch(err => console.error('Ошибка подключения к MongoDB:', err));




// Настройка хранилища для multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Папка для загрузки
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Уникальное имя файла
    }
});

const upload = multer({ storage: storage });









// Определение схем
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    whatsApp: { type: String, required: true },
    telegram: { type: String, required: true },
    instagram: { type: String, required: true },
    website: { type: String, required: false, default: 'not specified'  },
    address: { type: String, required: true },
    isCompany: {type: String, required: true },
    companyName: { type: String },
    licenseNumber: { type: String }

});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number,  },
    brand: { type: String,  },
    category: { type: String, required: true },
    model: { type: String, },
    yearStart: { type: Number, },
    location: { type: String, required: true },
    image: { type: [String] },
    note: { type: String, required: true },
    part: { type: String,  },
    vacation: { type: String, },
    engine: { type: String, },
    transmation: { type: String, },
    km: { type: String, },
    color: { type: String, },
    drive: { type: String, },




    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Связь с пользователем
   

});

// Модели
const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);

// Регистрация пользователя
app.post('/register', async (req, res) => {
    const { username, password, phone, email, address, isCompany, whatsApp, telegram, instagram, companyName, website, licenseNumber } = req.body;
    const user = new User ({ username, password, phone, email, whatsApp, telegram, instagram, website, address, isCompany, companyName, licenseNumber })
    await user.save();
    res.status(201).send('Пользователь зарегистрирован');
});

// Вход пользователя
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        res.json({ userId: user._id });
    } else {
        res.status(401).send('Неверные учетные данные');
    }
});

// Добавление товара с загрузкой изображения
app.post('/add-product', upload.array('image', 10), async (req, res) => {
    const { name, price, category, brand, model, yearStart, location, note, part, vacation, drive, color, km, transmation, engine, userId } = req.body;
    const imagePaths = req.files.map(file => file.path); // Путь к загруженному изображению

    const resizedImagePaths = [];

    try {
        // Обработка и изменение размеров изображений
        for (const imagePath of imagePaths) {
            const resizedImagePath = `uploads/resized_${path.basename(imagePath)}`;
            await sharp(imagePath)
                .resize(950, 650) // Задайте нужные размеры
                .toFile(resizedImagePath);
            resizedImagePaths.push(resizedImagePath);
        }

        // Создание нового товара с измененными изображениями
        const newProduct = new Product({ 
            name, 
            price, 
            category, 
            brand, 
            model, 
            yearStart, 
            location, 
            drive, 
            color, 
            km, 
            transmation, 
            engine,  
            part, 
            vacation,  
            note, 
            userId, 
            image: resizedImagePaths // Используем массив resizedImagePaths
        });

        await newProduct.save();
        res.status(201).send('Товар успешно добавлен');
    } catch (error) {
        console.error(error); // Добавляем логирование
        res.status(500).send('Ошибка добавления товара: ' + error.message);
    }
});


// Получение всех товаров
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).send('Ошибка получения товаров: ' + error.message);
    }
});

// Получение товаров конкретного пользователя
app.get('/products/:userId', async (req, res) => {
    try {
        const products = await Product.find({ userId: req.params.userId });
        res.json(products);
    } catch (error) {
        res.status(500).send('Ошибка получения товаров: ' + error.message);
    }
});

// Удаление товара
app.delete('/delete-product/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.send('Товар удалён');
    } catch (error) {
        res.status(500).send('Ошибка удаления товара: ' + error.message);
    }
});

// Редактирование товара
app.put('/edit-product/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).send('Товар не найден');
        }
        res.send('Товар обновлён');
    } catch (error) {
        res.status(500).send('Ошибка редактирования товара: ' + error.message);
    }
});

// Поиск товаров
app.get('/search', async (req, res) => {
    const { query, category } = req.query;
    try {
        const products = await Product.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { brand: { $regex: query, $options: 'i' } },
                { category: category }
            ]
        });
        res.json(products);
    } catch (error) {
        res.status(500).send('Ошибка поиска товаров: ' + error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});








// Получение информации о товаре по ID

app.get('/product/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('userId', 'username phone instagram telegram whatsApp website companyName');
        if (!product) {
            return res.status(404).send('Товар не найден');
        }
        res.json(product);
    } catch (error) {
        res.status(500).send('Ошибка получения товара: ' + error.message);
    }
});



app.get('/products', async (req, res) => {
    const { category, brand, model, yearFrom, yearTo, priceFrom, priceTo, part, location, vacation, color, drive, km, transmation,  engine} = req.query;
    
    let query = {};

    if (category && category !== 'all') query.category = category;
    if (brand && brand !== '') query.brand = brand;  // Убедимся, что бренд не пустой
    if (model && model !== '') query.model = model;
    if (part && part !== '') query.part = part;
    if (vacation && vacation !== '') query.vacation = vacation;
    if (yearFrom) query.yearStart = { $gte: parseInt(yearFrom) };
    if (yearTo) query.yearStart = { ...query.yearStart, $lte: parseInt(yearTo) };
    if (priceFrom) query.price = { $gte: parseInt(priceFrom) };
    if (priceTo) query.price = { ...query.price, $lte: parseInt(priceTo) };
    if (location && location !== '') query.location = location;
    if (drive && drive !== '') query.drive = drive;
    if (color && color !== '') query.color = color;
    if (km && km !== '') query.km = km;
    if (transmation && transmation !== '') query.transmation = transmation;
    if (engine && engine !== '') query.engine = engine;
    try {
        console.log("Запрос к базе данных с фильтрами:", query);
        const products = await Product.find(query);
        res.json(products);
    } catch (error) {
        console.error('Ошибка при выполнении запроса к базе данных:', error);
        res.status(500).send('Ошибка получения товаров: ' + error.message);
    }
});




// Получение информации о пользователе по ID
app.get('/user/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).send('Пользователь не найден');
        }
        res.json(user); // Отправляем информацию о пользователе в ответ
    } catch (error) {
        res.status(500).send('Ошибка сервера');
    }
});

// Обновление информации о пользователе
app.put('/user/:userId', async (req, res) => {
    const { username, phone, address, whatsApp, telegram, instagram, website, password, companyName } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, { username, phone, address, whatsApp, companyName, telegram, instagram, website, password}, { new: true });
        if (!updatedUser) {
            return res.status(404).send('Пользователь не найден');
        }
        res.json(updatedUser); // Отправляем обновленные данные
    } catch (error) {
        res.status(500).send('Ошибка обновления данных');
    }
});























// Определение схемы для комментариев
const commentSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);

// Добавление комментария
app.post('/comments', async (req, res) => {
    const { productId, userId, text } = req.body;
    
    const newComment = new Comment({ productId, userId, text });

    try {
        await newComment.save();
        res.status(201).send('Комментарий успешно добавлен');
    } catch (error) {
        res.status(500).send('Ошибка добавления комментария: ' + error.message);
    }
});

// Получение комментариев для товара
app.get('/comments/:productId', async (req, res) => {
    try {
        const comments = await Comment.find({ productId: req.params.productId })
        .populate('userId', 'username')
        .sort({ createdAt: -1 }); // Сортировка комментариев по дате, если нужно
      res.json(comments);
    } catch (error) {
        res.status(500).send('Ошибка получения комментариев: ' + error.message);
    }
});





