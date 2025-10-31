// ---------- useForm Hook ----------
import { useState, useCallback } from "react";

function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  // ✅ Handle input change & validation
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: evt.target.validationMessage }));
    setIsValid(evt.target.closest("form").checkValidity());
  };

  // ✅ Reset the form (optional)
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    []
  );

  return { values, handleChange, errors, isValid, resetForm };
}

export default useForm;
