import { useState } from "react"
import { useFormik } from "formik"

const useCustomFormValidation = (initialValues, validationSchema, onSubmit) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (values) => {
    setIsSubmitting(true)
    try {
      await validationSchema.validate(values, { abortEarly: false })
      await onSubmit(values, {
        setSubmitting: setIsSubmitting,
        resetForm: formik.resetForm,
      })
    } catch (errors) {
      console.error(errors)
    }
    setIsSubmitting(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    formik.setValues((prevValues) => ({ ...prevValues, [name]: value }))
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  })

  return {
    handleSubmit: formik.handleSubmit,
    handleChange: handleChange,
    isSubmitting,
    errors: formik.errors,
  }
}

export default useCustomFormValidation
