<template>
    <div class="bg-yellow-200 text-black rounded relative text-white p-5 cursor-pointer" @click="copy(uid)">
        <h1 class="font-semibold mb-0">Trade ID</h1>
        <h1 class="text-4xl absolute bottom-4 left-4 font-serif">{{ uid }}</h1>
        <icon class="bg-yellow-300 rounded-full absolute bottom-4 right-4 p-2" type="clipboard"></icon>
    </div>
</template>

<script>
import { inject, computed } from 'vue'

export default {
    name: 'UniqueTradeIdGenerator',

    setup () {
        const copy = inject('copy');

        const uid = computed(() => {
            const length = 8;

            var result = '';
            let characters = 'abcdefghijklmnopqrstuvwxyz0123456789';

            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }

            return result.toUpperCase();
        });

        return {
            uid,
            copy
        }
    }
}
</script>
