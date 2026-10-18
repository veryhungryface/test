import {chromium} from 'playwright-core';
import {spawn} from 'node:child_process';
const [,,page_,outfile,frames,w=1920,h=1080]=process.argv;
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell'});
const p=await b.newPage({viewport:{width:+w,height:+h}});
await p.goto('file://'+process.cwd()+'/'+page_); await p.evaluate(()=>document.fonts.ready);
const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate','60','-i','-','-c:v','libx264','-pix_fmt','yuv420p','-crf','16','-preset','medium',outfile],{stdio:['pipe','inherit','inherit']});
for(let f=0;f<+frames;f++){await p.evaluate(f=>{window.seek(f)},f);ff.stdin.write(await p.screenshot({type:'jpeg',quality:95}));}
ff.stdin.end(); await new Promise(r=>ff.on('close',r)); await b.close();
