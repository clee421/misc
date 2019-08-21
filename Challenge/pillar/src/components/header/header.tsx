import React, { ReactElement } from 'react';

// Style
import './header.scss';

const Header: React.FC<any> = (): ReactElement => {
  return (
    <div className="header-container">
      Weather app
    </div>
  );
};

export default Header;
