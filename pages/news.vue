<template>
  <section id="events" class="section">
    <h2>Events & Announcements</h2>
    <div class="event-list">
      <div class="event">
        <h3>Fashion Show: Latest Collection</h3>
        <p>
          Join us at our upcoming fashion show where we will present
          the latest collection of dresses and accessories for the new season.
        </p>
        <p><strong>Date:</strong> May 15, 2026</p>
        <p><strong>Location:</strong> Palace of Culture, Tirana</p>
        <p><NuxtLink to="/collection">More info</NuxtLink></p>
      </div>
      <div class="event">
        <h3>Courses for Future Stylists</h3>
        <p>
          We offer online courses for aspiring stylists.
          Register to learn advanced techniques and creativity in fashion design.
        </p>
        <p><strong>Start date:</strong> June 1, 2026</p>
        <p><NuxtLink to="/courses">More info</NuxtLink></p>
      </div>
    </div>
  </section>
</template>

<script setup>
useHead({ title: 'News & Events - Bloom Atelier' })
</script>
