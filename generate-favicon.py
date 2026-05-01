"""
Script para gerar favicon.ico redondo a partir de uma imagem.
Uso: python generate-favicon.py caminho/da/imagem.png

Requisitos: pip install Pillow
"""

import sys
from pathlib import Path

try:
    from PIL import Image, ImageDraw
except ImportError:
    print("❌ Pillow não instalado. Rode: pip install Pillow")
    sys.exit(1)


def make_circle(img: Image.Image) -> Image.Image:
    """Aplica máscara circular na imagem."""
    size = img.size
    mask = Image.new("L", size, 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, size[0], size[1]), fill=255)

    # Cria imagem com fundo transparente
    output = Image.new("RGBA", size, (0, 0, 0, 0))
    img_rgba = img.convert("RGBA")
    output.paste(img_rgba, mask=mask)
    return output


def generate_favicon(input_path: str, output_path: str = "src/favicon.ico"):
    """Converte imagem para favicon.ico redondo com múltiplos tamanhos."""
    img = Image.open(input_path)

    # Recorta para quadrado (pega o centro)
    width, height = img.size
    size = min(width, height)
    left = (width - size) // 2
    top = (height - size) // 2
    img = img.crop((left, top, left + size, top + size))

    # Aplica máscara circular
    img = make_circle(img)

    # Gera múltiplos tamanhos para o .ico
    sizes = [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
    icons = []
    for s in sizes:
        resized = img.resize(s, Image.LANCZOS)
        icons.append(resized)

    # Salva como .ico
    icons[0].save(
        output_path,
        format="ICO",
        sizes=[(i.width, i.height) for i in icons],
        append_images=icons[1:],
    )
    print(f"✅ Favicon redondo gerado: {output_path}")
    print(f"   Tamanhos: {', '.join(f'{s[0]}x{s[1]}' for s in sizes)}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python generate-favicon.py caminho/da/imagem.png")
        print("Exemplo: python generate-favicon.py src/assets/eu_formula1.png")
        sys.exit(1)

    input_file = sys.argv[1]
    if not Path(input_file).exists():
        print(f"❌ Arquivo não encontrado: {input_file}")
        sys.exit(1)

    generate_favicon(input_file)
