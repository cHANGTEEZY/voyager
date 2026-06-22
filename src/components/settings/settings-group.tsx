import { ListGroup, Separator } from "heroui-native";
import { Children, Fragment, type ReactNode } from "react";

type SettingsGroupProps = {
  children: ReactNode;
  className?: string;
};

export function SettingsGroup({ children, className }: SettingsGroupProps) {
  const items = Children.toArray(children).filter(Boolean);

  return (
    <ListGroup className={`overflow-hidden rounded-2xl ${className ?? ""}`}>
      {items.map((child, index) => (
        <Fragment key={index}>
          {index > 0 ? <Separator /> : null}
          {child}
        </Fragment>
      ))}
    </ListGroup>
  );
}
