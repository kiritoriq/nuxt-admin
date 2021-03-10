<template>
    <div class="container-fluid">
        <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
                <!-- Nested Row within Card Body -->
                <div class="row">
                    <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
                    <div class="col-lg-7">
                        <div class="p-5">
                            <div class="text-center">
                                <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
                            </div>
                            <form class="user">
                                <div class="form-group row">
                                    <div class="col-sm-6 mb-3 mb-sm-0">
                                        <input type="text" class="form-control form-control-user" id="name" v-model="user.name"
                                            placeholder="Name">
                                    </div>
                                    <div class="col-sm-6">
                                        <input type="text" class="form-control form-control-user" id="username" v-model="user.username"
                                            placeholder="Username">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <input type="email" class="form-control form-control-user" id="exampleInputEmail"
                                        placeholder="Email Address" v-model="user.email">
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-6 mb-3 mb-sm-0">
                                        <input type="password" class="form-control form-control-user"
                                            id="exampleInputPassword" placeholder="Password" v-model="user.password">
                                    </div>
                                    <div class="col-sm-6">
                                        <input type="password" class="form-control form-control-user"
                                            id="exampleRepeatPassword" placeholder="Confirmation Password" v-model="user.password_confirmation">
                                    </div>
                                </div>
                                <button class="btn btn-primary btn-user btn-block" type="button" @click="register">Register Account</button>
                                <!-- <a href="login.html" class="btn btn-primary btn-user btn-block">
                                    Register Account
                                </a> -->
                            </form>
                            <hr>
                            <div class="text-center">
                                <nuxt-link class="small" to="/login">Already have an account? Login!</nuxt-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    
    export default {
        auth: false,
        name: 'Register',
        data() {
            return {
                user: {
                    name: null,
                    email: null,
                    username: null,
                    password: null,
                    password_confirmation: null
                }
            }
        },

        methods: {
            register() {
                // console.log(this.user)
                const user = {
                    name: this.user.name,
                    username: this.user.username,
                    email: this.user.email,
                    password: this.user.password,
                    password_confirmation: this.user.password_confirmation
                }

                this.$axios.$post('/auth/register', user)
                    .then(response => {
                        console.log(response)
                        this.$notify({
                            group: 'auth',
                            title: 'Sukses',
                            text: 'User berhasil didaftarkan',
                            type: 'success',
                        })
                        this.$router.push('/login')
                    })
                    .catch(error => {
                        console.log(error)
                        if(error.response.status === 404) {
                            this.$notify({
                                group: 'auth',
                                title: 'Terjadi Kesalahan!',
                                text: 'Halaman tidak ditemukan',
                                type: 'error',
                            })
                        }
                        if(error.response.status === 401) {
                            this.$notify({
                                group: 'auth',
                                title: 'Terjadi Kesalahan!',
                                text: 'Tidak diperbolehkan',
                                type: 'error',
                            })
                        }
                        if(error.response.status === 500) {
                            this.$notify({
                                group: 'auth',
                                title: 'Terjadi Kesalahan!',
                                text: 'Harap hubungi administrator',
                                type: 'error',
                            })
                        }
                    })
            },
            
        //     notify() {
        //        this.$notify({
        //            group: 'auth',
        //            title: 'Important Messages!',
        //            text: 'Hello user! This is Notifications',
        //            type: 'success',
        //        })
        //    }
        }
    }
</script>