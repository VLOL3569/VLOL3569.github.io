const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'var(--card)';
            navbar.style.boxShadow = 'var(--shadow-lg)';
        } else {
            navbar.style.background = 'var(--card)';
            navbar.style.boxShadow = 'var(--shadow-md)';
        }
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .skill-item, .timeline-item, .composition-card');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

const musicButtons = document.querySelectorAll('.composition-actions .btn-primary');
musicButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const card = button.closest('.composition-card');
        const title = card.querySelector('h3').textContent;
        const audioSrc = button.dataset.audio;

        if (audioSrc) {
            showMusicPlayer(title, audioSrc);
        } else {
            alert('Audio file not found for this composition.');
        }
    });
});

function showMusicPlayer(title, audioSrc) {
    const existing = document.querySelector('.music-player-modal');
    if (existing) existing.remove();

    const playerModal = document.createElement('div');
    playerModal.className = 'music-player-modal';
    playerModal.innerHTML = `
        <div class="player-overlay">
            <div class="player-content">
                <div class="player-header">
                    <h3>Now Playing: ${title}</h3>
                    <button class="player-close">&times;</button>
                </div>
                <audio id="audioPlayer" src="${audioSrc}" preload="metadata"></audio>
                <div class="player-controls">
                    <button class="control-btn" id="backwardBtn" title="Back 1s">
                        <i class="fas fa-backward"></i>
                    </button>
                    <button class="control-btn play-pause" id="playPauseBtn">
                        <i class="fas fa-play"></i>
                    </button>
                    <button class="control-btn" id="forwardBtn" title="Forward 1s">
                        <i class="fas fa-forward"></i>
                    </button>
                </div>
                <div class="player-progress">
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                    <div class="time-display">
                        <span class="current-time">0:00</span>
                        <span class="total-time">0:00</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    const playerStyles = document.createElement('style');
    playerStyles.textContent = `
        .music-player-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .player-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }
        
        .player-content {
            background: var(--card);
            border-radius: var(--radius);
            padding: 2rem;
            max-width: 500px;
            width: 100%;
            box-shadow: var(--shadow-2xl);
            border: 1px solid var(--border);
        }
        
        .player-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid var(--border);
        }
        
        .player-header h3 {
            color: var(--foreground);
            margin: 0;
        }
        
        .player-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            color: var(--muted-foreground);
            cursor: pointer;
            padding: 0.5rem;
            border-radius: var(--radius);
            transition: all 0.3s ease;
        }
        
        .player-close:hover {
            background: var(--muted);
            color: var(--foreground);
        }
        
        .player-controls {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 2rem;
        }
        
        .control-btn {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            background: var(--primary);
            color: var(--primary-foreground);
            font-size: 1.2rem;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .control-btn:hover {
            background: var(--accent);
            transform: scale(1.1);
        }
        
        .play-pause {
            width: 60px;
            height: 60px;
            font-size: 1.5rem;
        }
        
        .player-progress {
            margin-bottom: 1rem;
        }
        
        .progress-bar {
            width: 100%;
            height: 6px;
            background: var(--muted);
            border-radius: 3px;
            overflow: hidden;
            margin-bottom: 0.5rem;
            cursor: pointer;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, var(--primary), var(--accent));
            width: 0%;
            transition: width 0.3s ease;
        }
        
        .time-display {
            display: flex;
            justify-content: space-between;
            font-size: 0.9rem;
            color: var(--muted-foreground);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }
    `;
    
    document.head.appendChild(playerStyles);
    document.body.appendChild(playerModal);

    const audio = playerModal.querySelector('#audioPlayer');
    const playPause = playerModal.querySelector('#playPauseBtn');
    const backwardBtn = playerModal.querySelector('#backwardBtn');
    const forwardBtn = playerModal.querySelector('#forwardBtn');
    const progressBar = playerModal.querySelector('.progress-bar');
    const progressFill = playerModal.querySelector('.progress-fill');
    const currentTimeDisplay = playerModal.querySelector('.current-time');
    const totalTimeDisplay = playerModal.querySelector('.total-time');
    const closeBtn = playerModal.querySelector('.player-close');

    audio.addEventListener('loadedmetadata', () => {
        const mins = Math.floor(audio.duration / 60);
        const secs = Math.floor(audio.duration % 60);
        totalTimeDisplay.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
    });

    playPause.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playPause.querySelector('i').className = 'fas fa-pause';
        } else {
            audio.pause();
            playPause.querySelector('i').className = 'fas fa-play';
        }
    });

    audio.addEventListener('timeupdate', () => {
        if (!isDragging) {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressFill.style.width = progress + '%';
        }
        const mins = Math.floor(audio.currentTime / 60);
        const secs = Math.floor(audio.currentTime % 60);
        currentTimeDisplay.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
    });

    backwardBtn.addEventListener('click', () => {
        audio.currentTime = Math.max(0, audio.currentTime - 1);
    });
    forwardBtn.addEventListener('click', () => {
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 1);
    });

    let isDragging = false;

    const seek = (clientX) => {
        const rect = progressBar.getBoundingClientRect();
        const offsetX = Math.max(0, Math.min(rect.width, clientX - rect.left));
        const percent = offsetX / rect.width;
        progressFill.style.width = `${percent * 100}%`;
        audio.currentTime = percent * audio.duration;
    };

    progressBar.addEventListener('mousedown', (e) => {
        isDragging = true;
        audio.pause();
        seek(e.clientX);
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            seek(e.clientX);
        }
    });

    document.addEventListener('mouseup', (e) => {
        if (isDragging) {
            isDragging = false;
            seek(e.clientX);
            audio.play();
            playPause.querySelector('i').className = 'fas fa-pause';
        }
    });

    closeBtn.addEventListener('click', () => {
        audio.pause();
        playerModal.remove();
    });
    playerModal.querySelector('.player-overlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            audio.pause();
            playerModal.remove();
        }
    });
}

const downloadButtons = document.querySelectorAll('.composition-actions .btn-secondary');

downloadButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
        e.preventDefault();

        const card = button.closest('.composition-card');
        const title = card.querySelector('h3').textContent.trim();
        const fileUrl = button.dataset.download;

        if (!fileUrl) {
            alert(`No download available for "${title}".`);
            return;
        }

        showDownloadNotification(title);

        try {
            const resp = await fetch(fileUrl);
            if (!resp.ok) throw new Error(`Network error: ${resp.status}`);

            const blob = await resp.blob();

            const guessedExt = (fileUrl.split('.').pop().split(/\#|\?/)[0]) || 'mp3';
            const safeName = title.replace(/[^\w\- ]+/g, '').replace(/\s+/g, '_');
            const filename = `${safeName}.${guessedExt}`;

            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();

            setTimeout(() => URL.revokeObjectURL(blobUrl), 15000);

        } catch (err) {
            console.warn('Download via fetch failed, attempting fallback open-in-new-tab:', err);

            const fallback = document.createElement('a');
            fallback.href = fileUrl;
            fallback.target = '_blank';
            const safeName = title.replace(/[^\w\- ]+/g, '').replace(/\s+/g, '_');
            const guessedExt = (fileUrl.split('.').pop().split(/\#|\?/)[0]) || 'mp3';
            fallback.download = `${safeName}.${guessedExt}`;
            document.body.appendChild(fallback);
            fallback.click();
            fallback.remove();
        }
    });
});
function showDownloadNotification(title) {
    const existingNotification = document.querySelector('.download-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'download-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-download"></i>
            <span>Downloading "${title}"...</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary);
        color: var(--primary-foreground);
        padding: 1rem 1.5rem;
        border-radius: var(--radius);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        max-width: 300px;
        animation: slideInRight 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 3000);
}

const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);


const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    document.documentElement.setAttribute(
        'data-theme',
        document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    );
    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
}

function setInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    } else if (prefersDarkScheme.matches) {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

themeToggle.addEventListener('click', toggleTheme);
prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        if (e.matches) {
            document.documentElement.classList.add('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }
});

setInitialTheme();

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});
