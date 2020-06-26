<template>
    <div>
        <div id="nav" class="landingUI">
            <b-navbar toggleable="lg" variant="success" type="dark">
                <b-navbar-brand href="#/dokter">
                    <!-- <el-button size="small" icon="el-icon-arrow-left" circle type="success"></el-button> -->
                    <b-button class="badge badge-success" variant="success" @click="$router.go(-1)"><i class="el-icon-arrow-left"></i></b-button>
                </b-navbar-brand>
                <b-navbar-brand href="#/medis">malariaction</b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item v-on:click="logout" class="navItem">Logout</b-nav-item>
                </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>
        <div id="view" class="phoneUI">  
            <h1 class="font-weight-bold">Input Data</h1>
            <br>
            <el-card shadow="hover">
                <b-media class="text-left">
                    <template v-slot:aside>
                        <el-avatar src="https://i.ya-webdesign.com/images/doctor-icon-png-3.png"></el-avatar>
                    </template>
                    <h5 class="mt-0">{{ author }}</h5>
                    <p class="mb-0 text-muted">Tenaga Medis</p>
                </b-media>
            </el-card>
            <br>
            <el-card shadow="hover">
                <b-media class="text-left">
                    <h5 class="mt-0">Tanggal Input Data</h5>
                    <p class="mb-0 text-muted">{{ new Date() | moment("dddd, MMMM Do YYYY") }}</p>
                </b-media>
            </el-card>
            <br>
            <el-card shadow="hover">
                <b-card-text class="text-left">
                    <p><strong> Pilih Pasien :</strong></p>
                    <p>
                        <!-- <b-form-select v-model="selectedPatient" class="mb-3">
                            <b-form-select-option v-for="(patient, i) in allPatients" :key="i" :value="patient">{{patient.fullName}}</b-form-select-option>
                        </b-form-select> -->
                        <el-select placeholder="mohon pilih pasien" v-model="selectedPatient" value-key="id" class="maxwidth">
                            <el-option v-for="patient in allPatients"
                                :key="patient.id"
                                :value="patient"
                                :label="patient.fullName"
                                >{{patient.fullName}}</el-option>
                        </el-select>
                    </p>
                    <p v-if="selectedPatient"><strong>Nomor Pasien : {{ selectedPatient.username }}</strong></p>
                    <p class="text-right" v-else>
                        <el-button size="small" type="text" disabled>Tidak ada data Pasien ?</el-button>
                        <el-button size="small" @click="openRegister">Daftarkan Pasien</el-button>
                    </p>
                    <p><strong>Rumah Sakit Verifikator :</strong></p>
                    <p>
                        <el-select placeholder="mohon pilih rumah sakit" v-model="selectedPlace" class="maxwidth">
                            <el-option v-for="hospital in allHospitals"
                                :key="hospital.id"
                                :value="hospital.id"
                                :label="hospital.hospital_name"
                                >{{hospital.hospital_name}}</el-option>
                        </el-select>
                    </p>
                    <p><strong>Upload Gambar Apusan Darah :</strong></p>
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" id="customFile" @change="previewImage" accept=".jpg,.png" >
                        <label class="custom-file-label text-muted" for="customFile">Pilih Gambar</label>
                    </div>
                    <p>
                        <b-progress variant="info" striped :animated="animate" class="mt-2">
                            <b-progress-bar :value="uploadValue">
                                {{uploadValue.toFixed()+"%"}}
                            </b-progress-bar>
                        </b-progress>
                    </p>
                    <p class="text-muted text-center" v-if="this.imageData != null">{{ this.imageData.name }}</p>
                    <div class="text-center" v-if="imageData != null">
                        <b-img thumbnail v-if="url" :src="url" ></b-img>
                    </div>
                </b-card-text>
            </el-card>
            <br>
            <div class="text-center">
                <button type="button" class="btn btn-outline-success" @click="onUpload" v-if="uploadValue == 0">Unggah Gambar</button>
                <button type="button" class="btn btn-outline-success" @click="onSubmit" v-if="uploadValue == 100">Submit</button>
            </div>
            <br>
            <div class="text-center">
                <button type="button" class="btn btn-success" @click="$router.go(-1)">Kembali</button>
            </div>
        </div>
        <el-dialog :visible.sync="dialogRegisterFormVisible" custom-class="dialogBox">
            <h5>Silahkan registrasi pasien terlebih dulu</h5>
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
            </form>
        </el-dialog>
    </div>
