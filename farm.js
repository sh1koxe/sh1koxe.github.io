/* Classroom simulations: fictional, transparent scores, not agronomic forecasts. */
const farmScenarios=[
 {tag:'01 / 种苗准备',title:'开季：第一笔预算花在哪里？',context:'新一季即将开始，椒园要在可控投入与长期品质之间做选择。',choices:[
  {name:'统一育苗与来源记录',desc:'投入更多精力记录种苗来源，为后续品质管理打基础。',cost:4,delta:[10,3,4],note:'规范的记录有利于追踪，但也挤占了后续预算。'},
  {name:'分批育苗，留出试验区',desc:'兼顾种植规模和观察空间，为后续调整留余地。',cost:2,delta:[5,6,0],note:'留出试验区能保留观察空间，初期市场投入较少。'},
  {name:'沿用现有流程',desc:'控制启动投入，把更多预算留到后面的环节。',cost:0,delta:[0,0,-4],note:'节省预算，但没有补足来源记录这一潜在短板。'}]},
 {tag:'02 / 田间管理',title:'天气变化，如何安排田间管理？',context:'天气变化后，你需要根据土壤湿度安排浇水、排水和田间观察。',choices:[
  {name:'观察湿度并按需浇水',desc:'记录天气与土壤状况，安排适量浇水和排水。',cost:4,delta:[8,9,1],note:'及时观察湿度有助于安排浇水和排水，但需要投入人员和时间。'},
  {name:'按常规计划管理',desc:'保持既有管理节奏，控制工作量。',cost:1,delta:[3,0,2],note:'成本较低，但面对变化时可能不够灵活。'},
  {name:'减少巡田频次',desc:'将预算集中留给采收和销售环节。',cost:0,delta:[-5,-3,0],note:'保住了预算，但对田间情况的了解会减少。'}]},
 {tag:'03 / 采收与品质',title:'采收临近，怎样平衡效率与品质？',context:'面对交付时间和分拣成本，你需要制定鲜椒采收方案。',choices:[
  {name:'分批采收、仔细分拣',desc:'安排更多人工，尽量让上市鲜椒更整齐。',cost:4,delta:[10,1,4],note:'有助于品质一致，但人工与时间投入更高。'},
  {name:'统一采收、基础分拣',desc:'兼顾交付效率与基本分级。',cost:2,delta:[4,0,4],note:'效率较高，但分拣细度有限。'},
  {name:'集中快速采收',desc:'压缩分拣成本，优先赶上交付。',cost:0,delta:[-4,-1,5],note:'交付效率提高，但品质一致性可能承压。'}]},
 {tag:'04 / 走向市场',title:'最后一步：怎样让人相信这颗椒？',context:'辣椒即将走出田间，剩余预算需要在销量、信任和地方连接之间分配。',choices:[
  {name:'完善来源信息与椒农故事',desc:'呈现可核验的来源信息，并邀请椒农讲述种植过程。',cost:4,delta:[4,2,10],note:'信任建设需要真实记录和持续维护。'},
  {name:'联系餐饮进行试吃',desc:'围绕鲜香特点开展小范围产品体验。',cost:2,delta:[2,0,6],note:'试吃有助于建立风味认知，覆盖范围相对有限。'},
  {name:'只发布产品照片',desc:'低成本展示产品，把资金留在椒园。',cost:0,delta:[0,0,1],note:'操作轻便，但消费者获得的来源信息有限。'}]}
];
const farm=document.querySelector('#farm-app');let turn=0,balance=12,metrics=[50,50,50],history=[];const metricNames=['品质','生态','市场'];const clamp=n=>Math.max(0,Math.min(100,n));
function farmMetrics(){return `<div class="metric-strip">${metricNames.map((n,i)=>`<div><span>${n}</span><strong>${metrics[i]}</strong><div class="metric-line"><i style="width:${metrics[i]}%"></i></div></div>`).join('')}<div><span>剩余预算</span><strong>${balance}<small> / 12</small></strong><div class="metric-line"><i style="width:${balance/12*100}%"></i></div></div></div>`}
function renderFarm(){if(turn===farmScenarios.length){const min=Math.min(...metrics), weak=metricNames[metrics.indexOf(min)];const type=metrics[0]>=65&&metrics[1]>=60&&metrics[2]>=60?'稳健经营型':metrics[2]>=metrics[0]&&metrics[2]>=metrics[1]?'市场开拓型':metrics[1]>=metrics[0]?'生态观察型':'品质优先型';farm.innerHTML=`${farmMetrics()}<div class="sim-result"><div><span class="result-label">SEASON COMPLETE / 模拟完成</span><h4>你的经营风格：${type}</h4><p>本轮更需要关注的是<strong>${weak}</strong>。这些点数用于比较你的选择，不代表真实产量或经营预测。</p><p>剩余预算 ${balance} 点。可返回上一步调整选择，看看不同取舍会带来什么变化。</p><div class="sim-buttons"><button data-farm="undo" class="sim-secondary">← 返回上一步</button><button data-farm="reset" class="sim-primary">重新挑战 ↻</button></div></div><div class="decision-journal"><span>你的决策记录</span>${history.map((h,i)=>`<p><small>0${i+1}</small> ${h.choice.name}<em>${h.choice.note}</em></p>`).join('')}</div></div>`;return}
const s=farmScenarios[turn];farm.innerHTML=`${farmMetrics()}<div class="sim-content"><div class="scenario"><div class="scenario-top"><span>${s.tag}</span><span>${turn+1} / ${farmScenarios.length}</span></div><div class="scenario-progress">${farmScenarios.map((_,i)=>`<i class="${i<=turn?'on':''}"></i>`).join('')}</div><h4>${s.title}</h4><p>${s.context}</p><div class="budget-tip">按预算选择一项方案，进入下一阶段。每项影响均为教学设定。</div></div><div class="choice-list">${s.choices.map((c,i)=>`<button class="farm-choice" data-choice="${i}" ${c.cost>balance?'disabled':''}><span class="choice-heading"><strong>${c.name}</strong><b>${c.cost} 点</b></span><span class="choice-desc">${c.desc}</span><span class="choice-impact">${c.delta.map((d,j)=>d?`${metricNames[j]} ${d>0?'+':''}${d}`:'').filter(Boolean).join('　·　')||'指标不变'}${c.cost>balance?'　·　预算不足':''}</span></button>`).join('')}<div class="sim-buttons"><button data-farm="undo" class="sim-secondary" ${turn===0?'disabled':''}>← 返回上一步</button><button data-farm="reset" class="sim-link">重新开始</button></div></div></div>`}
farm.addEventListener('click',event=>{const choice=event.target.closest('[data-choice]');const action=event.target.closest('[data-farm]')?.dataset.farm;if(choice){const c=farmScenarios[turn].choices[Number(choice.dataset.choice)];if(c.cost>balance)return;history.push({choice:c,balance,metrics:[...metrics]});balance-=c.cost;metrics=metrics.map((v,i)=>clamp(v+c.delta[i]));turn++;renderFarm();return}if(action==='undo'&&history.length){const h=history.pop();turn--;balance=h.balance;metrics=h.metrics;renderFarm()}if(action==='reset'){turn=0;balance=12;metrics=[50,50,50];history=[];renderFarm()}});renderFarm();
