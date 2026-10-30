#!/usr/bin/env python3
"""Check the v0.1.0 release package, artwork, and source/standalone parity."""
from pathlib import Path
from PIL import Image
import base64, hashlib, json, re, zipfile, sys
import xml.etree.ElementTree as ET
from build_standalone import build_html
root=Path(__file__).resolve().parent
standalone=root/'comic-style-finder-v0.1.0.html'
assert standalone.is_file()
assert (root/'README.md').read_text().count('contact-96.jpg')>=1
assert (root/'contact-96.jpg').is_file()
old_files=[]
for f in ['comic-style-finder-v2.html','comic-style-finder-v2.1.html']:
    assert not (root/f).exists(), f'Legacy HTML still contains old protected character art: {f}'
for i in range(1,97):
    art=root/'art'/f'{i:03d}.webp'; svg=root/'art_src'/f'{i:03d}.svg'
    assert art.is_file() and svg.is_file(),(art,svg)
    im=Image.open(art);assert im.size==(480,326), (i,im.size)
    s=svg.read_text();assert '<svg' in s and '<script' not in s
    assert 'https://' not in s and 'http://' not in s.replace('http://www.w3.org/2000/svg','')
assert len(list((root/'art').glob('*.webp')))==96
assert len(list((root/'art_src').glob('*.svg')))==96
manifest=json.loads((root/'art_manifest.json').read_text())
names=re.search(r'const STYLE_NAMES = `(.+?)`\.split',(root/'app.js').read_text(),re.S).group(1).splitlines()
rows=manifest['images']
assert [row['id'] for row in rows]==list(range(1,97)), 'Artwork manifest must preserve all 96 IDs in order'
assert [row['name'] for row in rows]==names, 'Artwork manifest must match canonical names'
assert len(list((root/'art_src'/'generated').glob('*.webp')))==96
for row in rows:
    i=row['id']
    assert row['file']==f'art/{i:03d}.webp' and row['master']==f'art_src/generated/{i:03d}.webp'
    assert row['prompt'].strip() and len(row['prompt'])>100
    for key,hash_key in [('file','sha256'),('master','masterSha256')]:
        path=root/row[key]
        assert hashlib.sha256(path.read_bytes()).hexdigest()==row[hash_key], f'Artwork provenance mismatch: {path}'
        assert json.loads(Path(str(path)+'.json').read_text())['prompt']==row['prompt'], f'Stale prompt sidecar: {path}'
        with Image.open(path) as image:
            xmp=ET.fromstring(image.info['xmp'])
            assert xmp.find('.//{http://purl.org/dc/elements/1.1/}description').text==row['prompt'], f'Missing generation prompt: {path}'
assert len({row['sha256'] for row in rows})==96, 'Duplicate artwork files'
html=standalone.read_text()
assert html==build_html(root), 'Standalone HTML is stale. Run python3 build_standalone.py from this app folder.'
assert 'window.COMIC_ART_ASSETS=' in html
m=re.search(r'window\.COMIC_ART_ASSETS=(\{.*?\});</script>',html,re.S)
assert m, 'No inlined image manifest'
data=json.loads(m.group(1))
assert len(data)==96
for i in range(1,97):
    assert base64.b64decode(data[str(i)].split(',',1)[1])==(root/'art'/f'{i:03d}.webp').read_bytes(), f'Stale embedded art at {i}'
assert '<title>Comic Style Finder v0.1.0 · Comic Story Studio</title>' in html
assert '<strong>v0.1.0</strong>' in html
old=Path('/mnt/data/comic-style-finder-v2.1-codex-kit.zip')
if old.exists():
    with zipfile.ZipFile(old) as z:
        for i in range(1,97):
            old_bytes=z.read(f'comic-style-finder/art/{i:03d}.webp')
            new_bytes=(root/'art'/f'{i:03d}.webp').read_bytes()
            assert hashlib.sha256(old_bytes).digest()!=hashlib.sha256(new_bytes).digest(), f'Old art retained: {i}'
print('OK: 96 current WebP previews and raster masters; exact generation prompts and hashes; 96 legacy SVG sources; contact sheet present; standalone HTML/CSS/JS match source; all 96 embedded assets match new WebP files; no old HTML or old thumbnail bytes.')
