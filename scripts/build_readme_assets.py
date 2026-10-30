#!/usr/bin/env python3
"""Compose README media from accepted previews and real Playwright screenshots.

Requires Pillow only for documentation authoring. Never modifies application art.
"""
from pathlib import Path
import json
import os
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/'docs/readme'
SAMPLES=[1,2,7,9,21,18]
PAPER='#f7f2e9'
INK='#253c34'
MUTED='#536258'


def font(size,serif=False):
    override=os.environ.get('README_SERIF_FONT' if serif else 'README_SANS_FONT')
    candidates=[override] if override else []
    candidates+=([
        '/System/Library/Fonts/Supplemental/Georgia.ttf',
        '/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf',
    ] if serif else [
        '/System/Library/Fonts/Supplemental/Arial.ttf',
        '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
    ])
    path=next((p for p in candidates if p and Path(p).is_file()),None)
    if not path:raise FileNotFoundError('Set README_SERIF_FONT and README_SANS_FONT to local TTF files.')
    return ImageFont.truetype(path,size)


def preview(canvas,style_id,xy,size):
    with Image.open(ROOT/f'art/{style_id:03d}.webp') as source:
        image=ImageOps.contain(source.convert('RGB'),size,method=Image.Resampling.NEAREST if style_id==9 else Image.Resampling.LANCZOS)
    canvas.paste(image,(xy[0]+(size[0]-image.width)//2,xy[1]+(size[1]-image.height)//2))


def main():
    OUT.mkdir(parents=True,exist_ok=True)
    names=json.loads((ROOT/'fixtures/canonical-style-names.json').read_text())
    hero=Image.new('RGB',(1600,870),PAPER)
    draw=ImageDraw.Draw(hero)
    for i,style_id in enumerate(SAMPLES):
        x=36+(i%3)*516;y=36+(i//3)*399
        preview(hero,style_id,(x,y),(496,337))
        draw.text((x,y+351),names[style_id-1],font=font(24),fill=INK)
    hero.save(OUT/'hero.jpg',quality=91,optimize=True,subsampling=0)

    social=Image.new('RGB',(1280,640),PAPER)
    draw=ImageDraw.Draw(social)
    # All text bounding boxes must stay inside x=120..1160, y=60..580.
    text_boxes=[]
    def text(xy,value,typeface,color):
        box=draw.textbbox(xy,value,font=typeface)
        assert 120<=box[0] and box[2]<=1160 and 60<=box[1] and box[3]<=580,(value,box)
        text_boxes.append({'text':value,'bounds':box})
        draw.text(xy,value,font=typeface,fill=color)
    text((120,103),'Comic Style Finder',font(76,True),INK)
    text((120,211),'Find your comic style in 3 questions',font(37),INK)
    for i,style_id in enumerate(SAMPLES):
        x=120+i*176
        preview(social,style_id,(x,326),(160,109))
        label={2:'Manga',21:'Woodcut/Linocut'}.get(style_id,names[style_id-1])
        text((x+2,453),label,font(17),MUTED)
    social.save(OUT/'social-preview.png',optimize=True)

    paths=sorted((ROOT/'build/readme-frames').glob('*.png'))
    if len(paths)!=5:raise FileNotFoundError('Capture the five frames with scripts/capture_readme.js first.')
    frames=[]
    for path in paths:
        with Image.open(path) as image:
            assert image.size==(1280,800),(path,image.size)
            frames.append(image.convert('RGB').quantize(colors=256,method=Image.Quantize.MEDIANCUT,dither=Image.Dither.NONE))
    gif=OUT/'flow.gif'
    frames[0].save(gif,save_all=True,append_images=frames[1:],duration=[2300,2300,2600,3200,5000],loop=0,optimize=True,disposal=2)
    if gif.stat().st_size>3_000_000:
        gif.unlink()
        for i in range(3):
            with Image.open(paths[i]) as image:image.save(OUT/f'step-{i+1}.png',optimize=True)
        # Fourth frame shows both final states without inventing UI.
        fourth=Image.new('RGB',(1280,800),PAPER)
        for i in range(2):
            with Image.open(paths[i+3]) as image:fourth.paste(image.resize((640,400),Image.Resampling.LANCZOS),(i*640,200))
        fourth.save(OUT/'step-4.png',optimize=True)
    report={'sampleIds':SAMPLES,'socialText':text_boxes,'frames':[p.name for p in paths]}
    (ROOT/'build/readme-media-check.json').write_text(json.dumps(report,indent=2)+'\n')
    for path in sorted(OUT.iterdir()):print(path.relative_to(ROOT),path.stat().st_size,'bytes')


if __name__=='__main__':main()
