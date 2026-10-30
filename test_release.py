"""Build and verify a temporary release without touching the working bundle."""
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import json

source=Path(__file__).resolve().parent
changelog=(source/'CHANGELOG.md').read_text()
assert changelog.index('## Unreleased')<changelog.index('## [0.1.0] - 2026-10-30')<changelog.index('## Internal pre-release builds')
assert not changelog.split('## Unreleased',1)[1].split('## [0.1.0]',1)[0].strip(),'New release must leave Unreleased empty'
assert 'V2.0–V2.2 and v0.2–v0.3 were never published' in changelog
with tempfile.TemporaryDirectory() as temp:
    app=Path(temp)/'studio'/'apps'/'comic-style-finder'
    app.mkdir(parents=True)
    for name in ['index.html','styles.css','app.js','build_standalone.py','verify_release.py','README.md','contact-96.jpg','art_manifest.json','vercel.json']:
        shutil.copy2(source/name,app/name)
    for name in ['art','art_src']:
        shutil.copytree(source/name,app/name)
    def run(name):
        return subprocess.run([sys.executable,'-B',str(app/name)],capture_output=True,text=True)
    built=run('build_standalone.py')
    assert built.returncode==0,built.stderr
    assert (app/'comic-style-finder-v0.1.0.html').exists(),'Builder must write the app-local standalone HTML'
    assert not (app.parent.parent/'comic-style-finder-v0.1.0.html').exists(),'Builder must not write outside the app'
    result=run('verify_release.py')
    assert result.returncode==0,result.stdout+result.stderr
    deployment=json.loads((app/'vercel.json').read_text())
    published=subprocess.run(deployment['buildCommand'],shell=True,cwd=app,capture_output=True,text=True)
    assert published.returncode==0,published.stderr
    assert (app/'dist/index.html').read_bytes()==(app/'comic-style-finder-v0.1.0.html').read_bytes()
    assert [p.relative_to(app/'dist').as_posix() for p in (app/'dist').rglob('*') if p.is_file()]==['index.html'],'Publish only the verified standalone'
    for filename in ['styles.css','app.js','index.html']:
        p=app/filename
        before=p.read_text()
        changed=before+'\n/* Release drift */' if filename!='index.html' else before.replace('<title>','<title>Updated ')
        p.write_text(changed)
        result=run('verify_release.py')
        assert result.returncode!=0,f'Release verification must reject stale {filename}'
        p.write_text(before)
print('App-local build, release verification, and CSS/JS/HTML drift detection passed.')
