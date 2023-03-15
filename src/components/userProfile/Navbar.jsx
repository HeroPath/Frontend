import React from "react";

const Navbar = ({ gold, diamond, role }) => {
  return (
    <div className="profileNavbar">
      <div className="profileNavbar--labels">
        <div>
          <img className="me-2" src={require(`../img/utilities/gold.webp`)} alt="" />
          {gold && <label>{gold.toLocaleString()}</label>}
        </div>
        <div>
          <img className="me-2" src={require(`../img/utilities/diamond.webp`)} alt="" />
          {diamond && <label>{diamond.toLocaleString()}</label>}
        </div>
        {role && <label>Role: {role}</label>}
      </div>
      <div className="navBarDivs">
        <label>Coming Soon</label>
      </div>
      <div className="navBarDivs">
        <label>News</label>
      </div>
    </div>
  );
};

export default Navbar;
