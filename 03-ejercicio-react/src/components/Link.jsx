export function Link({ to, children, style }) {
  const handleClick = (event) => {
    event.preventDefault();
    window.history.pushState(null, "", to);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };
  return (
    <a href={to} onClick={handleClick} style={style}>
      {children}
    </a>
  );
}
