import { useRouter } from "../hooks/useRouter";

export function Route({ path, element }) {
  const { currentPath } = useRouter();
  if (currentPath !== path) return null;

  return element;
}
