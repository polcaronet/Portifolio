"""
Script para gerar favicon.ico a partir de uma imagem.
Uso: python generate-favicon.py caminho/da/imagem.png

Requisitos: pip install Pillow
"""

import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("❌ Pillow não instalado. Rode: pip install Pillow")
    sys.exit(1)


def generate_favicon(input_path: str, output_path: str = "src/favicon.ico"):
    """Converte imagem para favicon.ico com múltiplos tamanhos."""
    img = Image.open(input_path)

    # Recorta para quadrado (pega o centro)
    width, height = img.size
    size = min(width, height)
    left = (width - size) // 2
    top = (height - size) // 2
    img = img.crop((left, top, left + size, top + size))

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
    print(f"✅ Favicon gerado: {output_path}")
    print(f"   Tamanhos: {', '.join(f'{s[0]}x{s[1]}' for s in sizes)}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python generate-favicon.py caminho/da/imagem.png")
        print("Exemplo: python generate-favicon.py foto-f1.png")
        sys.exit(1)

    input_file = sys.argv[1]
    if not Path(input_file).exists():
        print(f"❌ Arquivo não encontrado: {input_file}")
        sys.exit(1)

    generate_favicon(input_file)
