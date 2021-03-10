<template>
    <div class="container-fluid">
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Create Product</h1>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="card border-top-primary shadow h-100 py-2">
                    <form @submit.prevent="simpan">
                        <div class="card-body">
                            <div class="form-group row mb-4">
                                <label for="name" class="col-form-label text-md-right col-12 col-md-3 col-lg-3">Nama:</label>
                                <div class="col-sm-12 col-md-7">
                                    <input type="text" class="form-control" v-model="data.name" placeholder="Nama Produk...">
                                </div>
                            </div>
                            <div class="form-group row mb-4">
                                <label for="description" class="col-form-label text-md-right col-12 col-md-3 col-lg-3">Harga Beli Produk:</label>
                                <div class="col-sm-12 col-md-7">
                                    <input type="number" class="form-control price" v-model="data.buy_price" id="buyprice" placeholder="Harga Beli Produk...">
                                </div>
                            </div>
                            <div class="form-group row mb-4">
                                <label for="description" class="col-form-label text-md-right col-12 col-md-3 col-lg-3">Harga Jual Produk:</label>
                                <div class="col-sm-12 col-md-7">
                                    <input type="number" class="form-control" v-model="data.selling_price" id="sellingprice" placeholder="Harga Jual Produk..." >
                                </div>
                            </div>
                            <div class="form-group row mb-4">
                                    <label for="description" class="col-form-label text-md-right col-12 col-md-3 col-lg-3">Deskripsi:</label>
                                    <div class="col-sm-12 col-md-7">
                                        <input type="text" class="form-control" v-model="data.description" placeholder="Deskripsi Produk...">
                                    </div>
                                </div>
                            <div class="form-group row mb-4">
                                <label for="description" class="col-form-label text-md-right col-12 col-md-3 col-lg-3">Kategori:</label>
                                <div class="col-sm-12 col-md-7" style="margin-top: 8px">
                                    <div class="form-check form-check-inline" v-for="(value, key) in category" :key="key">
                                        <input type="checkbox" class="form-check-input" :id="'inlineCheckbox'+key" :value="value.id" v-model="data.category">
                                        <label class="form-check-label" :for="'inlineCheckbox'+key">{{ value.name }}</label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row mb-4">
                                <label for="description" class="col-form-label text-md-right col-12 col-md-3 col-lg-3">Gambar:</label>
                                <div class="col-sm-12 col-md-7">
                                    <div class="card" style="width: 20rem">
                                        <img :src="(url!=null)?url:'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_177d8629a98%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_177d8629a98%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.1953125%22%20y%3D%2296.3%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'" alt="Card image cap">
                                        <div class="card-body">
                                            <h5 class="card-titel">{{ (imageName!=null)?imageName:'Nama Gambar' }}</h5>
                                        </div>
                                    </div>
                                    <br>
                                    <div class="input-group">
                                        <div class="custom-file">
                                            <input type="file" class="custom-file-input btn btn-info" id="inputGroupFile04" @change="onImageChange" accept="image/*">
                                            <label class="custom-file-label" for="inputGroupFile04">Pilih Gambar</label>
                                        </div>
                                        <!-- <div class="input-group-append">
                                            <button class="btn btn-outline-secondary" type="button">Button</button>
                                        </div> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer">
                            <div class="form-group row mb-4">
                                <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3"></label>
                                <div class="col-sm-12 col-md-7">
                                    <button type="submit" class="btn btn-success"><i class="fas fa-save"></i> Simpan</button>
                                    <nuxt-link to="/masterdata/product" class="btn btn-warning"><i class="fas fa-times"></i> Batal</nuxt-link>
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
                    buy_price: null,
                    selling_price: null,
                    description: null,
                    image: null,
                    category: [],
                },
                category: {},
                url: null,
                imageName: null,
            }
        },

        created() {
            this.getCategory();
        },

        methods: {
            simpan() {
                const headers = {
                    'content-type': 'multipart/form-data'
                }
                let formData = new FormData();
                formData.append('name', this.data.name)
                formData.append('buy_price', this.data.buy_price)
                formData.append('selling_price', this.data.selling_price)
                formData.append('image', this.data.image)
                var category_id = JSON.stringify(this.data.category);
                formData.append('category_id', category_id);
                formData.append('description', this.data.description)

                this.$swal({
                    text: 'Apakah kamu yakin akan menyimpand data ini?',
                    type: 'warning',
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Yakin',
                    cancelButtonText: 'Tidak',
                }).then(() => {
                    this.$axios.$post('/product', formData, headers)
                    .then((response) => {
                        console.log(response)
                        this.$swal({
                            text: 'Data Berhasil disimpan!',
                            type: 'success',
                            showConfirmButton: false,
                            toast: true,
                            position: 'top-end',
                            timer: 2500,
                        }).then(() => {
                            this.$router.push('/masterdata/product') 
                        })
                    })
                    .catch((error) => {
                        console.log(error);
                        if(error.response.status === 400) {
                            this.$swal({
                                title: 'Error!',
                                text: 'Mohon cek kembali inputan anda!',
                                type: 'error',
                                showConfirmButton: false,
                                timer: 2000
                            })
                        } else {
                            this.$swal({
                                text: 'Terjadi kesalahan, harap hubungi admin!',
                                type: 'error',
                                showConfirmButton: false,
                                toast: true,
                                position: 'top-end',
                                timer: 2500,
                            })
                        }
                    })
                })
            },

            onImageChange(e) {
                console.log(e.target.files[0]);
                this.data.image = e.target.files[0];
                this.imageName = e.target.files[0].name;
                const image = e.target.files[0];
                this.url = URL.createObjectURL(image);
            },

            getCategory() {
                this.$axios.$get('/category', {
                    params: {
                        page: 1,
                        per_page: 10,
                        search: "",
                        sortBy: "created_at",
                        sortBydesc: "asc"
                    },
                    headers: {
                        'Authorization': localStorage.getItem('auth._token.local'),
                        'Accept': 'application/json' 
                    }
                }).then((response) => {
                    this.category = response.data
                })
            }
        }
    }
</script>