import React from 'react';

const Manager = (props) => {
  return (
    <section className="main-body">
      <img src="./public/images/default_profile.png" />
      <section className="manager-info">
        <h3>{props.manager.name}</h3>
        <p>{props.manager.body}</p>
      </section>
    </section>
  );
};

export default Manager;