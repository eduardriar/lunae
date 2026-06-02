export type TemplateVars = {
  NAME?: string;
  RITUAL?: string;
  DATE?: string;
  DAY?: string;
  TIME?: string;
  DURATION?: string | number;
  PRICE?: string | number;
  PHONE?: string;
  EMAIL?: string;
  SERVICE?: string;
};

const PLACEHOLDER_RE = /\[([A-Z_0-9]+)\]/g;

export const fillTemplate = (
  template: string,
  vars: TemplateVars = {}
): string =>
  template.replace(PLACEHOLDER_RE, (match, key: string) => {
    const value = vars[key as keyof TemplateVars];
    return value === undefined || value === null ? match : String(value);
  });

export const fillTemplates = (
  templates: readonly string[],
  vars: TemplateVars = {}
): string[] => templates.map((t) => fillTemplate(t, vars));
