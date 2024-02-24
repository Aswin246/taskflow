export const InputBox = ({ placeholder, label, onChange, type }) => {
  return (
    <>
      <div className="p-1 tracking-wide font-thin font-mono text-white w-full">
        {label}
      </div>
      <input
        className=" rounded-md p-2 tracking-tight font-mono text-black w-full"
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      ></input>
    </>
  );
};
