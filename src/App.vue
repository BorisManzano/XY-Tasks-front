<template>
  <nav>
    <router-link
      to="/login"
      class="block ml-4 mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white"
      >Login</router-link
    >
    <router-link
      to="/"
      class="block ml-4 mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white"
      >HomeView</router-link
    >
    <router-link
      to="/welcome"
      class="block ml-4 mt-4 lg:inline-block lg:mt-0 hover:text-white"
      >Welcome</router-link
    >
  </nav>
  <router-view />
</template>
