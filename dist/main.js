(()=>{"use strict";let e,o;function t(){return $("#series_filters").find("input:checked").toArray().map((o=>{return t=o.id,e.filter((e=>e.uid===t))[0]||null;var t}))}$(document).ready((()=>{console.log("hello world!"),Promise.all([$.getJSON("../src/db/json/series.json"),$.getJSON("../src/db/json/episodes.json")]).then((i=>{e=i[0],o=i[1],function(){e.sort(((e,o)=>e.productionStartYear-o.productionStartYear));let o=$("#series_filters");for(let t of e)o.append(`\n            <li>\n                <input type="checkbox" id="${t.uid}">\n                ${t.title}\n            </li>\n        `);o.find("li input").prop("checked",!0)}(),function(){if(void 0===o)return void console.error("Cannot pick random episode; episodes have not been read from file yet.");console.log("toggled: ",t());let e=t().map((e=>e.uid)),i=o.filter((o=>e.includes(o.series.uid))).random();console.log("Randomly picked episode: ",i),void 0!==i&&$("#episode").text(`${i.season.title}: ${i.title}`)}()}))})),Array.prototype.random=function(){return this[Math.floor(Math.random()*this.length)]}})();