// ========== НАСТРОЙКИ FIREBASE ==========
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getDatabase, ref, set, get, onValue } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCRgQ7y14HmmNEXXLqNMqjOLMUJzWCoHwc",
    authDomain: "sixsix-b1743.firebaseapp.com",
    databaseURL: "https://sixsix-b1743-default-rtdb.firebaseio.com",
    projectId: "sixsix-b1743",
    storageBucket: "sixsix-b1743.firebasestorage.app",
    messagingSenderId: "773352016608",
    appId: "1:773352016608:web:a1f825b1751f8cfd085e85"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
// ========================================

console.log('🔥 Firebase версия загружена');

// ===== БАЗА ДАННЫХ УЧИТЕЛЕЙ =====
const teachersDB = {
    "29": [
        "Горчакова Анжелика Николаевна", "Шукова Ольга Анатольевна", "Якунов Даниил Александрович",
        "Алексеевцева Валерия Дмитриевна", "Белоброва Любовь Владимировна", "Воробьева Анастасия Игоревна",
        "Елина Ирина Алексеевна", "Ефремова Галина Валерьевна", "Загоскина Евгения Петровна",
        "Заморкина Светлана Анатольевна", "Занина Ирина Юрьевна", "Зубова Лариса Венеаминовна",
        "Королькова Светлана Геннадьевна", "Кузнецов Николай Константинович", "Мазилова Виктория Вячеславовна",
        "Мегельбей Полина Сергеевна", "Зенкова Татьяна Александровна", "Ольнова Ирина Валентиновна",
        "Петрова Анастасия Викторовна", "Проворова Карина Александровна", "Ратькова Людмила Александровна",
        "Столярова Ольга Александровна", "Таничева Мария Владимировна", "Туманова Ольга Николаевна",
        "Хамова Наталья Михайловна"
    ],
    "33": [
        "Расторопова Алена Игоревна", "Кудряшова Вера Григорьевна", "Ярошенко Наталья Николаевна",
        "Шутова Любовь Сергеевна", "Шкокова Елена Евгеньевна", "Хухарева Елена Юрьевна",
        "Харламова Татьяна Александровна", "Фомина Ирина Ивановна", "Титаренко Оксана Николаевна",
        "Таланова Наталья Александровна", "Скорюкова Екатерина Ивановна", "Ситникова Ольга Викторовна",
        "Сёмина Жанна Николаевна", "Сахарова Валентина Васильевна", "Руденко Любовь Николаевна",
        "Рескова Светлана Юрьевна", "Павлова Ирина Анатольевна", "Оленева Светлана Александровна",
        "Никандрова Наталья Александровна", "Нивина Любовь Николаевна", "Мартынова Наталия Николаевна",
        "Маракова Надежда Алфеевна", "Магомедова Ирина Ивановна", "Лучкинская Ирина Валентиновна",
        "Кустова Аксана Владимировна", "Куликова Елена Леонидовна", "Кузьмина Анна Владимировна",
        "Клочков Алексей Александрович", "Иевлева Татьяна Владимировна", "Жилина Мария Вадимовна",
        "Нестерова Анжелика Михайловна", "Дьякова Елена Павловна", "Плужникова Анна Дмитриевна",
        "Дьякова Юлия Сергеевна", "Иванова Елена Валентиновна", "Викторова Татьяна Анатольевна",
        "Андреева Вера Сергеевна", "Акимова Светлана Петровна"
    ],
    "13": [
        "Агеева Марина Анатольевна", "Антончик Светлана Вячеславовна", "Беляева Анна Павловна",
        "Беляева Ольга Сергеевна", "Билькова Оксана Алексеевна", "Борисова Юлия Викторовна",
        "Булындина Светлана Дмитриевна", "Быстрова Екатерина Сергеевна", "Викторова Ольга Викторовна",
        "Гайдов Владимир Валентинович", "Дурягина Людмила Сергеевна", "Зайцева Виктория Николаевна",
        "Игнатьева Светлана Анатольевна", "Казакова Евгения Николаевна", "Клягина Светлана Михайловна",
        "Короп Лариса Владимировна", "Коряковская Светлана Анатольевна", "Кудрявцева Анастасия Николаевна",
        "Кузнецова Валентина Александровна", "Красильникова Александра Васильевна", "Лыгина Наталия Николаевна",
        "Мальцева Евгения Станиславовна", "Мальцева Мария Олеговна", "Мартынов Павел Сергеевич",
        "Мастакова Светлана Евгеньевна", "Меньшикова Татьяна Константиновна", "Митюкова Елена Анатольевна",
        "Морозова Елена Николаевна", "Морозова Анастасия Владимировна", "Немирович Мария Вячеславовна",
        "Никитенко Яна Валерьевна", "Николина Марина Николаевна", "Неклюдова Алёна Сергеевна",
        "Петухова Татьяна Валерьевна", "Петуховская Наталья Геннадьевна", "Пенькова Анна Александровна",
        "Распутина Ирина Леонидовна", "Расторопова Алена Игоревна", "Сверчкова Наталья Владимировна",
        "Сергеева Елена Николаевна", "Серобабена Галина Васильевна", "Смирнова Елена Вячеславовна",
        "Соловьева Нина Валерьевна", "Сорокина Екатерина Алексеевна", "Степанова Лариса Владимировна",
        "Сиволап Даниил Андреевич", "Таничева Виктория Дмитриевна", "Тикунова Жанна Валерьевна",
        "Торочкова Александра Андреевна", "Тырнова Ольга Владимировна", "Трубаева Людмила Васильевна"
    ]
};

