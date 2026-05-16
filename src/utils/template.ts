import Handlebars from 'handlebars';

export function render(template: string, context: Record<string, unknown>): string {
  return Handlebars.compile(template)(context);
}

export function renderFile(template: string, context: Record<string, unknown>): string {
  return render(template, context);
}
