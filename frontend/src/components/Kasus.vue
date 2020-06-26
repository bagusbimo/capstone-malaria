<template>
    <div>
        <div id="nav" class="landingUI">
            <b-navbar toggleable="lg" variant="success" type="dark">
                <b-navbar-brand href="#/dokter">
                    <!-- <el-button size="small" icon="el-icon-arrow-left" circle type="success"></el-button> -->
                    <b-button class="badge badge-success" variant="success" @click="$router.go(-1)"><i class="el-icon-arrow-left"></i></b-button>
                </b-navbar-brand>
                <b-navbar-brand href="#/dokter">malariaction</b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item v-on:click="logout" class="navItem">Logout</b-nav-item>
                </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>
        <div id="view" class="landingUI">
            <el-alert
                v-if="patientData.status == 'unconfirmed'"
                title="Hasil Belum dikonfirmasi"
                type="warning"
                show-icon>
            </el-alert>
            <br>
            <h1 class="font-weight-bold">Hasil Diagnosis</h1> 
            <br>
            <b-card border-variant="light" bg-variant="info" text-variant="white" class="phoneUI text-left">
                Identifikasi dilakukan dengan menggunakan AI
            </b-card>
            <br>
            <el-card shadow="hover" class="phoneUI">
                <div style="display: flex; justify-content: space-between">
                    <b-media class="text-left">
                        <template v-slot:aside>
                            <el-avatar src="https://rsazra.co.id/rsazra/wp-content/uploads/2018/03/doctor.png"></el-avatar>
                        </template>
                        <h5 class="mt-0">{{ author }}</h5>
                        <p class="mb-0 text-muted">Dokter di {{ hospital }}</p>
                    </b-media>
                    <el-button icon="el-icon-check" type="success" v-if="patientData.status == 'confirmed'"></el-button>
                    <el-button icon="el-icon-warning-outline" type="warning" v-else></el-button>
                </div>
            </el-card>
            <br>
            <el-card shadow="hover" class="phoneUI">
                <b-row align-v="center">
                    <b-col class="text-right">
                        <strong>
                            <p>Nama :</p>
                            <p>Tanggal Input :</p>
                            <p>Tempat Input :</p>
                            <p>Tenaga Medis :</p>
                            <p>Hasil :</p>
                            <p>Status :</p>
                        </strong>
                    </b-col>
                    <b-col class="text-left">
                        <p>{{ patientData.patient_name }}</p>
                        <p>{{ patientData.input_time.substring(0,10) }}</p>
                        <p>{{ patientData.input_place }}</p>
                        <p>{{ patientData.medical_personnel_name }}</p>
                        <p v-if="patientData.result == 0">negatif <b-button class="badge badge-pill" variant="info" @click="changeResult">ganti</b-button> </p>
                        <p v-else>positif <b-button class="badge badge-pill" variant="info" @click="changeResult">ganti</b-button> </p>
                        <p>{{ patientData.status }}</p>
                    </b-col>
                </b-row>
            </el-card>
            <br>
            <el-collapse class="phoneUI" accordion>
                <el-collapse-item name="1">
                    <template slot="title">
                    Gambar Apusan Darah
                    </template>
                    <div>
                        <b-img :src="patientData.image" fluid alt="Gambar Apusan Darah"></b-img>
                    </div>
                    <div>{{ patientData.image.substring(74 , patientData.image.length - 53) }}</div>
                </el-collapse-item>
            </el-collapse>
            <br>
            <div v-if="patientData.status == 'unconfirmed'">
                <b-button variant="outline-success" @click="onConfirm">Konfirmasi</b-button>
                <br>
                <br>
                <b-button variant="success" @click="$router.go(-1)">Kembali</b-button>
            </div>
            <div v-else>
                <b-button variant="success" @click="$router.go(-1)">Kembali</b-button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Navbar from './Navbar.vue'

export default {
    name: 'Kasus',
    props: ['id'],

    components: { 'navbar' : Navbar },

    data() {
        return {
            patientData: [],
            author: ''
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
        this.author = localStorage.fullName
        this.hospital = localStorage.current_hospital
    },
    methods: {
        changeResult() {
            if (this.patientData.result == 0) {
                this.patientData.result = 1
            }
            else
                this.patientData.result = 0
            
            axios.defaults.headers.common = {'Authorization': 'Token ' + localStorage.getItem('token')}
            axios.post('http://116.12.54.60:8000/api/change-result', {
                patientDataId: this.id,
                result: this.patientData.result
            })
            .then(response => {
                console.log(response.data.status)
                console.log(response.status)
                if(response.status == 200){
                    this.$message({
                        type: 'success',
                        message: 'Hasil telah diganti'
                    }); 
                    location.reload()
                }
                else
                    this.$message({
                        type: 'danger',
                        message: 'Hasil gagal diganti'
                    });
            })
        },
        logout() {
            localStorage.clear();
            this.$router.push('/');
        },
        onConfirm() {
            this.$confirm('Apakah Hasil Sudah Benar?', 'Warning', {
                confirmButtonText: 'YA',
                cancelButtonText: 'Tidak',
                type: 'warning'
                }).then(() => {
                    axios.defaults.headers.common = {'Authorization': 'Token ' + localStorage.getItem('token')}
                    axios.post('http://116.12.54.60:8000/api/confirm-case', {
                        patientDataId: this.id,
                        status: 'confirmed'
                    })
                    .then(response => {
                        console.log(response.data.status)
                        console.log(response.status)
                        if(response.status == 200){
                            this.$message({
                                type: 'success',
                                message: 'Proses konfirmasi berhasil'
                            });
                            location.reload()
                        }                             
                        else
                            this.$message({
                                type: 'danger',
                                message: 'Proses konfirmasi gagal'
                        }); 
                    })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Proses konfirmasi dibatalkan'
                });          
            });
            // this.$bvModal.msgBoxConfirm('Apakah hasil sudah benar ?', {
            //     title: 'Konfirmasi Hasil Prediksi',
            //     size: 'sm',
            //     buttonSize: 'sm',
            //     okVariant: 'success',
            //     cancelVariant: 'danger',
            //     okTitle: 'YA',
            //     cancelTitle: 'TIDAK',
            //     footerClass: 'p-2',
            //     hideHeaderClose: false,
            //     centered: true
            // })
            // .then(value => {
            //     console.log(value)
            //     if (value == true) {
            //         axios.defaults.headers.common = {'Authorization': 'Token ' + localStorage.getItem('token')}
            //         axios.post('http://116.12.54.60:8000/api/confirm-case', {
            //             patientDataId: this.id,
            //             status: 'confirmed'
            //         })
            //         .then(response => {
            //             console.log(response.data.status)
            //             console.log(response.status)
            //             if(response.status == 200)
            //                 location.reload()
            //             else
            //                 this.$bvModal.msgBoxOk('Tidak Sukses')
            //         })
            //     }
            //     else {}
            // })
        }
    }
}
</script>

<style lang="scss">

#view {
    padding: 30px;
}

.weightleft {
    margin-left: 0.1px;
}

</style>