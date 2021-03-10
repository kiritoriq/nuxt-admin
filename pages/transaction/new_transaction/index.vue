<template>
    <div class="container-fluid">
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">New Transaction</h1>
        </div>
        <div class="row">
            <div class="col-lg-8">
                <div class="card border-top-primary shadow h-100 py-2">
                    <div class="card-header">
                        <div>
                            <form @submit.prevent="cariData">
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Search Item" name="search" v-model="search">
                                    <div class="input-group-btn">
                                        <button type="submit" class="btn btn-primary"><i class="fas fa-search"></i></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div style="padding-top: 10px">
                            <select id="category" class="form-control" v-model="category" style="width: 100%" @change="onCategorychange">
                                <option value="">.: Pilihan Kategori :.</option>
                                <option v-for="(val, index) in selectCategory" :key="index" v-if="selectCategory.length>0" :value="val.id">{{ val.name }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="card-deck">
                            <div class="card mb-4" v-for="(val, key) in data" :key="key">
                                <!-- <img class="card-img-top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_177d8629a98%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_177d8629a98%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.1953125%22%20y%3D%2296.3%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" alt=""> -->
                                    <span style="cursor: pointer" @click="showModal(val.id)">
                                        <img class="card-img-top" :src="(val.image!='')?src+val.image:'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_177d8629a98%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_177d8629a98%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.1953125%22%20y%3D%2296.3%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'" alt="">
                                    </span>
                                <div class="card-body">
                                    <span style="cursor: pointer" @click="showModal(val.id)">
                                        <h5 class="card-title text-center">{{val.name}}</h5>
                                        <p class="card-text" style="font-weight: bold">Rp {{val.selling_price}}</p>
                                    </span>
                                </div>
                                <!-- <div class="w-100 d-none d-sm-block d-md-none">wrap every 2 on sm</div> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="card border-top-primary shadow h-100 py-2">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-sm-6">
                                <span style="float: left">No. Transaksi: {{ order.no_order }}</span>
                            </div>
                            <div class="col-sm-6">
                                <span style="float: right">{{ datetime }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <table class="table table-bordered table-hover" id="table" width="100%">
                            <thead class="bg-success" style="color:white">
                                <tr>
                                    <th class="text-center" style="vertical-align: middle">Item</th>
                                    <th class="text-center">
                                        <div>Harga</div>
                                        <div>Satuan</div>
                                    </th>
                                    <th class="text-center" width="30%">
                                        <div>Jumlah</div>
                                        <div>Barang</div>
                                    </th>
                                    <th class="text-center">
                                        <div>Total</div>
                                        <div>Harga</div>
                                    </th>
                                    <th class="text-center" style="vertical-align: middle">Aksi</th>
                                </tr>
                            </thead>
                            <tbody v-if="cart.length>0">
                                <tr v-for="(value, index) in addedToCart" :key="index">
                                    <td>{{ value.name }}</td>
                                    <td>{{ value.selling_price }}</td>
                                    <td>
                                        <div class="input-group">
                                            <div class="input-group-prepend"> 
                                                <button class="btn btn-success" @click="minQty(index)" :disabled="(value.qty<=1)?true:false"><i class="fas fa-minus"></i></button>
                                            </div>
                                            <input type="number" class="form-control" v-model="value.qty" min="1" style="max-width: 50px">
                                            <div class="input-group-append"> 
                                                <button class="btn btn-success" @click="addQty(index)"><i class="fas fa-plus"></i></button>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{{ value.total_price }}</td>
                                    <td class="text-center"><span style="cursor: pointer; color: red" @click="hapusItem(index)" title="Hapus Item"><i class="fas fa-trash"></i></span></td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="row">
                            <div class="col-md-8">
                                <span style="float:right">Sub total</span>
                            </div>
                            <div class="col-md-3">
                                <span style="float: right">Rp&nbsp;{{ (tempPrice.length>0)?ribuan(tempPrice.reduce(function(total,num){return total+num})):0 }}</span> 
                            </div>
                            <div class="col-md-1">
                                &nbsp;
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-8">
                                <span style="float:right">Disc</span>
                            </div>
                            <div class="col-md-3">
                                <span style="float: right">0%</span> 
                            </div>
                            <div class="col-md-1">
                                &nbsp;
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-8">
                                <span style="float:right; font-weight: bold">Grand Total</span>
                            </div>
                            <div class="col-md-3">
                                <span style="float: right; font-weight: bold">Rp&nbsp;{{ (tempPrice.length>0)?ribuan(tempPrice.reduce(function(total,num){return total+num})):0 }}</span> 
                            </div>
                            <div class="col-md-1">
                                &nbsp;
                            </div>
                        </div>
                        <hr>
                        <div class="row" style="padding-top: 50px">
                            <div class="col-md-12">
                                <form>
                                    <div class="form-group row">
                                        <label for="description" class="col-form-label text-md-right col-12 col-md-3 col-lg-3">Bayar:</label>
                                        <div class="col-sm-12 col-md-7">
                                            <div class="input-group">
                                                <input type="number" class="form-control price" v-model="bayar" id="bayar" placeholder="Bayar">
                                                <div class="input-group-append">
                                                    <button type="button" class="btn btn-success" title="klik untuk bayar" @click="kembali = bayar-tempPrice.reduce(function(total,num){return total+num})"><i class="fas fa-coins"></i> Bayar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="description" class="col-form-label text-md-right col-12 col-md-3 col-lg-3">Kembali:</label>
                                        <div class="col-sm-12 col-md-7">
                                            <input type="number" class="form-control price" v-model="kembali" id="kembali" placeholder="Kembalian">
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="row">
                            <div class="col-sm-6">
                                &nbsp;
                            </div>
                            <div class="col-sm-6">
                                <div style="float: right">
                                    <button type="button" class="btn btn-success" @click="saveOrder()"><i class="fas fa-save"></i> Simpan</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showmodal">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLongTitle">Masukkan Jumlah Barang</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="showmodal = false">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="input-group">
                                        <!-- Prepend the following content to the input box -->
                                        <div class="input-group-prepend"> 
                            
                                            <!-- Define the text content of the group -->
                                            <!-- <span class="input-group-text"></span>  -->
                                            <button class="btn btn-success" @click="num--" :disabled="(addedNum<=1)?true:false"><i class="fas fa-minus"></i></button>
                                        </div>
                                        <input type="number" class="form-control" v-model="num" min="1">
                                        <!-- Append the following content to the input box -->
                                        <div class="input-group-append"> 
                            
                                            <!-- Define the text content of the group -->
                                            <!-- <span class="input-group-text">.com</span>  -->
                                            <button class="btn btn-success" @click="num++"><i class="fas fa-plus"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="showmodal = false">Close</button>
                                    <button type="button" class="btn btn-primary" @click="addToCart(addedTempId, num)">Tambahkan ke Keranjang</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<style scoped>
    @media (min-width:768px) {
        .card-deck > .card
        {
            width: 29%;
            flex-wrap: wrap;
            flex: initial; 
        }

        .modal-mask {
            position: fixed;
            z-index: 9998;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, .5);
            display: table;
            transition: opacity .3s ease;
        }

        .modal-wrapper {
            display: table-cell;
            vertical-align: middle;
        }
    }
</style>

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
                cart: [],
                num: 1,
                showmodal: false,
                tempid: null,
                tempPrice: [],
                datetime: null,
                order: {
                    no_order: null,
                    order_date: null,
                    ammount: null,
                },
                bayar: null,
                kembali: null
            }
        },

        created() {
            this.loadData()
            this.getCategory()
            this.getCurrentDate()
            this.getNoOrder()
        },

        computed: {
            addedToCart() {
                return this.cart
            },
            addedTempId() {
                return this.tempid
            },
            addedNum() {
                return this.num
            }
        },

        methods: {
            getCurrentDate() {
                var currentdate = new Date();
                this.datetime = (currentdate.getDate()<10?'0':'') + currentdate.getDate() + "/"
                + (currentdate.getMonth()<10?'0':'') + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + (currentdate.getMinutes()<10?'0':'') + currentdate.getMinutes();
                this.order.order_date = (currentdate.getDate()<10?'0':'') + currentdate.getDate() + "/"
                + (currentdate.getMonth()<10?'0':'') + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear();
            },
            getNoOrder() {
                var currentdate = new Date();
                this.$axios.$get('/ordernumber', {
                    params: {
                        date: (currentdate.getDate()<10?'0':'') + currentdate.getDate() + '-' + (currentdate.getMonth()<10?'0':'') + (currentdate.getMonth()+1) + '-' + currentdate.getFullYear()
                    },
                    headers: {
                        'content-type': 'application/json'
                    }
                }).then((response) => {
                    // console.log(response)
                    this.order.no_order = response[0].order_number
                })
            },
            saveOrder() {
                const headers = {
                        // 'content-type': 'multipart/form-data'
                        'content-type': 'application/x-www-form-urlencoded'
                    }
                this.$swal({
                    text: 'Yakin lakukan transaksi ini?',
                    type: 'warning',
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Yakin',
                    cancelButtonText: 'Tidak',
                }).then(() => {
                    const order = {
                        no_order: this.order.no_order,
                        order_date: this.order.order_date,
                        ammount: this.tempPrice.reduce(function(total,num){return total+num}),
                        product: this.cart
                    }
                    this.$axios.$post('/order', {
                        order
                    }, headers)
                    .then((response) => {
                        // console.log(response)
                        this.$swal({
                            text: 'Data Berhasil disimpan!',
                            type: 'success',
                            showConfirmButton: false,
                            timer: 2500,
                        }).then(() => {
                            this.cart = []
                            this.tempid = null
                            this.tempPrice = []
                            this.datetime = null
                            this.order.no_order = null
                            this.order.ammount = null
                            this.order.order_date = null
                            this.bayar = null
                            this.kembali = null
                            this.getCurrentDate()
                            this.getNoOrder() 
                        })
                    })
                    .catch((error) => {
                        console.log(error)
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
            },
            showModal(id) {
                this.showmodal = true
                this.tempid = id
            },
            async addToCart(id, qty) {
                this.showmodal = false
                await this.$axios.$get('/product/'+id, {
                    headers: {
                        'Accept': 'application/json'
                    }
                }).then((response) => {
                    // console.log(response)
                    var data = response.data[0]
                    data['qty'] = qty
                    data['total_price'] = parseInt(qty*data.selling_price)
                    this.tempPrice.push(data['total_price'])
                    this.cart.push(data)
                })
                this.num = 1
                // this.cart.id = id
            },
            addQty(index) {
                this.cart[index].qty += 1;
                this.cart[index].total_price = parseInt(this.cart[index].qty*this.cart[index].selling_price)
                this.tempPrice[index] = this.cart[index].total_price
            },
            minQty(index) {
                this.cart[index].qty -= 1;
                this.cart[index].total_price = parseInt(this.cart[index].qty*this.cart[index].selling_price)
                this.tempPrice[index] = this.cart[index].total_price
            },
            hapusItem(key) {
                // console.log(key)
                this.cart.splice(key,1)
            },
            ribuan(nomer) {
                return nomer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            },
        }
    }
</script>