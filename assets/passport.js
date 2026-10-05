const passports = {
  technical: {
    id: 'WS-DEMO-TECH-001', version: 'Example record v1', title: 'Optical pattern research sample',
    description: 'A fictional laboratory visual used to illustrate how a research team might package an image and its accompanying statements for review.',
    image: 'assets/sample-optical.png', alt: 'Synthetic optical bands and measurement bars, marked as a fictional sample',
    issuer: 'Example R&D team · identity unverified', source: 'Original synthetic image made for this demonstration',
    rights: 'Illustrative declaration only; no patent or license is attached', review: 'No independent diligence performed',
    claimIssuer: 'The fictional team says this image belongs in its invention evidence bundle. No real team has issued this statement.',
    claimSource: 'The image was generated for this demo; there is no external patent record or legal-status source.',
    claimOpen: 'Inventor identity, priority, patent family, assignments, jurisdictions, encumbrances, and a permitted evidence set would need review.',
    evidence: [
      ['Research image · DEMO-T-01', 'Synthetic local asset · generated for demo', 'Does not establish an invention date or inventor.'],
      ['Patent-family reference', 'Not supplied · unreviewed', 'No patent number or legal status is asserted.'],
      ['Assignment / lab record', 'Not supplied · unreviewed', 'A verifier cannot establish title from this image.'],
    ],
    questions: ['Who is authorized to issue the evidence record?', 'Which source files and dated records can be shared for a pilot?', 'What jurisdiction, patent status, assignments, or third-party obligations require specialist review?'],
    sample: 'A fictional optical pattern created for this demo.',
    fingerprint: 'ce5a9a0a25fe7b27121f4cb35099b8df95e87be46c955de445f11216432e2d25',
  },
  heritage: {
    id: 'WS-DEMO-CULT-001', version: 'Example record v1', title: 'Pattern study for a fictional archive',
    description: 'An original synthetic geometric design that illustrates an archive image workflow. It is not a photograph of a collection object or a depiction attributed to any community.',
    image: 'assets/sample-heritage.png', alt: 'Synthetic geometric pattern marked as a fictional cultural asset sample',
    issuer: 'Example archive · identity unverified', source: 'Original synthetic image made for this demonstration',
    rights: 'No real collection rights, attribution, access permission, or community consent asserted', review: 'No authority or cultural protocol review performed',
    claimIssuer: 'The fictional archive says this file would be its distribution image. No real archive has approved it.',
    claimSource: 'The design is synthetic and has no real collection record or provenance claim.',
    claimOpen: 'Custodial authority, creator attribution, applicable rights, consent, access terms, and any cultural protocol must be supplied by appropriate parties.',
    evidence: [
      ['Digital image · DEMO-C-01', 'Synthetic local asset · generated for demo', 'Not a collection photograph or master scan.'],
      ['Collection / accession entry', 'Not supplied · unreviewed', 'No provenance or holding is asserted.'],
      ['Rights and consent statement', 'Not supplied · unreviewed', 'WaveSign cannot grant or infer permission.'],
    ],
    questions: ['Who has authority to describe and distribute the asset?', 'Which attribution, rights, access, or cultural-use terms apply?', 'Is there documented consent for the specific publication and verification workflow?'],
    sample: 'A fictional geometric pattern created for this demo.',
    fingerprint: '0f2ccca6dcdba80c56a1583c7cf6f011481350209644da8362c2c09e05ecf3fb',
  },
};

function put(id, value) {
  document.getElementById(id).textContent = value;
}

function selectExample(name) {
  const record = passports[name];
  if (!record) return;
  document.querySelectorAll('[data-example]').forEach((button) => {
    const selected = button.dataset.example === name;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  for (const [id, value] of Object.entries({
    'asset-id': record.id, 'asset-version': record.version, 'asset-title': record.title,
    'asset-description': record.description, issuer: record.issuer, source: record.source,
    rights: record.rights, review: record.review, 'claim-issuer': record.claimIssuer,
    'claim-source': record.claimSource, 'claim-open': record.claimOpen,
    'sample-description': record.sample, fingerprint: record.fingerprint,
  })) put(id, value);
  const image = document.getElementById('asset-image');
  image.src = record.image;
  image.alt = record.alt;
  const sample = document.getElementById('sample-download');
  sample.href = record.image;
  sample.download = record.image.split('/').at(-1);
  const base = `assets/sample-${name === 'technical' ? 'optical' : 'heritage'}`;
  for (const [id, suffix] of Object.entries({
    'package-download': '-signed.zip',
    'signed-download': '-package/signed.png',
    'metadata-download': '-package/sig.json',
    'changed-download': '-package/changed-sample.png',
  })) document.getElementById(id).href = base + suffix;
  const rows = document.getElementById('evidence-rows');
  rows.replaceChildren(...record.evidence.map((entry) => {
    const tr = document.createElement('tr');
    entry.forEach((cell) => { const td = document.createElement('td'); td.textContent = cell; tr.append(td); });
    return tr;
  }));
  const questions = document.getElementById('questions-list');
  questions.replaceChildren(...record.questions.map((question) => {
    const li = document.createElement('li'); li.textContent = question; return li;
  }));
}

document.querySelectorAll('[data-example]').forEach((button) => button.addEventListener('click', () => selectExample(button.dataset.example)));
selectExample('technical');
