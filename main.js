// 커스텀 커서
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
});

// 스크롤 애니메이션
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-on-scroll, .section-title').forEach(el => {
    observer.observe(el);
});

// 프로젝트 데이터
const projects = [
    {
        title: '프론트엔드 개발자 포트폴리오',
        description: '프랑스에서의 학업 경험과 한국에서의 실무 경험을 바탕으로 한 프론트엔드 개발자 포트폴리오입니다. 웹 개발 프로젝트, HTML5 게임 개발 등 다양한 프로젝트 이력을 확인하실 수 있습니다.',
        github: 'https://github.com/H2aler/H2aler',
        tags: ['HTML5', 'CSS3', 'JavaScript']
    }
];

// 프로젝트 카드 생성
function createProjectCards() {
    const projectGrid = document.querySelector('.project-grid');
    
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card reveal-on-scroll';
        
        const tags = project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('');
        
        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">${tags}</div>
            <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="github-link hover-effect">
                <i class="fab fa-github"></i> GitHub 프로필에서 자세히 보기
            </a>
        `;
        
        projectGrid.appendChild(card);
        observer.observe(card);
    });
}

// 스무스 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 모달 관련 코드
const modal = document.getElementById('contactModal');
const contactButton = document.querySelector('.contact-button');
const closeButton = document.querySelector('.close-button');
const contactItems = document.querySelectorAll('.contact-item');

function openModal() {
    modal.classList.add('show');
    // 애니메이션 초기화
    contactItems.forEach(item => {
        item.classList.remove('animate');
    });
    // 애니메이션 시작
    setTimeout(() => {
        contactItems.forEach(item => {
            item.classList.add('animate');
        });
    }, 100);
}

function closeModal() {
    modal.classList.remove('show');
}

// 이벤트 리스너
contactButton.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);

// 모달 외부 클릭 시 닫기
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// ESC 키로 모달 닫기
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
});

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
    createProjectCards();
}); 