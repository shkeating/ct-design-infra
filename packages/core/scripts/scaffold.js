import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);

if (args.length < 2) {
  console.error('\x1b[31m%s\x1b[0m', 'Error: Please provide a category and a component name.');
  console.log('Usage: pnpm scaffold <category> <component-name>');
  console.log('Example: pnpm scaffold UI button');
  process.exit(1);
}

const category = args[0].toLowerCase();
const rawName = args[1].toLowerCase();

// Utility for kebab-case (button-group) and PascalCase (ButtonGroup)
const kebabName = rawName.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
const pascalName = kebabName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');

const paths = {
  componentDir: path.resolve(__dirname, `../src/components/${category}/${kebabName}`),
  aiExamplesDir: path.resolve(__dirname, `../../../ai-examples`)
};

// Ensure directories exist
fs.mkdirSync(paths.componentDir, { recursive: true });
fs.mkdirSync(paths.aiExamplesDir, { recursive: true });

// --- File Templates ---

const templates = {
  // 1. Lit Component (.ts)
  lit: `import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A Generative UI-ready ${pascalName} component.
 */
@customElement('ct-${kebabName}')
export class Ct${pascalName} extends LitElement {
  static styles = css\`
    :host {
      display: block;
      /* Define component-specific tokens mapped to global tokens here */
    }
  \`;

  /**
   * Primary content or label.
   */
  @property({ type: String }) label = '';

  render() {
    return html\`
      <div class="${kebabName}">
        \${this.label}
        <slot></slot>
      </div>
    \`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-${kebabName}': Ct${pascalName};
  }
}
`,

  // 2. Zod Schema (.schema.ts)
  schema: `import { z } from 'zod';

export const ${pascalName}Schema = z.object({
  label: z.string().optional().describe('The primary text content or label for the component.'),
  // Add more strict properties here
});

export type ${pascalName}Props = z.infer<typeof ${pascalName}Schema>;
`,

  // 3. Unit / A11y Tests (.test.ts)
  unit: `import { html, fixture, expect } from '@open-wc/testing';
import './${kebabName}';

describe('ct-${kebabName}', () => {
  it('renders correctly', async () => {
    const el = await fixture(html\`<ct-${kebabName} label="Test Label"></ct-${kebabName}>\`);
    expect(el).to.exist;
    expect(el.shadowRoot).to.exist;
    expect(el.shadowRoot!.textContent).to.include('Test Label');
  });

  it('passes accessibility audits', async () => {
    const el = await fixture(html\`<ct-${kebabName} label="Accessible Label"></ct-${kebabName}>\`);
    await expect(el).to.be.accessible();
  });
});
`,

  // 4. E2E / Playwright Tests (.e2e.ts)
  e2e: `import { test, expect } from '@playwright/test';

test.describe('ct-${kebabName} Visual Regression', () => {
  test('matches visual snapshot', async ({ page }) => {
    // Navigate to the Fractal preview page for this component
    await page.goto('/components/preview/${kebabName}');
    
    // Wait for the custom element to be defined and rendered
    await page.waitForFunction(() => customElements.get('ct-${kebabName}') !== undefined);
    
    // Take a full page screenshot
    await expect(page).toHaveScreenshot('${kebabName}-default.png');
  });
});
`,

  // 5. Fractal Config (.config.json)
  fractalConfig: `{
  "title": "${pascalName}",
  "status": "wip",
  "context": {
    "label": "Example ${pascalName}"
  }
}
`,

  // 6. Fractal Handlebars (.hbs)
  fractalHbs: `<ct-${kebabName} label="{{label}}">
  <!-- Additional slot content can go here -->
</ct-${kebabName}>
`,

  // 7. AI Few-Shot Example (.html)
  aiExample: `<!-- 
  Generative UI Few-Shot Example: ${pascalName}
  Use this structure when composing a ${pascalName} component.
-->
<ct-${kebabName} label="Generated Label Example">
</ct-${kebabName}>
`
};

// --- Write Files ---

const write = (filePath, content) => {
  if (fs.existsSync(filePath)) {
    console.warn(`\x1b[33m%s\x1b[0m`, `Warning: ${path.relative(process.cwd(), filePath)} already exists. Skipping.`);
  } else {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`\x1b[32m%s\x1b[0m`, `Created ${path.relative(process.cwd(), filePath)}`);
  }
};

write(path.join(paths.componentDir, `${kebabName}.ts`), templates.lit);
write(path.join(paths.componentDir, `${kebabName}.schema.ts`), templates.schema);
write(path.join(paths.componentDir, `${kebabName}.test.ts`), templates.unit);
write(path.join(paths.componentDir, `${kebabName}.e2e.ts`), templates.e2e);
write(path.join(paths.componentDir, `${kebabName}.config.json`), templates.fractalConfig);
write(path.join(paths.componentDir, `${kebabName}.hbs`), templates.fractalHbs);
write(path.join(paths.aiExamplesDir, `${kebabName}.html`), templates.aiExample);

execFileSync('node', [path.resolve(__dirname, 'build-index.mjs')], { stdio: 'inherit' });

console.log('\\n\x1b[32m%s\x1b[0m', '✅ Component scaffolding complete!');
