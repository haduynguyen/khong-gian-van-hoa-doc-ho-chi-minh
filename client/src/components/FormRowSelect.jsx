/* eslint-disable react/prop-types */
const FormRowSelect = ({
  name,
  labelText,
  list,
  isEnumList,
  titleList,
  defaultValue = '',
  onChange,
  required = true,
  placeholder = '',
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
        {required ? <span className="text-primary">*</span> : ''}
      </label>
      <select
        id={name}
        name={name}
        className="form-select"
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
      >
        {list.map((itemValue) => {
          return isEnumList ? (
            <option key={itemValue} value={itemValue}>
              {titleList[itemValue]}
            </option>
          ) : (
            <option key={itemValue._id} value={itemValue._id}>
              {itemValue.status === 'draft'
                ? itemValue.name + ' (Draft)'
                : itemValue.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FormRowSelect;
