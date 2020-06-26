<template>
    <div>
        <div id="nav" class="landingUI">
            <b-navbar toggleable="lg" variant="success" type="dark">
                <b-navbar-brand href="#/dokter">
                    <!-- <el-button size="small" icon="el-icon-arrow-left" circle type="success"></el-button> -->
                    <b-button class="badge badge-success" variant="success" @click="$router.go(-1)"><i class="el-icon-arrow-left"></i></b-button>
                </b-navbar-brand>
                <b-navbar-brand href="#/pasien">malariaction</b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item v-on:click="logout" class="navItem">Logout</b-nav-item>
                </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>
        <div id="view">
            <br>
            <h1 class="font-weight-bold">Hasil Diagnosis</h1> 
            <br>
            <b-card v-if="patientData.status == 'confirmed'" border-variant="light" bg-variant="success" text-variant="white" class="phoneUI text-left">
                Hasil identifikasi telah dikonfirmasi oleh dr. {{ patientData.doctor_name }}
            </b-card>
            <b-card v-else border-variant="light" bg-variant="warning" text-variant="white" class="phoneUI text-left">
                Hasil identifikasi belum dikonfirmasi oleh dokter
            </b-card>
            <br>
            <el-card shadow="hover" class="phoneUI">
                <b-media class="text-left">
                    <template v-slot:aside>
                        <el-avatar src="https://i.ya-webdesign.com/images/doctor-icon-png-3.png"></el-avatar>
                    </template>
                    <h5 class="mt-0">{{ patientData.medical_personnel_name }}</h5>
                    <p class="mb-0 text-muted">Tenaga Medis ( Input Data )</p>
                </b-media>
            </el-card>
            <br>
            <el-card shadow="hover" class="phoneUI">
                <b-row align-v="center">
                    <b-col class="text-right">
                        <strong>
                            <p>Nama :</p>
                            <p>Tanggal Input :</p>
                            <p>Tempat Input :</p>
                            <p>Hasil :</p>
                        </strong>
                    </b-col>
                    <b-col class="text-left">
                        <p>{{ patientData.patient_name }}</p>
                        <p>{{ patientData.input_time.substring(0,10) }}</p>
                        <p>{{ patientData.input_place }}</p>
                        <p v-if="patientData.result == 0">negatif</p>
                        <p v-else>positif</p>
                    </b-col>
                </b-row>
            </el-card>
            <br>
            <div>
                <b-button variant="success" @click="$router.go(-1)">Kembali</b-button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Navbar from './Navbar.vue'

export default {
    name: 'Report',
    props: ['id'],

    components: { 'navbar' : Navbar },

    data() {
        return {
            patientData: []
        }
    },

    mounted() {
        console.log(this.id)
        axios.defaults.headers.common = {'Authorization': 'Token ' + localStorage.getItem('token')}
        axios.get('http://116.12.54.60:8000/api/patient-data/' + this.id)
        .then(response => {
            console.log(response.data)
            this.patientData = response.data.data
            console.log(this.patientData)
        })
    },
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push('/');
        },
    }
}
</script>

<style lang="scss">

#view {
    padding: 30px;
}

</style>