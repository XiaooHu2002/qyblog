async function loadYamlData() {
    const res = await fetch('data.yml');
    const text = await res.text();
    return jsyaml.load(text);
}

function getSkillColor(idx) {
    const colors = [
        'rgba(64,155,165,0.18)', 'rgba(46,204,113,0.18)', 'rgba(241,196,15,0.18)',
        'rgba(155,89,182,0.18)', 'rgba(255,167,38,0.18)', 'rgba(52,152,219,0.18)',
        'rgba(255,87,34,0.18)',  'rgba(0,188,212,0.18)',  'rgba(76,175,80,0.18)',  'rgba(233,30,99,0.18)'
    ];
    return colors[idx % colors.length];
}

function renderSidebar(data) {
    // 更新页面标题
    if (data.title) {
        document.title = data.title;
    }
    document.querySelector('.avatar-xl').src = data.avatar;
    document.querySelector('.nickname').textContent = data.name;
    document.querySelector('.signature').textContent = data.bio;
    // 联系方式
    const socialBtns = document.querySelector('.social-btns');
    socialBtns.innerHTML = '';
    data.contacts.forEach(c => {
        if (!c.enable) return;
        const a = document.createElement('a');
        a.title = c.type;
        a.className = '';
        if (c.url.endsWith('.png') || c.url.endsWith('.jpg') || c.url.endsWith('.jpeg') || c.url.endsWith('.webp') || c.url.endsWith('.svg')) {
            a.href = 'javascript:void(0)';
            a.onmouseenter = function(e) {
                let img = document.createElement('img');
                img.src = c.url;
                img.style.position = 'fixed';
                img.style.left = (e.clientX + 20) + 'px';
                img.style.top = (e.clientY - 20) + 'px';
                img.style.width = '120px';
                img.style.zIndex = 9999;
                img.className = 'contact-float-img';
                document.body.appendChild(img);
                a.onmousemove = function(e2) {
                    img.style.left = (e2.clientX + 20) + 'px';
                    img.style.top = (e2.clientY - 20) + 'px';
                };
            };
            a.onmouseleave = function() {
                document.querySelectorAll('.contact-float-img').forEach(img => img.remove());
            };
        } else {
            a.href = c.url;
            a.target = '_blank';
        }
        const icon = document.createElement('i');
        icon.className = c.icon + ' fa-fw';
        a.appendChild(icon);
        socialBtns.appendChild(a);
    });
    // 技能
    const skillsBox = document.querySelector('.sidebar .skills-box');
    if (skillsBox) {
        skillsBox.innerHTML = '';
        data.skills.forEach((skill, idx) => {
            const span = document.createElement('span');
            span.className = 'skill-badge';
            span.textContent = skill;
            span.style.background = getSkillColor(idx);
            skillsBox.appendChild(span);
        });
    }
    // 定位（初始用yml）
    const locArea = document.getElementById('location-area');
    if (locArea && data.location) {
        locArea.innerHTML = `<i class="fas fa-map-marker-alt me-2"></i>${data.location}`;
    }
}

function renderCards(data) {
    const cardsContainer = document.querySelector('.site-cards');
    if (!cardsContainer || !data.cards) return;
    cardsContainer.innerHTML = '';
    data.cards.forEach(card => {
        const col = document.createElement('div');
        col.className = 'col-md-4 d-flex justify-content-center';
        
        // 创建整个卡片的链接包装器
        const cardLink = document.createElement('a');
        cardLink.href = card.url ? card.url : '#';
        // 只有当url不是#时才在新窗口打开
        if (card.url && card.url !== '#') {
            cardLink.target = '_blank';
        }
        cardLink.className = 'card-link';
        cardLink.style.textDecoration = 'none';
        cardLink.style.color = 'inherit';
        cardLink.style.display = 'block';
        cardLink.style.width = '100%';
        cardLink.style.height = '100%';
        
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card glass p-4 text-center';
        // 图标支持自定义
        const iconDiv = document.createElement('div');
        iconDiv.className = 'card-icon text-info';
        const iconClass = card.ico ? card.ico : 'fas fa-robot';
        iconDiv.innerHTML = `<i class="${iconClass}"></i>`;
        cardDiv.appendChild(iconDiv);
        const h5 = document.createElement('h5');
        h5.className = 'fw-bold';
        h5.textContent = card.name;
        cardDiv.appendChild(h5);
        if(card.dis){
            const desc = document.createElement('div');
            desc.className = 'mb-2';
            desc.textContent = card.dis;
            cardDiv.appendChild(desc);
        }
        if(card.btn){
            const btn = document.createElement('a');
            btn.className = 'btn btn-outline-info btn-sm';
            btn.textContent = card.btn;
            btn.href = card.url ? card.url : '#';
            btn.target = '_blank';
            cardDiv.appendChild(btn);
        }
        
        cardLink.appendChild(cardDiv);
        col.appendChild(cardLink);
        cardsContainer.appendChild(col);
    });
}