// Список учителей мужского пола
const maleTeachers = [
    "Якунов Даниил Александрович", "Кузнецов Николай Константинович", "Клочков Алексей Александрович",
    "Гайдов Владимир Валентинович", "Мартынов Павел Сергеевич", "Сиволап Даниил Андреевич"
];

// ===== СОСТОЯНИЕ ПРИЛОЖЕНИЯ =====
let currentSchool = "33";
let currentCategory = "sexy";
let selectedTeacher = null;
let filterSchool = "all";

// ID устройства
let deviceId = localStorage.getItem('deviceId');
if (!deviceId) {
    deviceId = 'device_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem('deviceId', deviceId);
}

// Данные (будут загружены из Firebase)
let votes = { "33": {}, "13": {}, "29": {}, "raion": {} };
let comments = { "33": [], "13": [], "29": [], "raion": [] };
let commentLikes = {};

// ===== ФУНКЦИИ FIREBASE =====
async function loadFromFirebase() {
    try {
        const votesRef = ref(db, 'votes');
        const votesSnap = await get(votesRef);
        if (votesSnap.exists()) {
            votes = votesSnap.val();
            console.log('✅ Голоса загружены');
        }

        const commentsRef = ref(db, 'comments');
        const commentsSnap = await get(commentsRef);
        if (commentsSnap.exists()) {
            comments = commentsSnap.val();
            console.log('✅ Комментарии загружены');
        }

        const likesRef = ref(db, 'commentLikes');
        const likesSnap = await get(likesRef);
        if (likesSnap.exists()) {
            commentLikes = likesSnap.val();
            console.log('✅ Лайки загружены');
        }

        updateAllDisplays();
    } catch (error) {
        console.error('❌ Ошибка загрузки из Firebase:', error);
    }
}

async function saveToFirebase() {
    try {
        await set(ref(db, 'votes'), votes);
        await set(ref(db, 'comments'), comments);
        await set(ref(db, 'commentLikes'), commentLikes);
        console.log('✅ Все данные сохранены в Firebase');
    } catch (error) {
        console.error('❌ Ошибка сохранения в Firebase:', error);
    }
}

function subscribeToUpdates() {
    // Подписка на изменения голосов
    const votesRef = ref(db, 'votes');
    onValue(votesRef, (snapshot) => {
        if (snapshot.exists()) {
            votes = snapshot.val();
            updateAllDisplays();
            console.log('🔄 Голоса обновлены');
        }
    });

    // Подписка на изменения комментариев
    const commentsRef = ref(db, 'comments');
    onValue(commentsRef, (snapshot) => {
        if (snapshot.exists()) {
            comments = snapshot.val();
            renderComments();
            console.log('🔄 Комментарии обновлены');
        }
    });

    // Подписка на изменения лайков
    const likesRef = ref(db, 'commentLikes');
    onValue(likesRef, (snapshot) => {
        if (snapshot.exists()) {
            commentLikes = snapshot.val();
            renderComments();
            console.log('🔄 Лайки обновлены');
        }
    });
}

// ===== ФУНКЦИИ ИНТЕРФЕЙСА =====
function updateAllDisplays() {
    updateActivityPodium();
    renderWinnersDistrict();
    renderSchoolLeaders();
    renderComments();
}

