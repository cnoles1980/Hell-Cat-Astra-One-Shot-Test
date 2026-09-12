import assert from 'node:assert/strict';import{Game,makeLevel,wrap}from'./dist/engine.js';
function path(g,target,secret=false){let p=g.player,w=g.world,map=w.map,start=[Math.floor(p.x),Math.floor(p.y)],end=[Math.floor(target.x),Math.floor(target.y)],q=[start],prev=new Map([[start.join(','),null]]);for(let i=0;i<q.length;i++){let [x,y]=q[i];if(x===end[0]&&y===end[1])break;for(let[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){let xx=x+dx,yy=y+dy,k=xx+','+yy;if(map[yy]?.[xx]!==undefined&&(map[yy][xx]===0||secret&&map[yy][xx]===2)&&!prev.has(k)){prev.set(k,[x,y]);q.push([xx,yy])}}}let cur=end,route=[];if(!prev.has(end.join(',')))return null;while(cur){route.unshift({x:cur[0]+.5,y:cur[1]+.5});cur=prev.get(cur.join(','))}return route}
for(let i=0;i<3;i++){let g=new Game();g.load(i);assert.ok(path(g,g.world.key));assert.ok(path(g,g.world.exit));for(let p of g.pickups)assert.ok(path(g,p,true),'unreachable '+i+' '+JSON.stringify(p));}
let g=new Game();let x=g.player.x;for(let i=0;i<100;i++)g.step(1/60,{forward:-1});assert.ok(g.player.x>=1.19);assert.equal(g.kills,0);g.restart();g.shoot();g.shoot();assert.equal(g.shots,1);for(let i=0;i<18;i++)g.step(1/60);g.shoot();assert.equal(g.kills,1);
g=new Game();g.player.x=g.world.exit.x;g.player.y=g.world.exit.y;g.exit();assert.equal(g.status,'playing');g.exitWarn=0;g.player.key=true;g.exit();assert.equal(g.status,'intermission');g.load(2);g.player.key=true;g.exitWarn=0;g.exit();assert.equal(g.status,'playing');g.player.hp=1;g.damage(10);assert.equal(g.status,'dead');g.restart();assert.equal(g.status,'playing');assert.ok(g.player.hp>=65);
console.log('PASS: connected maps, walls, fire cooldown, hit detection, key gates, boss gate, death and checkpoint restart.');
let summaries=[];
for(let difficulty of['easy','normal']){
g=new Game(difficulty);let trace=[];for(let sector=0;sector<3;sector++){if(sector)g.load(sector);let frames=0;while(g.status==='playing'&&frames<36000){let p=g.player;let boss=g.enemies.find(e=>e.type==='boss'&&e.alive),goal=!p.key?g.world.key:boss||g.world.exit;let route=path(g,goal);assert.ok(route);let dest=route[1]||goal;let enemies=g.enemies.filter(e=>e.alive&&g.sight(p.x,p.y,e.x,e.y)).sort((a,b)=>Math.hypot(a.x-p.x,a.y-p.y)-Math.hypot(b.x-p.x,b.y-p.y)),aim=enemies[0];let angle=Math.atan2((aim||dest).y-p.y,(aim||dest).x-p.x);p.a=angle;let move=Math.atan2(dest.y-p.y,dest.x-p.x)-p.a;let forward=Math.cos(move),strafe=Math.sin(move);if(boss&&p.key&&Math.hypot(boss.x-p.x,boss.y-p.y)<4&&aim===boss){forward=0;strafe=Math.sin(frames*.01)>.0?1:-1}
if(p.owned[2]&&p.balls>0&&aim?.type==='boss')g.equip(2);else if(p.owned[1]&&p.shells>0)g.equip(1);else g.equip(0);
g.step(1/60,{forward,strafe,fire:!!aim});g.events=[];frames++;}
summaries.push({difficulty,sector:sector+1,status:g.status,health:Math.ceil(g.player.hp),kills:g.kills,score:g.score,time:Math.round(g.time)});if(g.status==='dead'||g.status==='playing')break;}
}
console.log(JSON.stringify(summaries,null,2));

assert.equal(summaries.length,6);assert.ok(summaries.filter(s=>s.sector===3).every(s=>s.status==='won'));console.log('PASS: both complete campaigns reach victory.');
