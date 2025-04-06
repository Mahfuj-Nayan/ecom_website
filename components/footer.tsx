import { APP_NAME } from "@/lib/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t">
      <div className="p-5 flex-center">
        {currentYear} {APP_NAME} by MI Nayan. All Right Reserved
      </div>
    </footer>
  );
};

export default Footer;
