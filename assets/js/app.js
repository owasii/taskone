const App = {
    data() {
        return {
            users: [],
            user: [],
            showForm: false,
            mode: '', // add, edit
            baseUrl: 'https://crudcrud.com/api/00df8c3b04db4fed975bf1b7aaea65e3/users',
        };
    },
    methods: {
        // Fetch Record
        fetchUsers() {
            axios({
                method: "GET",
                url: this.baseUrl,
                "Content-Type": "application/json; charset=utf-8",
            }).then((response) => {
                this.users = response.data
            });
        },

        // Add Record
        addUser() {
            if (this.user.name != null && this.user.email != null && this.user.nickname != null && this.user.birthdate != null && this.user.gender != null) {
                axios({
                    method: "POST",
                    url: this.baseUrl,
                    "Content-Type": "application/json; charset=utf-8",
                    data: {
                        name: this.user.name,
                        email: this.user.email,
                        nickname: this.user.nickname,
                        birthdate: this.user.birthdate,
                        gender: this.user.gender,
                    }
                }).then((response) => {
                    this.fetchUsers()
                    this.showForm = false
                });
            }
        },

        // Edit Record
        editUser(id) {
            axios({
                method: "GET",
                url: this.baseUrl + '/' + id,
                "Content-Type": "application/json; charset=utf-8",
            }).then((response) => {
                this.user = response.data
                this.showForm = true
                this.mode = 'edit'
                window.scrollTo(0, 0);
            });
        },

        // Update Record
        updateUser(id) {
            if (this.user.name != null && this.user.email != null && this.user.nickname != null && this.user.birthdate != null && this.user.gender != null) {
                axios({
                    method: "PUT",
                    url: this.baseUrl + '/' + id,
                    "Content-Type": "application/json; charset=utf-8",
                    data: {
                        name: this.user.name,
                        email: this.user.email,
                        nickname: this.user.nickname,
                        birthdate: this.user.birthdate,
                        gender: this.user.gender,
                    }
                }).then((response) => {
                    this.fetchUsers()
                    this.showForm = false
                });
            }
        },

        // Delete Record
        deleteUser(id) {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this record!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        axios({
                            method: "DELETE",
                            url: this.baseUrl + '/' + id,
                            "Content-Type": "application/json; charset=utf-8",
                        }).then((response) => {
                            this.fetchUsers()
                            swal("Poof! Selected record has been deleted!", {
                                icon: "success",
                            });
                        });
                    }
                });
        },
    },
    mounted() {
        this.fetchUsers()
    },
    updated() {
        $('table').DataTable();
    },
};

Vue.createApp(App).mount("#VueApp");