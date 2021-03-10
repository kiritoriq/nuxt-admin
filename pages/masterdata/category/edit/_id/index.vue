<template>
    <div class="container-fluid">
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Edit Category</h1>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="card border-top-primary shadow h-100 py-2">
                    <form @submit.prevent="updateData">
                        <div class="card-body">
                                <input type="hidden" v-model="id">
                                <div class="form-group row mb-4">
                                    <label for="name" class="col-form-label text-md-right col-12 col-md-3 col-lg-3">Name:</label>
                                    <div class="col-sm-12 col-md-7">
                                        <input type="text" class="form-control" v-model="data.name" placeholder="Nama Kategori...">
                                    </div>
                                </div>
                                <div class="form-group row mb-4">
                                    <label for="description" class="col-form-label text-md-right col-12 col-md-3 col-lg-3">Description:</label>
                                    <div class="col-sm-12 col-md-7">
                                        <input type="text" class="form-control" v-model="data.description" placeholder="Deskripsi Kategori...">
                                    </div>
                                </div>
                        </div>
                        <div class="card-footer">
                            <div class="form-group row mb-4">
                                <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3"></label>
                                <div class="col-sm-12 col-md-7">
                                    <button type="submit" class="btn btn-success"><i class="fas fa-save"></i> Simpan</button>
                                    <nuxt-link to="/masterdata/category" class="btn btn-warning"><i class="fas fa-times"></i> Batal</nuxt-link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                data: {
                    name: null,
                    description: null
                },
                id: this.$route.params.id,
            }
        },

        methods: {
            simpan() {
                //
            }
        },

        created() {
            this.loadData()
        },

        methods: {
            loadData() {
                this.$axios.$get('/category/'+this.id, {
                    headers: {
                        'Authorization': localStorage.getItem('auth._token.local'),
                        'Accept': 'application/json' 
                    }
                }).then((response) => {
                    // console.log(response)
                    this.data.name = response.data.name
                    this.data.description = response.data.description
                }).catch((error) => {
                    console.log(error)
                })
            },

            updateData() {
                const data = {
                    name: this.data.name,
                    description: this.data.description,
                    // _method: 'PUT'
                }
                const headers = {
                    'Accept': 'application/json'
                }

                this.$axios.$put('/update-category/'+this.id, {
                    data
                }, {headers}).then(response => {
                    console.log(response)
                    this.$notify({
                            group: 'notif',
                            title: 'Sukses',
                            text: response.message,
                            type: 'success',
                        })
                    this.$router.push('/masterdata/category')
                }).catch(error => {
                    console.log(error)
                    this.$notify({
                            group: 'notif',
                            title: 'Error',
                            text: 'Terjadi Kesalahan, silahkan hubungi Admin!',
                            type: 'error',
                        })
                })
            }
        }
    }
</script>