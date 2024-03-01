import { Controller } from "react-hook-form"

const Select = ({ control, label, name, options }) => {
  return (
    <Controller
        control={control}
        name={name}
        render={(
          { 
            field: { 
              onChange, onBlur, value, ref
            }, 
            fieldState: {
              error
            } 
          }) => (
          <div className="mb-4">
            {label && <label
              htmlFor={name}
              className={`block font-bold text-sm mb-2 ${
                error ? "text-red-400" : "text-gray-400"
              }`}
            >
              {!!error ? error.message : label}
            </label>}
            
            <select
              value={value}
              name={name}
              id={name}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
              className={`border-2 rounded w-full py-3 px-3 mb-2 outline-0 ${error ? "border-red-400" : "border-gray-400"}`}
            >
              <option value="" disabled defaultValue>
                Select one of the options
              </option>
              {
                options.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))
              }
            </select>
          </div>
        )}
      />
  )
}

export default Select