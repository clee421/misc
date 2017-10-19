import React from 'react';
import { Menu } from 'semantic-ui-react';

export default class HeaderMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state;

    return (
      <Menu>
        <Menu.Item
          name='campaigns'
          active={activeItem === 'campaigns'}
          onClick={this.handleItemClick}
        >
          Campaigns
        </Menu.Item>

        <Menu.Item
          name='voters'
          active={activeItem === 'voters'}
          onClick={this.handleItemClick}
        >
          Voters
        </Menu.Item>
      </Menu>
    );
  }
}
