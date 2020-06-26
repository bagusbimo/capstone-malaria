<template>
    <div id="landing">
        <div v-if="this.$route.name === 'landing'" id="nav" class="landingUI">
            <b-navbar toggleable="lg" variant="faded" type="light">
                <b-navbar-brand href="#">malariaction</b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-button class="navItem" variant="success" @click="dialogLoginFormVisible = true">Masuk</b-button>
                    <!-- <b-button class="navItem" variant="success" @click="dialogRegisterFormVisible = true">Daftar</b-button> -->
                </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>
        <div class="landingUI text-left">
            <b-card
                overlay
                img-src="../assets/card2.png"
                img-alt="Card Image"
                text-variant="white"
            >
                <div class="row h-100">
                    <div class="align-items-center d-flex justify-content-center cardContent">
                        <h2>Identifikasi malaria di genggaman anda</h2>
                    </div>
                </div>
            </b-card>
            <br>
            <el-card shadow="hover">
                <div style="display: flex; justify-content: space-between">
                    <b-img class="cardImageLeft" src="../assets/card3.png" alt="Dokter"></b-img>
                    <b-row class="cardContentRight">
                    <p class="textLarge">Malariaction memberi Anda identifikasi malaria yang cepat dan akurat</p>
                    <el-timeline>
                        <el-timeline-item color="#f1c40f">
                        Input data oleh Tenaga Medis
                        </el-timeline-item>
                        <el-timeline-item color="#3498db">
                        Proses hasil identifikasi oleh AI secara otomatis
                        </el-timeline-item>
                        <el-timeline-item color="#2ecc71">
                        Selesai ! Anda akan langsung dapat melihat hasilnya
                        </el-timeline-item>
                    </el-timeline>
                    </b-row>
                </div>
            </el-card>
            <br>    
            <b-row>
                <div class="align-items-center d-flex smartDiv">
                    <b-col>
                        <div class="layoutContentLeft">
                            <h3>Bergabung dengan kami untuk mendapatkan manfaatnya</h3>
                            <!-- <br>
                            <b-button disabled size="lg" squared variant="success" @click="dialogRegisterFormVisible = true">Daftar</b-button> -->
                        </div>
                    </b-col>
                    <b-col>
                        <div class="layoutContentRight">
                            <b-img class="registerImage" src="../assets/card4.png" alt="Registrasi"></b-img>
                        </div>
                    </b-col>
                </div>
            </b-row>
            <br>
            <b-card
                overlay
                img-src="../assets/card5_noBG.png"
                img-alt="Card Image"
                text-variant="white"
                bg-variant="success"
                class="border-0">
                <b-row align-v="center">
                    <b-col class="text-center">
                        <p class="textMedium">Portabilitas, Kecepatan, dan Akurasi</p>
                        <p class="textMedium2">Portabilitas tinggi</p>
                        <p class="textMedium2">Waktu identifikasi cepat</p>
                        <p class="textMedium2">Akurasi hasil tinggi ( 96% )</p>
                    </b-col>
                </b-row>
            </b-card>
            <br>
            <el-dialog :visible.sync="dialogLoginFormVisible" custom-class="dialogBox">
                <h5>Masuk untuk melanjutkan</h5>
                <form class="phoneUI mt-3" @submit.prevent="doLogin">
                    <div class="form-group">
                        <input type="text" 
                            id="patientNumber"
                            class="form-control form-control-sm" 
                            v-model="username"
                            placeholder="Nomor Pasien / username">
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
                    
                    <!-- <div class="mt-5">
                        <p class="text-center">
                            Tidak punya akun?
                            <el-button type="text" @click="openRegister">klik untuk mendaftar</el-button>
                        </p>
                    </div> -->
                </form>
            </el-dialog>
            <el-dialog :visible.sync="dialogRegisterFormVisible" custom-class="dialogBox">
                <h5>Silahkan registrasi terlebih dulu</h5>
                <br>
                <form class="mt-2" @submit.prevent="doRegister">
                    <div class="form-group">
                        <input type="text" 
                            id="patientNumber"
                            class="form-control form-control-sm" 
                            v-model="usernameReg"
                            placeholder="Nomor Pasien">
                        Gunakan Kode rumah sakit, misal : 01-xxxxxxx
                    </div>

                    <div class="form-group">
                        <input type="text" 
                            id="firstName"
                            class="form-control form-control-sm" 
                            v-model="firstNameReg"
                            placeholder="First Name">
                    </div>

                    <div class="form-group">
                        <input type="text" 
                            id="lastName"
                            class="form-control form-control-sm" 
                            v-model="lastNameReg"
                            placeholder="Last Name">
                    </div>

                    <div class="form-group">
                        <input type="password" 
                            id="password"
                            class="form-control form-control-sm"
                            v-model="passwordReg" 
                            placeholder="Password">
                    </div>

                    <div class="mt-5">
                        <b-button type="submit" variant="success" block>
                            Register
                        </b-button>
                    </div>
                    
                    <div class="mt-4">
                        <p class="text-center">
                            Sudah punya akun?
                            <el-button type="text" @click="openLogin">klik untuk login</el-button>
                        </p>
                    </div>
                </form>
            </el-dialog>
        </div>
        <div class="footerCustom">
            <v-card-text class="textlight">
                2019 — <strong>Malariaction Team</strong>
            </v-card-text>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Landing',

    data() {
        return {
            dialogLoginFormVisible: false,
            dialogRegisterFormVisible: false,
            errorMsg: false,
            errorMessage: '',
            username: '',
            password:'',
            usernameReg: '',
            firstNameReg: '',
            lastNameReg: '',
            passwordReg:'',
            userType: ''
        }
    },

    methods: {
        register() {
            window.location.href = '#/register';
        },
        openRegister() {
            this.dialogLoginFormVisible = false
            this.dialogRegisterFormVisible = true
        },
        openLogin() {
            this.dialogRegisterFormVisible = false
            this.dialogLoginFormVisible = true
        },
        doLogin() {
            var thiss = this
            axios.post('http://116.12.54.60:8000/api/login', {
                username: this.username,
                password: this.password
            })
            .then(response => {
                console.log(response.data);
                localStorage.setItem('token',response.data.token);
                localStorage.setItem('fullName',response.data.fullName);
                localStorage.setItem('userType',response.data.userType);
                localStorage.setItem('current_hospital',response.data.current_hospital);
                if (response.data.userType == 'Pasien')
                    this.$router.push('/pasien');
                else if (response.data.userType == 'Dokter')
                    this.$router.push('/dokter');
                else if (response.data.userType == 'Tenaga Medis')
                    this.$router.push('/medis')
                this.dialogLoginFormVisible = false
                this.$message({
                    type: 'success',
                    message: 'Login berhasil'
                    });
                })
            .catch(function (error) {
                console.error(error.response);
                thiss.$message({
                    type: 'error',
                    message: 'Mohon cek username atau password'
                    });
                });
        },
        doRegister() {
            var thiss = this
            axios.post('http://116.12.54.60:8000/api/register', {
                username: this.usernameReg,
                firstName: this.firstNameReg,
                lastName: this.lastNameReg,
                password: this.passwordReg,
                userType: 3
            })
            .then(response => {
                console.log(response.data);
                this.dialogRegisterFormVisible = false
                this.$message({
                    type: 'success',
                    message: 'Registrasi berhasil, silakan login'
                    });
                })
            .catch(function (error) {
                console.error(error.response.data.message);
                thiss.$message({
                    type: 'error',
                    message: error.response.data.message
                    });
                });
            },
        }
}
</script>

