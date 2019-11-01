<template>
<div>
    <b-dropdown v-model="selectedBig" variant="light" class="m-md-2" :text="bigText">
        <b-dropdown-item disabled value="-1">Select an Item</b-dropdown-item>
        <b-dropdown-item v-for="big in bigs" :key="big.code" :value="big.code" @click="selectedBig = big.code">{{big.text}}</b-dropdown-item>
    </b-dropdown>

    <b-dropdown v-model="selectedMedium" variant="light" class="m-md-2" :text="mediumText">
        <b-dropdown-item disabled value="-1">Select an Item</b-dropdown-item>
        <b-dropdown-item v-for=" medium in mediums" :key="medium.code" :value="medium.code" @click="selectedMedium = medium.code">{{medium.text}}</b-dropdown-item>
    </b-dropdown>

    <b-dropdown v-model="selectedSmall" variant="light" class="m-md-2" :text="smallText">
        <b-dropdown-item disabled value="-1">Select an Item</b-dropdown-item>
        <b-dropdown-item v-for="small in smalls" :key="small.code" :value="small.code" @click="selectedSmall = small.code">{{small.text}}</b-dropdown-item>
    </b-dropdown>
</div>
</template>

<script>
export default {
    data() {
        return {
            bigs: [],
            mediums: [],
            smalls: [],
            bigText: '',
            mediumText: '',
            smallText: '',
            selectedBig: "",
            selectedMedium: "",
            selectedSmall: "",
            listBigs: [{
                    code: 1,
                    text: "test1",
                    listMedium: [{
                            code: 0,
                            text: "test1",
                            listSmall: [{
                                code: 1,
                                text: "test11"
                            }]
                        },
                        {
                            code: 1,
                            text: "test2",
                            listSmall: [{
                                code: 1,
                                text: "test22"
                            }]
                        }
                    ]
                },
                {
                    code: 2,
                    text: "test2",
                    listMedium: [{
                        code: 0,
                        text: "test22",
                        listSmall: [{
                            code: 1,
                            text: "test222"
                        }]
                    }]
                },
                {
                    code: 3,
                    text: "test3",
                    listMedium: [{
                        code: 0,
                        text: "test33",
                        listSmall: [{
                            code: 1,
                            text: "test3333"
                        }]
                    }]
                }
            ]
        };
    },
    created() {
        this.bigs = this.listBigs;
        if (this.bigs.length > 0) {
            this.bigText = this.listBigs[0].text;
            this.mediumText = (this.listBigs[0].listMedium) ? this.listBigs[0].listMedium[0].text : '';
            this.smallText = (this.listBigs[0].listMedium[0]) ? this.listBigs[0].listMedium[0].text : '';
        }
    },
    watch: {
        selectedBig() {
            this.mediums = [];
            this.smalls = [];
            this.selectedMedium = "";
            this.selectedSmall = "";
            if (this.selectedBig !== '') {
                this.bigText = this.listBigs[this.selectedBig - 1].text
                this.mediums = this.listBigs[this.selectedBig - 1].listMedium
                this.mediumText = this.mediums[0].text
                this.smallText = this.mediums[0].listSmall[0].text || ''
            }
        },
        selectedMedium() {
            this.smalls = [];
            this.selectedSmall = "";
            if (this.selectedMedium !== '') {
                this.mediumText = (this.mediums[this.selectedMedium]) ? this.mediums[this.selectedMedium].text : this.mediums[0].text;
                this.smalls = this.mediums[this.selectedMedium].listSmall;
                this.smallText = (this.smalls[this.selectedMedium - 1]) ? this.smalls[this.selectedMedium - 1].text : this.smalls[0].text;
            }
        },

        selectedSmall() {
            if (this.selectedSmall !== '') {
                this.smallText = (this.smalls[this.selectedSmall - 1]) ? this.smalls[this.selectedSmall - 1].text : this.smalls[0].text
            }
        }

    },
};
</script>
