<template>
    <div class="container-fluid">
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Product</h1>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="card border-top-primary shadow h-100 py-2">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-4">
                                <nuxt-link to="/masterdata/product/create" class="btn btn-sm btn-primary"><i class="fas fa-plus-circle"></i> Buat Baru</nuxt-link>
                            </div>
                            <div class="col-4">
                                <select id="category" class="form-control" v-model="category" style="width: 80%" @change="onCategorychange">
                                    <option value="">.: Pilihan Kategori :.</option>
                                    <option v-for="(val, index) in selectCategory" :key="index" v-if="selectCategory.length>0" :value="val.id">{{ val.name }}</option>
                                </select>
                            </div>
                            <div class="col-4">
                                <form @submit.prevent="cariData" style="float: right;">
                                    <div class="input-group" style="width:250px">
                                        <input type="text" class="form-control" placeholder="Search..." name="search" v-model="search">
                                        <div class="input-group-btn">
                                            <button type="submit" class="btn btn-primary"><i class="fas fa-search"></i></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div style="float: right">
                            
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-striped table-hover" id="table" width="100%">
                                <thead>
                                    <tr>
                                        <th width="2%">No.</th>
                                        <th>Product Name</th>
                                        <th>Buy Price</th>
                                        <th>Selling Price</th>
                                        <th>Category</th>
                                        <th>Product Image</th>
                                        <th>Act.</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="loading" class="text-center">
                                        <td colspan="7"><i class="fas fa-circle-notch fa-spin"></i></td>
                                    </tr>
                                    <tr v-if="data.length>0 && !loading" v-for="(value, key) in data" :key="key">
                                        <td>{{ ((key+1)+((current_page!=0)?(current_page-1):current_page*1)) }}</td>
                                        <td>{{ value.name }}</td>
                                        <td>{{ value.buy_price }}</td>
                                        <td>{{ value.selling_price }}</td>
                                        <td>
                                            <span v-for="(val, index) in value.category">
                                                <span class="badge badge-primary">{{ val.categories.name }}</span>&nbsp;
                                            </span>
                                        </td>
                                        <td class="text-center">
                                            <img :src="src + value.image" v-if="value.image != ''" style="max-width: 250px;">
                                            <span v-if="value.image == ''">product image</span>
                                        </td>
                                        <td>
                                            <div class="dropdown">
                                                <button class="btn btn-light dropdown-toggle" type="button" id="aksiDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Aksi
                                                </button>
                                                <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="aksiDropdown">
                                                    <button id="edit" class="btn btn-xs text-info dropdown-item" aria-label="Edit" data-toggle="tooltip" data-original-title="Edit" href="" :recid="value.id" @click="editData(value.id)">
                                                        <span class="fas fa-edit text-green"></span> Edit
                                                    </button>
                                                    &nbsp;
                                                    <button id="hapus" class="btn btn-xs text-danger dropdown-item" aria-label="Hapus" data-toggle="tooltip" data-original-title="Hapus" href="" :recid="value.id" @click="hapusData(value.id, ((key+1)+((current_page!=0)?(current_page-1):current_page*1)))">
                                                        <span class="fas fa-trash text-red"></span> Hapus
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr v-if="data.length==0 && !loading" class="text-center">
                                        <td colspan="7"> <strong style="color: red;"><i>Tidak ada Data</i></strong> </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="col-sm-12">
                            <nav aria-label="Page Navigation" style="float: right">
                                <ul class="pagination">
                                    <li :class="(value.active)?'page-item active':'page-item'" v-for="(value, key) in links" :key="key">
                                        <span class="page-link" @click="paginate(key)">
                                            <input type="hidden" id="linkurl" :value="value.label">
                                            <span aria-hidden="true" v-if="key===0">&laquo;</span>
                                            <span class="sr-only">Previous</span>
                                            <span v-if="key!=0&&key!=(links.length-1)">
                                                {{ value.label }}
                                            </span>
                                            <span aria-hidden="true" v-if="key === (links.length-1)">&raquo;</span>
                                            <span class="sr-only">Next</span>
                                        </span>
                                        <!-- <a href="" class="page-link" @click="paginate" data-href="value.url" data-page="value.label">
                                            <span aria-hidden="true" v-if="key===0">&laquo;</span>
                                            <span class="sr-only">Previous</span>
                                            <span v-if="key!=0&&key!=(links.length-1)">
                                                {{ value.label }}
                                            </span>
                                            <span aria-hidden="true" v-if="key === (links.length-1)">&raquo;</span>
                                            <span class="sr-only">Next</span>
                                        </a> -->
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                data: {
                },
                links:{},
                from: null,
                last_page: null,
                to: null,
                total: null,
                current_page: 1,
                per_page: 10,
                search: '',
                sortBy: 'created_at',
                sortBydesc: 'asc',
                groupBy: '',
                selectCategory: null,
                category: '',
                src: 'http://localhost:8080/images/products/',
            }
        },

        created() {
            this.loadData()
            this.getCategory()
        },

        methods: {
            loadData() {
                this.loading = true
                this.$axios.$get('/product', {
                    params: {
                        page: this.current_page,
                        per_page: this.per_page,
                        search: this.search,
                        sortBy: this.sortBy,
                        sortBydesc: this.sortBydesc,
                        groupBy: this.groupBy
                    },
                    headers: {
                        'Authorization': localStorage.getItem('auth._token.local'),
                        'Accept': 'application/json' 
                    }
                }).then((response) => {
                    this.loading = false;
                    // console.log(response)
                    var arrData = [];
                    response.data.forEach(function(item, index) {
                        // console.log(item)
                        if(item.category.length != 0) {
                            arrData.push(item)
                        }
                    })  
                    this.data = arrData
                    this.links = response.links
                    this.from = response.from
                    this.last_page = response.last_page
                    this.to = response.to
                    this.total = response.total
                    $('.table-responsive').on('show.bs.dropdown', function () {
                        $('.table-responsive').css( "overflow", "inherit" );
                    });
                    $('.table-responsive').on('hide.bs.dropdown', function () {
                        $('.table-responsive').css( "overflow", "auto" );
                    })
                })
            },
            paginate(val) {
                if(val != 0 && val != (this.links.length-1)) {
                    this.current_page = val
                    this.loadData()
                } else if(val == (this.links.length-1)){
                    this.current_page = (this.from+1)
                    this.loadData()
                } else {
                    this.current_page = (this.from-1)
                    this.loadData()
                }
            },
            cariData() {
                this.loadData()
            },
            editData(val) {
                this.$router.push('/masterdata/product/edit/'+val)
            },
            hapusData(val, key) {
                this.$swal({
                    text: 'Apakah anda Yakin ingin menghapus data ini?',
                    type: 'warning',
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Yakin',
                    cancelButtonText: 'Tidak',
                    // toast: true,
                    // position: 'top-end',
                    // timer: 3000,
                }).then(() => {
                    this.$axios.$delete('/delete-product/'+val, {'_method': 'DELETE'}, {
                        headers: {
                            // 'Authorization': localStorage.getItem('auth._token.local'),
                            'Accept': 'application/json'
                        }
                    }).then(response => {
                        console.log(response)
                        this.$swal({
                            text: 'Data Berhasil dihapus!',
                            type: 'success',
                            showConfirmButton: false,
                            toast: true,
                            position: 'top-end',
                            timer: 2500,
                        }).then(() => {
                            this.loadData() 
                        })
                    }).catch(error => {
                        console.log(error)
                    })
                })
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
                    this.selectCategory = response.data
                    // console.log(this.selectCategory);
                })
            },
            onCategorychange() {
                this.groupBy = this.category
                this.loadData()
            }
        }
    }
</script>