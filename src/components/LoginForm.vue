<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
    <h2 class="text-xl font-semibold mb-4">Login</h2>

    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input v-model="email" type="email" id="email" name="email" autocomplete="email" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
      </div>

      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input v-model="password" type="password" id="password" name="password" autocomplete="current-password" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
      </div>

      <div class="mb-6">
        <button type="submit" class="w-full px-4 py-2 bg-indigo-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
      </div>

      <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>

      <div class="mt-4 text-center">
      <p> <button  @click="goToForgotPassword" class="text-indigo-600 hover:text-indigo-900">Forgot Password?</button> </p>
    </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const router = useRouter();


    const submitForm = async () => {
      try {
        const response = await axios.post('http://localhost:5000/login', {
          email: email.value,
          password: password.value
        });

        if (response.status === 200) {
          const data = response.data;
          // Assuming you receive a token or some identifier on successful login
          localStorage.setItem('authToken', data.token);
          // Redirect to dashboard on successful login
          router.push('/dashboard');
        } else {
          errorMessage.value = response.data.message; // Display error message
        }
      } catch (error) {
        console.error('Error:', error);
        errorMessage.value = 'Failed to submit form. Please try again.'; // Generic error message
      }
      
    };
    const goToForgotPassword = () => {
      router.push('/forgot-password');
    };
    

    return {
      email,
      password,
      errorMessage,
      submitForm,
      goToForgotPassword
    };
  }
};
</script>