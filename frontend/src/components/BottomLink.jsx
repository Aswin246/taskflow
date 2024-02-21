import { Link } from "react-router-dom";

export const BottomLink = ({ label, linkLabel, to }) => {
  return (
    <>
      <div className="flex justify-end items-center pt-2 text-sm  text-white">
        {label}
        <Link className="px-4 hover:text-black" to={to}>
          {linkLabel}
        </Link>
      </div>
    </>
  );
};
