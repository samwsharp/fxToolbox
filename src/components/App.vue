<template>
    <div class="bg-sky-600 w-100 h-2"></div>
    <h1 class="text-xl font-bold text-center mt-9 text-white">Fx<span class="text-sky-600"><i>Toolbox</i></span></h1>
    <position-sizer></position-sizer>
    <div class="grid grid-cols-6 gap-4 w-5/6 mx-auto">
        <view-trade-objectives class="col-span-4"></view-trade-objectives>
        <unquie-trade-id-generator class="col-span-2"></unquie-trade-id-generator>
    </div>
    <view-risk-parameters></view-risk-parameters>
    <div class="absolute bottom-5 right-5 grid grid-cols-2 gap-2">
        <icon class="rounded-full text-white bg-sky-600 p-2 cursor-pointer" @click="modal.mount('edit-trade-objectives')" type="pencil"></icon>
        <icon class="rounded-full text-white bg-sky-600 p-2 cursor-pointer" @click="modal.mount('edit-risk-parameters')" type="gear"></icon>
    </div>
    <vue-modal></vue-modal>
</template>

<script>
export default {
    name: 'App',
    inject: ['modal'],
}
</script>
