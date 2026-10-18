// Shared browser setup: opens a film page with timing.json injected as window.TIMING.
import {chromium} from 'playwright-core';
import {readFileSync} from 'node:fs';
export const EXE='/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';
export async function openPage(pageSpec,w,h){
  const b=await chromium.launch({executablePath:EXE});
  const p=await b.newPage({viewport:{width:+w,height:+h}});
  const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
  await p.addInitScript(`window.TIMING=${readFileSync('timing.json','utf8')}`);
  const [file,qs='']=pageSpec.split('?');
  await p.goto('file://'+process.cwd()+'/'+file+(qs?'?'+qs:''));
  await p.waitForFunction(()=>window.READY===true,null,{timeout:20000});
  if(errs.length) console.error('PAGE ERRORS:',errs.join('\n'));
  return {b,p,errs};
}
