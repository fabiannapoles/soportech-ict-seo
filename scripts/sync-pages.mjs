import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
// Keep GitHub Pages' existing branch/root publishing mode. Build output is reviewed
// in the same commit as source; never remove unrelated repository files.
for(const entry of fs.readdirSync(path.join(root,'dist'))) {
  fs.cpSync(path.join(root,'dist',entry),path.join(root,entry),{recursive:true});
}
console.log('Verified dist copied to repository root for existing GitHub Pages deployment.');
