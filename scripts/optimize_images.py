"""One-off script to shrink oversized site images to WebP at their real display size.
Run once locally; not part of any build pipeline."""
from PIL import Image
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def convert(src_rel, max_w, quality, dst_ext="webp"):
    src = os.path.join(ROOT, src_rel)
    im = Image.open(src)
    if im.mode not in ("RGB", "RGBA"):
        im = im.convert("RGBA" if "A" in im.getbands() else "RGB")
    w, h = im.size
    if w > max_w:
        new_h = round(h * max_w / w)
        im = im.resize((max_w, new_h), Image.LANCZOS)
    dst = os.path.splitext(src)[0] + "." + dst_ext
    im.save(dst, quality=quality, method=6)
    old_size = os.path.getsize(src)
    new_size = os.path.getsize(dst)
    print(f"{src_rel}: {old_size//1024}KB -> {os.path.basename(dst)} {new_size//1024}KB ({im.size[0]}x{im.size[1]})")
    return dst

TEAM_PHOTOS = [
    "assets/img/luisEduardo.jpg", "assets/img/eduardaBehenck.jpg", "assets/img/deboraRocha.jpg",
    "assets/img/lisandraPinheiro.jpg", "assets/img/aliceLuz.jpg", "assets/img/pedroBarbosa.jpg",
    "assets/img/thaisLopes.jpg", "assets/img/ananssaSilva.jpg", "assets/img/lucasLavaquial.jpg",
    "assets/img/nicoleLobao.jpg", "assets/img/gabryellaGomes.jpg", "assets/img/annaSantana.jpg",
    "assets/img/isadoraRibeiro.jpg", "assets/img/fernandaBarros-Aragao.jpg", "assets/img/guilhermeBraga.jpg",
    "assets/img/umayaKrishnathas.jpg", "assets/img/angelaWu.jpg", "assets/img/reeseClinton.jpg",
    "assets/img/rosalynDeng.jpg", "assets/img/thaynaRody.jpg", "assets/img/matheusFabiano.jpg",
    "assets/img/isabelleCuba.jpg", "assets/img/rafaelaLuiza.jpg", "assets/img/luizaAndrade.jpg",
    "assets/img/biancaSantos.jpg", "assets/img/rileyGeisler.jpg", "assets/img/annaRibeiro.jpg",
    "assets/img/sylviaShi.jpg", "assets/img/joaoRicardo.jpg", "assets/img/leticiaGomes.jpg",
]
FUNDER_LOGOS = [
    "assets/img/CIHRIRSCLogo.png", "assets/img/innovationCALogo.png", "assets/img/idorLogo.png",
    "assets/img/CNPqLogo.png", "assets/img/faperjLogo.png", "assets/img/inntLogo.png",
    "assets/img/alzheimerSocietyLogo.png", "assets/img/QueensLogo.png",
]

for p in TEAM_PHOTOS:
    convert(p, max_w=640, quality=78)

convert("assets/img/thyagoCalvo.png", max_w=640, quality=80)
convert("assets/img/fernandaDeFelice.jpg", max_w=640, quality=80)

for p in FUNDER_LOGOS:
    convert(p, max_w=480, quality=85)

convert("assets/logoSemTexto.png", max_w=152, quality=90)
convert("assets/logosDeFeliceLab/textureBackground.png", max_w=1080, quality=80)

print("done")
