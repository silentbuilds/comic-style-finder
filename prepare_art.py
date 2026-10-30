#!/usr/bin/env python3
"""Derive compact offline previews and the contact sheet from accepted raster masters.

This does not generate artwork. Each master and its exact image-generation prompt
are recorded in art_manifest.json. Aspect ratios are fitted without cropping.
"""
from pathlib import Path
import hashlib
from datetime import datetime, timezone
import json
import xml.etree.ElementTree as ET
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT=Path(__file__).resolve().parent
RDF='http://www.w3.org/1999/02/22-rdf-syntax-ns#'
DC='http://purl.org/dc/elements/1.1/'


def prompt_xmp(prompt):
    ET.register_namespace('x','adobe:ns:meta/')
    ET.register_namespace('rdf',RDF)
    ET.register_namespace('dc',DC)
    meta=ET.Element('{adobe:ns:meta/}xmpmeta')
    rdf=ET.SubElement(meta,f'{{{RDF}}}RDF')
    desc=ET.SubElement(rdf,f'{{{RDF}}}Description')
    ET.SubElement(desc,f'{{{DC}}}description').text=prompt
    ET.SubElement(desc,f'{{{DC}}}source').text='OpenAI built-in image generation; original illustrative interpretation'
    return ET.tostring(meta,encoding='utf-8')


def save_prompt_sidecar(path, prompt):
    sidecar=Path(str(path)+'.json')
    previous=json.loads(sidecar.read_text()) if sidecar.exists() else {}
    if previous.get('prompt')!=prompt:
        sidecar.write_text(json.dumps({'prompt':prompt,'createdAt':datetime.now(timezone.utc).isoformat()},ensure_ascii=False,indent=2)+'\n')


def fit_preview(image, size, pixel=False):
    sample=Image.Resampling.NEAREST if pixel else Image.Resampling.LANCZOS
    fitted=ImageOps.contain(image.convert('RGB'),size,method=sample)
    # Letterbox unusually wide strips; never stretch figures or crop story beats.
    canvas=Image.new('RGB',size,'#fffdf8')
    canvas.paste(fitted,((size[0]-fitted.width)//2,(size[1]-fitted.height)//2))
    return canvas


def main():
    manifest=json.loads((ROOT/'art_manifest.json').read_text())
    rows=manifest['images']
    assert [r['id'] for r in rows]==list(range(1,97))
    for row in rows:
        source=ROOT/row['master']
        with Image.open(source) as image:
            preview=fit_preview(image,(480,326),pixel=row['id']==9)
            destination=ROOT/row['file']
            preview.save(destination,'WEBP',quality=86,method=6,xmp=prompt_xmp(row['prompt']))
        save_prompt_sidecar(destination,row['prompt'])
        save_prompt_sidecar(source,row['prompt'])
        row['sha256']=hashlib.sha256(destination.read_bytes()).hexdigest()
        row['masterSha256']=hashlib.sha256(source.read_bytes()).hexdigest()
    (ROOT/'art_manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
    fonts=[Path('/System/Library/Fonts/Supplemental/Arial.ttf'),Path('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf')]
    path=next((p for p in fonts if p.exists()),None)
    font=ImageFont.truetype(str(path),15) if path else ImageFont.load_default()
    title=ImageFont.truetype(str(path),24) if path else font
    width,cell_h=240,202
    sheet=Image.new('RGB',(8*width,12*cell_h+90),'#f5f3ed')
    draw=ImageDraw.Draw(sheet)
    for row in rows:
        idx=row['id']-1;x=(idx%8)*width+7;y=(idx//8)*cell_h+7
        with Image.open(ROOT/row['file']) as image:
            sheet.paste(image.resize((226,153),Image.Resampling.LANCZOS),(x,y))
        label=f"#{row['id']:02d} {row['name']}"
        while draw.textbbox((0,0),label,font=font)[2]>226:label=label[:-2]+'…'
        draw.text((x,y+160),label,font=font,fill='#203831')
    y=12*cell_h
    draw.text((20,y+12),'96 COMIC REFERENCES · ORIGINAL CHARACTERS',font=title,fill='#203831')
    draw.text((20,y+49),'AI-generated illustrative interpretations · technique, genre and format cues · not historical exemplars',font=font,fill='#5f6d64')
    sheet.save(ROOT/'contact-96.jpg',quality=91,subsampling=0)
    print('Prepared 96 aspect-preserving WebP previews, embedded prompts, hashes and contact sheet.')


if __name__=='__main__':main()
