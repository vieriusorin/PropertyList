const Checkbox = ({ field, label, name, value }) => {
  return (
    <div className="flex items-center mb-4 gap-2">
      <input
        type="checkbox"
        id={name + value}
        name={name}
        value={value}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        checked={field.value.includes(value)}
        onChange={(e) => {
          const checked = e.target.checked;
          const updatedAmenities = checked
            ? [...field.value, value]
            : field.value.filter((item) => item !== value);
          field.onChange(updatedAmenities);
        }}
      />
      <label
      className="disabled-checked-checkbox ms-2 text-sm font-medium text-gray-400 dark:text-gray-500"
      htmlFor={name + value}
      >{label}</label>
    </div>
  );
};
export default Checkbox