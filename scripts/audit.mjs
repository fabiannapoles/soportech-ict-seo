import fs from 'node:fs';
import path from 'node:path';
import lighthouse from 'lighthouse';
import {launch} from 'chrome-launcher';
const output=path.resolve(import.meta.dirname,'../../../outputs');
fs.mkdirSync(output,{recursive:true});
const chrome=await launch({chromePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',chromeFlags:['--headless=new','--disable-gpu','--no-first-run']});
try{
  const summary=[];
  for(const [name,route] of [['inicio','/'],['empresas','/empresas/soporte-tecnico/'],['hogar','/reparacion-computadoras/']]){
    const result=await lighthouse('http://127.0.0.1:4321'+route,{port:chrome.port,output:'html',logLevel:'error',onlyCategories:['performance','accessibility','best-practices','seo']});
    fs.writeFileSync(path.join(output,`lighthouse-${name}.html`),result.report);
    const lhr=result.lhr;
    const row={page:name,scores:Object.fromEntries(Object.entries(lhr.categories).map(([k,v])=>[k,Math.round(v.score*100)])),FCP:lhr.audits['first-contentful-paint'].displayValue,LCP:lhr.audits['largest-contentful-paint'].displayValue,CLS:lhr.audits['cumulative-layout-shift'].displayValue,TBT:lhr.audits['total-blocking-time'].displayValue,failures:Object.values(lhr.audits).filter(x=>x.score!==null&&x.score<0.9).map(x=>({id:x.id,title:x.title,display:x.displayValue,details:x.details}))};
    summary.push(row);console.log(JSON.stringify({...row,failures:row.failures.map(x=>({id:x.id,title:x.title,display:x.display}))}));
  }
  fs.writeFileSync(path.join(output,'lighthouse-summary.json'),JSON.stringify(summary,null,2));
}finally{chrome.kill();}
