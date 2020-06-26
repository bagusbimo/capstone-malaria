<template>
    <div>
        <div id="nav" class="landingUI">
            <b-navbar toggleable="lg" variant="faded" type="light">
                <b-navbar-brand href="#">malariaction</b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item v-on:click="inputData" class="navItem">Input Data</b-nav-item>
                    <b-button class="navItem" variant="success" @click="logout">Logout</b-button>
                </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>
        <div id="landingmedis" class="landingUI text-left">
            <b-card
                overlay
                img-src="../assets/card2.png"
                img-alt="Card Image"
                text-variant="white"
            >
                <div class="row h-100">
                    <div class="align-items-center d-flex justify-content-center cardContent">
                        <h2>Selamat datang, Tenaga Medis {{ currentUser }}</h2>
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
                            <h3>Anda telah terdaftar sebagai Tenaga Medis</h3>
                            <!-- <br>
                            <b-button disabled size="lg" squared @click="dialogRegisterFormVisible = true">Anda telah terdaftar sebagai Tenaga Medis</b-button> -->
                        </div>
                    </b-col>
                    <b-col>
                        <div class="layoutContentRight">
                            <b-img class="registerImage" src="../assets/card4-2.png" alt="Registrasi"></b-img>
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
                        <p class="textMedium">Terimakasih telah menggunakan Malariaction !</p>
                        <blockquote class="blockquote">
                            <p class="mb-0 textMedium2">Declare the past, diagnose the present, foretell the future.</p>
                            <footer class="blockquote-footer text-white textMedium2"><cite title="Source Title">Hippocrates</cite></footer>
                        </blockquote>
                    </b-col>
                </b-row>
            </b-card>
            <br>
        </div>
        <div class="footerCustom">
            <v-card-text class="textlight">
                2019 — <strong>Malariaction Team</strong>
            </v-card-text>
        </div>
    </div>
</template>

<script>
import Landing from './Landing.vue'

export default {
    name: 'LandingMedis',

    components: { 'landing' : Landing },

    data() {
        return {
            currentUser: ''
        }
    },


    mounted() {
        if (localStorage.userType != 'Tenaga Medis')
        this.$router.push('/');
        console.log(localStorage.fullName)
        this.currentUser = localStorage.fullName
    },

    methods: {
        logout() {
            localStorage.clear();
            this.$router.push('/');
        },
        inputData() {
            this.$router.push('/medisinput');
        }
    }
}
</script>

<style lang="scss">
    #landingmedis {
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
</style>