</template>

<script>
import firebase from 'firebase';
import axios from 'axios';
import moment from 'vue-moment';
import Navbar from './Navbar.vue'

export default {
    name: 'Medis',

    components: { 'navbar' : Navbar },

    data(){
        return{
            dialogRegisterFormVisible: false,
            imageData: null,
            picture: null,
            animate: true,
            uploadValue: 0,
            selectedPatient: null,
            selectedPlace: null,
            author: '',
            allPatients: [],
            allHospitals: [],
            usernameReg: '',
            firstNameReg: '',
            lastNameReg: '',
            passwordReg: '',
            allPlaces: [
                'RSA UGM',
                'RSUP Dr. Sardjito',
                'RS JIH'
            ]
        }
    },
    mounted() {
        // if (localStorage.userType != 'Tenaga Medis')
        // this.$router.push('/');
        // else
        // this.$router.push('/medis');
        axios.defaults.headers.common = {'Authorization': 'Token ' + localStorage.getItem('token')}
        axios.get('http://116.12.54.60:8000/api/hospital-data')
        .then(response => {
            console.log(response.data)
            this.allHospitals = response.data.data
            console.log(this.allHospitals)
        })
        axios.defaults.headers.common = {'Authorization': 'Token ' + localStorage.getItem('token')}
        axios.get('http://116.12.54.60:8000/api/patients')
        .then(response => {
            console.log(response.data)
            this.allPatients = response.data.patientData
            console.log(this.allPatients)
        })
        this.author = localStorage.fullName
    },

    methods: {
        openRegister() {
            this.dialogRegisterFormVisible = true
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
                message: 'Registrasi pasien berhasil'
                });
            })
            location.reload()
        .catch(function (error) {
            console.error(error.response);
            thiss.$message({
                type: 'error',
                message: error.response.data.message
                });
            });
        },

        previewImage(event) {
            this.uploadValue=0;
            this.picture=null;
            this.imageData = event.target.files[0];
            this.url = URL.createObjectURL(this.imageData);
            console.log(this.imageData)
        },

        logout() {
            localStorage.clear();
            this.$router.push('/');
        },

        onUpload() {
        this.picture=null;
        var tanggal = new Date()
        // imageName = moment().format().replace('-', '').replace('T', '').replace(':', '').replace('+', );
        const storageRef=firebase.storage().ref(tanggal.getFullYear().toString() + (tanggal.getMonth() + 1).toString() + tanggal.getDate().toString() + tanggal.getHours().toString() + tanggal.getMilliseconds().toString() + '.png').put(this.imageData);
        storageRef.on(`state_changed`,snapshot=>{
            this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        }, error=>{console.log(error.message)},
        ()=>{this.uploadValue=100;
            storageRef.snapshot.ref.getDownloadURL().then((url)=>{
            this.picture = url;
            });
        }
        );
        this.$message({
            type: 'success',
            message: 'Upload gambar berhasil'
          });
        console.log(this.selectedPlace) 
        },

        onSubmit() {
            if (this.selectedPatient != null) {
            axios.defaults.headers.common = {'Authorization': 'Token ' + localStorage.getItem('token')}
            axios.post('http://116.12.54.60:8000/api/patient-data', {
                patientId: this.selectedPatient.id,
                current_hospital: this.selectedPlace,
                imageUrl: this.picture
            })
            .then(response => {
                console.log(response.data.status)
                console.log(response.status)
                if(response.status == 200) {
                    this.$message({
                        type: 'success',
                        message: 'Submit data berhasil'
                    });  
                    location.reload()
                }
                else
                this.$message({
                    type: 'danger',
                    message: 'Submit data gagal'
                });  
            })
            // console.log(this.selectedPatient.id)
            // console.log(this.selectedPlace)
            // console.log(this.picture)
            }
            else
            console.log('pilih dulu pasiennya')
        }
    }
}
</script>

<style lang="scss">

#view {
    padding: 30px;
}

.preview{
    width: 200px;
}

.maxwidth {
    width: 100%;
}

</style>