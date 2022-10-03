const archiver = require('archiver');
const fs = require('fs');
const { name } = JSON.parse(fs.readFileSync('../../config.json', 'utf-8'));

let settings = process.argv[2];
let exclude = [];
let target;
try {
	settings = JSON.parse(settings);
    target = settings.target;
	exclude = settings.exclude;
} catch {}

switch (target) {
    case 'mcaddon':
    case 'addon':
        exportAddon(exclude);
        break;
    case 'mcworld':
    case 'world':
        exportWorld(exclude, false);
        break;
    case 'mctemplate':
    case 'template':
        exportWorld(exclude, true);
        break;
    default:
        console.warn('No export target selected');
        break;
}

function exportAddon(exclude) {
    const outputAddon = fs.createWriteStream(`../../${name}.mcaddon`, 'utf-8');
        const addonArchive = archiver('zip', { zlib: { level: 9 }});
        
        ['bp', 'rp', 'wt'].filter(x => !exclude.some(y => y.toLowerCase() == x)).forEach(x => { addonArchive.directory(x.toUpperCase(), x.toLowerCase()); });
        addonArchive.on('error', err => console.error(err));
        addonArchive.pipe(outputAddon);
        addonArchive.finalize();
        outputAddon.close();
}

function exportWorld(exclude, template = false) {
    const outputWorld = fs.createWriteStream(`../../${name}.` + (template ? '.mctemplate' : '.mcworld'), 'utf-8');
    const worldArchive = archiver('zip', { zlib: { level: 9 }});
    
    ['bp', 'rp'].filter(x => !exclude.some(y => y.toLowerCase() == x)).forEach(x => { worldArchive.directory(x.toUpperCase(), x.toLowerCase()); });

    worldArchive.directory('WT/db/', 'db/');
    worldArchive.file('level.dat', {name: 'level.dat'});
    worldArchive.file('levelname.txt', {name: 'levelname.txt'});
    worldArchive.file('world_icon.jpeg', {name: 'world_icon.jpeg'});

    if (template) {
        worldArchive.directory('WT/texts/', 'texts/');
        worldArchive.file('manifest.json', {name: 'manifest.json'});
    }
    worldArchive.on('error', err => console.error(err));
    worldArchive.pipe(outputWorld);
    worldArchive.finalize();
    outputWorld.close();
}