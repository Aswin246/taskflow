export const Button = ({ onClick, label }) => {
  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white  rounded-md px-3 py-1 mt-3 mx-2"
        onClick={onClick}
      >
        {label}
      </button>
    </>
  );
};
