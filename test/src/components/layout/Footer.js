import React from "react";

const Footer = () => {
  const footerYear = new Date().getFullYear();
  return (
    <footer className="footer p-10 bg-gray-700 text-primary-content footer-center">
      <div>
        <p>CopyRight &copy; {footerYear}</p>
      </div>
    </footer>
  );
};

export default Footer;
