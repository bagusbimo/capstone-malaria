<template>
<div class="canvas-desktop">
    <div class="loginUI">
        <b-row align-h="center">
            <b-col class="display-4 font-weight-bold textlight">
                malariaction
            </b-col>
            <p class="subtitle-1 textlight">
                Sistem Identifikasi Malaria Berbasis Website
            </p>
            <el-card>
                <form class="mt-2" @submit.prevent="doLogin">
                    <div class="form-group">
                        <input type="text" 
                            id="username"
                            class="form-control form-control-sm" 
                            v-model="username"
                            placeholder="Username">
                    </div>

                    <div class="form-group">
                        <input type="text" 
                            id="firstName"
                            class="form-control form-control-sm" 
                            v-model="firstName"
                            placeholder="First Name">
                    </div>

                    <div class="form-group">
                        <input type="text" 
                            id="lastName"
                            class="form-control form-control-sm" 
                            v-model="lastName"
                            placeholder="Last Name">
                    </div>

                    <div class="form-group">
                        <input type="password" 
                            id="password"
                            class="form-control form-control-sm"
                            v-model="password" 
                            placeholder="Password">
                    </div>

                    <div class="mt-5">
                        <b-button type="submit" variant="success" block>
                            Register
                        </b-button>
                    </div>
                    
                    <div class="mt-5">
                        <p class="text-center">
                            Sudah punya akun?
                            <a href="#/login">Klik untuk login</a>
                        </p>
                    </div>
                </form>
            </el-card>
        </b-row>
    </div>
</div>
</template>

<script>
import axios from 'axios'

  export default {
      
    name:'Register',
    data() {
        return {
            
                username: '',
                firstName: '',
                lastName: '',
                password:'',
                userType: ''
            
        }
    },
    methods: {
    doLogin() {
        axios.post('http://116.12.54.60:8000/api/register', {
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password,
        userType: 3
        })
      .then(response => {
        console.log(response.data);
        })
      .catch(function (error) {
        console.error(error.response);
        });
      },
    }
}
</script>

<style>

</style>
