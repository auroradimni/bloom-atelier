<template>
  <div class="trust-panel">
    <blockquote class="trust-quote">
      <p>
        “Returned within days — the Bloom Atelier team made it effortless.”
        <span class="trust-quote__attribution">Verified customer</span>
      </p>
    </blockquote>

    <div class="trust-services">
      <div class="trust-service">
        <span class="trust-service__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M3 8.5 12 4l9 4.5v7L12 20l-9-4.5v-7Z"
              stroke="currentColor"
              stroke-width="1.2"
              stroke-linejoin="round"
            />
            <path
              d="M12 12.5 21 8M12 12.5v7.5M12 12.5 3 8"
              stroke="currentColor"
              stroke-width="1.2"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <div class="trust-service__copy">
          <p class="trust-service__title">
            Express delivery in Tirana from 300 Lek · Nationwide from 500 Lek
          </p>
        </div>
      </div>

      <div class="trust-service">
        <span class="trust-service__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <rect
              x="4"
              y="5"
              width="16"
              height="15"
              rx="1.5"
              stroke="currentColor"
              stroke-width="1.2"
            />
            <path d="M8 3v4M16 3v4M4 10h16" stroke="currentColor" stroke-width="1.2" />
            <path
              d="m9.5 14.5 1.75 1.75L15 12.5"
              stroke="currentColor"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <div class="trust-service__copy">
          <p class="trust-service__title">Eligible for return within 14 days</p>
          <p class="trust-service__note">
            Exclusions apply.
            <NuxtLink to="/contact" class="trust-service__link">See returns policy</NuxtLink>
          </p>
        </div>
      </div>
    </div>

    <div class="trust-payments">
      <ul class="trust-payments__list" aria-label="Accepted payment methods">
        <li class="trust-payments__badge trust-payments__badge--card">Visa</li>
        <li class="trust-payments__badge trust-payments__badge--card">Mastercard</li>
        <li class="trust-payments__badge trust-payments__badge--cash">Cash on delivery</li>
      </ul>
      <p class="trust-payments__note">Secure checkout. Terms apply to promotional offers.</p>
    </div>
  </div>
</template>

<style scoped>
.trust-panel {
  display: grid;
  gap: 0.65rem;
  margin-top: 1.5rem;
}

.trust-quote {
  margin: 0;
  padding: 0.9rem 1rem;
  background: var(--accent-soft);
  border-left: 2px solid var(--accent);
}

.trust-quote p {
  margin: 0;
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-style: italic;
  font-weight: 400;
  line-height: 1.55;
  color: var(--ink-soft);
}

.trust-quote__attribution {
  display: block;
  margin-top: 0.35rem;
  font-family: var(--font-body);
  font-size: 0.62rem;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--stone);
}

.trust-services {
  border: 1px solid var(--line);
  background: var(--surface);
}

.trust-service {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr);
  gap: 0.85rem;
  align-items: start;
  padding: 0.95rem 1rem;
}

.trust-service + .trust-service {
  border-top: 1px solid var(--line);
}

.trust-service__icon {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  color: var(--accent);
}

.trust-service__icon svg {
  width: 22px;
  height: 22px;
}

.trust-service__title {
  margin: 0;
  font-size: 0.78rem;
  line-height: 1.5;
  color: var(--ink);
}

.trust-service__note {
  margin: 0.25rem 0 0;
  font-size: 0.72rem;
  line-height: 1.45;
  color: var(--stone);
}

.trust-service__link {
  color: var(--ink-soft);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.trust-service__link:hover {
  color: var(--ink);
}

.trust-payments {
  padding: 0.95rem 1rem;
  border: 1px solid var(--line);
  background: var(--surface);
}

.trust-payments__list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.trust-payments__badge {
  padding: 0.35rem 0.65rem;
  border: 1px solid var(--line);
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-soft);
}

.trust-payments__badge--card {
  background: var(--bg);
}

.trust-payments__badge--cash {
  background: var(--accent-soft);
  border-color: rgba(176, 122, 102, 0.22);
  color: var(--ink);
}

.trust-payments__note {
  margin: 0.65rem 0 0;
  font-size: 0.68rem;
  line-height: 1.45;
  color: var(--stone);
}

@media (max-width: 900px) {
  .trust-panel {
    margin-top: 1.25rem;
  }
}
</style>
