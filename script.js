// ========== НАСТРОЙКИ FIREBASE ==========
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getDatabase, ref, set, get, push, onValue } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

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

(function() {
    // База данных учителей
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

    // Состояние приложения
    let currentSchool = "33";
    let currentCategory = "sexy";
    let selectedTeacher = null;
    let filterSchool = "all";
    let currentNav = "main";
    
    // ID устройства
    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
        deviceId = 'device_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
        localStorage.setItem('deviceId', deviceId);
    }

    // Данные
    let votes = { "33": {}, "13": {}, "29": {}, "raion": {} };
    let comments = { "33": [], "13": [], "29": [], "raion": [] };
    let commentLikes = {};
    let suggestions = [];
    let polls = [
        {
            id: 1,
            question: "Устроить батл школ?",
            options: ["Да", "Нет", "Воздержусь"],
            votes: { "Да": [], "Нет": [], "Воздержусь": [] }
        },
        {
            id: 2,
            question: "Добавить номинацию Самая стрёмная?",
            options: ["Да", "Нет"],
            votes: { "Да": [], "Нет": [] }
        },
        {
            id: 3,
            question: "Сделать еженедельные битвы?",
            options: ["За", "Против", "Мне всё равно"],
            votes: { "За": [], "Против": [], "Мне всё равно": [] }
        }
    ];

    // ========== ФУНКЦИИ ДЛЯ РАБОТЫ С FIREBASE ==========

    // Загрузка всех данных
    async function loadFromFirebase() {
        try {
            // Загружаем голоса
            const votesRef = ref(db, 'votes');
            const votesSnapshot = await get(votesRef);
            if (votesSnapshot.exists()) {
                votes = votesSnapshot.val();
            }

            // Загружаем комментарии
            const commentsRef = ref(db, 'comments');
            const commentsSnapshot = await get(commentsRef);
            if (commentsSnapshot.exists()) {
                comments = commentsSnapshot.val();
            }

            // Загружаем лайки
            const likesRef = ref(db, 'commentLikes');
            const likesSnapshot = await get(likesRef);
            if (likesSnapshot.exists()) {
                commentLikes = likesSnapshot.val();
            }

            // Загружаем предложения
            const suggestionsRef = ref(db, 'suggestions');
            const suggestionsSnapshot = await get(suggestionsRef);
            if (suggestionsSnapshot.exists()) {
                suggestions = suggestionsSnapshot.val();
            }

            console.log('✅ Данные загружены из Firebase');
            updateAllDisplays();
        } catch (error) {
            console.error('❌ Ошибка загрузки из Firebase:', error);
            loadFromLocal();
        }
    }

    // Сохранение всех данных
    async function saveToFirebase() {
        try {
            await set(ref(db, 'votes'), votes);
            await set(ref(db, 'comments'), comments);
            await set(ref(db, 'commentLikes'), commentLikes);
            await set(ref(db, 'suggestions'), suggestions);
            console.log('✅ Данные сохранены в Firebase');
            saveToLocal();
        } catch (error) {
            console.error('❌ Ошибка сохранения в Firebase:', error);
            saveToLocal();
        }
    }

    // Подписка на изменения в реальном времени
    function subscribeToUpdates() {
        const votesRef = ref(db, 'votes');
        onValue(votesRef, (snapshot) => {
            if (snapshot.exists()) {
                votes = snapshot.val();
                updateAllDisplays();
            }
        });

        const commentsRef = ref(db, 'comments');
        onValue(commentsRef, (snapshot) => {
            if (snapshot.exists()) {
                comments = snapshot.val();
                renderComments();
            }
        });
    }

    // Локальное резервное копирование
    function saveToLocal() {
        localStorage.setItem('votes_backup', JSON.stringify(votes));
        localStorage.setItem('comments_backup', JSON.stringify(comments));
        localStorage.setItem('likes_backup', JSON.stringify(commentLikes));
        localStorage.setItem('suggestions_backup', JSON.stringify(suggestions));
    }

    function loadFromLocal() {
        votes = JSON.parse(localStorage.getItem('votes_backup')) || { "33": {}, "13": {}, "29": {}, "raion": {} };
        comments = JSON.parse(localStorage.getItem('comments_backup')) || { "33": [], "13": [], "29": [], "raion": [] };
        commentLikes = JSON.parse(localStorage.getItem('likes_backup')) || {};
        suggestions = JSON.parse(localStorage.getItem('suggestions_backup')) || [];
        console.log('📦 Загружено из localStorage');
        updateAllDisplays();
    }

    // ===== ОБНОВЛЕНИЕ ИНТЕРФЕЙСА =====
    function updateAllDisplays() {
        updateActivityPodium();
        updateWinnersDistrict();
        renderSchoolLeaders();
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
        const scores = calculateSchoolScores();
        const podium = document.getElementById('activityPodium');
        
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

    function updateWinnersDistrict() {
        const winners = getDistrictWinners();
        const grid = document.getElementById('winnersGrid');
        const catLabels = ['Секси', 'Добрая', 'Мразота', 'Угарная', 'Чиловый мужик'];
        const icons = ['💋', '😇', '👿', '🔥', '😎'];
        
        let html = '';
        Object.keys(winners).forEach((cat, idx) => {
            html += `
                <div class="winner-card">
                    <div class="winner-icon">${icons[idx]}</div>
                    <div class="winner-category">${catLabels[idx]}</div>
                    <div class="winner-name">${winners[cat].name}</div>
                    <div style="font-size: 14px;">${winners[cat].votes} голосов</div>
                </div>
            `;
        });
        grid.innerHTML = html;
    }

    function renderSchoolLeaders() {
        if (currentSchool === 'raion') return;
        const grid = document.getElementById('leadersGrid');
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
                    <div style="color:#b77; font-size:14px;">голосов: ${maxCount}</div>
                </div>
            `;
        });
        grid.innerHTML = html;
    }

    function renderComments() {
        const list = document.getElementById('commentList');
        const schoolComments = comments[currentSchool] || [];
        
        let html = '';
        schoolComments.slice().reverse().forEach((c, idx) => {
            const commentId = `${currentSchool}_${idx}_${c.timestamp}`;
            const likes = commentLikes[commentId] || { likes: [], dislikes: [] };
            
            html += `
                <div class="comment-item" data-id="${commentId}">
                    <span class="comment-nick">${c.nick}:</span>
                    <span class="comment-text">${c.text}</span>
                    <div class="comment-likes">
                        <button class="like-btn" data-id="${commentId}">👍 ${likes.likes.length}</button>
                        <button class="dislike-btn" data-id="${commentId}">👎 ${likes.dislikes.length}</button>
                    </div>
                </div>
            `;
        });
        
        if (!html) html = '<div class="comment-item">тишина... напиши что-нибудь</div>';
        list.innerHTML = html;

        // Добавляем обработчики лайков
        document.querySelectorAll('.like-btn, .dislike-btn').forEach(btn => {
            btn.addEventListener('click', async function(e) {
                e.stopPropagation();
                const commentItem = this.closest('.comment-item');
                const commentId = commentItem.dataset.id;
                const isLike = this.classList.contains('like-btn');
                
                if (!commentLikes[commentId]) {
                    commentLikes[commentId] = { likes: [], dislikes: [] };
                }
                
                if (isLike) {
                    if (commentLikes[commentId].likes.includes(deviceId)) {
                        commentLikes[commentId].likes = commentLikes[commentId].likes.filter(id => id !== deviceId);
                    } else {
                        commentLikes[commentId].likes.push(deviceId);
                        commentLikes[commentId].dislikes = commentLikes[commentId].dislikes.filter(id => id !== deviceId);
                    }
                } else {
                    if (commentLikes[commentId].dislikes.includes(deviceId)) {
                        commentLikes[commentId].dislikes = commentLikes[commentId].dislikes.filter(id => id !== deviceId);
                    } else {
                        commentLikes[commentId].dislikes.push(deviceId);
                        commentLikes[commentId].likes = commentLikes[commentId].likes.filter(id => id !== deviceId);
                    }
                }
                
                await saveToFirebase();
                renderComments();
            });
        });
    }

    // ===== СОБЫТИЯ =====
    document.getElementById('saveVoteBtn').addEventListener('click', async function() {
        if (!selectedTeacher) return;
        
        // Проверка голосовал ли уже
        if (votes[currentSchool]?.[currentCategory]?.[selectedTeacher]?.includes(deviceId)) {
            alert('Ты уже голосовал!');
            return;
        }

        // Сохраняем голос
        if (!votes[currentSchool]) votes[currentSchool] = {};
        if (!votes[currentSchool][currentCategory]) votes[currentSchool][currentCategory] = {};
        if (!votes[currentSchool][currentCategory][selectedTeacher]) votes[currentSchool][currentCategory][selectedTeacher] = [];
        
        votes[currentSchool][currentCategory][selectedTeacher].push(deviceId);
        
        // Сохраняем в Firebase
        await saveToFirebase();
        alert('✅ Голос учтён и сохранён!');
        
        document.getElementById('saveVoteBtn').disabled = true;
        updateAllDisplays();
    });

    document.getElementById('sendComment').addEventListener('click', async function() {
        const nick = document.getElementById('nickInput').value.trim();
        const text = document.getElementById('commentInput').value.trim();
        
        if (!nick || !text) {
            alert('Введите ник и комментарий!');
            return;
        }
        
        if (!comments[currentSchool]) comments[currentSchool] = [];
        comments[currentSchool].push({ nick, text, deviceId, timestamp: Date.now() });
        
        await saveToFirebase();
        renderComments();
        
        document.getElementById('nickInput').value = '';
        document.getElementById('commentInput').value = '';
    });

    // Переключение школы
    document.querySelectorAll('.school-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.school-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentSchool = this.dataset.school;
            
            document.getElementById('schoolFilter').style.display = currentSchool === 'raion' ? 'flex' : 'none';
            document.getElementById('schoolLeadersBlock').style.display = currentSchool === 'raion' ? 'none' : 'block';
            
            selectedTeacher = null;
            document.getElementById('saveVoteBtn').disabled = true;
            renderTeacherWheel();
            renderComments();
            if (currentSchool !== 'raion') renderSchoolLeaders();
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

    // Категории
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.cat-btn').forEach(c => c.classList.remove('active-cat'));
            this.classList.add('active-cat');
            currentCategory = this.dataset.cat;
            selectedTeacher = null;
            document.getElementById('saveVoteBtn').disabled = true;
            renderTeacherWheel();
        });
    });

    // Навигация
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active-nav'));
            this.classList.add('active-nav');
            
            const nav = this.dataset.nav;
            const suggestions = document.getElementById('suggestionsSection');
            
            if (nav === 'suggestions') {
                suggestions.style.display = 'block';
            } else {
                suggestions.style.display = 'none';
            }
        });
    });

    // Таймер до следующего обновления (9:00)
    function updateTimer() {
        const now = new Date();
        const target = new Date();
        
        target.setHours(9, 0, 0, 0);
        
        if (target <= now) {
            target.setDate(target.getDate() + 1);
        }
        
        const diff = target - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        document.getElementById('timerDisplay').innerText = 
            `ОБНОВЛЕНИЕ ЧЕРЕЗ: ${hours}ч ${minutes}м`;
    }

    // ===== ИНИЦИАЛИЗАЦИЯ =====
    async function init() {
        // Загружаем из Firebase
        await loadFromFirebase();
        
        // Подписываемся на обновления
        subscribeToUpdates();
        
        // Рендерим всё
        renderTeacherWheel();
        renderComments();
        updateAllDisplays();
        
        // Таймер
        updateTimer();
        setInterval(updateTimer, 60000);
        
        // Скрываем секцию предложений
        document.getElementById('suggestionsSection').style.display = 'none';
    }

    init();
})();