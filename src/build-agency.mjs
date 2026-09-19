import {writeFile} from 'node:fs/promises';
import {home} from './agency-home.mjs';
await writeFile(new URL('../index.html',import.meta.url),home());
console.log('Agency homepage built');
