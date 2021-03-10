<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-xl-10 col-lg-12 col-md-9">
                <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">
                        <div class="row">
                            <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                            <div class="col-lg-6">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                    </div>
                                    <form class="user">
                                        <div class="form-group">
                                            <!-- <input type="email" class="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." v-model="auth.email"> -->
                                            <input type="text" class="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Username" v-model="auth.username">
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control form-control-user" id="exampleInputPassword" placeholder="Password" v-model="auth.password">
                                        </div>
                                        <a href="javascript:void(0)" @click="login" class="btn btn-primary btn-user btn-block">
                                            <span v-if="!watchLoading">Login</span>
                                            <span v-show="watchLoading">
                                                <i class="fas fa-circle-notch fa-spin"></i>
                                            </span>
                                        </a>
                                        <!-- <button type="button" class="btn btn-info btn-user btn-block" @click="notify"> clickMe</button> -->
                                    </form>
                                    <hr>
                                    <!-- <div class="text-center">
                                        <a class="small" href="#">Forgot Password?</a>
                                    </div> -->
                                    <div class="text-center">
                                        <nuxt-link class="small" to="/login/register">Create an Account!</nuxt-link>
                                        <!-- <a class="small" href="#">Create an Account!</a> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'
    import axios from '@/plugins/axios-auth'

    export default {
        auth: false,
        data() {
           return {
               auth: {
                   username: null,
                   password: null
               },
               loading: false,
           }
        },

        mounted() {
            if(this.$auth.loggedIn) {
                this.$router.push('/')
            }
        },

        computed: {
            watchLoading() {
                return this.loading
            }
        },
       
        methods: {
            ...mapMutations(['SET_IS_AUTH']),

           login() {
                this.loading = true;
                    this.$auth.loginWith('local', {
                        data: {
                            username: this.auth.username,
                            password: this.auth.password
                        }
                    }).then(() => {
                        // console.log(this.$auth.user.name)
                        this.$notify({
                            group: 'auth',
                            title: 'Berhasil Login!',
                            text: 'Selamat datang '+this.$auth.user.name,
                            type: 'success'
                        })
                        //JIKA BERHASIL, KITA SET TRUE IS AUTH-NYA
                        this.SET_IS_AUTH(true)
                        //LALU REDIRECT KE HALAMAN UTAMA / DAHSBOARD
                        this.$router.push('/')
                        this.loading = false
                    }).catch((error) => {
                        console.log(error)
                        this.$swal({
                            title: 'Gagal Login!',
                            text: 'Terjadi Kesalahan, harap hubungi Admin!',
                            type: 'error',
                            showConfirmButton: false,
                            toast: true,
                            position: 'top',
                            timer: 3500,
                        })
                        this.loading = false
                    })
           },

        }
    }
</script>