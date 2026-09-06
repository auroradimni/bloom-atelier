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
        <h3>Spring Preview Evening</h3>
        <p>
          An intimate preview of new silhouettes, textures, and accessories
          from the Bloom Atelier studio.
        </p>
        <p><strong>Date:</strong> June 1, 2026</p>
        <p><NuxtLink to="/collection">View collection</NuxtLink></p>
      </div>
    </div>
  </section>
</template>

<script setup>
useHead({ title: 'News & Events - Bloom Atelier' })
</script>
