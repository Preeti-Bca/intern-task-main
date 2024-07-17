<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
    <h2 class="text-xl font-semibold mb-4">Sign Up</h2>

    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
        <input v-model="username" type="text" id="username" name="username" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
      </div>

      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input v-model="email" type="email" id="email" name="email" autocomplete="email" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
      </div>

      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input v-model="password" type="password" id="password" name="password" autocomplete="new-password" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
      </div>

      <div class="mb-6">
        <button type="submit" class="w-full px-4 py-2 bg-indigo-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign Up</button>
      </div>

      <p v-if="successMessage" class="text-green-500">{{ successMessage }}</p>
      <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
    </form>

    <div class="mt-4 text-center">
      <p>Already registered? <button @click="goToLogin" class="text-indigo-600 hover:text-indigo-900">Login</button></p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const successMessage = ref('');
    const errorMessage = ref('');
    const router = useRouter();

    const submitForm = async () => {
      try {
        const response = await fetch('http://localhost:5000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username.value,
            email: email.value,
            password: password.value
          })
        });

        if (response.ok) {
          const data = await response.json();
          successMessage.value = data.message; 
          errorMessage.value = '';
          clearForm(); 

          // Redirect to login page after 4 seconds
          setTimeout(() => {
            router.push('/login');
          }, 4000);
        } else {
          const errorData = await response.json();
          errorMessage.value = errorData.message; 
          successMessage.value = ''; 
        }
      } catch (error) {
        console.error('Error:', error);
        errorMessage.value = 'Failed to submit form. Please try again.'; 
        successMessage.value = ''; 
      }
    };

    const clearForm = () => {
      username.value = '';
      email.value = '';
      password.value = '';
    };

    const goToLogin = () => {
      router.push('/login');
    };

    return {
      username,
      email,
      password,
      successMessage,
      errorMessage,
      submitForm,
      clearForm,
      goToLogin
    };
  }
};
</script>

