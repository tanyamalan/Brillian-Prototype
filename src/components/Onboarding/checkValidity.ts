/**
 * Scrapes the DOM inside `root` to determine whether the current onboarding step
 * can advance. Returns true when every `required` text/number/email/select/textarea
 * field has a non-empty value AND every radio group (by `name`) has a selection.
 *
 * Checkbox groups are treated as optional by design.
 */
export function checkValidity(root: HTMLElement | null): boolean {
  if (!root) return false;

  const requiredFields = root.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
    'input[required]:not([type="radio"]):not([type="checkbox"]), select[required], textarea[required]'
  );
  for (const field of requiredFields) {
    if (!field.value || field.value.trim() === '') return false;
  }

  const radios = root.querySelectorAll<HTMLInputElement>('input[type="radio"][name]');
  const radioGroups = new Map<string, boolean>();
  radios.forEach(r => {
    if (!radioGroups.has(r.name)) radioGroups.set(r.name, false);
    if (r.checked) radioGroups.set(r.name, true);
  });
  for (const hasSelection of radioGroups.values()) {
    if (!hasSelection) return false;
  }

  return true;
}
