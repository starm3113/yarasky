// ---- champ d'étoiles scintillantes ----
(function(){
  const n = 46;
  const frag = document.createDocumentFragment();
  for(let i=0;i<n;i++){
    const s = document.createElement('div');
    s.className = 'starflake';
    const size = Math.random()*2.2 + 0.8;
    s.style.width = size+'px';
    s.style.height = size+'px';
    s.style.left = Math.random()*100+'vw';
    s.style.top = Math.random()*100+'vh';
    s.style.animationDelay = (Math.random()*3)+'s';
    s.style.opacity = 0.3 + Math.random()*0.5;
    frag.appendChild(s);
  }
  document.body.appendChild(frag);
})();

// ---- reveal au scroll ----
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
},{threshold:0.18, rootMargin:'0px 0px -8% 0px'});

document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// ---- cartes des maisons : clic + clavier ----
document.querySelectorAll('.hcell[role="button"]').forEach(card=>{
  card.addEventListener('keydown',(event)=>{
    if(event.key === 'Enter' || event.key === ' '){
      event.preventDefault();
      card.classList.toggle('flipped');
    }
  });
});

// ---- barre de progression ----
const prog = document.getElementById('progress');
if(prog){
  function updProg(){
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const p = max>0 ? (h.scrollTop/max)*100 : 0;
    prog.style.width = p+'%';
  }
  window.addEventListener('scroll', updProg, {passive:true});
  window.addEventListener('resize', updProg);
  updProg();
}

// ---- léger parallaxe sur les logos d'astres ----
let ticking=false;
window.addEventListener('scroll',()=>{
  if(!ticking){
    requestAnimationFrame(()=>{
      const vh = window.innerHeight;
      document.querySelectorAll('.astre-logo').forEach(el=>{
        const r = el.getBoundingClientRect();
        const center = r.top + r.height/2;
        const off = (center - vh/2)/vh;
        el.style.transform = `translateY(${off*-14}px)`;
      });
      ticking=false;
    });
    ticking=true;
  }
},{passive:true});
