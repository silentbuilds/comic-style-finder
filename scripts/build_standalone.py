from pathlib import Path
import base64, json


def build_html(root):
    html=(root/'index.html').read_text(encoding='utf-8')
    css=(root/'styles.css').read_text(encoding='utf-8')
    js=(root/'app.js').read_text(encoding='utf-8')
    assets={}
    for id in range(1,97):
        p=root/'art'/f'{id:03d}.webp'
        if not p.exists(): raise FileNotFoundError(p)
        assets[str(id)]='data:image/webp;base64,'+base64.b64encode(p.read_bytes()).decode('ascii')
    html=html.replace('<link rel="stylesheet" href="styles.css">','<style>\n'+css+'\n</style>')
    html=html.replace('<script src="app.js" defer></script>','')
    html=html.replace('</body>','<script>window.COMIC_ART_ASSETS='+json.dumps(assets,separators=(',',':'))+';</script>\n<script>\n'+js+'\n</script>\n</body>')
    return '\n'.join(line.rstrip() for line in html.splitlines())+'\n'

if __name__=='__main__':
    root=Path(__file__).resolve().parent.parent
    html=build_html(root)
    output=root/'build/comic-style-finder-v0.1.0.html'
    output.parent.mkdir(exist_ok=True)
    output.write_text(html,encoding='utf-8')
    print(output,output.stat().st_size,'bytes; 96 inlined images')
