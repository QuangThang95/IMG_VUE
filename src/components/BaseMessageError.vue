<template>
<div>
    <b-row :class="classBase">
        <b-col cols="3">
            <h6 class="fontColor">{{title}}</h6>
        </b-col>
        <b-col cols="9">
            <div class="alert alert-danger" v-if="message.length >0">
                <div class="fontColor" v-for="item in message" :key="item">{{item}}</div>
            </div>
        </b-col>
    </b-row>
</div>
</template>

<script>
export default {
    props: {
        message: {
            type: Array,
            default: ()=> [],
        },

        title: {
            type: String,
            default: '排出事業者登録'
        },

        classBase: {
            type: String,
            default: 'mt-4 mb-3'
        },
    }

}
</script>
