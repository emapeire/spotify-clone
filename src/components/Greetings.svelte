<script lang="ts">
  const currentTime = new Date()
  const currentHour = currentTime.getHours()

  let greetings = 'Greetings'

  if (currentHour < 12) {
    greetings = 'Good morning'
  } else if (currentHour < 18) {
    greetings = 'Good afternoon'
  } else {
    greetings = 'Good evening'
  }
</script>

<h1 class="text-4xl font-bold">{greetings}</h1>