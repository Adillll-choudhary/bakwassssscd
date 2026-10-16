import * as fs from 'fs';
import * as path from 'path';

interface Issue {
  file: string;
  line: number;
  column: number;
  snippet: string;
}

function scanFile(filePath: string): Issue[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split(/\r?\n/);
  const issues: Issue[] = [];
  lines.forEach((line, idx) => {
    const regex = /\b\d+px\b/g;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(line)) !== null) {
      issues.push({
        file: filePath,
        line: idx + 1,
        column: match.index + 1,
        snippet: line.trim()
      });
    }
  });
  return issues;
}

function walk(dir: string, result: string[] = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, result);
    } else if (entry.isFile() && fullPath.endsWith('.css')) {
      result.push(fullPath);
    }
  }
  return result;
}

function main() {
  const srcDir = path.resolve(__dirname, '..', 'src');
  const cssFiles = walk(srcDir);
  const allIssues: Issue[] = [];
  cssFiles.forEach(f => {
    allIssues.push(...scanFile(f));
  });
  const outPath = path.resolve(__dirname, 'audit-report.json');
  fs.writeFileSync(outPath, JSON.stringify(allIssues, null, 2), 'utf-8');
  console.log(`Audit completed. ${allIssues.length} issues written to ${outPath}`);
}

main();