function getFilteredTeachers() {
    let teachers = [];
    if (currentSchool === 'raion') {
        if (filterSchool === 'all') {
            teachers = [...teachersDB["33"], ...teachersDB["13"], ...teachersDB["29"]];
        } else {
            teachers = teachersDB[filterSchool] || [];
        }
    } else {
        teachers = teachersDB[currentSchool] || [];
    }
    if (currentCategory === 'chill') {
        teachers = teachers.filter(t => maleTeachers.includes(t));
    }
    return teachers;
}

function renderTeacherWheel() {
    const wheel = document.getElementById('teacherWheel');
    if (!wheel) return;
    
    const teachersList = getFilteredTeachers();
    let html = '';
    
    teachersList.forEach(teacher => {
        const selectedClass = (selectedTeacher === teacher) ? 'selected-teacher' : '';
        html += `<div class="teacher-option ${selectedClass}" data-teacher="${teacher}">${teacher}</div>`;
    });
    
    if (teachersList.length === 0) {
        html = '<div class="teacher-option">Нет учителей в этой категории</div>';
    }
    
    wheel.innerHTML = html;

    document.querySelectorAll('.teacher-option').forEach(el => {
        el.addEventListener('click', function() {
            document.querySelectorAll('.teacher-option').forEach(opt => opt.classList.remove('selected-teacher'));
            this.classList.add('selected-teacher');
            selectedTeacher = this.dataset.teacher;
            document.getElementById('saveVoteBtn').disabled = false;
        });
    });
}

function calculateSchoolScores() {
    const scores = { "33": 0, "13": 0, "29": 0 };
    for (let school of ["33", "13", "29"]) {
        if (votes[school]) {
            for (let cat of ['sexy', 'good', 'mraz', 'fun', 'chill']) {
                if (votes[school][cat]) {
                    for (let teacher in votes[school][cat]) {
                        scores[school] += votes[school][cat][teacher].length;
                    }
                }
            }
        }
    }
    return scores;
}

function updateActivityPodium() {
    const podium = document.getElementById('activityPodium');
    if (!podium) return;
    
    const scores = calculateSchoolScores();
    const sorted = Object.entries(scores)
        .map(([school, score]) => ({ school, score }))
        .sort((a, b) => b.score - a.score);
    
    let html = '';
    if (sorted[0]) {
        html += `<div class="podium-place place-1"><div class="place-bar"><div class="school-name-podium">Школа ${sorted[0].school}</div><div class="school-score">${sorted[0].score}</div></div></div>`;
    }
    if (sorted[1]) {
        html += `<div class="podium-place place-2"><div class="place-bar"><div class="school-name-podium">Школа ${sorted[1].school}</div><div class="school-score">${sorted[1].score}</div></div></div>`;
    }
    if (sorted[2]) {
        html += `<div class="podium-place place-3"><div class="place-bar"><div class="school-name-podium">Школа ${sorted[2].school}</div><div class="school-score">${sorted[2].score}</div></div></div>`;
    }
    podium.innerHTML = html;
}

function getDistrictWinners() {
    const categories = ['sexy', 'good', 'mraz', 'fun', 'chill'];
    const winners = {};
    const raionVotes = votes['raion'] || {};

    categories.forEach(cat => {
        let maxCount = 0;
        let winnerName = 'нет голосов';
        if (raionVotes[cat]) {
            for (let teacher in raionVotes[cat]) {
                const cnt = raionVotes[cat][teacher].length;
                if (cnt > maxCount) {
                    maxCount = cnt;
                    winnerName = teacher;
                }
            }
        }
        winners[cat] = { name: winnerName, votes: maxCount };
    });
    return winners;
}

function renderWinnersDistrict() {
    const grid = document.getElementById('winnersGrid');
    if (!grid) return;
    
    const winners = getDistrictWinners();
    const catLabels = ['Секси', 'Добрая', 'Мразота', 'Угарная', 'Чиловый мужик'];
    const icons = ['💋', '😇', '👿', '🔥', '😎'];
    
    let html = '';
    Object.keys(winners).forEach((cat, idx) => {
        html += `
            <div class="winner-card">
                <div class="winner-icon">${icons[idx]}</div>
                <div class="winner-category">${catLabels[idx]}</div>
                <div class="winner-name">${winners[cat].name}</div>
                <div class="winner-votes">🔥 ${winners[cat].votes} голосов 🔥</div>
            </div>
        `;
    });
    grid.innerHTML = html;
}

