// render.mjs page[?q] out.mp4 frames w h [startFrame] — frame-by-frame capture piped to ffmpeg
import {openPage} from './lib.mjs';
import {spawn} from 'node:child_process';
const [,,pg,outfile,frames,w=1920,h=1080,start=0]=process.argv;
const {b,p}=await openPage(pg,w,h);
const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate','60','-i','-','-c:v','libx264','-pix_fmt','yuv420p','-crf','14','-preset','medium','-r','60',outfile],{stdio:['pipe','inherit','inherit']});
for(let f=+start;f<+start+ +frames;f++){await p.evaluate(f=>{window.seek(f)},f);const buf=await p.screenshot({type:'jpeg',quality:94});if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));if(f%300===0)console.log('frame',f)}
ff.stdin.end();await new Promise(r=>ff.on('close',r));await b.close();
