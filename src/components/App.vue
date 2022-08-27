<template>
    <position-sizer></position-sizer>
    <view-trade-objectives></view-trade-objectives>
    <view-risk-parameters></view-risk-parameters>
    <div class="absolute bottom-5 right-5 grid grid-cols-2 gap-2">
        <icon @click="modal.open('edit-trade-objectives')" type="pencil"></icon>
        <icon @click="modal.open('edit-risk-parameters')" type="gear"></icon>
    </div>
    <vue-modal></vue-modal>
</template>

<script>
export default {
    name: 'App',

    inject: ['modal'],
}
</script>
