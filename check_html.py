import os
import re

for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # Check for target="_blank" without rel="noopener"
            blanks = re.findall(r'<a[^>]+target=["\']_blank["\'][^>]*>', content, re.IGNORECASE)
            for b in blanks:
                if 'rel=' not in b.lower():
                    print(f"Missing rel in {filepath}: {b}")
                    
            # Check for img without alt
            imgs = re.findall(r'<img[^>]+>', content, re.IGNORECASE)
            for i in imgs:
                if 'alt=' not in i.lower():
                    print(f"Missing alt in {filepath}: {i}")
