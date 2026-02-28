// ========== НАСТРОЙКИ FIREBASE ==========
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCRgQ7y14HmmNEXXLqNMqjOLMUJzWCoHwc",
    authDomain: "sixsix-b1743.firebaseapp.com",
    projectId: "sixsix-b1743",
    storageBucket: "sixsix-b1743.firebasestorage.app",
    messagingSenderId: "773352016608",
    appId: "1:773352016608:web:a1f825b1751f8cfd085e85",
    measurementId: "G-FNG1JSVFGM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
// ========================================

// Простая проверка
console.log('✅ Firebase подключен!');

// Ждём загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Страница загружена');
    
    // Показываем сообщение на странице
    const container = document.querySelector('.container');
    if (container) {
        const testDiv = document.createElement('div');
        testDiv.style.background = 'green';
        testDiv.style.color = 'white';
        testDiv.style.padding = '10px';
        testDiv.style.margin = '10px';
        testDiv.style.borderRadius = '10px';
        testDiv.innerHTML = '🔥 Firebase работает! Скоро здесь будут голосования';
        container.prepend(testDiv);
    }
    
    // Тестовая запись в Firebase
    const testRef = ref(db, 'test');
    set(testRef, { message: 'Hello from device!', time: Date.now() })
        .then(() => console.log('✅ Данные записаны в Firebase'))
        .catch(error => console.error('❌ Ошибка записи:', error));
    
    // Тестовое чтение из Firebase
    get(ref(db, 'test'))
        .then((snapshot) => {
            if (snapshot.exists()) {
                console.log('✅ Данные прочитаны:', snapshot.val());
            }
        })
        .catch(error => console.error('❌ Ошибка чтения:', error));
});
