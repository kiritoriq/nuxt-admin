<template>
    <!-- Sidebar -->
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled" id="accordionSidebar">

            <!-- Sidebar - Brand -->
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div class="sidebar-brand-icon rotate-n-15">
                    <i class="fas fa-laugh-wink"></i>
                </div>
                <div class="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
            </a>

            <!-- Divider -->
            <hr class="sidebar-divider my-0">

            <!-- Heading -->
            <!-- <div class="sidebar-heading">
                Interface
            </div> -->

            <!-- Nav Item - Pages Collapse Menu -->
            <!-- <li class="nav-item">
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                    aria-expanded="true" aria-controls="collapseTwo">
                    <i class="fas fa-fw fa-cog"></i>
                    <span>Components</span>
                </a>
                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <h6 class="collapse-header">Custom Components:</h6>
                        <a class="collapse-item" href="buttons.html">Buttons</a>
                        <a class="collapse-item" href="cards.html">Cards</a>
                    </div>
                </div>
            </li> -->

            <!-- Nav Item - Utilities Collapse Menu -->
            <!-- <li class="nav-item">
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                    aria-expanded="true" aria-controls="collapseUtilities">
                    <i class="fas fa-fw fa-wrench"></i>
                    <span>Utilities</span>
                </a>
                <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities"
                    data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <h6 class="collapse-header">Custom Utilities:</h6>
                        <a class="collapse-item" href="utilities-color.html">Colors</a>
                        <a class="collapse-item" href="utilities-border.html">Borders</a>
                        <a class="collapse-item" href="utilities-animation.html">Animations</a>
                        <a class="collapse-item" href="utilities-other.html">Other</a>
                    </div>
                </div>
            </li> -->
            <li :class="($route.path=='/')?'nav-item active':'nav-item'">
                <nuxt-link to="/" class="nav-link">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span> Dashboard</span>
                </nuxt-link>
            </li>
            <li :class="($route.path=='/masterdata'||$route.path=='/masterdata/category'||$route.path=='/masterdata/product')?'nav-item active':'nav-item'">
                <a href="#" class="nav-link collapsed" data-toggle="collapse" data-target="#collapse1"
                    aria-expanded="true" aria-controls="collapse1">
                    <i class="fas fa-archive"></i>
                    <span> Master Data</span>    
                </a>
                <div class="collapse" id="collapse1" aria-labelledby="heading1" data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <nuxt-link class="collapse-item" to="/masterdata/category">
                            <i class="fas fa-chevron-right"></i>
                            &nbsp;<span>Category</span>
                        </nuxt-link>
                        <nuxt-link class="collapse-item" to="/masterdata/product">
                            <i class="fas fa-chevron-right"></i>
                            &nbsp;<span>Product</span>
                        </nuxt-link>
                    </div>
                </div>
            </li>
            <li :class="($route.path=='/transaction'||$route.path=='/transaction/new_transaction'||$route.path=='/transaction/transaction_list')?'nav-item active':'nav-item'">
                <a href="#" class="nav-link collapsed" data-toggle="collapse" data-target="#collapse2"
                    aria-expanded="true" aria-controls="collapse2">
                    <i class="fas fa-dollar-sign"></i>
                    <span> Transaction</span>    
                </a>
                <div class="collapse" id="collapse2" aria-labelledby="heading1" data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <nuxt-link class="collapse-item" to="/transaction/new_transaction">
                            <i class="fas fa-plus-circle"></i>
                            &nbsp;<span>New Transaction</span>
                        </nuxt-link>
                        <nuxt-link class="collapse-item" to="/transaction/transaction_list">
                            <i class="fas fa-list"></i>
                            &nbsp;<span>Transaction List</span>
                        </nuxt-link>
                    </div>
                </div>
            </li>

            <!-- <li v-if="loading" style="color: #fff">
                <i class="fas fa-circle-notch fa-spin"></i> <span>Loading...</span>
            </li>
            <li :class="($route.path==value.link)?'nav-item active':'nav-item'" v-for="(value, index) in menu" :key="index">
                <nuxt-link v-if="value.modules.length==0" class="nav-link" :to="value.link">
                    <i :class="value.icon"></i>
                    &nbsp;<span>{{ value.context }}</span>
                </nuxt-link> -->
                <!-- Divider -->
                <!-- <hr class="sidebar-divider" v-if="value.context=='Dashboard'">
                <a v-if="value.modules.length>0" href="#" class="nav-link collapsed" data-toggle="collapse" :data-target="'#collapse'+index"
                    aria-expanded="true" :aria-controls="'collapse'+index">
                    <i :class="value.icon"></i>
                    &nbsp;<span>{{ value.context }}</span>    
                </a>
                <div v-if="value.modules.length>0" :id="'collapse'+index" class="collapse" :aria-labelledby="'heading'+index" data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <nuxt-link class="collapse-item" v-for="(module, module_id) in value.modules" :key="module_id" :to="module.link">
                            <i :class="module.icon"></i>
                            &nbsp;<span>{{ module.module }}</span>
                        </nuxt-link>
                    </div>
                </div>
            </li> -->

        </ul>
        <!-- End of Sidebar -->
</template>

<script>
    export default {
        name: 'AppSidebar',
        data() {
            return {
                menu: {},
                loading: true,
            }
        },

        // mounted() {
        //     this.$axios.$get('/menu', {
        //         headers: {
        //             'Authorization': localStorage.getItem('auth._token.local'),
        //         }
        //     }).then(response => {
        //         this.loading = false;
        //         // console.log(response);
        //         if(response.length > 0) {
        //             this.menu = response;
        //         }
        //         console.log(this.menu)
        //     })
        // } 
    }
</script>