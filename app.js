(() => {
  'use strict';
  const PROFILES = window.PROFILES || [];
  const labels = {history:'Phe Tây Sơn · Lịch sử', opposition:'Phe đối lập · Quân Thanh',folk:'Nhân vật dân gian'};
  const sectionNames = {history:'Sử liệu',role:'Vai trò trong chiến dịch',legend:'Giai thoại',memorial:'Tưởng niệm / thờ tự'};
  const cards = document.getElementById('cards');
  const search = document.getElementById('search');
  const resultLine = document.getElementById('result-line');
  const empty = document.getElementById('empty');
  const dialog = document.getElementById('profile-dialog');
  const body = document.getElementById('dialog-body');
  const close = document.getElementById('close-dialog');
  let filter='all';
  const normalize = (s) => (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase();
  const text = (tag, content, cls) => {const el=document.createElement(tag);if(cls)el.className=cls;el.textContent=content;return el};
  const getProfile = id => PROFILES.find(p=>p.id===id);
  const summary = p => {let h=(p.sections.history||[]).find(s=>!s.startsWith('(Nguồn')&&!s.startsWith('(Tổng hợp')) || (p.sections.legend||[]).find(s=>!s.startsWith('(Tham khảo'));return h ? h.replace(/\s+/g,' ').slice(0,89)+'…':''};
  function render(){
    const q=normalize(search.value.trim());
    const filtered=PROFILES.filter(p=>(filter==='all'||p.group===filter) && normalize([p.name,p.subtitle,p.ability?.name,p.ability?.description,Object.values(p.sections).flat().join(' ')].join(' ')).includes(q));
    cards.replaceChildren();
    resultLine.textContent = `${filtered.length} hồ sơ ${q ? 'phù hợp' : 'đang hiển thị'}`;
    empty.hidden = filtered.length>0;
    filtered.forEach((p)=>{
      const btn=document.createElement('button');btn.type='button';btn.className='profile-card '+p.group;btn.setAttribute('aria-label','Xem hồ sơ '+p.name);
      const meta=document.createElement('div');meta.className='card-meta';meta.append(text('span',labels[p.group]),text('span',String(PROFILES.indexOf(p)+1).padStart(2,'0'),'card-number'));
      btn.append(meta,text('h3',p.name),text('div',p.ability?.name||'Xem tư liệu','card-caption'));
      const action=document.createElement('div');action.className='card-action';action.append(text('span','Đọc hồ sơ'),text('span','↗','arrow'));btn.append(action);
      btn.addEventListener('click',()=>{location.hash='nhan-vat/'+encodeURIComponent(p.id)});
      cards.append(btn);
    });
  }
  function openProfile(p){
    body.replaceChildren();
    const header=document.createElement('div');header.className='detail-header';
    header.append(text('span',labels[p.group],'detail-tag'),text('h2',p.name,'detail-title'));
    if(p.group==='folk')header.append(text('div','Hình tượng truyền thuyết dân gian · Không thuộc chiến dịch 1789','detail-subtitle'));
    body.append(header);
    if(p.ability){const box=document.createElement('div');box.className='ability-box';box.append(text('span','Kỹ năng trong trò chơi','ability-label'),text('strong',p.ability.name),text('p',p.ability.description));body.append(box)}
    ['history','role','legend','memorial'].forEach(k=>{
      if(!p.sections[k]?.length)return;
      const section=document.createElement('section');section.className='info-section';section.append(text('h3',sectionNames[k]));
      p.sections[k].forEach(s=>{
        const isSource=/^(\(?Nguồn|\(?Tổng hợp|\(?Tham khảo|\(?Theo |\(?Lưu ý)/i.test(s);
        section.append(text('p',s,isSource?'source-line':''));
      });body.append(section);
    });
    const foot=document.createElement('div');foot.className='detail-footer';foot.append(text('span','Trích từ tài liệu nhóm · Nội dung cần được đối chiếu nguồn gốc','detail-note'));
    const copy=text('button','Sao chép liên kết','copy-link');copy.type='button';copy.addEventListener('click',async()=>{const url=location.href;try{await navigator.clipboard.writeText(url);copy.textContent='Đã sao chép ✓';setTimeout(()=>copy.textContent='Sao chép liên kết',1500)}catch(e){window.prompt('Sao chép đường dẫn:',url)}});foot.append(copy);body.append(foot);
    if(!dialog.open)dialog.showModal();
    document.body.classList.add('locked');dialog.scrollTop=0;
    document.title=p.name+' · Tây Sơn Hồi Chiến';
  }
  function syncRoute(){
    const match=location.hash.match(/^#nhan-vat\/(.+)$/);
    const p=match?getProfile(decodeURIComponent(match[1])):null;
    if(p)openProfile(p);else {if(dialog.open)dialog.close();document.body.classList.remove('locked');document.title='Hồ sơ nhân vật · Tây Sơn Hồi Chiến'}
  }
  document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{
    filter=b.dataset.filter;document.querySelectorAll('.filter').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',x===b?'true':'false')});render();
  }));
  search.addEventListener('input',render);
  document.addEventListener('keydown',e=>{if(e.key==='/'&&!dialog.open&&document.activeElement!==search){e.preventDefault();search.focus()}});
  const dismiss=()=>{if(location.hash.startsWith('#nhan-vat/'))location.hash='thu-vien';else if(dialog.open)dialog.close()};
  close.addEventListener('click',dismiss);
  dialog.addEventListener('click',e=>{if(e.target===dialog)dismiss()});
  dialog.addEventListener('close',()=>{document.body.classList.remove('locked');if(location.hash.startsWith('#nhan-vat/'))location.hash='thu-vien'});
  window.addEventListener('hashchange',syncRoute);
  render();syncRoute();
})();
