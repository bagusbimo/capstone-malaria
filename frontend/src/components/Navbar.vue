<template>
    <div id="nav">
        <b-navbar toggleable="lg" type="dark" variant="success">
            <b-navbar-brand v-if="this.$route.name === 'pasien'" href="#/pasien">malariaction</b-navbar-brand>
            <b-navbar-brand v-else href="#">malariaction</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item v-on:click="logout">LOGOUT</b-nav-item>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {
    name: 'Navbar',

    methods: {
        logout() {
            localStorage.clear();
            this.$router.push('/');
            this.$message({
                type: 'info',
                message: 'Anda telah logout dari sistem'
            });
        }
    }
}

</script>

<style lang="scss">

#nav {
  position: sticky;

  a {
    font-weight: bold;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>