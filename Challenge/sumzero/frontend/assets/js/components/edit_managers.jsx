import React from 'react';
import merge from 'lodash/merge';

class EditManagers extends React.Component {
  constructor(props) {
    super(props);

    const copyList = merge({}, this.props.managerList);
    this.state = copyList;

    // this.update = this.update.bind(this);
  }

  update(field, managerId) {
    return e => {
      const manager = merge({}, this.state[managerId]);
      manager[field] = e.currentTarget.value;
      this.setState({
        [managerId]: manager
      });
    };
  }

  render() {
    const editList = Object.keys(this.state).map( managerId => {
      let id = managerId;
      return (
        <section className="main-body" key={managerId}>
          <img src="./public/images/default_profile.png" />
          <section className="manager-info">
            <input 
              onChange={this.update("name", id)}
              value={this.state[managerId].name} />
            <textarea
              onChange={this.update("body", id)}
              value={this.state[managerId].body}>
            </textarea>
          </section>
        </section>
      );
    });

    return (
      <section className={`edit-wrapper`}>
        <section className="edit-main">
          <section className="edit-header">
            <h2>Executive Management</h2>
            <button
              onClick={this.props.hideEdit}>
              X
            </button>
          </section>
          {editList}
        </section>
        <button
          onClick={this.props.save(this.state)}>
          Save
        </button>
      </section>
    );
  }

}

export default EditManagers;