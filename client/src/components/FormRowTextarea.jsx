/* eslint-disable react/prop-types */
const FormRowTextarea = ({
  name,
  labelText,
  defaultValue,
  onChange,
  required = true,
  placeholder = '',
}) => {
  return (
    <div className="form-row">
      <label htmlFor="name" className="form-label">
        {labelText || name}
        {required ? <span className="text-primary">*</span> : ''}
      </label>
      <textarea
        id={name}
        name={name}
        className="form-textarea"
        defaultValue={defaultValue || ''}
        placeholder={placeholder}
        required
        onChange={onChange}
      />
    </div>
  );
};
export default FormRowTextarea;
