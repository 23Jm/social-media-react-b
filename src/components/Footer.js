import React from "react";

const Footer = () => {
  const today=new Date().getFullYear();
  return (
    <footer className="Footer">
      <p>Copyright &copy; {today}</p>
    </footer>
  );
};

export default Footer;
