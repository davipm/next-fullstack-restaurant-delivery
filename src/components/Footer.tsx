import Link from "next/link";

const Footer = () => (
  <div className="h-12 md:h-24 p-4 lg:px-20 xl:px-40 text-red-500 flex items-center justify-between">
    <Link href="/">MASSIMO</Link>
    <p>© ALL RIGHTS RESERVED.</p>
  </div>
);

export default Footer;