<style lang="scss">
    #landing {
        .textMedium {
            font-weight: 600;
            font-size: 150%;
        }

        .textMedium2 {
            font-weight: 600;
            font-size: 100%;
        }

        .textLarge {
            font-weight: 600;
            font-size: 200%;
        }

        @media screen and (max-width: 742px) {
            h2 {
                font-size: 20px;
            }
            
            h3 {
                font-size: 18px;
            }

            h5{
                font-size: 14px;
            }

            .textMedium {
                font-weight: 600;
                font-size: 100%;
            }

            .textMedium2 {
                display: none;
            }

            .textLarge {
                font-weight: 600;
                font-size: 100%;
            }
        }
    }

    .textgreen {
        color: #2ecc71;
    }

    .landingUI {
        left: 0;
        bottom: 0;
        width: 100%;
        max-width: 1200px;
        margin: auto;
    }

    .footerCustom {
        width: 100%;
        max-width: 1200px;
        text-align: center;
        margin: auto;
        background-color: #27ae60;
    }

    .navItem {
        padding-left: 20px;
        padding-right: 20px;
    }

    .cardContent {
        padding-left: 5%;
        padding-right: 50%;
    }

    .cardImageLeft {
        max-width: 30%;
        max-height: 30%;
        margin: auto;
        padding-left: 5%;
    }

    .cardContentRight {
        padding-top: 2%;
        padding-left: 10%;
        padding-right: 5%;
    }

    .smartDiv {
        padding-left: 10%;
    }

    .layoutContentLeft {
        padding-top: 15%;
        padding-bottom: 15%;
    }
    
    .layoutContentRight {
        margin: auto;
        padding-left: 20%;
    }

    .registerImage {
        max-width: 70%;
        max-height: 70%;
        margin: auto;
    }

    
    .dialogBox {
        width: 100%;
        max-width: 420px;
        margin: auto;
    }

    .errorText {
        color: #e74c3c;
    }

</style>