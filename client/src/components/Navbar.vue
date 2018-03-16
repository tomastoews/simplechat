<template>
<div class="mb-3">
    <nav class="navbar navbar-expand-lg navbar-dark bg-danger">
        <div class="container">
            <a class="navbar-brand mx-auto" href="#">{{ appName }}</a>
        </div>
    </nav>
</div>
</template>

<script>
export default {
  name: 'navbar',
  data() {
      return {
          appName: 'Simple Chat'
      }
  }
}
</script>
