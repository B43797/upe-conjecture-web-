async function loadData(){
  const res = await fetch('data/conjectures.json');
  return res.json();
}

function tile(label, cls, tip){
  const d = document.createElement('div');
  d.className = 'tile ' + cls;
  d.textContent = label;
  d.onclick = () => {
    const info = document.getElementById('info');
    if(info){ info.innerHTML = `<b>${label}</b><br>${tip}`; }
  };
  return d;
}

async function renderPyramid(hostId, infoId){
  const data = await loadData();
  const host = document.getElementById(hostId);
  host.innerHTML = '';
  data.pyramid.forEach(row => {
    const r = document.createElement('div'); r.className = 'row';
    r.style.gridTemplateColumns = `repeat(${row.length}, 1fr)`;
    row.forEach(node => r.appendChild(tile(node.label, node.cls, node.tip)));
    host.appendChild(r);
  });
  const info = document.getElementById(infoId);
  if(info){ info.textContent = 'Click a tile to see a short note.'; }
}

async function renderLadder(listId){
  const data = await loadData();
  const ol = document.getElementById(listId);
  data.ladder.forEach(step => {
    const li = document.createElement('li');
    li.innerHTML = `<b>${step.n} — ${step.title}</b><br>${step.note}`;
    ol.appendChild(li);
  });
}
