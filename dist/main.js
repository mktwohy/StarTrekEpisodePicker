(()=>{"use strict";var n,e;function t(){return $("#series_filters").find("input:checked").toArray().map((function(e){return t=e.id,n.filter((function(n){return n.uid===t}))[0]||null;var t}))}function o(){if(void 0!==e){console.log("toggled: ",t());var n=t().map((function(n){return n.uid})),o=e.filter((function(e){return n.includes(e.series.uid)})).random();console.log("Randomly picked episode: ",o),void 0!==o&&$("#episode").text("".concat(o.season.title,": ").concat(o.title))}else console.error("Cannot pick random episode; episodes have not been read from file yet.")}Array.prototype.random=function(){return this[Math.floor(Math.random()*this.length)]},$(document).ready((function(){Promise.all([$.getJSON("../src/db/json/series.json"),$.getJSON("../src/db/json/episodes.json")]).then((function(t){n=t[0],e=t[1],function(){n.sort((function(n,e){return n.productionStartYear-e.productionStartYear}));for(var e=$("#series_filters"),t=0,o=n;t<o.length;t++){var i=o[t];e.append('\n            <li>\n                <input type="checkbox" id="'.concat(i.uid,'">\n                ').concat(i.title,"\n            </li>\n        "))}e.find("li input").prop("checked",!0)}(),o()})),$("#btn_new_episode").on("click",o)}))})();