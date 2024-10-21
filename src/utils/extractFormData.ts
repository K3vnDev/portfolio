export const extractFormData = (formData: FormData, ...values: string[]) => {
  const data: string[] = []

  for (const value of values) {
    data.push(formData.get(value)?.toString().trim() ?? '')
  }
  return data
}
