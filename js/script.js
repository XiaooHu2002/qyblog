
// ========== 鼠标点击烟花爆炸特效 ========== //
function createFirework(x, y) {
    const colors = ['#6bc5ff', '#ffb86c', '#50fa7b', '#ff79c6', '#f1fa8c', '#bd93f9', '#ff5555'];
    const particles = 24;
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';
        document.body.appendChild(particle);
        const angle = (2 * Math.PI * i) / particles;
        const radius = 80 + Math.random() * 30;
        const dx = Math.cos(angle) * radius;
        const dy = Math.sin(angle) * radius;
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.opacity = 1;
        particle.style.transform = 'scale(1)';
        setTimeout(() => {
            particle.style.transition = 'all 0.8s cubic-bezier(.4,2,.6,1)';
            particle.style.left = (x + dx) + 'px';
            particle.style.top = (y + dy) + 'px';
            particle.style.opacity = 0;
            particle.style.transform = 'scale(0.7)';
        }, 10);
        setTimeout(() => {
            particle.remove();
        }, 900);
    }
}

// 插入烟花粒子样式
(function(){
    const style = document.createElement('style');
    style.innerHTML = `
    .firework-particle {
        position: fixed;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        box-shadow: 0 0 8px #fff8;
    }
    `;
    document.head.appendChild(style);
})();


// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .card:focus {
        outline: 2px solid rgba(255, 255, 255, 0.5);
        outline-offset: 5px;
    }
    
    .card:focus:not(:focus-visible) {
        outline: none;
    }
`;
document.head.appendChild(style); 