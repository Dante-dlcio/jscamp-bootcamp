import { Link as RouterLink } from "react-router";

export function Link({ href, children, ...restOfProps }) {
  return (
    <RouterLink to={href} {...restOfProps}>
      {children}
    </RouterLink>
  );
}
