<template>
    <div class="container-fluid">
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Create Category</h1>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="card border-top-primary shadow h-100 py-2">
                    <form @submit.prevent="simpan">
                        <div class="card-body">
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
                }
            }
        },
        
        methods: {
            simpan() {
                const headers = {
                    'Authorization': localStorage.getItem('auth._token.local'),
                }
                this.$swal({
                    text: 'Apakah anda Yakin ingin menyimpan data ini?',
                    type: 'warning',
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Yakin',
                    cancelButtonText: 'Tidak',
                }).then(() => {
                    this.$axios.$post('/category', {
                        name: this.data.name,
                        description: this.data.description
                    }, {headers})
                        .then(response => {
                            console.log(response)
                            this.$notify({
                                group: 'notif',
                                title: 'Sukses',
                                text: response.message,
                                type: 'success',
                            })
                            this.$router.push('/masterdata/category')
                        })
                        .catch(error => {
                            console.log(error)
                            this.$notify({
                                group: 'notif',
                                title: 'Error',
                                text: 'Terjadi Kesalahan, silahkan hubungi Admin!',
                                type: 'error',
                            })
                        })
                })
            }
        }
    }
</script>