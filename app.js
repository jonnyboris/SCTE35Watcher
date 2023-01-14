const subProcess = require('child_process');
const util = require("util");
const SCTE35 = require('scte35').SCTE35;

const proc = subProcess.spawn('ffmpeg', ['-hide_banner', '-i', 'udp://127.0.0.1:2094/pls1', '-c', 'copy', '-copy_unknown', '-map', '0:d', '-f', 'data', 'pipe:1']);
const scte35 = new SCTE35();

proc.stdout.on('data', (data) => {
    const marker = scte35.parseFromB64(Buffer.from(data).toString('base64'));
    console.log(`data: ${Buffer.from(data).toString('base64')}`);
    console.log(util.inspect(marker));
});

proc.stderr.on('data', (data) => {
    console.log(`Err: ${data}`);
});

