<template>
<div>
    <b-card>
        <div slot="header">
            <strong class="titleForm">検索条件</strong>
            <b-button variant="dark" class="ml-2 btn-form" size="sm" @click="onReset">リセット</b-button>
            <b-button class="float-right btn-form" variant="dark" size="sm" @click="onSearch">検索</b-button>
        </div>
        <b-form>
            <b-row>
                <b-col>
                    <b-form-group label="グループ名" :label-cols="2">
                        <b-form-input type="text" autocomplete="name" v-model.trim="search.group_name"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="グループ名カナ" :label-cols="2">
                        <b-form-input type="text" autocomplete="name" v-model.trim="search.group_kana"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
        </b-form>
    </b-card>
</div>
</template>

<script>
export default {
    props:['search'],
    data() {
        return {}
    },

    methods: {
        onReset() {
            this.$emit("onReset");
        },

        onSearch() {
            this.$emit("onSearch");
        },
    }
};
</script>
