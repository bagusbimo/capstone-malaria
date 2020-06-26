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
        <div id="view" class="phoneUI">
            <div>
                <el-input
                    placeholder="Cari Rumah Sakit atau Klinik"
                    v-model="searchQuery">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
            </div>
            <el-divider></el-divider>
            <div style="display: flex; justify-content: space-between">
                <el-link :underline="false" icon="el-icon-s-order">Data Rekam Medis Pasien</el-link>
                <el-select v-model="currentOrder" :placeholder="currentOrder.title">
                    <el-option :value="{key: 'input_place', code: -1, title: 'Diurutkan sesuai Rumah Sakit'}">Urutkan Berdasarkan Rumah Sakit</el-option>
                    <el-option :value="{key: 'input_time', code: -1, title: 'Diurutkan sesuai Tanggal'}">Urutkan Berdasarkan Tanggal</el-option>
                </el-select>
            </div>
            <br>
            <div>
                <el-card shadow="hover">
                    <b-card class="card border-0" v-for="(patient) in orderBy(filterItems(patientData), currentOrder.key, currentOrder.code)" :key="patient.id">
                        <b-media class="text-left">
                            <template v-slot:aside>
                                <el-avatar src="https://cdn.icon-icons.com/icons2/1465/PNG/512/588hospital_100778.png"></el-avatar>
                            </template>
                            <div style="display: flex; justify-content: space-between">
                                <h5 class="mt-0">
                                    {{ patient.input_place }}
                                </h5>
                                <el-button size="small" icon="el-icon-check" circle type="success" v-if="patient.status == 'confirmed'" @click="linkDetails(patient.id)"></el-button>
                                <el-button size="small" icon="el-icon-arrow-right" circle type="warning" v-else @click="linkDetails(patient.id)"></el-button>
                            </div>
                            <p class="mb-0 text-muted">{{ patient.input_time.substring(0,10) }}</p>
                        </b-media>
                    </b-card>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Navbar from './Navbar.vue'
import Vue2Filters from 'vue2-filters'
import _ from 'lodash'

export default {
    name: 'Pasien',
    
    components: { 'navbar' : Navbar },

    mixins: [Vue2Filters.mixin],

    data() {
        return {
            linkDetail: [],
            patientData: [],
            searchQuery: '',
            currentOrder: { key: 'input_time', code: -1, title: 'Urutkan Sesuai' }
        }
    },
    mounted() {
        axios.defaults.headers.common = {'Authorization': 'Token ' + localStorage.getItem('token')}
        axios.get('http://116.12.54.60:8000/api/patient-data')
        .then(response => {
            console.log(response.data)
            this.patientData = response.data.data
            console.log(this.patientData)
        })
        .then(response => {
            this.patientData.forEach(element => {
            var link = '#/report?id=' + element.id
            this.linkDetail.push(link)
            console.log(link)
            });
        })
        console.log(this.linkDetail)
    },
    methods: {
        filterItems: function(patientData) {
            var ini = this;
            return patientData.filter(function(patient) {
            let regex = new RegExp('(' + ini.searchQuery + ')', 'i');
            return patient.input_place.match(regex);
            })
        },

        linkDetails: function(id) {
            window.location.href = '#/report?id=' + id;
        },

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

.clickableCard, .clickableCard:hover {
    color: inherit;
}

</style>