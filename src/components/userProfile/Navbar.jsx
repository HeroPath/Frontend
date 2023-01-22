import React from "react";

const Navbar = ({ gold, diamond, role }) => {
  return (
    <div className="profileNavbar">
      <div className="profileNavbar--labels">
        <div>
          <img
            className="me-2"
            src={require(`../img/utilities/gold.png`)}
            alt=""
          />
          {gold && <label>{gold.toLocaleString()}</label>}
        </div>
        <div>
          <img
            className="me-2"
            src={require(`../img/utilities/diamond.png`)}
            alt=""
          />
          <label>{diamond}</label>
        </div>
        {role && <label>Role: {role.roleName}</label>}
      </div>
      <div className="navBarDivs">
        <label style={{ height: "32px" }}>SERVER STATUS</label>
        <img
          className="ms-2 mb-1"
          src={require(`../img/utilities/online.png`)}
          height="16px"
          width="16px"
          alt=""
        />
      </div>
      <div className="navBarDivs">
        <label>NEWS</label>
      </div>
    </div>
  );
};

export default Navbar;