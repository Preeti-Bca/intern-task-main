<!-- ResetPassword.vue -->
<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
    <h2 class="text-xl font-semibold mb-4">Reset Password</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="newPassword" class="block text-sm font-medium text-gray-700">New Password</label>
        <input v-model="newPassword" type="password" id="newPassword" name="newPassword" autocomplete="new-password" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
      </div>
      <div class="mb-6">
        <button type="submit" class="w-full px-4 py-2 bg-indigo-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Update Password</button>
      </div>
      <p v-if="successMessage" class="text-green-500">{{ successMessage }}</p>
      <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      email: this.$route.query.email || '',
      newPassword: '',
      successMessage: '',
      errorMessage: ''
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await fetch('http://localhost:5000/reset-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: this.email, newPassword: this.newPassword })
        });

        if (response.ok) {
          const data = await response.json();
          this.successMessage = data.message; // Display success message
          this.errorMessage = ''; // Clear any previous error message
          setTimeout(() => {
          this.$router.push('/login');
        }, 4000);
        } else {
          const errorData = await response.json();
          this.errorMessage = errorData.message; // Display error message
          this.successMessage = ''; // Clear any previous success message
        }
      } catch (error) {
        console.error('Error:', error);
        this.errorMessage = 'Failed to submit form. Please try again.'; // Generic error message
        this.successMessage = ''; // Clear any previous success message
      }
    }
  }
};
</script>
