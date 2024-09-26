<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { computed, ref } from 'vue'
import Button from './ui/Button.vue'

// periodic sync is disabled, change the value to enable it, the period is in milliseconds
// You can remove onRegisteredSW callback and registerPeriodicSync function
const period = 0

const swActivated = ref(false)

/**
 * This function will register a periodic sync check every hour, you can modify the interval as needed.
 */
function registerPeriodicSync(swUrl: string, r: ServiceWorkerRegistration) {
  if (period <= 0) return

  setInterval(async () => {
    if ('onLine' in navigator && !navigator.onLine) return

    const resp = await fetch(swUrl, {
      cache: 'no-store',
      headers: {
        cache: 'no-store',
        'cache-control': 'no-cache'
      }
    })

    if (resp?.status === 200) await r.update()
  }, period)
}

const { needRefresh, updateServiceWorker } = useRegisterSW({
  immediate: true,
  onRegisteredSW(swUrl, r) {
    if (period <= 0) return
    if (r?.active?.state === 'activated') {
      swActivated.value = true
      registerPeriodicSync(swUrl, r)
    } else if (r?.installing) {
      r.installing.addEventListener('statechange', (e) => {
        const sw = e.target as ServiceWorker
        swActivated.value = sw.state === 'activated'
        if (swActivated.value) registerPeriodicSync(swUrl, r)
      })
    }
  }
})

const title = computed(() => {
  if (needRefresh.value) return 'Une mise à jour est disponible ! Souhaitez-vous la télécharger ?'
  else return ''
})

function close() {
  needRefresh.value = false
}
</script>

<template>
  <div
    v-if="needRefresh"
    class="fixed bg-white shadow-md bottom-1/2 p-4 m-6 z-50"
    aria-labelledby="toast-message"
    role="alert"
  >
    <div>
      <span id="toast-message">
        {{ title }}
      </span>
    </div>
    <div class="flex w-full justify-between mt-4 gap-8">
      <Button type="ghost" @click="close" class="underline">Non</Button>
      <Button type="primary" @click="updateServiceWorker()">Oui !</Button>
    </div>
  </div>
</template>
