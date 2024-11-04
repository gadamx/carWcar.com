let currentImageIndex = 0;
let images = []; // Массив для хранения путей изображений

async function fetchProductDetails() {
    try {
        const response = await fetch(`http://localhost:5000/product/${productId}`);
        const product = await response.json();

        // Проверяем наличие изображений
        if (product.image && product.image.length > 0) {
            images = product.image;

            const imagesContainer = document.getElementById('product-images');
            imagesContainer.innerHTML = ''; // Очистка контейнера для изображений

            // Отображаем изображения и скрываем все, кроме первого
            product.image.forEach((imagePath, index) => {
                const img = document.createElement('img');
                img.src = `http://localhost:5000/${imagePath}`;
                img.classList.add('product-images');

                // Добавляем класс 'hidden' для всех изображений, кроме первого
                if (index !== 0) {
                    img.classList.add('hidden');
                }

                imagesContainer.appendChild(img);
            });

            showImage(0); // Отображаем первое изображение
        } else {
            console.error('Нет изображений для отображения');
            document.getElementById('product-image').alt = 'Изображение отсутствует';
        }

        // Заполняем остальную информацию о продукте
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-price').textContent = ` ${product.price} AED`;
        document.getElementById('product-location').textContent = `adres: ${product.location}`;
        document.getElementById('product-note').textContent = `Note: ${product.note}`;

        // Отображение информации о продавце
        if (product.userId) {
          
            document.getElementById('seller-name').textContent =  product.userId.username;
            document.getElementById('seller-company').textContent =  product.userId.companyName;
            document.getElementById('seller-phone').textContent =  `phone: ${product.userId.phone}`;
            document.getElementById('seller-website').textContent = `website: ${ product.userId.website}`;
            document.getElementById('seller-instagram').textContent = `instagram: ${product.userId.instagram}`;
            document.getElementById('seller-telegram').textContent = `telegram: ${product.userId.telegram}`;
            document.getElementById('seller-whatsApp').textContent = `WhatsApp: ${product.userId.whatsApp}`;
        } else {
            console.error('Информация о пользователе отсутствует');
        }
    } catch (error) {
        console.error('Ошибка при загрузке товара:', error);
    }
}

function showImage(index) {
    const imagesContainer = document.getElementById('product-images');
    const imageElements = imagesContainer.getElementsByTagName('img');

    // Скрываем все изображения
    for (let i = 0; i < imageElements.length; i++) {
        imageElements[i].classList.add('hidden');
    }

    // Показываем только текущее изображение
    if (index >= 0 && index < images.length) {
        imageElements[index].classList.remove('hidden');
        currentImageIndex = index;
    }
}

function prevImage() {
    if (currentImageIndex > 0) {
        showImage(currentImageIndex - 1);
    }
}

function nextImage() {
    if (currentImageIndex < images.length - 1) {
        showImage(currentImageIndex + 1);
    }
}

// Запуск получения информации о продукте
fetchProductDetails();


// Функция для отправки комментария
async function submitComment() {
    const commentText = document.getElementById('comment-text').value;
    const productId = new URLSearchParams(window.location.search).get('id');

    if (!commentText.trim()) {
        alert("Пожалуйста, введите текст комментария.");
        return;
    }

    const commentData = {
        productId: productId,
        text: commentText,
        userId: localStorage.getItem('userId') // Получаем ID пользователя из локального хранилища
    };

    try {
        const response = await fetch('http://localhost:5000/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentData),
        });

        if (response.ok) {
            alert('Комментарий успешно добавлен!');
            document.getElementById('comment-text').value = ''; // Очистка текстового поля
            loadComments(); // Перезагружаем список комментариев
        } else {
            throw new Error('Ошибка при отправке комментария please login');
        }
    } catch (error) {
        alert(error.message);
    }
}

// Функция для загрузки комментариев
async function loadComments() {
    const productId = new URLSearchParams(window.location.search).get('id');
    const commentsList = document.getElementById('comments-list');

    try {
        const response = await fetch(`http://localhost:5000/comments/${productId}`);
        const comments = await response.json();

        commentsList.innerHTML = ''; // Очищаем список комментариев

        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            const commentDate = new Date(comment.createdAt).toLocaleString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            });




            commentDiv.innerHTML = `
                <h2><strong>${comment.userId.username}:</strong> ${comment.text}</h2>
                 <p><small>Добавлен: ${commentDate}</small></p>
            `;
            commentsList.appendChild(commentDiv);
        });
    } catch (error) {
        commentsList.innerHTML = '<p>Ошибка загрузки комментариев.</p>';
    }
}

// Загружаем комментарии при загрузке страницы
document.addEventListener('DOMContentLoaded', loadComments);




