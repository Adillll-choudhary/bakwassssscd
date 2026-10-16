import re

with open('C:/workspace/coldune-site/coldune-site/src/data/work.ts', 'r', encoding='utf-8') as f:
    content = f.read()

names = [
  "splendid-piroshki",
  "stupendous-otter",
  "storied-semifreddo",
  "lambent-queijadas",
  "heartfelt-maamoul",
  "auruslifee",
  "shimmering-horse",
  "hilarious-phoenix",
  "creative-capybara",
  "gentle-puffpuff"
]

for i, name in enumerate(names):
    id_val = 7010 + i
    pattern = r'(id:\s*' + str(id_val) + r',\s*file:\s*")websites/leetcore\.png(")'
    content = re.sub(pattern, r'\g<1>websites/' + name + r'.png\g<2>', content)

with open('C:/workspace/coldune-site/coldune-site/src/data/work.ts', 'w', encoding='utf-8') as f:
    f.write(content)
