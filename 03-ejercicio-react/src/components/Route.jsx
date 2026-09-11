export function Route({ path, currentPath, element }) {
  if (currentPath !== path) return null;

  return element;
}
