// stills.mjs page[?q] outdir w h t1 t2 ...   — render frames at times (s)
import {openPage} from './lib.mjs';
import {mkdirSync} from 'node:fs';
const [,,pg,outdir,w,h,...ts]=process.argv;mkdirSync(outdir,{recursive:true});
const {b,p}=await openPage(pg,w,h);
for(const t of ts){await p.evaluate(f=>{window.seek(f)},Math.round(+t*60));await p.screenshot({path:`${outdir}/t${(+t).toFixed(2).padStart(5,'0')}.png`})}
await b.close();
