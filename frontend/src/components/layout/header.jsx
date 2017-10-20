import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class HeaderMenu extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, node) {
    
    if (this.props.location.pathname !== node['data-path']) {
      this.props.history.push(node['data-path']);
    }
  }

  render() {
    return (
      <Menu>
        <Menu.Item
          data-path='/'
          active={this.props.location.pathname === '/'}
          onClick={this.handleItemClick}
        >
          <Icon name='home' size='large' />
        </Menu.Item>

        <Menu.Item
          data-path='/campaigns'
          active={this.props.location.pathname === '/campaigns'}
          onClick={this.handleItemClick}
        >
          Campaigns
        </Menu.Item>

        <Menu.Item
          data-path='/voters'
          active={this.props.location.pathname === '/voters'}
          onClick={this.handleItemClick}
        >
          Voters
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(HeaderMenu);