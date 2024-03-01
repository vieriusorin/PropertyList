import { Controller } from "react-hook-form"

const Textarea = ({ control, label, name, placeholder = '' }) => {
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
            <label
              htmlFor={name}
              className={`block font-bold text-sm mb-2 ${
                error ? "text-red-400" : "text-gray-400"
              }`}
            >
              {!!error ? error.message : label}
            </label>
            <textarea
              value={value}
              name={name}
              id={name}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
              placeholder={placeholder}
              className={`border-2 rounded w-full py-3 px-3 mb-2 outline-0 ${error ? "border-red-400" : "border-gray-400"}`}
            />
          </div>
        )}
      />
    
  )
}

export default Textarea