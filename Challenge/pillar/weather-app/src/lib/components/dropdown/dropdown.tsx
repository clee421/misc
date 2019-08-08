import React, { ReactElement } from 'react';
import { Dropdown } from 'react-bootstrap';

// Style
import './dropdown.scss';

// TODO: Redesign how wrapping the 3rd party components should be done
type DropdownProps = {
  id: string;
  variant: DropdownVariantTypes;
  label: string;
  items: DropdownItem[]
};

type DropdownItem = {
  name: string;
  onClick: () => void;
}

type DropdownVariantTypes = "link"
                          | "primary"
                          | "secondary"
                          | "success"
                          | "danger"
                          | "warning"
                          | "info"
                          | "dark"
                          | "light"
                          | "outline-primary"
                          | "outline-secondary"
                          | "outline-success"
                          | "outline-danger"
                          | "outline-warning"
                          | "outline-info"
                          | "outline-dark"
                          | "outline-light";

const WADropdown: React.FC<DropdownProps> = (props: DropdownProps): ReactElement => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant={props.variant} id={props.id}>
        {props.label}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {props.items.map((item: DropdownItem, index: number) => (
          <Dropdown.Item key={index} onClick={item.onClick}>{item.name}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default WADropdown;


