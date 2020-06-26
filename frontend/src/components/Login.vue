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
                    <form class="mt-3" @submit.prevent="doLogin">
                        <div class="form-group">
                            <input type="text" 
                                id="username"
                                class="form-control form-control-sm" 
                                v-model="username"
                                placeholder="Username">
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
                                Login
                            </b-button>
                        </div>

                        <div class="text-center mt-2">
                            <a href="#">Lupa Password ?</a>
                        </div>
                        
                        <div class="mt-5">
                            <p class="text-center">
                                Tidak punya akun?
                                <a href="#/register">Klik untuk mendaftar</a>
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
      
    name:'Login',
    data() {
        return {
            
                username: '',
                password:'',
            
        }
    },
    methods: {
    doLogin() {
        axios.post('http://127.0.0.1:8000/api/login', {
        username: this.username,
        password: this.password
        })
      .then(response => {
        console.log(response.data);
        localStorage.setItem('token',response.data.token);
        localStorage.setItem('fullName',response.data.fullName);
        localStorage.setItem('userType',response.data.userType);
        if (response.data.userType == 'Pasien')
            this.$router.push('/pasien');
        else if (response.data.userType == 'Dokter')
            this.$router.push('/dokter');
        else if (response.data.userType == 'Tenaga Medis')
            this.$router.push('/medis')
        this.$message({
            type: 'success',
            message: 'Login berhasil'
            });
        })
      .catch(function (error) {
        console.error(error.response);
        });
      },
    }
}
</script>

<style lang="scss">

.loginUI {
    width: 340px;
    display: flex;
    margin: auto;
    margin-top: 50px;
}

.canvas-desktop {
    position: fixed;
    height: auto;
    width: 100%;
    background: linear-gradient(to bottom,  rgba(39, 174, 96, 1) 25%,rgba(236, 240, 241, 1) 25%,rgba(255, 255, 255, 1) 50%) fixed;
}

.textlight {
    color: white;
}

</style>
