const buildings = [
  {name:"Block 32", location:"Near Main Gate", ramp:true, lift:true, entrance:true, washroom:true},
  {name:"Block 34", location:"Central Campus", ramp:true, lift:false, entrance:true, washroom:false},
  {name:"Block 36", location:"Academic Zone", ramp:true, lift:true, entrance:true, washroom:true},
  {name:"Library", location:"Knowledge Centre", ramp:true, lift:true, entrance:true, washroom:true},
  {name:"Admin Block", location:"Main Road", ramp:false, lift:true, entrance:true, washroom:false},
  {name:"Engineering Block", location:"North Campus", ramp:true, lift:false, entrance:false, washroom:false}
];

function renderBuildings(){
  const grid=document.getElementById("buildingGrid");
  if(!grid)return;
  const search=(document.getElementById("searchInput").value||"").toLowerCase();
  const filter=document.getElementById("filterSelect").value;
  const filtered=buildings.filter(b=>{
    const matches=(b.name+" "+b.location).toLowerCase().includes(search);
    const matchesFilter=filter==="all" || b[filter]===true;
    return matches && matchesFilter;
  });
  grid.innerHTML=filtered.length ? filtered.map(b=>`
    <article class="building-card">
      <div class="icon">🏢</div>
      <h3>${b.name}</h3>
      <p>📍 ${b.location}</p>
      <div class="badges">
        <span class="badge ${b.ramp?'':'no'}">♿ Ramp: ${b.ramp?'Yes':'No'}</span>
        <span class="badge ${b.lift?'':'no'}">🛗 Lift: ${b.lift?'Yes':'No'}</span>
        <span class="badge ${b.entrance?'':'no'}">🚪 Entrance: ${b.entrance?'Yes':'No'}</span>
      </div>
      <a class="btn secondary" href="building-details.html?name=${encodeURIComponent(b.name)}">View Details</a>
    </article>`).join("") : "<p>No buildings match your search.</p>";
}
const homeSearch = new URLSearchParams(window.location.search).get("search");

if (homeSearch && document.getElementById("searchInput")) {
    document.getElementById("searchInput").value = homeSearch;
}

document.getElementById("searchInput")?.addEventListener("input", renderBuildings);
document.getElementById("filterSelect")?.addEventListener("change", renderBuildings);

renderBuildings();