function renderSchoolLeaders() {
    if (currentSchool === 'raion') return;
    
    const grid = document.getElementById('leadersGrid');
    if (!grid) return;
    
    const categories = ['sexy', 'good', 'mraz', 'fun', 'chill'];
    const catLabels = ['Секси', 'Добрая', 'Мразота', 'Угарная', 'Чиловый мужик'];
    const schoolVotes = votes[currentSchool] || {};
    
    let html = '';
    categories.forEach((cat, idx) => {
        let maxCount = 0;
        let topTeacher = 'нет голосов';
        if (schoolVotes[cat]) {
            for (let teacher in schoolVotes[cat]) {
                const cnt = schoolVotes[cat][teacher].length;
                if (cnt > maxCount) {
                    maxCount = cnt;
                    topTeacher = teacher;
                }
            }
        }
        html += `
            <div class="leader-cat-block">
                <div class="leader-cat-name">${catLabels[idx]}</div>
                <div class="leader-teacher">${topTeacher}</div>
                <div class="leader-votes">⚡ ${maxCount} голосов ⚡</div>
            </div>
        `;
    });
    grid.innerHTML = html;
}

function renderComments() {
    const list = document.getElementById('commentList');
    if (!list) return;
    
    const schoolComments = comments[currentSchool] || [];
    
    let html = '';
    schoolComments.slice().reverse().forEach((c, index) => {
        const commentId = `${currentSchool}_${index}_${c.timestamp}`;
        const likes = commentLikes[commentId] || { likes: [], dislikes: [] };
        
        const userLike = likes.likes.includes(deviceId) ? 'active-like' : '';
        const userDislike = likes.dislikes.includes(deviceId) ? 'active-dislike' : '';
        
        html += `
            <div class="comment-item" data-comment-id="${commentId}">
                <span class="comment-nick">${c.nick || 'Аноним'}:</span>
                <span class="comment-text">${c.text}</span>
                <div class="comment-likes">
                    <button class="like-btn ${userLike}" data-action="like">👍</button>
                    <span class="like-count">${likes.likes.length}</span>
                    <button class="dislike-btn ${userDislike}" data-action="dislike">👎</button>
                    <span class="dislike-count">${likes.dislikes.length}</span>
                </div>
            </div>
        `;
    });
    
    if (!html) html = '<div class="comment-item">💬 Напиши первый комментарий!</div>';
    list.innerHTML = html;
}

