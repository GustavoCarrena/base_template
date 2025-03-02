  
  
  import * as yup from 'yup'
  
  export const loginFormSchema = yup.object({
    username: yup.string().required('El usuario es requerido'),
    password: yup.string()
      .required('La contraseña es requerida')
      .min(5, 'La contraseña debe tener al menos 5 caracteres'),
  });