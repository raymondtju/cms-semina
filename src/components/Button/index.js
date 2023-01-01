import React from "react";
import { Button } from "react-bootstrap";

function SButton({
  className,
  action,
  variant,
  disabled,
  size,
  children,
  loading,
}) {
  return (
    <Button
      className={className}
      onClick={action}
      variant={variant}
      disabled={disabled}
      size={size}
    >
      {loading ? "loading ..." : children}
    </Button>
  );
}

export default SButton;
