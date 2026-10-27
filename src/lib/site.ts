export const site = 'https://soportechict.com';
export type Silo = 'home' | 'b2b' | 'b2c';
export const routes = { home: '/', b2b: '/empresas/soporte-tecnico/', b2c: '/reparacion-computadoras/' };
export function whatsapp(silo: Silo, placement: string) {
  const intent = {home:'Hola, quiero orientación sobre los servicios de Soportech ICT.',b2b:'Hola, necesito soporte TI para mi empresa. Me interesa una evaluación de equipos, mantenimiento y continuidad operativa.',b2c:'Hola, necesito ayuda con mi computadora o laptop. Quiero consultar reparación a domicilio. Mi municipio es: ___.'}[silo];
  // Attribution survives in the message; wa.me does not provide website analytics via UTM.
  return `https://wa.me/523332238265?text=${encodeURIComponent(`${intent} [Origen: web | silo=${silo} | ubicacion=${placement}]`)}`;
}
export function schema(silo: Silo, description: string) {
  const business = {
    '@type': silo === 'b2b' ? ['LocalBusiness', 'ProfessionalService'] : 'LocalBusiness',
    '@id': `${site}/#business`, name:'Soportech ICT', url:site+'/',
    telephone:'+523332238265',email:'contacto@soportechict.com',
    logo:site+'/assets/logo.svg',
    areaServed:[{'@type':'City',name:'Zapopan'},{'@type':'City',name:'Guadalajara'},{'@type':'City',name:'San Pedro Tlaquepaque'},{'@type':'City',name:'Tonalá'},{'@type':'City',name:'Tlajomulco de Zúñiga'},{'@type':'City',name:'El Salto'},{'@type':'Place',name:'Zona Metropolitana de Guadalajara'}],
    sameAs:['https://www.facebook.com/profile.php?id=61594872279617','https://www.instagram.com/soportechict.gdl/'],
  };
  const service = {
    '@type':'Service', '@id':site+routes[silo]+'#service', url:site+routes[silo],
    name:silo==='b2b'?'Soporte técnico para empresas':'Reparación de computadoras a domicilio',
    serviceType:silo==='b2b'?'Soporte TI empresarial':'ComputerRepair', description,
    provider:{'@id':business['@id']}, areaServed:business.areaServed,
  };
  // ComputerRepair is a service label, not a defined Schema.org @type.
  return {'@context':'https://schema.org','@graph':silo==='home'?[business]:[business,service]};
}
