<template>
  <div class="flex flex-col justify-center items-center responsive-screen-container">
    <div class="font-bold text-center title-style">Login</div>
    <Form v-slot="$form" class="flex flex-col items-center justify-center p-4 gap-8 form-style"
      :validateOnValueUpdate="false" :resolver :initialValues @submit="handleLogin">
      <Toast />
      <InputText class="w-full" name="username" label="Usuario" :errorMsg="$form.username?.error?.message" />
      <InputPassword class="w-full" name="password" label="Contraseña" :errorMsg="$form.password?.error?.message" />
      <Button class="mb-4 button-style" type="Submit" :loading="isPending" label="Ingresar" :disabled="isPending" />
    </Form>

  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import router from "@/router"
  import { useLogin } from '@/composables/auth.js'
  import { setAuthToLocalStorage, deleteAuthFromLocalStorage } from "@/helpers/auth"
  import { loginFormSchema } from '@/helpers/validations'
  import { showError } from '@/helpers/toast.js'
  import Toast from 'primevue/toast';
  import { Form } from '@primevue/forms'
  import { useToast } from 'primevue/usetoast';
  import { yupResolver } from '@primevue/forms/resolvers/yup';
  import { InputText, InputPassword, Button } from '../components/form/index'

  const toast = useToast();

  const initialValues = ref({
    username: '',
    password: '',
  })

  const { isPending, mutateAsync: login, onSuccess } = useLogin()

  const handleLogin = async ({ states: { username, password }, valid }) => {
    if (valid) {
      try {
        const response = await login({ username: username.value, password: password.value })
        await setAuthToLocalStorage(response)
        router.replace({ name: 'home' })
      } catch (error) {
        showError({ message: 'Usuario o Contraseña incorrectos', summary: 'Error' }, toast)
        deleteAuthFromLocalStorage()
      }
    }

  }

  const resolver = yupResolver(loginFormSchema);

  onMounted(() => {
    deleteAuthFromLocalStorage()
  })

</script>

<style lang="scss" scoped>

  .responsive-screen-container {
    @media(max-width: 320px) {
      width: 300px;
      margin-top: 20%;

      .title-style {
        font-size: 1.6rem;
      }

      .form-style {
        .button-style {
          width: 100px;
        }
      }


    }

    @media (min-width: 321px) and (max-width: 529px) {
      width: auto;
      min-width: 320px;
      max-width: 510px;
      margin-top: 20%;

      .title-style {
        font-size: 2rem;
      }

      .form-style {
        width: 80%;

        .button-style {
          width: 120px;
        }
      }
    }

    @media (min-width: 530px) and (max-width: 599px) {
      width: auto;
      min-width: 500px;
      max-width: 580px;
      margin-top: 15%;

      .title-style {
        font-size: 2rem;
      }

      .form-style {
        width: 70%;

        .button-style {
          width: 130px;
        }
      }
    }

    @media (min-width: 600px) and (max-width: 799px) {
      width: auto;
      min-width: 590px;
      max-width: 880px;
      margin-top: 12%;

      .title-style {
        font-size: 2.3rem;
      }

      .form-style {
        width: 60%;

        .button-style {
          width: 130px;
        }
      }
    }

    @media (min-width: 800px) and (max-width: 899px) {
      width: auto;
      min-width: 780px;
      max-width: 880px;
      margin-top: 12%;

      .title-style {
        font-size: 2.3rem;
      }

      .form-style {
        width: 50%;

        .button-style {
          width: 130px;
        }
      }
    }

    @media (min-width: 900px) and (max-width: 999px) {
      width: auto;
      min-width: 900px;
      max-width: 970px;
      margin-top: 10%;

      .title-style {
        font-size: 2.3rem;
      }

      .form-style {
        width: 40%;

        .button-style {
          width: 130px;
        }
      }
    }

    @media (min-width: 1000px) and (max-width: 1199px) {
      width: auto;
      min-width: 1000px;
      max-width: 1180px;
      margin-top: 10%;

      .title-style {
        font-size: 2.3rem;
      }

      .form-style {
        width: 35%;

        .button-style {
          width: 130px;
        }
      }
    }

    @media (min-width: 1200px) {
      width: auto;
      margin-top: 5%;

      .title-style {
        font-size: 2.5rem;
      }

      .form-style {
        width: 25%;

        .button-style {
          width: 130px;
        }
      }
    }

  }






</style>