// ===== ОБРАБОТЧИКИ СОБЫТИЙ =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Страница загружена');
    
    // Добавляем тестовое сообщение
    const container = document.querySelector('.container');
    if (container) {
        const testDiv = document.createElement('div');
        testDiv.style.background = '#00aa00';
        testDiv.style.color = 'white';
        testDiv.style.padding = '15px';
        testDiv.style.margin = '10px';
        testDiv.style.borderRadius = '10px';
        testDiv.style.textAlign = 'center';
        testDiv.style.fontSize = '18px';
        testDiv.innerHTML = '✅ FIREBASE ВЕРСИЯ! Данные синхронизируются между устройствами.';
        container.prepend(testDiv);
    }

    // Голосование
    document.getElementById('saveVoteBtn')?.addEventListener('click', async function() {
        if (!selectedTeacher) {
            alert('Выбери учителя!');
            return;
        }
        
        // Проверка, голосовал ли уже
        if (votes[currentSchool]?.[currentCategory]?.[selectedTeacher]?.includes(deviceId)) {
            alert('Ты уже голосовал в этой категории!');
            return;
        }

        // Сохраняем голос
        if (!votes[currentSchool]) votes[currentSchool] = {};
        if (!votes[currentSchool][currentCategory]) votes[currentSchool][currentCategory] = {};
        if (!votes[currentSchool][currentCategory][selectedTeacher]) votes[currentSchool][currentCategory][selectedTeacher] = [];
        
        votes[currentSchool][currentCategory][selectedTeacher].push(deviceId);
        
        // Сохраняем в Firebase
        await saveToFirebase();
        
        alert(`✅ Голос за ${selectedTeacher} учтён!`);
        
        document.getElementById('saveVoteBtn').disabled = true;
        selectedTeacher = null;
        document.querySelectorAll('.teacher-option').forEach(opt => opt.classList.remove('selected-teacher'));
    });

    // Отправка комментария
    document.getElementById('sendComment')?.addEventListener('click', async function() {
        const nickInput = document.getElementById('nickInput');
        const textInput = document.getElementById('commentInput');
        const nick = nickInput?.value.trim();
        const text = textInput?.value.trim();
        
        if (!nick || !text) {
            alert('Введите ник и комментарий!');
            return;
        }
        
        if (!comments[currentSchool]) comments[currentSchool] = [];
        
        comments[currentSchool].push({
            nick: nick,
            text: text,
            deviceId: deviceId,
            timestamp: Date.now()
        });
        
        await saveToFirebase();
        renderComments();
        
        if (nickInput) nickInput.value = '';
        if (textInput) textInput.value = '';
    });

    // Обработчики лайков
    document.addEventListener('click', async function(e) {
        if (e.target.classList.contains('like-btn') || e.target.classList.contains('dislike-btn')) {
            const btn = e.target;
            const commentItem = btn.closest('.comment-item');
            const commentId = commentItem?.dataset.commentId;
            const action = btn.dataset.action;
            
            if (!commentId) return;
            
            if (!commentLikes[commentId]) {
                commentLikes[commentId] = { likes: [], dislikes: [] };
            }
            
            const likes = commentLikes[commentId];
            
            if (action === 'like') {
                if (likes.likes.includes(deviceId)) {
                    likes.likes = likes.likes.filter(id => id !== deviceId);
                } else {
                    likes.likes.push(deviceId);
                    likes.dislikes = likes.dislikes.filter(id => id !== deviceId);
                }
            } else {
                if (likes.dislikes.includes(deviceId)) {
                    likes.dislikes = likes.dislikes.filter(id => id !== deviceId);
                } else {
                    likes.dislikes.push(deviceId);
                    likes.likes = likes.likes.filter(id => id !== deviceId);
                }
            }
            
            await saveToFirebase();
        }
    });

    // Переключение школы
    document.querySelectorAll('.school-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.school-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const school = this.dataset.school;
            currentSchool = school;
            selectedTeacher = null;
            filterSchool = "all";
            
            document.getElementById('saveVoteBtn').disabled = true;
            
            const filterDiv = document.getElementById('schoolFilter');
            const leadersBlock = document.getElementById('schoolLeadersBlock');
            const leadersTitle = document.getElementById('leadersTitle');
            
            if (school === 'raion') {
                if (filterDiv) filterDiv.style.display = 'flex';
                if (leadersBlock) leadersBlock.style.display = 'none';
                
                document.querySelectorAll('.filter-btn').forEach(f => {
                    f.classList.remove('active-filter');
                    if (f.dataset.filterSchool === 'all') {
                        f.classList.add('active-filter');
                    }
                });
            } else {
                if (filterDiv) filterDiv.style.display = 'none';
                if (leadersBlock) {
                    leadersBlock.style.display = 'block';
                    if (leadersTitle) leadersTitle.innerText = `ЛИДЕРЫ ШКОЛЫ ${school}`;
                }
                renderSchoolLeaders();
            }
            
            renderTeacherWheel();
            renderComments();
        });
    });

    // Фильтр для района
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(f => f.classList.remove('active-filter'));
            this.classList.add('active-filter');
            filterSchool = this.dataset.filterSchool;
            selectedTeacher = null;
            document.getElementById('saveVoteBtn').disabled = true;
            renderTeacherWheel();
        });
    });

    // Переключение категории
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active-cat'));
            this.classList.add('active-cat');
            currentCategory = this.dataset.cat;
            selectedTeacher = null;
            document.getElementById('saveVoteBtn').disabled = true;
            document.querySelectorAll('.teacher-option').forEach(opt => opt.classList.remove('selected-teacher'));
            renderTeacherWheel();
        });
    });

    // Таймер до понедельника 9:00
    function updateTimer() {
        const now = new Date();
        const target = new Date();
        
        target.setDate(target.getDate() + ((1 + 7 - target.getDay()) % 7));
        target.setHours(9, 0, 0, 0);
        
        if (target < now) target.setDate(target.getDate() + 7);
        
        const diff = target - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        const timerDisplay = document.getElementById('timerDisplay');
        if (timerDisplay) {
            timerDisplay.innerText = `ОБНОВЛЕНИЕ ЧЕРЕЗ: ${days}д ${hours}ч ${minutes}м`;
        }
    }

    // Инициализация
    loadFromFirebase();
    subscribeToUpdates();
    renderTeacherWheel();
    updateTimer();
    setInterval(updateTimer, 60000);
});
