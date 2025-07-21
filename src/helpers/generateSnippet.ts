import { componentSnippets, ComponentName } from '../lib/componentMapping';

interface ParsedSnippet {
  novaImports: Set<string>;
  iconImports: Set<string>;
  jsx: string[];
}

/**
 * Parses a component snippet into separate import and JSX parts
 */
function parseSnippet(snippet: string): ParsedSnippet {
  const lines = snippet.split('\n').filter(line => line.trim());
  
  const novaImports = new Set<string>();
  const iconImports = new Set<string>();
  const jsx: string[] = [];
  
  for (const line of lines) {
    if (line.startsWith('import') && line.includes('@visa/nova-react')) {
      const match = line.match(/\{([^}]+)\}/);
      if (match) {
        const imports = match[1].split(',').map(s => s.trim());
        imports.forEach(imp => novaImports.add(imp));
      }
    } else if (line.startsWith('import') && line.includes('@visa/nova-icons-react')) {
      const match = line.match(/\{([^}]+)\}/);
      if (match) {
        const imports = match[1].split(',').map(s => s.trim());
        imports.forEach(imp => iconImports.add(imp));
      }
    } else if (!line.startsWith('import') && line.trim()) {
      jsx.push(line);
    }
  }
  
  return { novaImports, iconImports, jsx };
}

/**
 * Detects icon usage in JSX and adds necessary imports
 */
function detectIconImports(jsx: string[]): Set<string> {
  const iconImports = new Set<string>();
  const jsxContent = jsx.join('\n');
  
  const iconPatterns = [
    'VisaPasswordShowTiny', 'VisaPasswordHideTiny', 'VisaSearchTiny',
    'VisaErrorTiny', 'VisaDeleteTiny', 'VisaAddTiny', 'VisaConnectTiny',
    'VisaNotificationsTiny', 'VisaGlossaryLow', 'VisaChevronRightTiny',
    'VisaClearAltTiny', 'VisaFileUploadTiny', 'VisaSaveTiny',
    'VisaHistoryTiny', 'VisaAccountLow'
  ];
  
  iconPatterns.forEach(icon => {
    if (jsxContent.includes(icon)) {
      iconImports.add(icon);
    }
  });
  
  return iconImports;
}

/**
 * Generates a complete, clean code snippet from component names
 */
export function generateSnippet(components: ComponentName[]): string {
  if (components.length === 0) return '';
  
  // Remove duplicates
  const uniqueComponents = Array.from(new Set(components));
  
  const allNovaImports = new Set<string>();
  const allIconImports = new Set<string>();
  const allJsx: string[] = [];
  
  // Process each component
  uniqueComponents.forEach((name) => {
    const snippet = componentSnippets[name];
    if (!snippet) return;
    
    const parsed = parseSnippet(snippet);
    
    // Collect imports
    parsed.novaImports.forEach(imp => allNovaImports.add(imp));
    parsed.iconImports.forEach(imp => allIconImports.add(imp));
    
    // Add JSX with spacing
    if (allJsx.length > 0) {
      allJsx.push('');
    }
    allJsx.push(...parsed.jsx);
  });
  
  // Auto-detect additional icon imports from JSX
  const detectedIcons = detectIconImports(allJsx);
  detectedIcons.forEach(icon => allIconImports.add(icon));
  
  // Build final imports
  const imports: string[] = [];
  
  // Nova React imports
  if (allNovaImports.size > 0) {
    const sortedNovaImports = Array.from(allNovaImports).sort();
    imports.push(`import { ${sortedNovaImports.join(', ')} } from '@visa/nova-react';`);
  }
  
  // Icon imports
  if (allIconImports.size > 0) {
    const sortedIconImports = Array.from(allIconImports).sort();
    imports.push(`import { ${sortedIconImports.join(', ')} } from '@visa/nova-icons-react';`);
  }
  
  // Combine everything
  const result = [
    ...imports,
    '',
    ...allJsx
  ].filter(line => line !== undefined).join('\n');
  
  return result;
}
