const image=document.querySelector('#character-image');const caption=document.querySelector('#view-caption');const captions={front:'五瓣绿萼冠、弯椒蒂、小龙角与叶脉剑眉；青瓷云肩下，是“左公椒”樟木胸牌。',side:'龙吻与嫩叶背鳍勾勒侧面轮廓；斗笠斜挂后背，椒龙尾从后腰自然翘起。',back:'竹篾斗笠的编织纹理清晰可见，青瓷云肩后摆舒展，椒龙尾从斗笠下方上扬。'};const names={front:'正视图',side:'侧视图',back:'背视图'};document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>{const view=button.dataset.view;image.className='character-image '+view;image.setAttribute('aria-label','樟小龙'+names[view]);caption.textContent=captions[view];document.querySelectorAll('[data-view]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))})}));

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('js-motion');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); }
  }), { threshold: 0.06 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}

