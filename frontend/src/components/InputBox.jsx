export const InputBox = ({ placeholder, label, onChange }) => {
  return (
    <>
      <div className="p-1 tracking-wide font-thin font-mono text-white">
        {label}
      </div>
      <input
        className=" rounded-md p-2 tracking-tight font-mono text-black "
        type="text"
        placeholder={placeholder}
        onChange={onChange}
      ></input>
    </>
  );
};
