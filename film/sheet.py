# sheet.py outfile cols thumbW img1 img2 ... — labelled contact sheet
import sys
from PIL import Image, ImageDraw, ImageFont
out, cols, tw = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]); files = sys.argv[4:]
ims = [Image.open(f).convert('RGB') for f in files]
th = int(tw * ims[0].height / ims[0].width); rows = (len(ims) + cols - 1) // cols
S = Image.new('RGB', (cols * tw + (cols + 1) * 8, rows * (th + 30) + 8), (40, 40, 40)); d = ImageDraw.Draw(S)
try: font = ImageFont.truetype('node_modules/pretendard/dist/public/static/Pretendard-Bold.otf', 20)
except Exception: font = None
for i, (im, f) in enumerate(zip(ims, files)):
    x = 8 + (i % cols) * (tw + 8); y = 8 + (i // cols) * (th + 30)
    S.paste(im.resize((tw, th)), (x, y + 24)); d.text((x, y + 2), f.split('/')[-1], fill=(255, 255, 255), font=font)
S.save(out)
