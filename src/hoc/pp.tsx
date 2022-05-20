export default function pp(WrappedComponent, otherProps) {
  return (props) => {
    return <WrappedComponent {...props} {...otherProps} />;
  };
}