function renderFooter(data) {
    const footer = document.getElementById('footer-content');
    if (!footer || !data.footer) return;
    let html = '';
    if (data.footer.copyright) html += `<div>${data.footer.copyright}</div>`;
    if (data.footer.icp) {
        html += `<div style="margin-top:2px;"><a href="https://beian.miit.gov.cn/" target="_blank" style="color: inherit; text-decoration: none;">${data.footer.icp}</a></div>`;
    }
    if (data.footer.site_start) {
        const start = new Date(data.footer.site_start);
        const now = new Date();
        const years = now.getFullYear() - start.getFullYear();
        const months = now.getMonth() - start.getMonth() + years * 12;
        html += `<div style="margin-top:2px;font-size:0.98em;color:#888;">建站时间：${data.footer.site_start}（已运行${months}个月）</div>`;
    }
    footer.innerHTML = html;
}

function renderGithubChart(data) {
    const chart = document.getElementById('github-chart');
    if (!chart || !data.github) return;
    const username = data.github.username || 'XiaooHu2002';
    const color = data.github.color || '409ba5';
    chart.src = `https://ghchart.rshah.org/${color}/${username}`;
    chart.alt = `${username}'s Github Chart`;
}

// 烟花点击特效
"use strict";function updateCoords(e){pointerX=(e.clientX||e.touches[0].clientX)-canvasEl.getBoundingClientRect().left,pointerY=e.clientY||e.touches[0].clientY-canvasEl.getBoundingClientRect().top}function setParticuleDirection(e){var t=anime.random(0,360)*Math.PI/180,a=anime.random(50,180),n=[-1,1][anime.random(0,1)]*a;return{x:e.x+n*Math.cos(t),y:e.y+n*Math.sin(t)}}function createParticule(e,t){var a={};return a.x=e,a.y=t,a.color=colors[anime.random(0,colors.length-1)],a.radius=anime.random(16,32),a.endPos=setParticuleDirection(a),a.draw=function(){ctx.beginPath(),ctx.arc(a.x,a.y,a.radius,0,2*Math.PI,!0),ctx.fillStyle=a.color,ctx.fill()},a}function createCircle(e,t){var a={};return a.x=e,a.y=t,a.color="#F00",a.radius=0.1,a.alpha=0.5,a.lineWidth=6,a.draw=function(){ctx.globalAlpha=a.alpha,ctx.beginPath(),ctx.arc(a.x,a.y,a.radius,0,2*Math.PI,!0),ctx.lineWidth=a.lineWidth,ctx.strokeStyle=a.color,ctx.stroke(),ctx.globalAlpha=1},a}function renderParticule(e){for(var t=0;t<e.animatables.length;t++){e.animatables[t].target.draw()}}function animateParticules(e,t){for(var a=createCircle(e,t),n=[],i=0;i<numberOfParticules;i++){n.push(createParticule(e,t))}anime.timeline().add({targets:n,x:function(e){return e.endPos.x},y:function(e){return e.endPos.y},radius:0.1,duration:anime.random(1200,1800),easing:"easeOutExpo",update:renderParticule}).add({targets:a,radius:anime.random(80,160),lineWidth:0,alpha:{value:0,easing:"linear",duration:anime.random(600,800)},duration:anime.random(1200,1800),easing:"easeOutExpo",update:renderParticule,offset:0})}function debounce(e,t){var a;return function(){var n=this,i=arguments;clearTimeout(a),a=setTimeout(function(){e.apply(n,i)},t)}}var canvasEl=document.querySelector(".fireworks");if(canvasEl){var ctx=canvasEl.getContext("2d"),numberOfParticules=30,pointerX=0,pointerY=0,colors=["#ff324a","#31ffa6","#206eff","#ffff99"],setCanvasSize=debounce(function(){canvasEl.width=2*window.innerWidth,canvasEl.height=2*window.innerHeight,canvasEl.style.width=window.innerWidth+"px",canvasEl.style.height=window.innerHeight+"px",canvasEl.getContext("2d").scale(2,2)},500),render=anime({duration:1/0,update:function(){ctx.clearRect(0,0,canvasEl.width,canvasEl.height)}});

function triggerFirework(e) {
  // 只排除a标签，其他区域都能爆炸
  if (e.target.nodeName === 'A') return;
  render.play();
  updateCoords(e);
  animateParticules(pointerX, pointerY);
}

document.addEventListener('mousedown', triggerFirework, false);
document.addEventListener('touchstart', function(e) {
  triggerFirework(e.touches[0] || e);
}, false);

setCanvasSize();
window.addEventListener("resize",setCanvasSize,!1)};


window.addEventListener('DOMContentLoaded', async function() {
    const data = await loadYamlData();
    renderSidebar(data);
    renderCards(data);
    renderFooter(data);
    renderGithubChart(data);
}); 